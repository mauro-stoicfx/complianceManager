import os
from datetime import datetime, date, timedelta
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Query, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client, Client

# Environment variables
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

# Initialize Supabase client if keys are available
supabase_client: Optional[Client] = None
if SUPABASE_URL and SUPABASE_KEY:
    try:
        supabase_client = create_client(SUPABASE_URL, SUPABASE_KEY)
        print("Connected to Supabase successfully!")
    except Exception as e:
        print(f"Failed to connect to Supabase: {e}. Falling back to in-memory mode.")

app = FastAPI(
    title="Stoic FX Compliance Manager API",
    description="Backend API for managing multi-jurisdictional compliance obligations",
    version="1.0.0"
)

# CORS middleware config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class ControlUpdate(BaseModel):
    status: str
    maturity_level: int
    maturity_justification: str
    notes: Optional[str] = None
    evidence_file_path: Optional[str] = None

class ControlOut(BaseModel):
    id: str
    domain: str
    domainEn: Optional[str] = None
    jurisdiction: str
    source_regulation: str
    description: str
    descriptionEn: Optional[str] = None
    frequency: str
    frequencyEn: Optional[str] = None
    specific_deadline: Optional[str] = None
    specific_deadlineEn: Optional[str] = None
    responsible_person: str
    required_evidence: str
    required_evidenceEn: Optional[str] = None
    next_due_date: Optional[str] = None
    status: str
    maturity_level: int
    maturity_justification: str
    maturity_justificationEn: Optional[str] = None
    evidence_file_path: Optional[str] = None
    last_reviewed: str
    notes: Optional[str] = None

from api.controls_data import IN_MEMORY_CONTROLS


@app.get("/health")
def health_check():
    return {"status": "ok", "mode": "supabase" if supabase_client else "in_memory"}

@app.get("/api/controls", response_model=List[ControlOut])
def get_controls(
    jurisdiction: Optional[str] = None,
    domain: Optional[str] = None,
    status: Optional[str] = None,
    maturity_level: Optional[int] = None,
    search: Optional[str] = None
):
    if supabase_client:
        try:
            query = supabase_client.table("regulatory_controls").select("*")
            if jurisdiction:
                query = query.eq("jurisdiction", jurisdiction)
            if domain:
                query = query.eq("domain", domain)
            if status:
                query = query.eq("status", status)
            if maturity_level is not None:
                query = query.eq("maturity_level", maturity_level)
            
            res = query.execute()
            data = res.data
            if search:
                search_lower = search.lower()
                data = [
                    item for item in data 
                    if search_lower in item["id"].lower() or 
                       search_lower in item["description"].lower() or
                       search_lower in item["source_regulation"].lower()
                ]
            return data
        except Exception as e:
            print(f"Supabase query error: {e}. Using fallback.")
    
    # In-memory filtering
    filtered = IN_MEMORY_CONTROLS
    if jurisdiction:
        filtered = [c for c in filtered if c["jurisdiction"] == jurisdiction]
    if domain:
        filtered = [c for c in filtered if c["domain"] == domain]
    if status:
        filtered = [c for c in filtered if c["status"] == status]
    if maturity_level is not None:
        filtered = [c for c in filtered if c["maturity_level"] == maturity_level]
    if search:
        search_lower = search.lower()
        filtered = [
            c for c in filtered 
            if search_lower in c["id"].lower() or 
               search_lower in c["description"].lower() or
               search_lower in c["source_regulation"].lower()
        ]
    return filtered

@app.put("/api/controls/{control_id}", response_model=ControlOut)
def update_control(control_id: str, payload: ControlUpdate):
    if supabase_client:
        try:
            update_data = {
                "status": payload.status,
                "maturity_level": payload.maturity_level,
                "maturity_justification": payload.maturity_justification,
                "last_reviewed": str(date.today())
            }
            if payload.notes is not None:
                update_data["notes"] = payload.notes
            if payload.evidence_file_path is not None:
                update_data["evidence_file_path"] = payload.evidence_file_path

            res = supabase_client.table("regulatory_controls").update(update_data).eq("id", control_id).execute()
            if res.data:
                return res.data[0]
            raise HTTPException(status_code=404, detail="Control not found in Supabase")
        except Exception as e:
            print(f"Supabase update error: {e}. Falling back to in-memory.")

    # In-memory update
    for control in IN_MEMORY_CONTROLS:
        if control["id"] == control_id:
            control["status"] = payload.status
            control["maturity_level"] = payload.maturity_level
            control["maturity_justification"] = payload.maturity_justification
            control["last_reviewed"] = str(date.today())
            if payload.notes is not None:
                control["notes"] = payload.notes
            if payload.evidence_file_path is not None:
                control["evidence_file_path"] = payload.evidence_file_path
            return control
            
    raise HTTPException(status_code=404, detail="Control not found")

@app.get("/api/calendar")
def get_calendar_events():
    controls = get_controls()
    events = []
    for c in controls:
        if c.get("next_due_date"):
            due_date = datetime.strptime(c["next_due_date"], "%Y-%m-%d").date()
            days_left = (due_date - date.today()).days
            
            # Determine color priority
            if days_left < 0 or c["status"] == "Incumplido":
                color = "red"
            elif days_left <= 30 or c["status"] == "En riesgo":
                color = "yellow"
            else:
                color = "green"
                
            events.append({
                "control_id": c["id"],
                "description": c["description"],
                "jurisdiction": c["jurisdiction"],
                "due_date": c["next_due_date"],
                "days_remaining": days_left,
                "status": c["status"],
                "color": color
            })
    # Sort events by proximity
    events.sort(key=lambda x: x["due_date"])
    return events

@app.get("/api/dashboard")
def get_dashboard_kpis():
    controls = get_controls()
    total_controls = len(controls)
    if total_controls == 0:
        return {
            "compliance_rate": 0,
            "at_risk_count": 0,
            "overdue_count": 0,
            "domain_maturity": {}
        }
        
    compliant_count = sum(1 for c in controls if c["status"] == "Compliant")
    at_risk_count = sum(1 for c in controls if c["status"] == "En riesgo")
    
    # Calculate overdue by next_due_date or explicit status
    overdue_count = 0
    for c in controls:
        if c.get("next_due_date"):
            due_date = datetime.strptime(c["next_due_date"], "%Y-%m-%d").date()
            if due_date < date.today() or c["status"] == "Incumplido":
                overdue_count += 1
        elif c["status"] == "Incumplido":
            overdue_count += 1
            
    compliance_rate = round((compliant_count / total_controls) * 100, 1)
    
    # Calculate average maturity score per domain
    domain_totals = {}
    domain_counts = {}
    
    for c in controls:
        dom = c["domain"]
        domain_totals[dom] = domain_totals.get(dom, 0) + c["maturity_level"]
        domain_counts[dom] = domain_counts.get(dom, 0) + 1
        
    domain_maturity = {
        dom: round(domain_totals[dom] / domain_counts[dom], 2)
        for dom in domain_totals
    }
    
    return {
        "compliance_rate": compliance_rate,
        "at_risk_count": at_risk_count,
        "overdue_count": overdue_count,
        "domain_maturity": domain_maturity
    }

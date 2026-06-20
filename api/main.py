import os
import sys
import uuid
from datetime import datetime, date, timedelta
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Query, Depends, status, File, UploadFile, Header, Form
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client, Client

# Add parent directory to sys.path to ensure 'from api.controls_data import ...' resolves under Vercel
parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

# Load environment variables from .env.local for local development fallback
try:
    from dotenv import load_dotenv
    dotenv_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".env.local")
    if os.path.exists(dotenv_path):
        load_dotenv(dotenv_path=dotenv_path)
except ImportError:
    pass

# Mock storage directory for local fallback
MOCK_STORAGE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "mock_storage")
if not os.path.exists(MOCK_STORAGE_DIR):
    os.makedirs(MOCK_STORAGE_DIR)

# In-memory database for evidence files when Supabase is not connected
IN_MEMORY_EVIDENCE = []
IN_MEMORY_CHANGES = []

class EvidenceReview(BaseModel):
    status: str  # "Approved" | "Rejected"
    notes: Optional[str] = None

class RegulatoryChangeReview(BaseModel):
    action_taken: str
    affects_controls: List[str]

class RegulatoryChangeOut(BaseModel):
    id: str
    title: str
    jurisdiction: str
    source_url: Optional[str] = None
    summary: str
    impact_level: str
    status: str
    action_taken: Optional[str] = None
    affects_controls: List[str]
    detected_at: str
    created_at: str
    updated_at: str

class EvidenceOut(BaseModel):
    id: str
    control_id: str
    file_name: str
    file_path: str
    uploaded_by: Optional[str] = None
    uploaded_by_name: Optional[str] = None
    approved_by: Optional[str] = None
    approved_by_name: Optional[str] = None
    status: str
    validity_date: Optional[str] = None
    notes: Optional[str] = None
    created_at: str
    updated_at: str


# Environment variables
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

import resend
resend.api_key = os.environ.get("RESEND_API_KEY")

def send_notification_email(to_email: str, subject: str, html_body: str):
    if not resend.api_key:
        print(f"--- [MOCK EMAIL] To: {to_email} | Subject: {subject} ---")
        return
    try:
        resend.Emails.send({
            "from": "Compliance Bot <onboarding@resend.dev>",
            "to": to_email,
            "subject": subject,
            "html": html_body
        })
    except Exception as e:
        print(f"Failed to send email: {e}")

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

@app.post("/api/evidence/upload", response_model=EvidenceOut)
async def upload_evidence(
    control_id: str = Form(...),
    validity_date: Optional[str] = Form(None),
    notes: Optional[str] = Form(None),
    file: UploadFile = File(...),
    x_simulated_role: Optional[str] = Header(None, alias="X-Simulated-Role"),
    x_simulated_user: Optional[str] = Header(None, alias="X-Simulated-User")
):
    user_email = x_simulated_user or "mauro@stoicfx.com"
    user_name = "Mauro Serrano" if "mauro" in user_email.lower() else "User Member"

    file_id = str(uuid.uuid4())
    file_extension = os.path.splitext(file.filename)[1]
    safe_filename = f"{file_id}{file_extension}"
    storage_path = f"{control_id}/{safe_filename}"

    # Always read file content
    file_content = await file.read()

    # --- Supabase path ---
    if supabase_client:
        try:
            # 1. Upload file to Supabase Storage bucket 'compliance-evidence'
            supabase_client.storage.from_("compliance-evidence").upload(
                path=storage_path,
                file=file_content,
                file_options={"content-type": file.content_type or "application/octet-stream"}
            )

            # 2. Get the uploader's profile UUID (use deterministic uuid5 as fallback)
            uploader_uuid = str(uuid.uuid5(uuid.NAMESPACE_DNS, user_email))
            try:
                profile_res = supabase_client.table("profiles").select("id").eq("email", user_email).execute()
                if profile_res.data:
                    uploader_uuid = profile_res.data[0]["id"]
            except Exception:
                pass

            # 3. Insert record into evidence_files table
            ev_record = {
                "id": file_id,
                "control_id": control_id,
                "file_name": file.filename,
                "file_path": storage_path,
                "uploaded_by": uploader_uuid,
                "status": "Pending",
                "validity_date": validity_date,
                "notes": notes,
            }
            res = supabase_client.table("evidence_files").insert(ev_record).execute()
            inserted = res.data[0] if res.data else ev_record

            # 4. Update parent control
            supabase_client.table("regulatory_controls").update({
                "status": "En progreso",
                "evidence_file_path": storage_path,
                "last_reviewed": str(date.today())
            }).eq("id", control_id).execute()

            # Enrich with display names for the response
            inserted["uploaded_by_name"] = user_name
            inserted["approved_by_name"] = None
            if "created_at" not in inserted:
                inserted["created_at"] = datetime.now().isoformat()
            if "updated_at" not in inserted:
                inserted["updated_at"] = datetime.now().isoformat()

            # Email notification
            subject = f"Nueva Evidencia Subida: Control {control_id}"
            body = f"<p>El usuario <strong>{user_name}</strong> ha subido una nueva evidencia para el control {control_id}.</p>"
            send_notification_email("mauro@stoicfx.com", subject, body)

            return inserted

        except Exception as e:
            print(f"Supabase upload error: {e}. Falling back to local storage.")

    # --- Local/in-memory fallback ---
    if not os.path.exists(MOCK_STORAGE_DIR):
        os.makedirs(MOCK_STORAGE_DIR)
    local_path = os.path.join(MOCK_STORAGE_DIR, safe_filename)
    try:
        with open(local_path, "wb") as f:
            f.write(file_content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to write file locally: {e}")

    new_evidence = {
        "id": file_id,
        "control_id": control_id,
        "file_name": file.filename,
        "file_path": f"mock_storage/{safe_filename}",
        "uploaded_by": str(uuid.uuid5(uuid.NAMESPACE_DNS, user_email)),
        "uploaded_by_name": user_name,
        "approved_by": None,
        "approved_by_name": None,
        "status": "Pending",
        "validity_date": validity_date,
        "notes": notes,
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat()
    }

    for control in IN_MEMORY_CONTROLS:
        if control["id"] == control_id:
            control["status"] = "En progreso"
            control["evidence_file_path"] = new_evidence["file_path"]
            control["last_reviewed"] = str(date.today())
            break

    IN_MEMORY_EVIDENCE.append(new_evidence)
    subject = f"Nueva Evidencia Subida (Local): Control {control_id}"
    body = f"<p>El usuario <strong>{user_name}</strong> ha subido una nueva evidencia para el control {control_id}.</p>"
    send_notification_email("mauro@stoicfx.com", subject, body)
    return new_evidence

@app.get("/api/evidence/control/{control_id}", response_model=List[EvidenceOut])
def get_control_evidences(control_id: str):
    if supabase_client:
        try:
            res = supabase_client.table("evidence_files") \
                .select("*") \
                .eq("control_id", control_id) \
                .order("created_at", desc=True) \
                .execute()
            data = res.data or []
            # Enrich with uploader/reviewer names from profiles
            for ev in data:
                ev["uploaded_by_name"] = ev.get("uploaded_by_name") or "Team Member"
                ev["approved_by_name"] = ev.get("approved_by_name") or None
            return data
        except Exception as e:
            print(f"Supabase get_control_evidences error: {e}")

    evidences = [ev for ev in IN_MEMORY_EVIDENCE if ev["control_id"] == control_id]
    evidences.sort(key=lambda x: x["created_at"], reverse=True)
    return evidences

@app.get("/api/evidence", response_model=List[EvidenceOut])
def get_all_evidences():
    if supabase_client:
        try:
            res = supabase_client.table("evidence_files") \
                .select("*") \
                .order("created_at", desc=True) \
                .execute()
            data = res.data or []
            for ev in data:
                ev["uploaded_by_name"] = ev.get("uploaded_by_name") or "Team Member"
                ev["approved_by_name"] = ev.get("approved_by_name") or None
            return data
        except Exception as e:
            print(f"Supabase get_all_evidences error: {e}")

    return IN_MEMORY_EVIDENCE

@app.put("/api/evidence/{evidence_id}/review", response_model=EvidenceOut)
def review_evidence(
    evidence_id: str,
    payload: EvidenceReview,
    x_simulated_role: Optional[str] = Header(None, alias="X-Simulated-Role"),
    x_simulated_user: Optional[str] = Header(None, alias="X-Simulated-User")
):
    user_email = x_simulated_user or "mauro@stoicfx.com"
    user_name = "Mauro Serrano" if "mauro" in user_email.lower() else "Oficial de Compliance"
    user_role = x_simulated_role or "compliance_officer"

    if user_role not in ["admin", "compliance_officer"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only administrators or compliance officers can review evidence."
        )

    if payload.status not in ["Approved", "Rejected"]:
        raise HTTPException(status_code=400, detail="Status must be 'Approved' or 'Rejected'")

    new_control_status = "Compliant" if payload.status == "Approved" else "Incumplido"

    # --- Supabase path ---
    if supabase_client:
        try:
            reviewer_uuid = str(uuid.uuid5(uuid.NAMESPACE_DNS, user_email))
            try:
                profile_res = supabase_client.table("profiles").select("id").eq("email", user_email).execute()
                if profile_res.data:
                    reviewer_uuid = profile_res.data[0]["id"]
            except Exception:
                pass

            # Update evidence_files record
            update_ev = {
                "status": payload.status,
                "approved_by": reviewer_uuid,
                "updated_at": datetime.now().isoformat(),
            }
            if payload.notes:
                update_ev["notes"] = payload.notes

            res = supabase_client.table("evidence_files") \
                .update(update_ev) \
                .eq("id", evidence_id) \
                .execute()

            if not res.data:
                raise HTTPException(status_code=404, detail="Evidence not found in Supabase")

            evidence_found = res.data[0]
            evidence_found["approved_by_name"] = user_name
            evidence_found["uploaded_by_name"] = evidence_found.get("uploaded_by_name") or "Team Member"
            control_id = evidence_found["control_id"]

            # Update parent control status
            supabase_client.table("regulatory_controls").update({
                "status": new_control_status,
                "evidence_file_path": evidence_found["file_path"] if payload.status == "Approved" else None,
                "last_reviewed": str(date.today())
            }).eq("id", control_id).execute()

            # Email notification
            subject = f"Evidencia Revisada: {payload.status} - Control {control_id}"
            body = f"<p>La evidencia {evidence_id} ha sido marcada como <strong>{payload.status}</strong> por {user_name}.</p>"
            if payload.notes:
                body += f"<p>Notas: {payload.notes}</p>"
            send_notification_email(user_email, subject, body)

            return evidence_found

        except HTTPException:
            raise
        except Exception as e:
            print(f"Supabase review error: {e}. Falling back to in-memory.")

    # --- In-memory fallback ---
    evidence_found = None
    for ev in IN_MEMORY_EVIDENCE:
        if ev["id"] == evidence_id:
            ev["status"] = payload.status
            ev["approved_by"] = str(uuid.uuid5(uuid.NAMESPACE_DNS, user_email))
            ev["approved_by_name"] = user_name
            if payload.notes:
                ev["notes"] = payload.notes
            ev["updated_at"] = datetime.now().isoformat()
            evidence_found = ev
            break

    if not evidence_found:
        raise HTTPException(status_code=404, detail="Evidence record not found")

    control_id = evidence_found["control_id"]
    for control in IN_MEMORY_CONTROLS:
        if control["id"] == control_id:
            control["status"] = new_control_status
            control["evidence_file_path"] = evidence_found["file_path"] if payload.status == "Approved" else None
            control["last_reviewed"] = str(date.today())
            break

    # Email notification
    subject = f"Evidencia Revisada (Local): {payload.status} - Control {control_id}"
    body = f"<p>La evidencia {evidence_id} ha sido marcada como <strong>{payload.status}</strong> por {user_name}.</p>"
    if payload.notes:
        body += f"<p>Notas: {payload.notes}</p>"
    send_notification_email(user_email, subject, body)

    return evidence_found

@app.get("/api/evidence/download/{evidence_id}")
def download_evidence(evidence_id: str):
    if supabase_client:
        try:
            # Check if it exists in Supabase DB
            res = supabase_client.table("evidence_files").select("*").eq("id", evidence_id).execute()
            if res.data:
                evidence = res.data[0]
                # Generate a signed URL for the file in the bucket (valid for 60 seconds)
                signed_res = supabase_client.storage.from_("compliance-evidence").create_signed_url(evidence["file_path"], 60)
                signed_url = signed_res.get("signedURL") or signed_res.get("signedUrl")
                if signed_url:
                    from fastapi.responses import RedirectResponse
                    return RedirectResponse(url=signed_url)
        except Exception as e:
            print(f"Supabase download error: {e}. Falling back to in-memory.")

    # --- In-memory fallback ---
    evidence = None
    for ev in IN_MEMORY_EVIDENCE:
        if ev["id"] == evidence_id:
            evidence = ev
            break
            
    if not evidence:
        raise HTTPException(status_code=404, detail="Evidence not found")
        
    file_path = os.path.join(MOCK_STORAGE_DIR, os.path.basename(evidence["file_path"]))
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found on disk")
        
    return FileResponse(file_path, media_type="application/octet-stream", filename=evidence["file_name"])

@app.get("/api/health")
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

from api.jobs.expiration_alerts import check_and_send_expiration_alerts
from api.jobs.monitor_d8 import run_regulatory_monitor

@app.post("/api/cron/check-expirations")
def cron_check_expirations():
    """Endpoint for external CRON jobs (e.g. Vercel Cron) to trigger daily"""
    result = check_and_send_expiration_alerts(supabase_client, IN_MEMORY_EVIDENCE)
    return result

@app.get("/api/intelligence/changes", response_model=List[RegulatoryChangeOut])
def get_regulatory_changes(jurisdiction: Optional[str] = None, status: Optional[str] = None):
    if supabase_client:
        try:
            query = supabase_client.table("regulatory_changes").select("*").order("detected_at", desc=True)
            if jurisdiction:
                query = query.eq("jurisdiction", jurisdiction)
            if status:
                query = query.eq("status", status)
            res = query.execute()
            return res.data or []
        except Exception as e:
            print(f"Supabase query error for changes: {e}")
            
    filtered = IN_MEMORY_CHANGES
    if jurisdiction:
        filtered = [c for c in filtered if c["jurisdiction"] == jurisdiction]
    if status:
        filtered = [c for c in filtered if c["status"] == status]
    # Sort in memory descending by detected_at
    filtered_copy = [dict(c) for c in filtered]
    filtered_copy.sort(key=lambda x: x["detected_at"], reverse=True)
    return filtered_copy

@app.put("/api/intelligence/changes/{change_id}/review", response_model=RegulatoryChangeOut)
def review_regulatory_change(
    change_id: str,
    payload: RegulatoryChangeReview,
    x_simulated_role: Optional[str] = Header(None, alias="X-Simulated-Role"),
    x_simulated_user: Optional[str] = Header(None, alias="X-Simulated-User")
):
    user_email = x_simulated_user or "mauro@stoicfx.com"
    user_role = x_simulated_role or "compliance_officer"
    
    if user_role not in ["admin", "compliance_officer"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only administrators or compliance officers can review regulatory changes."
        )

    # If Supabase is connected
    if supabase_client:
        try:
            # Check if it exists
            res = supabase_client.table("regulatory_changes").select("*").eq("id", change_id).execute()
            if res.data:
                # Update change status
                update_res = supabase_client.table("regulatory_changes").update({
                    "status": "Reviewed",
                    "action_taken": payload.action_taken,
                    "affects_controls": payload.affects_controls,
                    "updated_at": datetime.now().isoformat()
                }).eq("id", change_id).execute()
                
                # Update status of affected controls to 'En riesgo'
                if payload.affects_controls:
                    supabase_client.table("regulatory_controls").update({
                        "status": "En riesgo",
                        "notes": f"Afectado por cambio regulatorio: {res.data[0]['title']}. Requiere revisión."
                    }).in_("id", payload.affects_controls).execute()
                    
                return update_res.data[0]
        except Exception as e:
            print(f"Supabase update error for change review: {e}")

    # In-memory update fallback
    found_change = None
    for c in IN_MEMORY_CHANGES:
        if c["id"] == change_id:
            c["status"] = "Reviewed"
            c["action_taken"] = payload.action_taken
            c["affects_controls"] = payload.affects_controls
            c["updated_at"] = datetime.now().isoformat()
            found_change = c
            break
            
    if not found_change:
        raise HTTPException(status_code=404, detail="Regulatory change not found")

    # Update state of associated in-memory controls
    if payload.affects_controls:
        for ctrl in IN_MEMORY_CONTROLS:
            if ctrl["id"] in payload.affects_controls:
                ctrl["status"] = "En riesgo"
                ctrl["notes"] = f"Afectado por cambio regulatorio: {found_change['title']}. Requiere revisión."
                
    return found_change

@app.post("/api/cron/monitor-d8")
def cron_monitor_d8():
    """Endpoint for external CRON jobs or manual triggers to scan for D8 changes"""
    result = run_regulatory_monitor(supabase_client, IN_MEMORY_CHANGES)
    return result


import os
import uuid
from datetime import datetime, date
from typing import List, Dict, Any
from supabase import Client
import resend

# Simulated/realistic regulatory updates from FSCA and FSC Mauritius
POTENTIAL_CHANGES = [
    {
        "title": "FSCA Board Notice: Amendment of Continuous Professional Development (CPD) Guidelines",
        "jurisdiction": "FSCA",
        "source_url": "https://www.fsca.co.za/Regulatory%20Frameworks/Pages/Board-Notices.aspx",
        "summary": "The FSCA has published an amendment regarding the submission process for CPD hours. FSPs are now required to maintain digital certificates on record for at least 5 years and report via the new online portal by June 15th annually.",
        "impact_level": "Medium",
        "affects_controls": ["D5-F01"] # Continuing Professional Development control
    },
    {
        "title": "FSC Mauritius Circular: New Capital Adequacy Requirements for OTC Derivative Dealers",
        "jurisdiction": "FSC Mauritius",
        "source_url": "https://www.fscmauritius.org/en/regulatory-framework/circulars",
        "summary": "New regulatory directives mandate Investment Dealers (including Full Service Dealers) to maintain an increased minimum unimpaired capital requirement and submit a revised quarterly Capital Adequacy Return starting next quarter.",
        "impact_level": "High",
        "affects_controls": ["D2-M01", "D6-M01"] # Capital requirement & quarterly reports
    },
    {
        "title": "FSCA Financial Sector Conduct Authority: General Code of Conduct updates for FSPs",
        "jurisdiction": "FSCA",
        "source_url": "https://www.fsca.co.za/Pages/Default.aspx",
        "summary": "Amendments to the General Code of Conduct for Authorized Financial Services Providers require new disclosures concerning cybersecurity policies and risk management frameworks (effective in 90 days).",
        "impact_level": "High",
        "affects_controls": ["D7-F01", "D7-F02"] # Tech/cybersecurity controls
    },
    {
        "title": "FSC Mauritius Rules: Financial Intelligence and Anti-Money Laundering Act (FIAMLA) update",
        "jurisdiction": "FSC Mauritius",
        "source_url": "https://www.fscmauritius.org/en/regulatory-framework/acts-and-regulations",
        "summary": "The FSC has updated guidelines for suspicious transaction reporting (STR) times. All entities must now submit internal MLRO assessments within 48 hours of detection.",
        "impact_level": "High",
        "affects_controls": ["D3-M01", "D3-M02"] # AML / KYC / MLRO controls
    }
]

def run_regulatory_monitor(supabase_client: Client | None, in_memory_changes: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Checks for new regulatory announcements, stores them, and sends email alerts for high/medium impact changes.
    """
    detected_new_changes = []
    
    # 1. Fetch existing titles to avoid duplicates
    existing_titles = set()
    if supabase_client:
        try:
            res = supabase_client.table("regulatory_changes").select("title").execute()
            if res.data:
                existing_titles = {item["title"] for item in res.data}
        except Exception as e:
            print(f"Error reading existing regulatory changes from Supabase: {e}")
    else:
        existing_titles = {item["title"] for item in in_memory_changes}

    # 2. Process potential changes
    for change in POTENTIAL_CHANGES:
        if change["title"] in existing_titles:
            continue # Already detected and stored
            
        new_change = {
            "id": str(uuid.uuid4()),
            "title": change["title"],
            "jurisdiction": change["jurisdiction"],
            "source_url": change["source_url"],
            "summary": change["summary"],
            "impact_level": change["impact_level"],
            "status": "Unreviewed",
            "action_taken": None,
            "affects_controls": change["affects_controls"],
            "detected_at": datetime.now().isoformat(),
            "created_at": datetime.now().isoformat(),
            "updated_at": datetime.now().isoformat()
        }
        
        # Save to DB
        if supabase_client:
            try:
                supabase_client.table("regulatory_changes").insert({
                    "id": new_change["id"],
                    "title": new_change["title"],
                    "jurisdiction": new_change["jurisdiction"],
                    "source_url": new_change["source_url"],
                    "summary": new_change["summary"],
                    "impact_level": new_change["impact_level"],
                    "status": new_change["status"],
                    "affects_controls": new_change["affects_controls"],
                    "detected_at": new_change["detected_at"]
                }).execute()
                detected_new_changes.append(new_change)
            except Exception as e:
                print(f"Error inserting change to Supabase: {e}")
                # Fallback to local memory
                in_memory_changes.append(new_change)
                detected_new_changes.append(new_change)
        else:
            in_memory_changes.append(new_change)
            detected_new_changes.append(new_change)

        # 3. Send email notifications for High and Medium impact alerts
        if change["impact_level"] in ["High", "Medium"]:
            to_email = "mauro@stoicfx.com"
            subject = f"⚠️ [Monitor D8] Alerta de Cambio Regulatorio ({change['impact_level']}) - {change['jurisdiction']}"
            
            html_body = f"""
            <h2>Nueva Alerta Normativa Detectada (Dominio D8)</h2>
            <p><strong>Título:</strong> {change['title']}</p>
            <p><strong>Jurisdicción:</strong> {change['jurisdiction']}</p>
            <p><strong>Nivel de Impacto:</strong> <span style="color: {'red' if change['impact_level'] == 'High' else 'orange'}">{change['impact_level']}</span></p>
            <p><strong>Resumen:</strong> {change['summary']}</p>
            <p><strong>Controles Afectados Sugeridos:</strong> {', '.join(change['affects_controls'])}</p>
            <p><strong>Ver más en:</strong> <a href="{change['source_url']}">{change['source_url']}</a></p>
            <br/>
            <p>Por favor, ingrese al Stoic FX Compliance Manager para revisar esta alerta y registrar las acciones tomadas.</p>
            """
            
            if not resend.api_key:
                print(f"--- [MOCK EMAIL] Alerta D8 Monitor: {change['title']} ---")
                continue
                
            try:
                resend.Emails.send({
                    "from": "Compliance Bot <onboarding@resend.dev>",
                    "to": to_email,
                    "subject": subject,
                    "html": html_body
                })
                print(f"Sent email alert for regulatory change: {change['title']} to {to_email}")
            except Exception as e:
                print(f"Failed to send regulatory change email: {e}")
                
    return {
        "status": "success",
        "new_changes_detected": len(detected_new_changes),
        "changes": detected_new_changes
    }

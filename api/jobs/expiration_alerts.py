import os
from datetime import date, timedelta
from typing import List, Dict, Any
from supabase import Client
import resend

def check_and_send_expiration_alerts(supabase_client: Client | None, in_memory_evidence: List[Dict[str, Any]]):
    """
    Checks for evidences expiring in exactly 30, 15, or 7 days and sends alerts.
    """
    today = date.today()
    thresholds = [30, 15, 7]
    
    # Calculate target dates
    target_dates = { (today + timedelta(days=d)).isoformat(): d for d in thresholds }
    
    evidences_to_alert = []
    
    if supabase_client:
        try:
            # We filter by validity_date matching our target dates
            res = supabase_client.table("evidence_files").select("*").in_("validity_date", list(target_dates.keys())).eq("status", "Approved").execute()
            if res.data:
                evidences_to_alert = res.data
        except Exception as e:
            print(f"Error querying Supabase for expirations: {e}")
            return {"status": "error", "detail": str(e)}
    else:
        # Local fallback
        for ev in in_memory_evidence:
            if ev.get("status") == "Approved" and ev.get("validity_date") in target_dates:
                evidences_to_alert.append(dict(ev))

    alerts_sent = 0
    for ev in evidences_to_alert:
        v_date = ev.get("validity_date")
        days_left = target_dates[v_date]
        control_id = ev.get("control_id")
        
        to_email = "mauro@stoicfx.com"
        subject = f"Alerta de Vencimiento: Evidencia para {control_id} vence en {days_left} días"
        
        html_body = f"""
        <h2>Alerta de Vencimiento de Evidencia</h2>
        <p>La evidencia <strong>{ev.get('file_name')}</strong> (Control: {control_id}) expirará el {v_date} ({days_left} días).</p>
        <p>Por favor, asegúrese de renovar esta documentación y subirla al portal a tiempo para evitar un incumplimiento.</p>
        """
        
        if not resend.api_key:
            print(f"--- [MOCK EMAIL] Vencimiento {days_left} días para {control_id} ---")
            alerts_sent += 1
            continue

        try:
            resend.Emails.send({
                "from": "Compliance Bot <onboarding@resend.dev>",
                "to": to_email,
                "subject": subject,
                "html": html_body
            })
            alerts_sent += 1
            print(f"Sent expiration alert for {control_id} to {to_email}")
        except Exception as e:
            print(f"Failed to send expiration email: {e}")
            
    return {"status": "success", "alerts_sent": alerts_sent}

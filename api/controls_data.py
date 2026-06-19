from datetime import date, timedelta

# Complete list of 91 specific controls based on stoicfx_compliance_project.md
RAW_CONTROLS = [
    # D1 — Licenciamiento y gobierno corporativo
    {
        "id": "D1-F01", "domain": "D1 — Licenciamiento y gobierno corporativo", "domainEn": "D1 — Licensing and Corporate Governance",
        "jurisdiction": "FSCA", "source_regulation": "FAIS Act S.8", "description": "Mantener licencia FSP activa y vigente",
        "descriptionEn": "Maintain FSP license active and valid", "frequency": "Anual", "frequencyEn": "Annual",
        "specific_deadline": "Anual (renovación)", "specific_deadlineEn": "Annual (renewal)", "responsible_person": "Mauro Serrano",
        "required_evidence": "Certificado de licencia FSP vigente", "required_evidenceEn": "Valid FSP license certificate",
        "next_due_date": "2026-12-31", "status": "En progreso", "notes": "Licencia FSP principal"
    },
    {
        "id": "D1-F02", "domain": "D1 — Licenciamiento y gobierno corporativo", "domainEn": "D1 — Licensing and Corporate Governance",
        "jurisdiction": "FSCA", "source_regulation": "FSCA Levy Rules", "description": "Pago del levy anual FSCA",
        "descriptionEn": "Payment of the annual FSCA levy", "frequency": "Anual", "frequencyEn": "Annual",
        "specific_deadline": "Anual", "specific_deadlineEn": "Annual", "responsible_person": "Mauro Serrano",
        "required_evidence": "Comprobante de pago", "required_evidenceEn": "Proof of payment",
        "next_due_date": "2026-09-30", "status": "En progreso", "notes": "Pago de tasa reguladora anual"
    },
    {
        "id": "D1-F03", "domain": "D1 — Licenciamiento y gobierno corporativo", "domainEn": "D1 — Licensing and Corporate Governance",
        "jurisdiction": "FSCA", "source_regulation": "FAIS Act S.14", "description": "Notificar a FSCA cualquier cambio material (directores, actividades, estructura accionaria)",
        "descriptionEn": "Notify FSCA of any material change (directors, activities, shareholding structure)", "frequency": "Por evento", "frequencyEn": "Per event",
        "specific_deadline": "Por evento", "specific_deadlineEn": "Per event", "responsible_person": "Mauro Serrano",
        "required_evidence": "Notificación enviada + acuse de recibo FSCA", "required_evidenceEn": "Notification sent + FSCA acknowledgment of receipt",
        "next_due_date": None, "status": "Compliant", "notes": "Cambios societarios u operativos"
    },
    {
        "id": "D1-F04", "domain": "D1 — Licenciamiento y gobierno corporativo", "domainEn": "D1 — Licensing and Corporate Governance",
        "jurisdiction": "FSCA", "source_regulation": "FAIS Act S.2", "description": "Nombrar Key Individual (KI) para cada categoría de producto",
        "descriptionEn": "Appoint Key Individual (KI) for each product category", "frequency": "Por evento", "frequencyEn": "Per event",
        "specific_deadline": "Por evento / continua", "specific_deadlineEn": "Per event / continuous", "responsible_person": "Mauro Serrano",
        "required_evidence": "Registro de KIs aprobados por FSCA", "required_evidenceEn": "Register of KIs approved by FSCA",
        "next_due_date": None, "status": "Compliant", "notes": "Designaciones de responsables clave"
    },
    {
        "id": "D1-F05", "domain": "D1 — Licenciamiento y gobierno corporativo", "domainEn": "D1 — Licensing and Corporate Governance",
        "jurisdiction": "FSCA", "source_regulation": "FAIS Act S.17", "description": "Nombrar Compliance Officer si hay más de 1 KI o representantes",
        "descriptionEn": "Appoint Compliance Officer if there is more than 1 KI or representatives", "frequency": "Por evento", "frequencyEn": "Per event",
        "specific_deadline": "Por evento", "specific_deadlineEn": "Per event", "responsible_person": "Mauro Serrano",
        "required_evidence": "Designación formal + registro FSCA", "required_evidenceEn": "Formal designation + FSCA registration",
        "next_due_date": None, "status": "Compliant", "notes": "Estructura de oficiales de compliance"
    },
    # FSC Mauritius D1
    {
        "id": "D1-M01", "domain": "D1 — Licenciamiento y gobierno corporativo", "domainEn": "D1 — Licensing and Corporate Governance",
        "jurisdiction": "FSC Mauritius", "source_regulation": "Securities Act 2005 S.15", "description": "Renovar Investment Dealer Licence anualmente",
        "descriptionEn": "Renew Investment Dealer License annually", "frequency": "Anual", "frequencyEn": "Annual",
        "specific_deadline": "Anual (aniversario de la licencia)", "specific_deadlineEn": "Annual (license anniversary)", "responsible_person": "Mauro Serrano",
        "required_evidence": "Certificado de licencia FSC vigente", "required_evidenceEn": "Valid FSC license certificate",
        "next_due_date": "2027-02-15", "status": "En progreso", "notes": ""
    },
    {
        "id": "D1-M02", "domain": "D1 — Licenciamiento y gobierno corporativo", "domainEn": "D1 — Licensing and Corporate Governance",
        "jurisdiction": "FSC Mauritius", "source_regulation": "FSC Consolidated Licensing & Fees Rules 2008", "description": "Pagar Annual Licence Fee (MUR 600,000–1,000,000 Investment Dealer)",
        "descriptionEn": "Pay Annual License Fee (MUR 600,000–1,000,000 Investment Dealer)", "frequency": "Anual", "frequencyEn": "Annual",
        "specific_deadline": "Anual (aniversario)", "specific_deadlineEn": "Annual (anniversary)", "responsible_person": "Mauro Serrano",
        "required_evidence": "Comprobante de pago FSC", "required_evidenceEn": "Proof of payment FSC",
        "next_due_date": "2026-08-31", "status": "En progreso", "notes": "Tarifa de licencia anual Mauritius"
    },
    {
        "id": "D1-M03", "domain": "D1 — Licenciamiento y gobierno corporativo", "domainEn": "D1 — Licensing and Corporate Governance",
        "jurisdiction": "FSC Mauritius", "source_regulation": "FSC Circular / Financial Services Act S.71", "description": "Mantener mínimo 2 directores residentes en Mauritius con criterio independiente",
        "descriptionEn": "Maintain at least 2 resident directors in Mauritius with independent criteria", "frequency": "Continua", "frequencyEn": "Continuous",
        "specific_deadline": "Continua", "specific_deadlineEn": "Continuous", "responsible_person": "Mauro Serrano",
        "required_evidence": "CVs de directores + prueba de residencia", "required_evidenceEn": "Directors' CVs + proof of residency",
        "next_due_date": None, "status": "Compliant", "notes": "Requisito de sustancia local"
    },
    {
        "id": "D1-M04", "domain": "D1 — Licenciamiento y gobierno corporativo", "domainEn": "D1 — Licensing and Corporate Governance",
        "jurisdiction": "FSC Mauritius", "source_regulation": "FSC Substance Requirements", "description": "Mantener cuenta bancaria principal en Mauritius",
        "descriptionEn": "Maintain primary bank account in Mauritius", "frequency": "Continua", "frequencyEn": "Continuous",
        "specific_deadline": "Continua", "specific_deadlineEn": "Continuous", "responsible_person": "Mauro Serrano",
        "required_evidence": "Estado de cuenta bancaria activa en Mauritius", "required_evidenceEn": "Active bank statement in Mauritius",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D1-M05", "domain": "D1 — Licenciamiento y gobierno corporativo", "domainEn": "D1 — Licensing and Corporate Governance",
        "jurisdiction": "FSC Mauritius", "source_regulation": "Financial Services Act S.71", "description": "Mantener registros contables en la sede registrada en Mauritius",
        "descriptionEn": "Maintain accounting records at the registered office in Mauritius", "frequency": "Continua", "frequencyEn": "Continuous",
        "specific_deadline": "Continua", "specific_deadlineEn": "Continuous", "responsible_person": "Mauro Serrano",
        "required_evidence": "Contrato con Management Company o evidencia de registros locales", "required_evidenceEn": "Contract with Management Company or proof of local records",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D1-M06", "domain": "D1 — Licenciamiento y gobierno corporativo", "domainEn": "D1 — Licensing and Corporate Governance",
        "jurisdiction": "FSC Mauritius", "source_regulation": "Financial Services Act S.77", "description": "Contratar Management Company licenciada por FSC",
        "descriptionEn": "Hire a Management Company licensed by the FSC", "frequency": "Continua", "frequencyEn": "Continuous",
        "specific_deadline": "Continua", "specific_deadlineEn": "Continuous", "responsible_person": "Mauro Serrano",
        "required_evidence": "Contrato vigente con Management Company", "required_evidenceEn": "Active contract with Management Company",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D1-M07", "domain": "D1 — Licenciamiento y gobierno corporativo", "domainEn": "D1 — Licensing and Corporate Governance",
        "jurisdiction": "FSC Mauritius", "source_regulation": "Securities Act 2005", "description": "Notificar FSC ante cambios materiales (directores, accionistas, actividades, LPs)",
        "descriptionEn": "Notify FSC of material changes (directors, shareholders, activities, LPs)", "frequency": "Por evento", "frequencyEn": "Per event",
        "specific_deadline": "Por evento", "specific_deadlineEn": "Per event", "responsible_person": "Mauro Serrano",
        "required_evidence": "Notificación enviada + acuse FSC", "required_evidenceEn": "Notification sent + FSC acknowledgment",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D1-M08", "domain": "D1 — Licenciamiento y gobierno corporativo", "domainEn": "D1 — Licensing and Corporate Governance",
        "jurisdiction": "FSC Mauritius", "source_regulation": "FSC GBC Substance Requirements", "description": "Presentar Annual Substance Filing (descripción de actividades, empleados, gastos en Mauritius)",
        "descriptionEn": "Submit Annual Substance Filing (description of activities, employees, expenses in Mauritius)", "frequency": "Anual", "frequencyEn": "Annual",
        "specific_deadline": "Anual", "specific_deadlineEn": "Annual", "responsible_person": "Mauro Serrano",
        "required_evidence": "Formulario de substance filing completado y radicado", "required_evidenceEn": "Completed and filed substance filing form",
        "next_due_date": "2027-03-31", "status": "En progreso", "notes": ""
    },
    {
        "id": "D1-M09", "domain": "D1 — Licenciamiento y gobierno corporativo", "domainEn": "D1 — Licensing and Corporate Governance",
        "jurisdiction": "FSC Mauritius", "source_regulation": "Securities (Licensing) Rules 2007 Rule 14", "description": "Mantener capital mínimo estatutario (MUR 1,000,000 para Investment Dealer)",
        "descriptionEn": "Maintain minimum statutory capital (MUR 1,000,000 for Investment Dealer)", "frequency": "Continua", "frequencyEn": "Continuous",
        "specific_deadline": "Continua", "specific_deadlineEn": "Continuous", "responsible_person": "Mauro Serrano",
        "required_evidence": "Balance sheet que evidencia capital", "required_evidenceEn": "Balance sheet proving capital",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D1-M10", "domain": "D1 — Licenciamiento y gobierno corporativo", "domainEn": "D1 — Licensing and Corporate Governance",
        "jurisdiction": "FSC Mauritius", "source_regulation": "Securities Act 2005 / FSC Licensing Criteria", "description": "Nombrar Compliance Officer",
        "descriptionEn": "Appoint Compliance Officer", "frequency": "Por evento", "frequencyEn": "Per event",
        "specific_deadline": "Por evento", "specific_deadlineEn": "Per event", "responsible_person": "Mauro Serrano",
        "required_evidence": "Designación formal + CDD del Compliance Officer", "required_evidenceEn": "Formal designation + Compliance Officer CDD",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D1-M11", "domain": "D1 — Licenciamiento y gobierno corporativo", "domainEn": "D1 — Licensing and Corporate Governance",
        "jurisdiction": "FSC Mauritius", "source_regulation": "FIAMLA 2002 / FSC AML Handbook", "description": "Nombrar MLRO y Deputy MLRO",
        "descriptionEn": "Appoint MLRO and Deputy MLRO", "frequency": "Por evento", "frequencyEn": "Per event",
        "specific_deadline": "Por evento", "specific_deadlineEn": "Per event", "responsible_person": "Mauro Serrano",
        "required_evidence": "Designación formal + CDD del MLRO", "required_evidenceEn": "Formal designation + MLRO CDD",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },

    # D2 — Solidez financiera y capital
    {
        "id": "D2-F01", "domain": "D2 — Solidez financiera y capital", "domainEn": "D2 — Financial Soundness and Capital",
        "jurisdiction": "FSCA", "source_regulation": "Board Notice 194/2017 Cap.6", "description": "Activos > Pasivos en todo momento (solvencia general)",
        "descriptionEn": "Assets > Liabilities at all times (general solvency)", "frequency": "Continua", "frequencyEn": "Continuous",
        "specific_deadline": "Continua", "specific_deadlineEn": "Continuous", "responsible_person": "Mauro Serrano",
        "required_evidence": "Balance sheet mensual interno", "required_evidenceEn": "Internal monthly balance sheet",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D2-F02", "domain": "D2 — Solidez financiera y capital", "domainEn": "D2 — Financial Soundness and Capital",
        "jurisdiction": "FSCA", "source_regulation": "BN 194 Cap.6", "description": "Activos corrientes > Pasivos corrientes (capital de trabajo)",
        "descriptionEn": "Current assets > Current liabilities (working capital)", "frequency": "Continua", "frequencyEn": "Continuous",
        "specific_deadline": "Continua", "specific_deadlineEn": "Continuous", "responsible_person": "Mauro Serrano",
        "required_evidence": "Balance sheet mensual interno", "required_evidenceEn": "Internal monthly balance sheet",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D2-F03", "domain": "D2 — Solidez financiera y capital", "domainEn": "D2 — Financial Soundness and Capital",
        "jurisdiction": "FSCA", "source_regulation": "BN 194 Cap.6", "description": "Activos líquidos >= 4/52 semanas del gasto anual ajustado (~1 mes de opex)",
        "descriptionEn": "Liquid assets >= 4/52 weeks of adjusted annual expenditure (~1 month opex)", "frequency": "Continua", "frequencyEn": "Continuous",
        "specific_deadline": "Continua", "specific_deadlineEn": "Continuous", "responsible_person": "Mauro Serrano",
        "required_evidence": "Cálculo mensual documentado", "required_evidenceEn": "Documented monthly calculation",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D2-F04", "domain": "D2 — Solidez financiera y capital", "domainEn": "D2 — Financial Soundness and Capital",
        "jurisdiction": "FSCA", "source_regulation": "BN 194", "description": "Presentar Form A (Liquidity Calculation) — Cat. I: anual; Cat. II: semestral",
        "descriptionEn": "Submit Form A (Liquidity Calculation) — Cat. I: annual; Cat. II: semi-annual", "frequency": "Semestral", "frequencyEn": "Semi-annual",
        "specific_deadline": "Semestral dentro de 45 días del cierre", "specific_deadlineEn": "Semi-annually within 45 days of closing", "responsible_person": "Mauro Serrano",
        "required_evidence": "Form A radicado ante FSCA con acuse", "required_evidenceEn": "Form A filed with FSCA with acknowledgment",
        "next_due_date": "2026-07-15", "status": "En progreso", "notes": ""
    },
    {
        "id": "D2-F05", "domain": "D2 — Solidez financiera y capital", "domainEn": "D2 — Financial Soundness and Capital",
        "jurisdiction": "FSCA", "source_regulation": "BN 194 Cap.6", "description": "Early Warning: notificar FSCA inmediatamente si activos exceden pasivos por < 10%",
        "descriptionEn": "Early Warning: notify FSCA immediately if assets exceed liabilities by < 10%", "frequency": "Por evento", "frequencyEn": "Per event",
        "specific_deadline": "Por evento", "specific_deadlineEn": "Per event", "responsible_person": "Mauro Serrano",
        "required_evidence": "Notificación enviada + timestamp", "required_evidenceEn": "Notification sent + timestamp",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D2-F06", "domain": "D2 — Solidez financiera y capital", "domainEn": "D2 — Financial Soundness and Capital",
        "jurisdiction": "FSCA", "source_regulation": "FAIS Act S.18", "description": "Mantener seguro PI/FG mínimo ZAR 1M o ZAR 5M",
        "descriptionEn": "Maintain PI/FG insurance minimum ZAR 1M or ZAR 5M", "frequency": "Anual", "frequencyEn": "Annual",
        "specific_deadline": "Anual (renovación póliza)", "specific_deadlineEn": "Annual (policy renewal)", "responsible_person": "Mauro Serrano",
        "required_evidence": "Póliza de seguro vigente", "required_evidenceEn": "Active insurance policy",
        "next_due_date": "2027-05-31", "status": "En progreso", "notes": ""
    },
    # FSC Mauritius D2
    {
        "id": "D2-M01", "domain": "D2 — Solidez financiera y capital", "domainEn": "D2 — Financial Soundness and Capital",
        "jurisdiction": "FSC Mauritius", "source_regulation": "Securities (Licensing) Rules 2007 Rule 14", "description": "Mantener capital mínimo no deteriorado >= MUR 1,000,000 en todo momento",
        "descriptionEn": "Maintain minimum non-impaired capital >= MUR 1,000,000 at all times", "frequency": "Continua", "frequencyEn": "Continuous",
        "specific_deadline": "Continua", "specific_deadlineEn": "Continuous", "responsible_person": "Mauro Serrano",
        "required_evidence": "Balance sheet con capital", "required_evidenceEn": "Balance sheet showing capital",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D2-M02", "domain": "D2 — Solidez financiera y capital", "domainEn": "D2 — Financial Soundness and Capital",
        "jurisdiction": "FSC Mauritius", "source_regulation": "SEM Financial Reporting Rules 2010", "description": "Mantener capital adecuado >= 9 meses de gastos fijos (Fixed Expenditure Based Requirement)",
        "descriptionEn": "Maintain adequate capital >= 9 months of fixed expenses (Fixed Expenditure Based Requirement)", "frequency": "Continua", "frequencyEn": "Continuous",
        "specific_deadline": "Continua", "specific_deadlineEn": "Continuous", "responsible_person": "Mauro Serrano",
        "required_evidence": "Cálculo FEBR documentado", "required_evidenceEn": "Documented FEBR calculation",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D2-M03", "domain": "D2 — Solidez financiera y capital", "domainEn": "D2 — Financial Soundness and Capital",
        "jurisdiction": "FSC Mauritius", "source_regulation": "SEM Financial Reporting Rules 2010", "description": "Presentar Capital Adequacy Return trimestral ante SEM",
        "descriptionEn": "Submit quarterly Capital Adequacy Return to SEM", "frequency": "Trimestral", "frequencyEn": "Quarterly",
        "specific_deadline": "Dentro de los 10 días hábiles del cierre del trimestre", "specific_deadlineEn": "Within 10 business days of quarter close", "responsible_person": "Mauro Serrano",
        "required_evidence": "Capital Adequacy Return radicado", "required_evidenceEn": "Filed Capital Adequacy Return",
        "next_due_date": "2026-06-30", "status": "En riesgo", "notes": ""
    },
    {
        "id": "D2-M04", "domain": "D2 — Solidez financiera y capital", "domainEn": "D2 — Financial Soundness and Capital",
        "jurisdiction": "FSC Mauritius", "source_regulation": "SEM Financial Reporting Rules 2010 Rule 14.3", "description": "Notificar inmediatamente al SEM si hay riesgo de incumplimiento de capital",
        "descriptionEn": "Notify SEM immediately if there is a risk of capital non-compliance", "frequency": "Por evento", "frequencyEn": "Per event",
        "specific_deadline": "Por evento", "specific_deadlineEn": "Per event", "responsible_person": "Mauro Serrano",
        "required_evidence": "Notificación formal enviada", "required_evidenceEn": "Formal notification sent",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D2-M05", "domain": "D2 — Solidez financiera y capital", "domainEn": "D2 — Financial Soundness and Capital",
        "jurisdiction": "FSC Mauritius", "source_regulation": "SEM Financial Reporting Rules 2010", "description": "Mantener registros contables actualizados en todo momento",
        "descriptionEn": "Maintain updated accounting records at all times", "frequency": "Continua", "frequencyEn": "Continuous",
        "specific_deadline": "Continua", "specific_deadlineEn": "Continuous", "responsible_person": "Mauro Serrano",
        "required_evidence": "Libros contables actualizados", "required_evidenceEn": "Updated accounting ledgers",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },

    # D3 — KYC / AML / CFT
    {
        "id": "D3-F01", "domain": "D3 — KYC / AML / CFT", "domainEn": "D3 — KYC / AML / CFT",
        "jurisdiction": "FSCA", "source_regulation": "FICA", "description": "Implementar programa AML/CFT escrito",
        "descriptionEn": "Implement written AML/CFT program", "frequency": "Anual", "frequencyEn": "Annual",
        "specific_deadline": "Anual (revisión)", "specific_deadlineEn": "Annual (review)", "responsible_person": "Mauro Serrano",
        "required_evidence": "Manual AML/CFT actualizado y aprobado", "required_evidenceEn": "Updated and approved AML/CFT manual",
        "next_due_date": "2026-11-30", "status": "En progreso", "notes": ""
    },
    {
        "id": "D3-F02", "domain": "D3 — KYC / AML / CFT", "domainEn": "D3 — KYC / AML / CFT",
        "jurisdiction": "FSCA", "source_regulation": "FICA S.21", "description": "Realizar Customer Due Diligence (CDD) completo en el onboarding de cada cliente",
        "descriptionEn": "Perform full CDD during onboarding of all clients", "frequency": "Por evento", "frequencyEn": "Per event",
        "specific_deadline": "Por cliente", "specific_deadlineEn": "Per client", "responsible_person": "Mauro Serrano",
        "required_evidence": "Expediente de cliente con documentación CDD", "required_evidenceEn": "Client file with CDD documentation",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D3-F03", "domain": "D3 — KYC / AML / CFT", "domainEn": "D3 — KYC / AML / CFT",
        "jurisdiction": "FSCA", "source_regulation": "FICA S.21B", "description": "Realizar Enhanced Due Diligence (EDD) para PEPs y clientes de alto riesgo",
        "descriptionEn": "Perform Enhanced Due Diligence (EDD) for PEPs and high-risk clients", "frequency": "Por evento", "frequencyEn": "Per event",
        "specific_deadline": "Por cliente de alto riesgo", "specific_deadlineEn": "Per high-risk client", "responsible_person": "Mauro Serrano",
        "required_evidence": "Expediente EDD con aprobación del KI", "required_evidenceEn": "EDD file with KI approval",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D3-F04", "domain": "D3 — KYC / AML / CFT", "domainEn": "D3 — KYC / AML / CFT",
        "jurisdiction": "FSCA", "source_regulation": "FICA S.22", "description": "Monitoreo continuo de transacciones de clientes (transaction monitoring)",
        "descriptionEn": "Continuous monitoring of client transactions (transaction monitoring)", "frequency": "Continua", "frequencyEn": "Continuous",
        "specific_deadline": "Continua", "specific_deadlineEn": "Continuous", "responsible_person": "Mauro Serrano",
        "required_evidence": "Logs de monitoreo + alertas documentadas", "required_evidenceEn": "Monitoring logs + documented alerts",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D3-F05", "domain": "D3 — KYC / AML / CFT", "domainEn": "D3 — KYC / AML / CFT",
        "jurisdiction": "FSCA", "source_regulation": "FICA S.29", "description": "Reportar Suspicious Transaction Reports (STRs) al FIC",
        "descriptionEn": "Report Suspicious Transaction Reports (STRs) to FIC", "frequency": "Por evento", "frequencyEn": "Per event",
        "specific_deadline": "Por evento", "specific_deadlineEn": "Per event", "responsible_person": "Mauro Serrano",
        "required_evidence": "Copia de STR radicado ante FIC", "required_evidenceEn": "Copy of STR filed with FIC",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D3-F06", "domain": "D3 — KYC / AML / CFT", "domainEn": "D3 — KYC / AML / CFT",
        "jurisdiction": "FSCA", "source_regulation": "FICA S.23", "description": "Conservar registros de clientes y transacciones por mínimo 5 años",
        "descriptionEn": "Retain client and transaction records for a minimum of 5 years", "frequency": "Continua", "frequencyEn": "Continuous",
        "specific_deadline": "Continua", "specific_deadlineEn": "Continuous", "responsible_person": "Mauro Serrano",
        "required_evidence": "Política de retención de registros implementada", "required_evidenceEn": "Record retention policy implemented",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D3-F07", "domain": "D3 — KYC / AML / CFT", "domainEn": "D3 — KYC / AML / CFT",
        "jurisdiction": "FSCA", "source_regulation": "FICA", "description": "Capacitación AML anual obligatoria para todo el personal",
        "descriptionEn": "Mandatory annual AML training for all staff", "frequency": "Anual", "frequencyEn": "Annual",
        "specific_deadline": "Anual", "specific_deadlineEn": "Annual", "responsible_person": "Mauro Serrano",
        "required_evidence": "Registros de asistencia + material de capacitación", "required_evidenceEn": "Attendance registers + training material",
        "next_due_date": "2026-11-15", "status": "En progreso", "notes": ""
    },
    # FSC Mauritius D3
    {
        "id": "D3-M01", "domain": "D3 — KYC / AML / CFT", "domainEn": "D3 — KYC / AML / CFT",
        "jurisdiction": "FSC Mauritius", "source_regulation": "FIAMLA 2002 / FSC AML Handbook", "description": "Implementar programa AML/CFT escrito conforme a FSC AML/CFT Handbook",
        "descriptionEn": "Implement written AML/CFT program according to FSC AML/CFT Handbook", "frequency": "Anual", "frequencyEn": "Annual",
        "specific_deadline": "Anual (revisión)", "specific_deadlineEn": "Annual (review)", "responsible_person": "Mauro Serrano",
        "required_evidence": "Manual AML/CFT actualizado, firmado por MLRO", "required_evidenceEn": "Updated AML/CFT manual, signed by MLRO",
        "next_due_date": "2026-12-15", "status": "En progreso", "notes": ""
    },
    {
        "id": "D3-M02", "domain": "D3 — KYC / AML / CFT", "domainEn": "D3 — KYC / AML / CFT",
        "jurisdiction": "FSC Mauritius", "source_regulation": "FIAMLA / CRS", "description": "Realizar CDD completo en onboarding de todos los clientes",
        "descriptionEn": "Perform full CDD during onboarding of all clients", "frequency": "Por evento", "frequencyEn": "Per event",
        "specific_deadline": "Por cliente", "specific_deadlineEn": "Per client", "responsible_person": "Mauro Serrano",
        "required_evidence": "Expediente de cliente con documentación CDD + TIN", "required_evidenceEn": "Client file with CDD documentation + TIN",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D3-M03", "domain": "D3 — KYC / AML / CFT", "domainEn": "D3 — KYC / AML / CFT",
        "jurisdiction": "FSC Mauritius", "source_regulation": "FIAML Regulations 2018", "description": "Identificar y aplicar EDD a PEPs, clientes de alto riesgo",
        "descriptionEn": "Identify and apply EDD to PEPs and high-risk clients", "frequency": "Por evento", "frequencyEn": "Per event",
        "specific_deadline": "Por cliente de alto riesgo", "specific_deadlineEn": "Per high-risk client", "responsible_person": "Mauro Serrano",
        "required_evidence": "Expediente EDD aprobado por MLRO", "required_evidenceEn": "EDD file approved by MLRO",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D3-M04", "domain": "D3 — KYC / AML / CFT", "domainEn": "D3 — KYC / AML / CFT",
        "jurisdiction": "FSC Mauritius", "source_regulation": "FIAMLA / FIAML Regulations", "description": "Screening de clientes contra listas de sanciones",
        "descriptionEn": "Screening of clients against sanctions lists", "frequency": "Continua", "frequencyEn": "Continuous",
        "specific_deadline": "Continua (onboarding + cambios)", "specific_deadlineEn": "Continuous (onboarding + updates)", "responsible_person": "Mauro Serrano",
        "required_evidence": "Logs de screening con fecha y resultado", "required_evidenceEn": "Screening logs with date and result",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D3-M05", "domain": "D3 — KYC / AML / CFT", "domainEn": "D3 — KYC / AML / CFT",
        "jurisdiction": "FSC Mauritius", "source_regulation": "FIAMLA S.17", "description": "Monitoreo continuo de transacciones",
        "descriptionEn": "Continuous monitoring of transactions", "frequency": "Continua", "frequencyEn": "Continuous",
        "specific_deadline": "Continua", "specific_deadlineEn": "Continuous", "responsible_person": "Mauro Serrano",
        "required_evidence": "Logs de monitoreo + alertas documentadas", "required_evidenceEn": "Monitoring logs + documented alerts",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D3-M06", "domain": "D3 — KYC / AML / CFT", "domainEn": "D3 — KYC / AML / CFT",
        "jurisdiction": "FSC Mauritius", "source_regulation": "FIAMLA S.14", "description": "Reportar STRs al Financial Intelligence Unit (FIU) de Mauritius",
        "descriptionEn": "Report STRs to the Financial Intelligence Unit (FIU) of Mauritius", "frequency": "Por evento", "frequencyEn": "Per event",
        "specific_deadline": "Por evento", "specific_deadlineEn": "Per event", "responsible_person": "Mauro Serrano",
        "required_evidence": "Copia de STR radicado + acuse FIU", "required_evidenceEn": "Copy of STR filed + FIU acknowledgment",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D3-M07", "domain": "D3 — KYC / AML / CFT", "domainEn": "D3 — KYC / AML / CFT",
        "jurisdiction": "FSC Mauritius", "source_regulation": "FIAMLA S.20", "description": "Conservar registros de clientes y transacciones por mínimo 7 años",
        "descriptionEn": "Retain client and transaction records for a minimum of 7 years", "frequency": "Continua", "frequencyEn": "Continuous",
        "specific_deadline": "Continua", "specific_deadlineEn": "Continuous", "responsible_person": "Mauro Serrano",
        "required_evidence": "Política de retención de registros implementada", "required_evidenceEn": "Record retention policy implemented",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D3-M08", "domain": "D3 — KYC / AML / CFT", "domainEn": "D3 — KYC / AML / CFT",
        "jurisdiction": "FSC Mauritius", "source_regulation": "FSC AML Handbook", "description": "Presentar AML/CFT Annual Report al FSC",
        "descriptionEn": "Submit AML/CFT Annual Report to FSC", "frequency": "Anual", "frequencyEn": "Annual",
        "specific_deadline": "Anual", "specific_deadlineEn": "Annual", "responsible_person": "Mauro Serrano",
        "required_evidence": "Reporte AML/CFT anual radicado", "required_evidenceEn": "Filed annual AML/CFT report",
        "next_due_date": "2027-04-30", "status": "En progreso", "notes": ""
    },
    {
        "id": "D3-M09", "domain": "D3 — KYC / AML / CFT", "domainEn": "D3 — KYC / AML / CFT",
        "jurisdiction": "FSC Mauritius", "source_regulation": "FSC AML Handbook", "description": "Capacitación AML anual para todo el personal",
        "descriptionEn": "Annual AML training for all staff", "frequency": "Anual", "frequencyEn": "Annual",
        "specific_deadline": "Anual", "specific_deadlineEn": "Annual", "responsible_person": "Mauro Serrano",
        "required_evidence": "Registros de asistencia + material", "required_evidenceEn": "Attendance registers + material",
        "next_due_date": "2026-11-30", "status": "En progreso", "notes": ""
    },
    {
        "id": "D3-M10", "domain": "D3 — KYC / AML / CFT", "domainEn": "D3 — KYC / AML / CFT",
        "jurisdiction": "FSC Mauritius", "source_regulation": "FSC AML Handbook", "description": "Realizar auditoría AML independiente anual",
        "descriptionEn": "Perform annual independent AML audit", "frequency": "Anual", "frequencyEn": "Annual",
        "specific_deadline": "Anual", "specific_deadlineEn": "Annual", "responsible_person": "Mauro Serrano",
        "required_evidence": "Informe de auditoría AML", "required_evidenceEn": "AML audit report",
        "next_due_date": "2027-05-31", "status": "En progreso", "notes": ""
    },
    {
        "id": "D3-M11", "domain": "D3 — KYC / AML / CFT", "domainEn": "D3 — KYC / AML / CFT",
        "jurisdiction": "FSC Mauritius", "source_regulation": "Common Reporting Standard / OECD", "description": "Presentar CRS Annual Return a la Mauritius Revenue Authority (MRA)",
        "descriptionEn": "Submit CRS Annual Return to Mauritius Revenue Authority (MRA)", "frequency": "Anual", "frequencyEn": "Annual",
        "specific_deadline": "Anual", "specific_deadlineEn": "Annual", "responsible_person": "Mauro Serrano",
        "required_evidence": "CRS Return radicado ante MRA", "required_evidenceEn": "CRS Return filed with MRA",
        "next_due_date": "2026-06-30", "status": "En riesgo", "notes": ""
    },

    # D4 — Protección al cliente
    {
        "id": "D4-F01", "domain": "D4 — Protección al cliente", "domainEn": "D4 — Client Protection",
        "jurisdiction": "FSCA", "source_regulation": "FAIS General Code of Conduct S.3", "description": "Segregar fondos de clientes en cuenta bancaria separada",
        "descriptionEn": "Segregate client funds in a separate bank account", "frequency": "Continua", "frequencyEn": "Continuous",
        "specific_deadline": "Continua", "specific_deadlineEn": "Continuous", "responsible_person": "Mauro Serrano",
        "required_evidence": "Estado de cuenta bancaria segregada", "required_evidenceEn": "Segregated bank account statement",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D4-F02", "domain": "D4 — Protección al cliente", "domainEn": "D4 — Client Protection",
        "jurisdiction": "FSCA", "source_regulation": "FAIS General Code", "description": "Realizar reconciliación de cuentas de clientes (mensual mínimo)",
        "descriptionEn": "Perform client account reconciliation (minimum monthly)", "frequency": "Mensual", "frequencyEn": "Monthly",
        "specific_deadline": "Mensual", "specific_deadlineEn": "Monthly", "responsible_person": "Mauro Serrano",
        "required_evidence": "Reportes de reconciliación firmados", "required_evidenceEn": "Signed reconciliation reports",
        "next_due_date": "2026-07-10", "status": "En progreso", "notes": ""
    },
    {
        "id": "D4-F03", "domain": "D4 — Protección al cliente", "domainEn": "D4 — Client Protection",
        "jurisdiction": "FSCA", "source_regulation": "FAIS General Code / ODP Conduct Standard 2018", "description": "Garantizar best execution en órdenes de clientes",
        "descriptionEn": "Ensure best execution on client orders", "frequency": "Continua", "frequencyEn": "Continuous",
        "specific_deadline": "Continua", "specific_deadlineEn": "Continuous", "responsible_person": "Mauro Serrano",
        "required_evidence": "Política de Best Execution documentada + logs", "required_evidenceEn": "Documented Best Execution policy + logs",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D4-F04", "domain": "D4 — Protección al cliente", "domainEn": "D4 — Client Protection",
        "jurisdiction": "FSCA", "source_regulation": "FAIS General Code S.7", "description": "Divulgar riesgos a clientes antes de operar (Risk Disclosure)",
        "descriptionEn": "Disclose risks to clients before trading (Risk Disclosure)", "frequency": "Por evento", "frequencyEn": "Per event",
        "specific_deadline": "Por cliente (onboarding)", "specific_deadlineEn": "Per client (onboarding)", "responsible_person": "Mauro Serrano",
        "required_evidence": "Formulario de Risk Disclosure firmado por cliente", "required_evidenceEn": "Risk Disclosure form signed by client",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D4-F05", "domain": "D4 — Protección al cliente", "domainEn": "D4 — Client Protection",
        "jurisdiction": "FSCA", "source_regulation": "FAIS General Code S.3", "description": "Implementar política y procedimiento de gestión de quejas de clientes",
        "descriptionEn": "Implement client complaint management policy and procedure", "frequency": "Anual", "frequencyEn": "Annual",
        "specific_deadline": "Por evento / revisión anual", "specific_deadlineEn": "Per event / annual review", "responsible_person": "Mauro Serrano",
        "required_evidence": "Registro de quejas + tiempos de respuesta", "required_evidenceEn": "Complaints register + response times",
        "next_due_date": "2026-12-15", "status": "En progreso", "notes": ""
    },
    {
        "id": "D4-F06", "domain": "D4 — Protección al cliente", "domainEn": "D4 — Client Protection",
        "jurisdiction": "FSCA", "source_regulation": "FAIS General Code", "description": "Proveer estados de cuenta periódicos a clientes",
        "descriptionEn": "Provide periodic account statements to clients", "frequency": "Mensual", "frequencyEn": "Monthly",
        "specific_deadline": "Mensual/Trimestral", "specific_deadlineEn": "Monthly/Quarterly", "responsible_person": "Mauro Serrano",
        "required_evidence": "Evidencia de envío de estados de cuenta", "required_evidenceEn": "Evidence of sending account statements",
        "next_due_date": "2026-06-30", "status": "En riesgo", "notes": ""
    },
    # FSC Mauritius D4
    {
        "id": "D4-M01", "domain": "D4 — Protección al cliente", "domainEn": "D4 — Client Protection",
        "jurisdiction": "FSC Mauritius", "source_regulation": "FSC Safeguarding of Client Assets Rules", "description": "Segregar fondos de clientes en cuenta(s) bancaria(s) separadas",
        "descriptionEn": "Segregate client funds in separate bank account(s)", "frequency": "Continua", "frequencyEn": "Continuous",
        "specific_deadline": "Continua", "specific_deadlineEn": "Continuous", "responsible_person": "Mauro Serrano",
        "required_evidence": "Estado de cuenta bancaria segregada en Mauritius", "required_evidenceEn": "Segregated bank account statement in Mauritius",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D4-M02", "domain": "D4 — Protección al cliente", "domainEn": "D4 — Client Protection",
        "jurisdiction": "FSC Mauritius", "source_regulation": "FSC Client Money Rules", "description": "Realizar reconciliación de cuentas de clientes (mensual)",
        "descriptionEn": "Perform client account reconciliation (monthly)", "frequency": "Mensual", "frequencyEn": "Monthly",
        "specific_deadline": "Mensual", "specific_deadlineEn": "Monthly", "responsible_person": "Mauro Serrano",
        "required_evidence": "Reportes de reconciliación firmados", "required_evidenceEn": "Signed reconciliation reports",
        "next_due_date": "2026-07-05", "status": "En progreso", "notes": ""
    },
    {
        "id": "D4-M03", "domain": "D4 — Protección al cliente", "domainEn": "D4 — Client Protection",
        "jurisdiction": "FSC Mauritius", "source_regulation": "Securities Act 2005 S.56", "description": "Garantizar best execution",
        "descriptionEn": "Ensure best execution", "frequency": "Continua", "frequencyEn": "Continuous",
        "specific_deadline": "Continua", "specific_deadlineEn": "Continuous", "responsible_person": "Mauro Serrano",
        "required_evidence": "Política de Best Execution documentada", "required_evidenceEn": "Documented Best Execution policy",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D4-M04", "domain": "D4 — Protección al cliente", "domainEn": "D4 — Client Protection",
        "jurisdiction": "FSC Mauritius", "source_regulation": "FSC Licensing Conditions", "description": "Divulgar riesgos a clientes (Risk Disclosure)",
        "descriptionEn": "Disclose risks to clients (Risk Disclosure)", "frequency": "Por evento", "frequencyEn": "Per event",
        "specific_deadline": "Por cliente (onboarding)", "specific_deadlineEn": "Per client (onboarding)", "responsible_person": "Mauro Serrano",
        "required_evidence": "Formulario de Risk Disclosure firmado", "required_evidenceEn": "Signed Risk Disclosure form",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D4-M05", "domain": "D4 — Protección al cliente", "domainEn": "D4 — Client Protection",
        "jurisdiction": "FSC Mauritius", "source_regulation": "FSC Conduct Requirements", "description": "Implementar política de gestión de quejas",
        "descriptionEn": "Implement complaint management policy", "frequency": "Anual", "frequencyEn": "Annual",
        "specific_deadline": "Por evento / revisión anual", "specific_deadlineEn": "Per event / annual review", "responsible_person": "Mauro Serrano",
        "required_evidence": "Registro de quejas + resoluciones", "required_evidenceEn": "Complaints register + resolutions",
        "next_due_date": "2026-12-15", "status": "En progreso", "notes": ""
    },

    # D5 — Formación y competencia del equipo
    {
        "id": "D5-F01", "domain": "D5 — Formación y competencia del equipo", "domainEn": "D5 — Staff Training and Competence",
        "jurisdiction": "FSCA", "source_regulation": "Board Notice 194/2017 Cap.2", "description": "Key Individual aprueba Examen Regulatorio RE1",
        "descriptionEn": "Key Individual passes Regulatory Exam RE1", "frequency": "Única", "frequencyEn": "Single",
        "specific_deadline": "Única (por KI)", "specific_deadlineEn": "Single (per KI)", "responsible_person": "Mauro Serrano",
        "required_evidence": "Certificado RE1 por KI", "required_evidenceEn": "RE1 certificate per KI",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D5-F02", "domain": "D5 — Formación y competencia del equipo", "domainEn": "D5 — Staff Training and Competence",
        "jurisdiction": "FSCA", "source_regulation": "BN 194 Cap.2", "description": "Representantes aprueban Examen Regulatorio RE5",
        "descriptionEn": "Representatives pass Regulatory Exam RE5", "frequency": "Única", "frequencyEn": "Single",
        "specific_deadline": "Única (por representante)", "specific_deadlineEn": "Single (per representative)", "responsible_person": "Mauro Serrano",
        "required_evidence": "Certificado RE5 por representante", "required_evidenceEn": "RE5 certificate per representative",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D5-F03", "domain": "D5 — Formación y competencia del equipo", "domainEn": "D5 — Staff Training and Competence",
        "jurisdiction": "FSCA", "source_regulation": "BN 194 Cap.2", "description": "Todos los KIs y representantes obtienen calificación reconocida FSCA",
        "descriptionEn": "All KIs and representatives obtain FSCA recognized qualification", "frequency": "Única", "frequencyEn": "Single",
        "specific_deadline": "Única (por persona)", "specific_deadlineEn": "Single (per person)", "responsible_person": "Mauro Serrano",
        "required_evidence": "Certificado de calificación reconocida", "required_evidenceEn": "Recognized qualification certificate",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D5-F04", "domain": "D5 — Formación y competencia del equipo", "domainEn": "D5 — Staff Training and Competence",
        "jurisdiction": "FSCA", "source_regulation": "BN 194 Cap.2", "description": "Completar Product Specific Training (PST) antes de prestar servicios",
        "descriptionEn": "Complete Product Specific Training (PST) before rendering services", "frequency": "Por evento", "frequencyEn": "Per event",
        "specific_deadline": "Por producto/persona", "specific_deadlineEn": "Per product/person", "responsible_person": "Mauro Serrano",
        "required_evidence": "Certificado PST por producto y persona", "required_evidenceEn": "PST certificate per product and person",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D5-F05", "domain": "D5 — Formación y competencia del equipo", "domainEn": "D5 — Staff Training and Competence",
        "jurisdiction": "FSCA", "source_regulation": "BN 194 Cap.2", "description": "Completar CPD mínimo 18 horas anuales — límite 31 de mayo",
        "descriptionEn": "Complete CPD minimum 18 hours annually — limit May 31", "frequency": "Anual", "frequencyEn": "Annual",
        "specific_deadline": "Anual (límite 31 de mayo)", "specific_deadlineEn": "Annual (limit May 31)", "responsible_person": "Mauro Serrano",
        "required_evidence": "Registros de CPD por persona", "required_evidenceEn": "CPD records per person",
        "next_due_date": "2027-05-31", "status": "Compliant", "notes": ""
    },
    {
        "id": "D5-F06", "domain": "D5 — Formación y competencia del equipo", "domainEn": "D5 — Staff Training and Competence",
        "jurisdiction": "FSCA", "source_regulation": "BN 194", "description": "Documentar historial de capacitación de cada KI y representante",
        "descriptionEn": "Document training history of each KI and representative", "frequency": "Continua", "frequencyEn": "Continuous",
        "specific_deadline": "Continua", "specific_deadlineEn": "Continuous", "responsible_person": "Mauro Serrano",
        "required_evidence": "Expedientes individuales de capacitación actualizados", "required_evidenceEn": "Updated individual training files",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    # FSC Mauritius D5
    {
        "id": "D5-M01", "domain": "D5 — Formación y competencia del equipo", "domainEn": "D5 — Staff Training and Competence",
        "jurisdiction": "FSC Mauritius", "source_regulation": "Securities Act 2005 / FSC Licensing Criteria", "description": "Verificar fit & proper de todos los directores, Compliance Officer y MLRO",
        "descriptionEn": "Verify fit & proper status of all directors, Compliance Officer, and MLRO", "frequency": "Anual", "frequencyEn": "Annual",
        "specific_deadline": "Por evento (nombramiento) + revisión anual", "specific_deadlineEn": "Per event (appointment) + annual review", "responsible_person": "Mauro Serrano",
        "required_evidence": "Personal Questionnaire Form + CDD completo", "required_evidenceEn": "Personal Questionnaire Form + full CDD",
        "next_due_date": "2027-04-15", "status": "En progreso", "notes": ""
    },
    {
        "id": "D5-M02", "domain": "D5 — Formación y competencia del equipo", "domainEn": "D5 — Staff Training and Competence",
        "jurisdiction": "FSC Mauritius", "source_regulation": "FIAMLA / FSC AML Handbook", "description": "Capacitación AML anual para todos los empleados",
        "descriptionEn": "Annual AML training for all employees", "frequency": "Anual", "frequencyEn": "Annual",
        "specific_deadline": "Anual", "specific_deadlineEn": "Annual", "responsible_person": "Mauro Serrano",
        "required_evidence": "Registros de asistencia firmados", "required_evidenceEn": "Signed attendance registers",
        "next_due_date": "2026-11-30", "status": "En progreso", "notes": ""
    },

    # D6 — Reportes periódicos a reguladores
    {
        "id": "D6-F01", "domain": "D6 — Reportes periódicos a reguladores", "domainEn": "D6 — Regulatory Reporting",
        "jurisdiction": "FSCA", "source_regulation": "FAIS Act S.19", "description": "Presentar estados financieros anuales auditados ante FSCA",
        "descriptionEn": "Submit audited annual financial statements to FSCA", "frequency": "Anual", "frequencyEn": "Annual",
        "specific_deadline": "Dentro de 45 días del cierre", "specific_deadlineEn": "Within 45 days of closing", "responsible_person": "Mauro Serrano",
        "required_evidence": "Estados financieros radicados + acuse FSCA", "required_evidenceEn": "Filed financial statements + FSCA acknowledgment",
        "next_due_date": "2026-10-31", "status": "En progreso", "notes": ""
    },
    {
        "id": "D6-F02", "domain": "D6 — Reportes periódicos a reguladores", "domainEn": "D6 — Regulatory Reporting",
        "jurisdiction": "FSCA", "source_regulation": "BN 194", "description": "Presentar Form A (Liquidity Calculation)",
        "descriptionEn": "Submit Form A (Liquidity Calculation)", "frequency": "Semestral", "frequencyEn": "Semi-annual",
        "specific_deadline": "Semestral dentro de 45 días del cierre", "specific_deadlineEn": "Semi-annually within 45 days of closing", "responsible_person": "Mauro Serrano",
        "required_evidence": "Form A radicado + acuse", "required_evidenceEn": "Form A filed + acknowledgment",
        "next_due_date": "2026-07-15", "status": "En progreso", "notes": ""
    },
    {
        "id": "D6-F03", "domain": "D6 — Reportes periódicos a reguladores", "domainEn": "D6 — Regulatory Reporting",
        "jurisdiction": "FSCA", "source_regulation": "BN 194 Cap.6", "description": "Notificar Early Warning al FSCA",
        "descriptionEn": "Notify Early Warning to FSCA", "frequency": "Por evento", "frequencyEn": "Per event",
        "specific_deadline": "Inmediatamente", "specific_deadlineEn": "Immediately", "responsible_person": "Mauro Serrano",
        "required_evidence": "Notificación enviada + timestamp", "required_evidenceEn": "Notification sent + timestamp",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D6-F04", "domain": "D6 — Reportes periódicos a reguladores", "domainEn": "D6 — Regulatory Reporting",
        "jurisdiction": "FSCA", "source_regulation": "FAIS Act S.14", "description": "Notificar FSCA ante cambios materiales",
        "descriptionEn": "Notify FSCA of material changes", "frequency": "Por evento", "frequencyEn": "Per event",
        "specific_deadline": "Antes de implementar el cambio", "specific_deadlineEn": "Before implementing the change", "responsible_person": "Mauro Serrano",
        "required_evidence": "Notificación con acuse", "required_evidenceEn": "Notification with acknowledgment",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    # FSC Mauritius D6
    {
        "id": "D6-M01", "domain": "D6 — Reportes periódicos a reguladores", "domainEn": "D6 — Regulatory Reporting",
        "jurisdiction": "FSC Mauritius", "source_regulation": "Securities Act 2005 S.20", "description": "Presentar estados financieros anuales auditados ante FSC",
        "descriptionEn": "Submit audited annual financial statements to FSC", "frequency": "Anual", "frequencyEn": "Annual",
        "specific_deadline": "Dentro de 6 meses del cierre", "specific_deadlineEn": "Within 6 months of closing", "responsible_person": "Mauro Serrano",
        "required_evidence": "Reporte anual radicado ante FSC", "required_evidenceEn": "Annual report filed with FSC",
        "next_due_date": "2026-12-31", "status": "En progreso", "notes": ""
    },
    {
        "id": "D6-M02", "domain": "D6 — Reportes periódicos a reguladores", "domainEn": "D6 — Regulatory Reporting",
        "jurisdiction": "FSC Mauritius", "source_regulation": "SEM Financial Reporting Rules 2010", "description": "Presentar Capital Adequacy Return trimestral ante SEM",
        "descriptionEn": "Submit quarterly Capital Adequacy Return to SEM", "frequency": "Trimestral", "frequencyEn": "Quarterly",
        "specific_deadline": "Dentro de 10 días hábiles del cierre", "specific_deadlineEn": "Within 10 business days of closing", "responsible_person": "Mauro Serrano",
        "required_evidence": "Capital Adequacy Return radicado", "required_evidenceEn": "Filed Capital Adequacy Return",
        "next_due_date": "2026-06-25", "status": "En progreso", "notes": ""
    },
    {
        "id": "D6-M03", "domain": "D6 — Reportes periódicos a reguladores", "domainEn": "D6 — Regulatory Reporting",
        "jurisdiction": "FSC Mauritius", "source_regulation": "FSC Licensing Conditions", "description": "Presentar Quarterly Financial Return ante FSC",
        "descriptionEn": "Submit Quarterly Financial Return to FSC", "frequency": "Trimestral", "frequencyEn": "Quarterly",
        "specific_deadline": "Dentro de 1 de mes del cierre", "specific_deadlineEn": "Within 1 month of closing", "responsible_person": "Mauro Serrano",
        "required_evidence": "Reporte trimestral radicado", "required_evidenceEn": "Filed quarterly report",
        "next_due_date": "2026-07-31", "status": "En progreso", "notes": ""
    },
    {
        "id": "D6-M04", "domain": "D6 — Reportes periódicos a reguladores", "domainEn": "D6 — Regulatory Reporting",
        "jurisdiction": "FSC Mauritius", "source_regulation": "Companies Act 2001", "description": "Presentar Annual Return ante Companies Division (Registrar)",
        "descriptionEn": "Submit Annual Return to Companies Division (Registrar)", "frequency": "Anual", "frequencyEn": "Annual",
        "specific_deadline": "Aniversario de incorporación", "specific_deadlineEn": "Incorporation anniversary", "responsible_person": "Mauro Serrano",
        "required_evidence": "Annual Return radicado", "required_evidenceEn": "Filed Annual Return",
        "next_due_date": "2026-09-30", "status": "En progreso", "notes": ""
    },
    {
        "id": "D6-M05", "domain": "D6 — Reportes periódicos a reguladores", "domainEn": "D6 — Regulatory Reporting",
        "jurisdiction": "FSC Mauritius", "source_regulation": "FSC Consolidated Licensing & Fees Rules", "description": "Pagar Annual Licence Fee FSC",
        "descriptionEn": "Pay Annual License Fee FSC", "frequency": "Anual", "frequencyEn": "Annual",
        "specific_deadline": "Aniversario de la licencia", "specific_deadlineEn": "License anniversary", "responsible_person": "Mauro Serrano",
        "required_evidence": "Comprobante de pago", "required_evidenceEn": "Proof of payment",
        "next_due_date": "2026-08-31", "status": "En progreso", "notes": ""
    },
    {
        "id": "D6-M06", "domain": "D6 — Reportes periódicos a reguladores", "domainEn": "D6 — Regulatory Reporting",
        "jurisdiction": "FSC Mauritius", "source_regulation": "FSC AML Handbook", "description": "Presentar AML/CFT Annual Report",
        "descriptionEn": "Submit AML/CFT Annual Report", "frequency": "Anual", "frequencyEn": "Annual",
        "specific_deadline": "Según indicación FSC", "specific_deadlineEn": "According to FSC request", "responsible_person": "Mauro Serrano",
        "required_evidence": "Reporte AML radicado", "required_evidenceEn": "Filed AML report",
        "next_due_date": "2026-12-15", "status": "En progreso", "notes": ""
    },
    {
        "id": "D6-M07", "domain": "D6 — Reportes periódicos a reguladores", "domainEn": "D6 — Regulatory Reporting",
        "jurisdiction": "FSC Mauritius", "source_regulation": "CRS / OECD", "description": "Presentar CRS Annual Return ante MRA",
        "descriptionEn": "Submit CRS Annual Return to MRA", "frequency": "Anual", "frequencyEn": "Annual",
        "specific_deadline": "Según calendario MRA", "specific_deadlineEn": "According to MRA calendar", "responsible_person": "Mauro Serrano",
        "required_evidence": "CRS Return radicado", "required_evidenceEn": "Filed CRS Return",
        "next_due_date": "2026-06-30", "status": "En progreso", "notes": ""
    },
    {
        "id": "D6-M08", "domain": "D6 — Reportes periódicos a reguladores", "domainEn": "D6 — Regulatory Reporting",
        "jurisdiction": "FSC Mauritius", "source_regulation": "Securities Act 2005", "description": "Notificar FSC ante cambios materiales",
        "descriptionEn": "Notify FSC of material changes", "frequency": "Por evento", "frequencyEn": "Per event",
        "specific_deadline": "Inmediatamente", "specific_deadlineEn": "Immediately", "responsible_person": "Mauro Serrano",
        "required_evidence": "Notificación con acuse FSC", "required_evidenceEn": "Notification with FSC acknowledgment",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D6-M09", "domain": "D6 — Reportes periódicos a reguladores", "domainEn": "D6 — Regulatory Reporting",
        "jurisdiction": "FSC Mauritius", "source_regulation": "FSC GBC Substance Requirements", "description": "Presentar Annual Substance Filing",
        "descriptionEn": "Submit Annual Substance Filing", "frequency": "Anual", "frequencyEn": "Annual",
        "specific_deadline": "Con el reporte anual", "specific_deadlineEn": "With the annual report", "responsible_person": "Mauro Serrano",
        "required_evidence": "Substance filing completado", "required_evidenceEn": "Substance filing completed",
        "next_due_date": "2026-12-31", "status": "En progreso", "notes": ""
    },

    # D7 — Tecnología, datos y ciberseguridad
    {
        "id": "D7-01", "domain": "D7 — Tecnología, datos y ciberseguridad", "domainEn": "D7 — Technology, Data and Cybersecurity",
        "jurisdiction": "Ambas", "source_regulation": "FAIS / FSC / ISO 27001", "description": "Implementar política de seguridad de la información",
        "descriptionEn": "Implement information security policy", "frequency": "Anual", "frequencyEn": "Annual",
        "specific_deadline": "Anual (revisión)", "specific_deadlineEn": "Annual (review)", "responsible_person": "Mauro Serrano",
        "required_evidence": "Política aprobada y vigente", "required_evidenceEn": "Approved and active policy",
        "next_due_date": "2026-10-15", "status": "En progreso", "notes": ""
    },
    {
        "id": "D7-02", "domain": "D7 — Tecnología, datos y ciberseguridad", "domainEn": "D7 — Technology, Data and Cybersecurity",
        "jurisdiction": "Ambas", "source_regulation": "FAIS / FSC / ISO 27001 A.9", "description": "Controlar acceso a sistemas críticos (principio de mínimo privilegio)",
        "descriptionEn": "Control access to critical systems (least privilege principle)", "frequency": "Continua", "frequencyEn": "Continuous",
        "specific_deadline": "Continua", "specific_deadlineEn": "Continuous", "responsible_person": "Mauro Serrano",
        "required_evidence": "Matriz de accesos documentada", "required_evidenceEn": "Documented access matrix",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D7-03", "domain": "D7 — Tecnología, datos y ciberseguridad", "domainEn": "D7 — Technology, Data and Cybersecurity",
        "jurisdiction": "Ambas", "source_regulation": "FAIS / FSC", "description": "Implementar backup y plan de recuperación ante desastres",
        "descriptionEn": "Implement backup and disaster recovery plan", "frequency": "Anual", "frequencyEn": "Annual",
        "specific_deadline": "Anual (prueba)", "specific_deadlineEn": "Annual (testing)", "responsible_person": "Mauro Serrano",
        "required_evidence": "Evidencia de prueba de recuperación", "required_evidenceEn": "Recovery test evidence",
        "next_due_date": "2027-04-30", "status": "En progreso", "notes": ""
    },
    {
        "id": "D7-04", "domain": "D7 — Tecnología, datos y ciberseguridad", "domainEn": "D7 — Technology, Data and Cybersecurity",
        "jurisdiction": "Ambas", "source_regulation": "ISO 27001 A.12", "description": "Gestionar vulnerabilidades y parches de sistemas",
        "descriptionEn": "Manage system vulnerabilities and patches", "frequency": "Continua", "frequencyEn": "Continuous",
        "specific_deadline": "Continua / Trimestral", "specific_deadlineEn": "Continuous / Quarterly", "responsible_person": "Mauro Serrano",
        "required_evidence": "Log de gestión de parches", "required_evidenceEn": "Patch management log",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D7-05", "domain": "D7 — Tecnología, datos y ciberseguridad", "domainEn": "D7 — Technology, Data and Cybersecurity",
        "jurisdiction": "Ambas", "source_regulation": "POPIA / Data Protection Act 2017", "description": "Proteger datos personales de clientes (privacidad)",
        "descriptionEn": "Protect client personal data (privacy)", "frequency": "Continua", "frequencyEn": "Continuous",
        "specific_deadline": "Continua", "specific_deadlineEn": "Continuous", "responsible_person": "Mauro Serrano",
        "required_evidence": "Política de privacidad + registro de tratamiento de datos", "required_evidenceEn": "Privacy policy + data processing registry",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D7-06", "domain": "D7 — Tecnología, datos y ciberseguridad", "domainEn": "D7 — Technology, Data and Cybersecurity",
        "jurisdiction": "FSCA", "source_regulation": "POPIA S.55", "description": "Nombrar Information Officer (POPIA - Sudáfrica)",
        "descriptionEn": "Appoint Information Officer (POPIA - South Africa)", "frequency": "Por evento", "frequencyEn": "Per event",
        "specific_deadline": "Por evento", "specific_deadlineEn": "Per event", "responsible_person": "Mauro Serrano",
        "required_evidence": "Designación registrada ante Information Regulator", "required_evidenceEn": "Designation registered with the Information Regulator",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D7-07", "domain": "D7 — Tecnología, datos y ciberseguridad", "domainEn": "D7 — Technology, Data and Cybersecurity",
        "jurisdiction": "Ambas", "source_regulation": "POPIA / DPA Mauritius", "description": "Reportar brechas de datos personales al regulador competente",
        "descriptionEn": "Report personal data breaches to the competent regulator", "frequency": "Por evento", "frequencyEn": "Per event",
        "specific_deadline": "Por evento", "specific_deadlineEn": "Per event", "responsible_person": "Mauro Serrano",
        "required_evidence": "Notificación de brecha enviada", "required_evidenceEn": "Breach notification sent",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },
    {
        "id": "D7-08", "domain": "D7 — Tecnología, datos y ciberseguridad", "domainEn": "D7 — Technology, Data and Cybersecurity",
        "jurisdiction": "Ambas", "source_regulation": "FAIS / FSC / ISO 27001 A.12", "description": "Mantener logs de auditoría de sistemas",
        "descriptionEn": "Maintain system audit logs", "frequency": "Continua", "frequencyEn": "Continuous",
        "specific_deadline": "Continua", "specific_deadlineEn": "Continuous", "responsible_person": "Mauro Serrano",
        "required_evidence": "Logs de auditoría disponibles y protegidos", "required_evidenceEn": "Audit logs available and protected",
        "next_due_date": None, "status": "Compliant", "notes": ""
    },

    # D8 — Vigilancia y gestión de cambios normativos
    {
        "id": "D8-01", "domain": "D8 — Vigilancia y gestión de cambios normativos", "domainEn": "D8 — Regulatory Change Monitoring",
        "jurisdiction": "FSCA", "source_regulation": "Interno", "description": "Monitorear publicaciones FSCA: Notices, Conduct Standards, Board Notices",
        "descriptionEn": "Monitor FSCA publications: Notices, Conduct Standards, Board Notices", "frequency": "Semanal", "frequencyEn": "Weekly",
        "specific_deadline": "Semanal", "specific_deadlineEn": "Weekly", "responsible_person": "Mauro Serrano",
        "required_evidence": "Clasificación de impacto + resumen ejecutivo", "required_evidenceEn": "Impact classification + executive summary",
        "next_due_date": "2026-06-26", "status": "En progreso", "notes": ""
    },
    {
        "id": "D8-02", "domain": "D8 — Vigilancia y gestión de cambios normativos", "domainEn": "D8 — Regulatory Change Monitoring",
        "jurisdiction": "FSC Mauritius", "source_regulation": "Interno", "description": "Monitorear publicaciones FSC Mauritius: Communiqués, Circulars, FSC Rules",
        "descriptionEn": "Monitor FSC Mauritius publications: Communiqués, Circulars, FSC Rules", "frequency": "Semanal", "frequencyEn": "Weekly",
        "specific_deadline": "Semanal", "specific_deadlineEn": "Weekly", "responsible_person": "Mauro Serrano",
        "required_evidence": "Clasificación de impacto + resumen ejecutivo", "required_evidenceEn": "Impact classification + executive summary",
        "next_due_date": "2026-06-26", "status": "En progreso", "notes": ""
    },
    {
        "id": "D8-03", "domain": "D8 — Vigilancia y gestión de cambios normativos", "domainEn": "D8 — Regulatory Change Monitoring",
        "jurisdiction": "FSC Mauritius", "source_regulation": "Interno", "description": "Monitorear cambios en FIAMLA y FIAML Regulations",
        "descriptionEn": "Monitor changes in FIAMLA and FIAML Regulations", "frequency": "Mensual", "frequencyEn": "Monthly",
        "specific_deadline": "Mensual", "specific_deadlineEn": "Monthly", "responsible_person": "Mauro Serrano",
        "required_evidence": "Actualizar programa AML/CFT si aplica", "required_evidenceEn": "Update AML/CFT program if applicable",
        "next_due_date": "2026-07-15", "status": "En progreso", "notes": ""
    },
    {
        "id": "D8-04", "domain": "D8 — Vigilancia y gestión de cambios normativos", "domainEn": "D8 — Regulatory Change Monitoring",
        "jurisdiction": "FSCA", "source_regulation": "Interno", "description": "Monitorear cambios en FICA (Sudáfrica) y FIC Guidelines",
        "descriptionEn": "Monitor changes in FICA (South Africa) and FIC Guidelines", "frequency": "Mensual", "frequencyEn": "Monthly",
        "specific_deadline": "Mensual", "specific_deadlineEn": "Monthly", "responsible_person": "Mauro Serrano",
        "required_evidence": "Actualizar programa AML/CFT si aplica", "required_evidenceEn": "Update AML/CFT program if applicable",
        "next_due_date": "2026-07-15", "status": "En progreso", "notes": ""
    },
    {
        "id": "D8-05", "domain": "D8 — Vigilancia y gestión de cambios normativos", "domainEn": "D8 — Regulatory Change Monitoring",
        "jurisdiction": "Ambas", "source_regulation": "Interno", "description": "Monitorear FATF / OECD (estándares internacionales AML)",
        "descriptionEn": "Monitor FATF / OECD (international AML standards)", "frequency": "Trimestral", "frequencyEn": "Quarterly",
        "specific_deadline": "Trimestral", "specific_deadlineEn": "Quarterly", "responsible_person": "Mauro Serrano",
        "required_evidence": "Evaluar impacto en políticas AML", "required_evidenceEn": "Assess impact on AML policies",
        "next_due_date": "2026-09-30", "status": "En progreso", "notes": ""
    },
    {
        "id": "D8-06", "domain": "D8 — Vigilancia y gestión de cambios normativos", "domainEn": "D8 — Regulatory Change Monitoring",
        "jurisdiction": "Ambas", "source_regulation": "Interno", "description": "Registrar en historial todos los cambios normativos detectados",
        "descriptionEn": "Record all detected regulatory changes in history", "frequency": "Por evento", "frequencyEn": "Per event",
        "specific_deadline": "Por evento", "specific_deadlineEn": "Per event", "responsible_person": "Mauro Serrano",
        "required_evidence": "Entrada en historial de cambios normativos", "required_evidenceEn": "Regulatory changes history log entry",
        "next_due_date": None, "status": "Compliant", "notes": ""
    }
]

# Post-processing to match the database default fields
IN_MEMORY_CONTROLS = []
for c in RAW_CONTROLS:
    IN_MEMORY_CONTROLS.append({
        "id": c["id"],
        "domain": c["domain"],
        "domainEn": c["domainEn"],
        "jurisdiction": c["jurisdiction"],
        "source_regulation": c["source_regulation"],
        "description": c["description"],
        "descriptionEn": c["descriptionEn"],
        "frequency": c["frequency"],
        "frequencyEn": c["frequencyEn"],
        "specific_deadline": c["specific_deadline"],
        "specific_deadlineEn": c.get("specific_deadlineEn", c["specific_deadline"]),
        "responsible_person": c["responsible_person"],
        "required_evidence": c["required_evidence"],
        "required_evidenceEn": c["required_evidenceEn"],
        "next_due_date": c["next_due_date"],
        "status": c["status"],
        "maturity_level": 1,
        "maturity_justification": "Estado inicial — pendiente de primera evaluación",
        "maturity_justificationEn": "Initial state — pending first assessment",
        "notes": c["notes"] or None,
        "evidence_file_path": None,
        "last_reviewed": str(date.today())
    })

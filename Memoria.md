# Memoria
## Decisiones técnicas — Stoic FX Compliance Management System

> Este archivo documenta decisiones de implementación, patrones elegidos y problemas resueltos.
> Antigravity lo actualiza cuando toma una decisión técnica relevante.
> NO contiene conocimiento del dominio (eso va en Contexto.md).

---

## Arquitectura general del sistema

```
┌─────────────────────────────────────────────┐
│              FRONTEND (Vercel)               │
│         React + TypeScript + Tailwind        │
│                                              │
│  Dashboard  │  Regulatory  │  Calendar       │
│             │  Universe    │                 │
│  Evidence   │  Maturity    │  Regulatory     │
│  Repository │  Assessment  │  Intelligence   │
└──────────────────┬──────────────────────────┘
                   │ API calls
┌──────────────────▼──────────────────────────┐
│              BACKEND (FastAPI)               │
│         Vercel Functions o servidor         │
│                                              │
│  Auth middleware (Supabase JWT)              │
│  Business logic (compliance rules)           │
│  Cron jobs (D8 monitor, alertas)             │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│              SUPABASE                        │
│  PostgreSQL  │  Storage  │  Auth             │
│  (datos)     │  (evidenc │  (usuarios)       │
│              │  ias)     │                   │
└─────────────────────────────────────────────┘
```

---

## Modelo de datos — tablas principales

### `regulatory_controls` (Regulatory Universe)
```sql
id                  TEXT PRIMARY KEY       -- Ej: "D1-F01"
domain              TEXT NOT NULL          -- Ej: "D1 — Licenciamiento"
jurisdiction        TEXT NOT NULL          -- "FSCA" | "FSC Mauritius" | "Both"
entity              TEXT                   -- Entidad legal específica (para multi-entidad)
source_regulation   TEXT                   -- Ej: "FAIS Act S.8"
description         TEXT NOT NULL
frequency           TEXT                   -- "Annual" | "Quarterly" | "Continuous" | "Per event"
specific_deadline   TEXT                   -- Ej: "Within 4 months of year end"
responsible_person  TEXT
required_evidence   TEXT
next_due_date       DATE
status              TEXT                   -- "Compliant" | "In Progress" | "At Risk" | "Overdue"
maturity_level      INTEGER CHECK (maturity_level BETWEEN 0 AND 5)
maturity_target     INTEGER CHECK (maturity_target BETWEEN 0 AND 5)
maturity_justification TEXT
evidence_file_path  TEXT
last_reviewed       DATE
notes               TEXT
created_at          TIMESTAMPTZ DEFAULT NOW()
updated_at          TIMESTAMPTZ DEFAULT NOW()
```

### `evidence_files`
```sql
id                  UUID PRIMARY KEY DEFAULT gen_random_uuid()
control_id          TEXT REFERENCES regulatory_controls(id)
file_name           TEXT NOT NULL
file_path           TEXT NOT NULL          -- Supabase Storage path
uploaded_by         UUID REFERENCES auth.users(id)
approved_by         UUID REFERENCES auth.users(id)
status              TEXT                   -- "Pending" | "Approved" | "Rejected"
validity_date       DATE                   -- Hasta cuándo es válida la evidencia
notes               TEXT
created_at          TIMESTAMPTZ DEFAULT NOW()
```

### `regulatory_changes` (D8 — Regulatory Intelligence)
```sql
id                  UUID PRIMARY KEY DEFAULT gen_random_uuid()
jurisdiction        TEXT NOT NULL
source_url          TEXT
title               TEXT NOT NULL
summary             TEXT
impact_level        TEXT                   -- "High" | "Medium" | "Low"
detected_at         TIMESTAMPTZ
reviewed_by         UUID REFERENCES auth.users(id)
action_taken        TEXT
affects_controls    TEXT[]                 -- Array de IDs de controles afectados
```

### `users` (extendida sobre Supabase Auth)
```sql
id                  UUID PRIMARY KEY REFERENCES auth.users(id)
full_name           TEXT
role                TEXT                   -- "admin" | "compliance_officer" | "team_member"
jurisdictions       TEXT[]                 -- Jurisdicciones a las que tiene acceso
cpd_hours_current   DECIMAL                -- Horas CPD acumuladas este año (D5)
```

---

## Decisiones técnicas clave

### Supabase en lugar de PostgreSQL propio
**Decisión:** Usar Supabase como capa de datos en lugar de PostgreSQL standalone.
**Razón:** Supabase provee auth, storage, RLS y realtime out-of-the-box. Para un equipo de 6 personas y un solo desarrollador (Antigravity), elimina la complejidad de gestionar infraestructura de base de datos. El costo es negligible en esta etapa.

### `status` y `maturity_level` como campos separados
**Decisión:** Mantener dos campos distintos en lugar de uno combinado.
**Razón:** Son dimensiones ortogonales. Un control puede estar "Compliant" (se cumplió hoy) pero con `maturity_level = 1` (no hay procedimiento escrito). Combinarlos en un solo campo perdería información crítica para el programa de mejora continua.

### IDs de controles como TEXT en lugar de UUID
**Decisión:** Los IDs siguen el patrón `D1-F01` (dominio-jurisdicción-número).
**Razón:** Son legibles por humanos y auditores. Facilita la referencia cruzada entre documentos MD y el sistema. El costo de no usar UUID es mínimo dado que la tabla de controles no es masiva.

### Pre-populate `maturity_level = 1` para todos los controles
**Decisión:** Al sembrar la base de datos, todos los controles arrancan en nivel 1 (Inicial).
**Razón:** El nivel 0 (Inexistente) implica que el control nunca fue considerado. Al configurarlo conscientemente en el sistema, ya se reconoce su existencia — eso es nivel 1 por definición.

---

## Variables de entorno requeridas

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # Solo en backend, nunca en cliente
GOOGLE_OAUTH_CLIENT_ID=
GOOGLE_OAUTH_CLIENT_SECRET=
NOTEBOOKLM_MCP_KEY=               # Para el MCP de NotebookLM
```

---

## Patrones establecidos

### Consultar NotebookLM antes de implementar lógica regulatoria
```
Antes de implementar cualquier validación, cálculo o regla que derive de 
una regulación (ej: cómo calcular el Form A, qué campos requiere el 
Capital Adequacy Return), consultar el MCP de NotebookLM con el notebook 
"RegulacionNotebook" para verificar contra la fuente primaria.
```

### RLS de Supabase por rol
```sql
-- Ejemplo: solo admin y compliance_officer pueden actualizar maturity_level
CREATE POLICY "maturity_update_policy" ON regulatory_controls
FOR UPDATE USING (
  auth.jwt() ->> 'role' IN ('admin', 'compliance_officer')
);
```

---

*Seed inicial creado: 18 de junio de 2026 — Perplexity Computer*
*Antigravity actualiza este archivo con cada decisión técnica relevante*

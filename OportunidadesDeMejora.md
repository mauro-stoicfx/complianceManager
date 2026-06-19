# OportunidadesDeMejora
## Stoic FX — Compliance Management System

> Backlog de ideas y mejoras futuras identificadas durante el diseño y desarrollo.
> Antigravity agrega ítems cuando los identifica. Mauro prioriza y asigna releases.
> Cuando un ítem se implementa, se mueve al Changelog — no se borra.

---

## Formato de cada entrada

```
### [OM-XXX] Título
**Impacto:** Alto / Medio / Bajo
**Complejidad:** Alta / Media / Baja
**Release sugerido:** Próximo / Mediano plazo / Largo plazo
**Descripción:** Qué es y por qué aportaría valor.
```

---

## Backlog

### [OM-001] Dominio D9 — Expansion Readiness
**Impacto:** Alto
**Complejidad:** Media
**Release sugerido:** Mediano plazo (post Fase 2)
**Descripción:** Agregar un noveno dominio al Regulatory Universe que modele las jurisdicciones target (FSA Seychelles, CySEC, ASIC, FCA). Para cada una: gap analysis entre los requisitos de la licencia y el estado actual de Stoic FX, nivel de madurez del gap, y un plan de acción para aplicar. Permite al sistema ser también una herramienta de planificación estratégica de expansión.

---

### [OM-002] Arquitectura multi-entidad
**Impacto:** Alto
**Complejidad:** Alta
**Release sugerido:** Mediano plazo (cuando se agregue la primera nueva entidad legal)
**Descripción:** Actualmente el modelo de datos asume una entidad por jurisdicción. Cuando Stoic FX cree nuevas entidades legales (ej: Stoic EU Ltd para CySEC), el sistema debe poder modelar: Grupo → Entidad Legal → Jurisdicción → Dominio → Control. Algunos controles son compartidos entre entidades (D7, D8), otros son específicos por entidad.

---

### [OM-003] Integración con APIs de reguladores
**Impacto:** Alto
**Complejidad:** Alta
**Release sugerido:** Largo plazo
**Descripción:** Varios reguladores tienen APIs públicas para verificar el estado de licencias y publicaciones. FCA tiene el Financial Services Register API. ASIC tiene ASIC Connect. Integrar estos feeds directamente permitiría al sistema detectar cambios en el estado de las licencias en tiempo real, sin depender del monitor manual de D8.
- FCA Register API: https://register.fca.org.uk/developer/s/
- ASIC Connect: https://connectonline.asic.gov.au/

---

### [OM-004] App móvil / PWA para notificaciones
**Impacto:** Medio
**Complejidad:** Media
**Release sugerido:** Mediano plazo
**Descripción:** El sistema de alertas (30/15/7 días) actualmente notifica por email. Agregar Progressive Web App (PWA) con notificaciones push para que Mauro reciba alertas en su teléfono sin necesidad de revisar el email. Especialmente útil para Early Warning (evento crítico que requiere respuesta inmediata).

---

### [OM-005] Reportes automáticos para reguladores
**Impacto:** Alto
**Complejidad:** Alta
**Release sugerido:** Largo plazo
**Descripción:** Algunos reportes periódicos (Form A de FSCA, Capital Adequacy Return de FSC) tienen formatos estandarizados. Si se integran los datos financieros de Stoic FX, el sistema podría pre-completar estos formularios automáticamente, reduciendo el tiempo de preparación de horas a minutos.

---

### [OM-006] Notebooks separados por área en NotebookLM
**Impacto:** Medio
**Complejidad:** Baja
**Release sugerido:** Próximo (antes de iniciar desarrollo con Antigravity)
**Descripción:** Organizar NotebookLM en notebooks separados por área:
- Regulación FSCA + FSC Mauritius (documentos descargados)
- Regulación expansión (FCA Handbook, ASIC rules, CySEC directives)
- Metodología compliance (ISO 27001, CMMI, COBIT)
- Benchmark competitivo (BROKERSTIER.md)
Así el MCP consulta el notebook correcto según contexto, sin mezclar fuentes.

---

### [OM-007] Dashboard ejecutivo para presentar a LPs
**Impacto:** Alto
**Complejidad:** Media
**Release sugerido:** Mediano plazo
**Descripción:** Una vista de solo lectura del Dashboard pensada para presentar el estado de compliance a liquidity providers, auditores o potenciales socios institucionales. Muestra Compliance Rate, Maturity Score por dominio (radar chart), licencias activas, y última fecha de auditoría — sin exponer detalles operativos internos. Generaría un PDF exportable de una página.

---

### [OM-008] Integración con herramienta interna de Stoic (tipo Slack)
**Impacto:** Medio
**Complejidad:** Media
**Release sugerido:** Fase 3
**Descripción:** Las alertas y notificaciones del sistema se integran con la herramienta interna de comunicación que Mauro está construyendo para Stoic FX, además del email. Esto centraliza las notificaciones en el mismo lugar donde el equipo se comunica.

---

### [OM-009] Control de versiones de políticas internas
**Impacto:** Medio
**Complejidad:** Media
**Release sugerido:** Mediano plazo
**Descripción:** El sistema debe poder almacenar y versionar los documentos de política interna del broker (AML Policy, KYC Procedure, Best Execution Policy, etc.). Cuando un regulador actualiza una norma (detectado vía D8), el sistema debe alertar que la política interna correspondiente puede necesitar actualización y trackear su revisión.

---

### [OM-010] Checklist de onboarding por empleado (D5)
**Impacto:** Medio
**Complejidad:** Baja
**Release sugerido:** Fase 4
**Descripción:** Al agregar un nuevo empleado al sistema, se genera automáticamente su checklist personal de compliance: RE5 (con fecha límite calculada desde su DOFA), PST por producto, CPD con contador de horas. El empleado ve su propio dashboard personal con sus pendientes.

---

*Seed inicial creado: 18 de junio de 2026 — Perplexity Computer*
*Antigravity y Mauro agregan ítems durante el desarrollo*

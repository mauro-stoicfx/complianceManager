# Contexto
## Conocimiento del dominio — Stoic FX Compliance Management System

> Este archivo contiene el conocimiento del negocio y la regulación que Antigravity necesita para tomar buenas decisiones de producto.
> NO contiene decisiones técnicas (eso va en Memoria.md).
> Antigravity debe leerlo cuando no entiende un término, una regla de negocio, o la lógica detrás de un requerimiento.

---

## Qué es Stoic FX

Broker de derivados OTC (Forex y CFDs). Esto significa que los clientes operan contratos financieros cuyo valor deriva del precio de activos subyacentes (pares de divisas, índices, materias primas). Stoic FX actúa como intermediario — en el modelo STP (Straight Through Processing), las órdenes de los clientes se enrutan a liquidity providers sin que Stoic FX tome la contraparte.

---

## Glosario del dominio

| Término | Definición |
|---|---|
| **FSP** | Financial Services Provider — la licencia que otorga la FSCA para operar como broker en Sudáfrica |
| **Key Individual (KI)** | Persona natural responsable de la gestión y control del FSP ante la FSCA. Debe aprobar el examen RE1. |
| **Representative** | Persona que presta servicios financieros en nombre del FSP. Debe aprobar RE5. |
| **RE1** | Examen regulatorio obligatorio para Key Individuals (FSCA). Se aprueba una vez, no hay vencimiento. |
| **RE5** | Examen regulatorio obligatorio para representantes (FSCA). Dentro de 24 meses desde el primer día de funciones (DOFA). |
| **CPD** | Continuing Professional Development — 18 horas anuales mínimas requeridas por la FSCA. Fecha límite: 31 de mayo de cada año. |
| **DOFA** | Date of First Appointment — la fecha desde la cual se cuentan los plazos para RE5 y calificaciones. |
| **Form A** | Formulario de cálculo de liquidez que se presenta a la FSCA. Categoría I: anual. Categoría II: semestral (dentro de 45 días del cierre de cada semestre). |
| **Early Warning** | Notificación obligatoria e inmediata a la FSCA cuando los activos exceden los pasivos por menos del 10%. Es un evento crítico. |
| **ODP** | Over-the-Counter Derivative Provider — licencia adicional requerida si el broker actúa como market maker (contraparte directa). Mayor capital y complejidad. |
| **FICA** | Financial Intelligence Centre Act — la ley AML de Sudáfrica. Obliga a programas de debida diligencia, monitoreo de transacciones y reporte de STRs. |
| **POPIA** | Protection of Personal Information Act — ley de privacidad de datos de Sudáfrica. Requiere nombrar un Information Officer registrado ante el regulador. |
| **Investment Dealer** | La categoría de licencia FSC Mauritius aplicable a brokers de forex/CFDs. Puede ser Full Service Dealer (excl. underwriting). |
| **FIAMLA** | Financial Intelligence and Anti-Money Laundering Act — la ley AML de Mauritius. |
| **MLRO** | Money Laundering Reporting Officer — obligatorio bajo FIAMLA en Mauritius. Recibe y evalúa reportes internos de transacciones sospechosas. |
| **Substance Requirements** | Exigencia de FSC Mauritius de demostrar que la empresa realmente opera desde Mauritius: directores residentes, cuenta bancaria local, registros contables locales. |
| **STR** | Suspicious Transaction Report — reporte obligatorio al regulador AML cuando se detecta una transacción sospechosa. |
| **CDD / EDD** | Customer Due Diligence / Enhanced Due Diligence — procesos de verificación de identidad de clientes. EDD aplica a PEPs y clientes de alto riesgo. |
| **PEP** | Politically Exposed Person — persona con función pública prominente o relacionada con ella. Requiere EDD obligatoriamente. |
| **Best Execution** | Obligación de ejecutar las órdenes de los clientes en los mejores términos disponibles (precio, velocidad, probabilidad de ejecución). |
| **Segregación de fondos** | Los fondos de los clientes deben estar en una cuenta bancaria separada de los fondos operativos del broker. Obligatorio en ambas jurisdicciones. |
| **CRS** | Common Reporting Standard (OCDE) — estándar de intercambio automático de información fiscal. Requiere Annual Return a la Mauritius Revenue Authority. |
| **FATF** | Financial Action Task Force — organismo internacional que establece estándares AML/CFT. Sudáfrica fue removida de la lista gris en octubre 2025. |
| **IOSCO** | International Organization of Securities Commissions — FSC Mauritius es miembro pleno. Reconocimiento internacional importante para relaciones con LPs. |
| **Liquidity Provider (LP)** | Entidad que provee liquidez al broker para la ejecución de órdenes. Los LPs institucionales exigen licencias Tier-1 o Tier-2 reconocidas. |
| **STP** | Straight Through Processing — modelo de broker que enruta órdenes directamente a LPs sin actuar como contraparte. Menor capital requerido que ODP/market maker. |
| **Nivel de madurez** | Escala 0–5 (inspirada en CMMI) que mide qué tan sólido y sostenible es el proceso detrás de un control, más allá de si está cumplido o no. Ver Contexto de madurez abajo. |

---

## Los dos reguladores de Stoic FX

### FSCA — Financial Sector Conduct Authority (Sudáfrica)
- Regula la conducta de los proveedores de servicios financieros
- Marco legal principal: FAIS Act No. 37 de 2002 + Board Notice 194 de 2017
- Periodicidad de reporte: anual (estados financieros + Form A Categoría I)
- Enforcement activo: puede suspender o revocar licencias, imponer multas
- Post-FATF (oct 2025): mayor reconocimiento institucional, mejor acceso a banca

### FSC Mauritius — Financial Services Commission
- Regula los servicios financieros en Mauritius, incluyendo brokers offshore
- Marco legal principal: Securities Act 2005 + Financial Services Act 2007 + FIAMLA 2002
- Periodicidad de reporte: trimestral (Capital Adequacy Return) + anual (estados financieros + AML report)
- Miembro pleno de IOSCO — reconocimiento global
- Exige substance real: directores residentes, cuenta bancaria local, registros contables en Mauritius

---

## Contexto del modelo de madurez

Un control puede estar "Compliant" (cumplido hoy) pero ser frágil (nivel 1 — solo Mauro sabe cómo hacerlo). El objetivo no es solo cumplir — es que el cumplimiento sea sostenible cuando el equipo crezca.

| Nivel | En la práctica para Stoic FX |
|---|---|
| 0 | El control no existe. Riesgo regulatorio inmediato si es D1/D2/D3/D6. |
| 1 | Solo Mauro sabe. Si Mauro no está, el control falla. |
| 2 | Hay un procedimiento escrito. Otra persona podría ejecutarlo. |
| 3 | Se ejecuta siempre, hay evidencia, el regulador puede verificarlo. |
| 4 | Se mide. Hay alertas antes de que falle. |
| 5 | Se mejora solo. El sistema lo optimiza. |

---

## Reglas de negocio críticas

1. **Early Warning es un evento, no una tarea periódica.** El sistema debe calcular en tiempo real si la condición se dispara y notificar inmediatamente — no esperar al siguiente ciclo de revisión.

2. **El CPD tiene fecha fija: 31 de mayo.** No es "dentro de 12 meses desde la última vez". Es una fecha fija anual para todos.

3. **El Form A de Categoría II tiene doble vencimiento.** Semestre 1 (jul–dic): dentro de 45 días de dic 31. Semestre 2 (ene–jun): dentro de 45 días de jun 30. No es una fecha fija.

4. **La segregación de fondos requiere reconciliación, no solo cuenta separada.** Tener la cuenta no es suficiente — se debe reconciliar periódicamente y documentarlo.

5. **Substance de Mauritius no es solo tener directores.** El FSC puede evaluar si las decisiones realmente se toman desde Mauritius. Si no hay evidencia de gestión activa desde allí, puede considerar "substance deficiency" y revocar la licencia.

6. **Los controles del dominio D3 (AML/KYC) aplican a cada cliente individual**, no al broker como entidad. El sistema debe poder rastrear el estado de CDD/EDD por cliente si en el futuro se integra con el CRM o plataforma de trading.

---

*Seed inicial creado: 18 de junio de 2026 — Perplexity Computer*
*Mauro actualiza cuando el agente comete errores por falta de contexto de dominio*

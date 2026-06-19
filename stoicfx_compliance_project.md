# Stoic FX — Compliance Management System
## Project Brief v3.0 — Estructura por Dominios (Annex A) + Modelo de Madurez

> **Metodología:** Este documento sigue la lógica de ISO 27001 Annex A aplicada a regulación financiera de broker.  
> Cada dominio = una categoría regulatoria. Cada control = una obligación específica con su norma de origen.  
> Cada control tiene un **nivel de madurez (0–5)** inspirado en CMMI, que va más allá del checklist binario Sí/No.  
> **Jurisdicciones:** FSCA (Sudáfrica) + FSC Mauritius

---

## Contexto del negocio

| Campo | Detalle |
|---|---|
| Empresa | Stoic FX (`stoicfx.com`) |
| Industria | Broker de derivados OTC (Forex / CFDs) |
| Equipo | 6 personas |
| Responsable compliance | Mauro Serrano |
| Regulador 1 | FSCA — Financial Sector Conduct Authority (Sudáfrica) |
| Regulador 2 | FSC — Financial Services Commission (Mauritius) |
| Normas base | FAIS Act No. 37/2002 · Board Notice 194/2017 · Securities Act 2005 · Financial Services Act 2007 · FIAMLA 2002 |

---

## Estructura de dominios

| # | Dominio | Equivalente ISO 27001 |
|---|---|---|
| D1 | Licenciamiento y gobierno corporativo | A.6 Organización de la seguridad |
| D2 | Solidez financiera y capital | A.17 Continuidad del negocio |
| D3 | KYC / AML / CFT | A.9 Control de acceso + A.18 Cumplimiento |
| D4 | Protección al cliente | A.13 Comunicaciones + A.18 Cumplimiento |
| D5 | Formación y competencia del equipo | A.7 Seguridad en RRHH |
| D6 | Reportes periódicos a reguladores | A.18 Cumplimiento |
| D7 | Tecnología, datos y ciberseguridad | A.8–A.16 (controles técnicos) |
| D8 | Vigilancia y gestión de cambios normativos | A.18.1.1 Identificación legislación aplicable |

---

## D1 — Licenciamiento y gobierno corporativo

> **Objetivo:** Mantener activas y en regla las licencias en ambas jurisdicciones, y garantizar la estructura corporativa que exigen los reguladores.

### FSCA — Sudáfrica

| ID | Control | Norma | Frecuencia | Evidencia requerida |
|---|---|---|---|---|
| D1-F01 | Mantener licencia FSP activa y vigente | FAIS Act S.8 | Anual (renovación) | Certificado de licencia FSP vigente |
| D1-F02 | Pago del levy anual FSCA | FSCA Levy Rules | Anual | Comprobante de pago |
| D1-F03 | Notificar a FSCA cualquier cambio material (directores, actividades, estructura accionaria) | FAIS Act S.14 | Por evento | Notificación enviada + acuse de recibo FSCA |
| D1-F04 | Nombrar Key Individual (KI) para cada categoría de producto | FAIS Act S.2 | Por evento / continua | Registro de KIs aprobados por FSCA |
| D1-F05 | Nombrar Compliance Officer si hay más de 1 KI o representantes | FAIS Act S.17 | Por evento | Designación formal + registro FSCA |

### FSC — Mauritius

| ID | Control | Norma | Frecuencia | Evidencia requerida |
|---|---|---|---|---|
| D1-M01 | Renovar Investment Dealer Licence anualmente | Securities Act 2005 S.15 | Anual (aniversario de la licencia) | Certificado de licencia FSC vigente |
| D1-M02 | Pagar Annual Licence Fee (MUR 600,000–1,000,000 Investment Dealer) | FSC Consolidated Licensing & Fees Rules 2008 | Anual (aniversario) | Comprobante de pago FSC |
| D1-M03 | Mantener mínimo 2 directores residentes en Mauritius con criterio independiente | FSC Circular / Financial Services Act S.71 | Continua | CVs de directores + prueba de residencia |
| D1-M04 | Mantener cuenta bancaria principal en Mauritius | FSC Substance Requirements | Continua | Estado de cuenta bancaria activa en Mauritius |
| D1-M05 | Mantener registros contables en la sede registrada en Mauritius | Financial Services Act S.71 | Continua | Contrato con Management Company o evidencia de registros locales |
| D1-M06 | Contratar Management Company licenciada por FSC | Financial Services Act S.77 | Continua | Contrato vigente con Management Company |
| D1-M07 | Notificar FSC ante cambios materiales (directores, accionistas, actividades, LPs) | Securities Act 2005 | Por evento | Notificación enviada + acuse FSC |
| D1-M08 | Presentar Annual Substance Filing (descripción de actividades, empleados, gastos en Mauritius) | FSC GBC Substance Requirements | Anual | Formulario de substance filing completado y radicado |
| D1-M09 | Mantener capital mínimo estatutario (MUR 1,000,000 para Investment Dealer excl. underwriting) | Securities (Licensing) Rules 2007 Rule 14 | Continua | Balance sheet que evidencia capital |
| D1-M10 | Nombrar Compliance Officer | Securities Act 2005 / FSC Licensing Criteria | Por evento | Designación formal + CDD del Compliance Officer |
| D1-M11 | Nombrar MLRO y Deputy MLRO | FIAMLA 2002 / FSC AML Handbook | Por evento | Designación formal + CDD del MLRO |

---

## D2 — Solidez financiera y capital

> **Objetivo:** Garantizar que Stoic FX mantiene en todo momento los niveles mínimos de solvencia, liquidez y capital exigidos por ambos reguladores.

### FSCA — Sudáfrica

| ID | Control | Norma | Frecuencia | Evidencia requerida |
|---|---|---|---|---|
| D2-F01 | Activos > Pasivos en todo momento (solvencia general) | Board Notice 194/2017 Cap.6 | Continua | Balance sheet mensual interno |
| D2-F02 | Activos corrientes > Pasivos corrientes (capital de trabajo) | BN 194 Cap.6 | Continua | Balance sheet mensual interno |
| D2-F03 | Activos líquidos ≥ 4/52 semanas del gasto anual ajustado (~1 mes de opex) | BN 194 Cap.6 | Continua | Cálculo mensual documentado |
| D2-F04 | Presentar Form A (Liquidity Calculation) — Cat. I: anual; Cat. II: semestral dentro de 45 días | BN 194 | Anual o semestral | Form A radicado ante FSCA con acuse |
| D2-F05 | Early Warning: notificar FSCA inmediatamente si activos exceden pasivos por < 10% | BN 194 Cap.6 | Por evento | Notificación enviada + timestamp |
| D2-F06 | Mantener seguro PI/FG mínimo ZAR 1M (sin fondos clientes) o ZAR 5M (con fondos clientes) | FAIS Act S.18 | Anual (renovación póliza) | Póliza de seguro vigente |

### FSC — Mauritius

| ID | Control | Norma | Frecuencia | Evidencia requerida |
|---|---|---|---|---|
| D2-M01 | Mantener capital mínimo no deteriorado ≥ MUR 1,000,000 en todo momento | Securities (Licensing) Rules 2007 Rule 14 | Continua | Balance sheet con capital |
| D2-M02 | Mantener capital adecuado ≥ 9 meses de gastos fijos (Fixed Expenditure Based Requirement) | SEM Financial Reporting Rules 2010 | Continua | Cálculo FEBR documentado |
| D2-M03 | Presentar Capital Adequacy Return trimestral ante SEM (dentro de los 10 días hábiles del cierre del trimestre) | SEM Financial Reporting Rules 2010 | Trimestral | Capital Adequacy Return radicado |
| D2-M04 | Notificar inmediatamente al SEM si hay riesgo de incumplimiento de capital | SEM Financial Reporting Rules 2010 Rule 14.3 | Por evento | Notificación formal enviada |
| D2-M05 | Mantener registros contables actualizados en todo momento | SEM Financial Reporting Rules 2010 | Continua | Libros contables actualizados |

---

## D3 — KYC / AML / CFT

> **Objetivo:** Prevenir el uso de Stoic FX para lavado de activos y financiación del terrorismo, y cumplir con todas las obligaciones de debida diligencia de clientes en ambas jurisdicciones.

### FSCA — Sudáfrica (FICA)

| ID | Control | Norma | Frecuencia | Evidencia requerida |
|---|---|---|---|---|
| D3-F01 | Implementar programa AML/CFT escrito (políticas, procedimientos, controles internos) | Financial Intelligence Centre Act (FICA) | Anual (revisión) | Manual AML/CFT actualizado y aprobado |
| D3-F02 | Realizar Customer Due Diligence (CDD) completo en el onboarding de cada cliente | FICA S.21 | Por cliente | Expediente de cliente con documentación CDD |
| D3-F03 | Realizar Enhanced Due Diligence (EDD) para PEPs y clientes de alto riesgo | FICA S.21B | Por cliente de alto riesgo | Expediente EDD con aprobación del KI |
| D3-F04 | Monitoreo continuo de transacciones de clientes (transaction monitoring) | FICA S.22 | Continua | Logs de monitoreo + alertas documentadas |
| D3-F05 | Reportar Suspicious Transaction Reports (STRs) al Financial Intelligence Centre (FIC) | FICA S.29 | Por evento | Copia de STR radicado ante FIC |
| D3-F06 | Conservar registros de clientes y transacciones por mínimo 5 años | FICA S.23 | Continua | Política de retención de registros implementada |
| D3-F07 | Capacitación AML anual obligatoria para todo el personal | FICA | Anual | Registros de asistencia + material de capacitación |

### FSC — Mauritius (FIAMLA)

| ID | Control | Norma | Frecuencia | Evidencia requerida |
|---|---|---|---|---|
| D3-M01 | Implementar programa AML/CFT escrito conforme a FSC AML/CFT Handbook | FIAMLA 2002 / FSC AML Handbook | Anual (revisión) | Manual AML/CFT actualizado, firmado por MLRO |
| D3-M02 | Realizar CDD completo en onboarding de todos los clientes (incluyendo TIN para CRS) | FIAMLA / CRS | Por cliente | Expediente de cliente con documentación CDD + TIN |
| D3-M03 | Identificar y aplicar EDD a PEPs, clientes de alto riesgo | FIAML Regulations 2018 | Por cliente de alto riesgo | Expediente EDD aprobado por MLRO |
| D3-M04 | Screening de clientes contra listas de sanciones (actualización periódica) | FIAMLA / FIAML Regulations | Continua (mínimo en onboarding y ante cambios) | Logs de screening con fecha y resultado |
| D3-M05 | Monitoreo continuo de transacciones | FIAMLA S.17 | Continua | Logs de monitoreo + alertas documentadas |
| D3-M06 | Reportar STRs al Financial Intelligence Unit (FIU) de Mauritius | FIAMLA S.14 | Por evento | Copia de STR radicado + acuse FIU |
| D3-M07 | Conservar registros de clientes y transacciones por mínimo 7 años | FIAMLA S.20 | Continua | Política de retención de registros implementada |
| D3-M08 | Presentar AML/CFT Annual Report al FSC | FSC AML Handbook / Licensing Conditions | Anual | Reporte AML/CFT anual radicado |
| D3-M09 | Capacitación AML anual para todo el personal | FSC AML Handbook | Anual | Registros de asistencia + material |
| D3-M10 | Realizar auditoría AML independiente anual | FSC AML Handbook (recomendado / puede ser requerida) | Anual | Informe de auditoría AML |
| D3-M11 | Presentar CRS Annual Return a la Mauritius Revenue Authority (MRA) | Common Reporting Standard / OECD | Anual | CRS Return radicado ante MRA |

---

## D4 — Protección al cliente

> **Objetivo:** Garantizar que los clientes de Stoic FX reciben un trato justo, que sus fondos están protegidos y que se cumplen las normas de conducta hacia el cliente.

### FSCA — Sudáfrica

| ID | Control | Norma | Frecuencia | Evidencia requerida |
|---|---|---|---|---|
| D4-F01 | Segregar fondos de clientes en cuenta bancaria separada en banco registrado en Sudáfrica | FAIS General Code of Conduct S.3 | Continua | Estado de cuenta bancaria segregada |
| D4-F02 | Realizar reconciliación de cuentas de clientes (mensual mínimo) | FAIS General Code | Mensual | Reportes de reconciliación firmados |
| D4-F03 | Garantizar best execution en órdenes de clientes | FAIS General Code / ODP Conduct Standard 2018 | Continua | Política de Best Execution documentada + logs |
| D4-F04 | Divulgar riesgos a clientes antes de operar (Risk Disclosure) | FAIS General Code S.7 | Por cliente (onboarding) | Formulario de Risk Disclosure firmado por cliente |
| D4-F05 | Implementar política y procedimiento de gestión de quejas de clientes | FAIS General Code S.3 | Por evento / revisión anual | Registro de quejas + tiempos de respuesta |
| D4-F06 | Proveer estados de cuenta periódicos a clientes | FAIS General Code | Mensual/Trimestral | Evidencia de envío de estados de cuenta |

### FSC — Mauritius

| ID | Control | Norma | Frecuencia | Evidencia requerida |
|---|---|---|---|---|
| D4-M01 | Segregar fondos de clientes en cuenta(s) bancaria(s) separadas | FSC Safeguarding of Client Assets Rules | Continua | Estado de cuenta bancaria segregada en Mauritius |
| D4-M02 | Realizar reconciliación de cuentas de clientes (mensual) | FSC Client Money Rules | Mensual | Reportes de reconciliación firmados |
| D4-M03 | Garantizar best execution | Securities Act 2005 S.56 | Continua | Política de Best Execution documentada |
| D4-M04 | Divulgar riesgos a clientes (Risk Disclosure) | FSC Licensing Conditions | Por cliente (onboarding) | Formulario de Risk Disclosure firmado |
| D4-M05 | Implementar política de gestión de quejas | FSC Conduct Requirements | Por evento / revisión anual | Registro de quejas + resoluciones |

---

## D5 — Formación y competencia del equipo

> **Objetivo:** Garantizar que todos los Key Individuals y representantes de Stoic FX tienen las calificaciones, certificaciones y desarrollo profesional continuo exigidos por FSCA.  
> *(FSC Mauritius no tiene equivalente formal de RE1/RE5, pero exige fit & proper para directores y Compliance Officer/MLRO.)*

### FSCA — Sudáfrica

| ID | Control | Norma | Frecuencia | Evidencia requerida |
|---|---|---|---|---|
| D5-F01 | Key Individual aprueba Examen Regulatorio RE1 (dentro de 24 meses desde designación) | Board Notice 194/2017 Cap.2 | Única (por KI) | Certificado RE1 por KI |
| D5-F02 | Representantes aprueban Examen Regulatorio RE5 (dentro de 24 meses desde DOFA) | BN 194 Cap.2 | Única (por representante) | Certificado RE5 por representante |
| D5-F03 | Todos los KIs y representantes obtienen calificación reconocida FSCA (mínimo NQF 4/5 según producto, dentro de 6 años) | BN 194 Cap.2 | Única (por persona) | Certificado de calificación reconocida |
| D5-F04 | Completar Product Specific Training (PST) antes de prestar servicios en cada producto | BN 194 Cap.2 | Por producto/persona | Certificado PST por producto y persona |
| D5-F05 | Completar CPD mínimo 18 horas anuales (múltiples clases de producto) — fecha límite 31 de mayo de cada año | BN 194 Cap.2 | Anual | Registros de CPD por persona (nombre, proveedor, horas, fecha) |
| D5-F06 | Documentar historial de capacitación de cada KI y representante | BN 194 | Continua | Expedientes individuales de capacitación actualizados |

### FSC — Mauritius

| ID | Control | Norma | Frecuencia | Evidencia requerida |
|---|---|---|---|---|
| D5-M01 | Verificar fit & proper de todos los directores, Compliance Officer y MLRO | Securities Act 2005 / FSC Licensing Criteria | Por evento (nombramiento) + revisión anual | Personal Questionnaire Form + CDD completo |
| D5-M02 | Capacitación AML anual para todos los empleados | FIAMLA / FSC AML Handbook | Anual | Registros de asistencia firmados |

---

## D6 — Reportes periódicos a reguladores

> **Objetivo:** Cumplir con todos los reportes, declaraciones y notificaciones obligatorias ante FSCA y FSC Mauritius en los plazos establecidos.

### FSCA — Sudáfrica

| ID | Control | Norma | Frecuencia | Plazo | Evidencia requerida |
|---|---|---|---|---|---|
| D6-F01 | Presentar estados financieros anuales auditados ante FSCA | FAIS Act S.19 | Anual | Dentro de 4 meses del cierre del ejercicio | Estados financieros radicados + acuse FSCA |
| D6-F02 | Presentar Form A (Liquidity Calculation) — Cat. I anual; Cat. II dentro de 45 días de cada semestre | BN 194 | Anual / Semestral | Ver norma | Form A radicado + acuse |
| D6-F03 | Notificar Early Warning al FSCA (si activos exceden pasivos por < 10%) | BN 194 Cap.6 | Por evento | Inmediatamente | Notificación enviada + timestamp |
| D6-F04 | Notificar FSCA ante cambios materiales | FAIS Act S.14 | Por evento | Antes de implementar el cambio | Notificación con acuse |

### FSC — Mauritius

| ID | Control | Norma | Frecuencia | Plazo | Evidencia requerida |
|---|---|---|---|---|---|
| D6-M01 | Presentar estados financieros anuales auditados ante FSC (IFRS, auditor aprobado por FRC) | Securities Act 2005 S.20 / Securities (Licensing) Rules 2007 | Anual | Dentro de 6 meses del cierre del ejercicio | Reporte anual radicado ante FSC |
| D6-M02 | Presentar Capital Adequacy Return trimestral ante SEM | SEM Financial Reporting Rules 2010 | Trimestral | Dentro de 10 días hábiles del cierre del trimestre | Capital Adequacy Return radicado |
| D6-M03 | Presentar Quarterly Financial Return ante FSC | FSC Licensing Conditions | Trimestral | Dentro de 1 mes del cierre del trimestre | Reporte trimestral radicado |
| D6-M04 | Presentar Annual Return ante Companies Division (Registrar) | Companies Act 2001 | Anual | Aniversario de incorporación | Annual Return radicado |
| D6-M05 | Pagar Annual Licence Fee FSC | FSC Consolidated Licensing & Fees Rules | Anual | Aniversario de la licencia | Comprobante de pago |
| D6-M06 | Presentar AML/CFT Annual Report | FSC AML Handbook | Anual | Según indicación FSC | Reporte AML radicado |
| D6-M07 | Presentar CRS Annual Return ante MRA | CRS / OECD | Anual | Según calendario MRA | CRS Return radicado |
| D6-M08 | Notificar FSC ante cambios materiales (directores, accionistas, LPs, actividades) | Securities Act 2005 | Por evento | Inmediatamente | Notificación con acuse FSC |
| D6-M09 | Presentar Annual Substance Filing | FSC GBC Substance Requirements | Anual | Con el reporte anual | Substance filing completado |

---

## D7 — Tecnología, datos y ciberseguridad

> **Objetivo:** Proteger los sistemas, datos de clientes y continuidad operacional de Stoic FX. Este dominio conecta directamente con ISO 27001 si deciden certificarse en el futuro.

### FSCA + FSC (aplica a ambas jurisdicciones)

| ID | Control | Norma de referencia | Frecuencia | Evidencia requerida |
|---|---|---|---|---|
| D7-01 | Implementar política de seguridad de la información | FAIS General Code / FSC Licensing Conditions / ISO 27001 (referencia) | Anual (revisión) | Política aprobada y vigente |
| D7-02 | Controlar acceso a sistemas críticos (principio de mínimo privilegio) | FAIS / FSC / ISO 27001 A.9 | Continua | Matriz de accesos documentada |
| D7-03 | Implementar backup y plan de recuperación ante desastres | FAIS General Code / FSC | Anual (prueba) | Evidencia de prueba de recuperación |
| D7-04 | Gestionar vulnerabilidades y parches de sistemas | ISO 27001 A.12 (referencia) | Continua / Trimestral | Log de gestión de parches |
| D7-05 | Proteger datos personales de clientes (privacidad) | POPIA (Protection of Personal Information Act - Sudáfrica) / Data Protection Act 2017 (Mauritius) | Continua | Política de privacidad + registro de tratamiento de datos |
| D7-06 | Nombrar Information Officer (POPIA - Sudáfrica) | POPIA S.55 | Por evento | Designación registrada ante Information Regulator de Sudáfrica |
| D7-07 | Reportar brechas de datos personales al regulador competente | POPIA / DPA Mauritius | Por evento | Notificación de brecha enviada |
| D7-08 | Mantener logs de auditoría de sistemas | FAIS / FSC / ISO 27001 A.12 | Continua | Logs de auditoría disponibles y protegidos |

---

## D8 — Vigilancia y gestión de cambios normativos

> **Objetivo:** Detectar oportunamente cambios en la regulación aplicable y actualizar los controles internos de Stoic FX antes de que entren en vigencia.  
> Este dominio no tiene obligación formal ante el regulador — es un control interno de madurez regulatoria.

| ID | Control | Fuente a monitorear | Frecuencia | Acción requerida |
|---|---|---|---|---|
| D8-01 | Monitorear publicaciones FSCA: Notices, Conduct Standards, Board Notices, Circulars | [FSCA Notices](https://www.fsca.co.za/Notices/) | Semanal | Clasificar por impacto (Alto/Medio/Bajo) + resumen ejecutivo + decisión: actualizar Regulatory Universe si aplica |
| D8-02 | Monitorear publicaciones FSC Mauritius: Communiqués, Circulars, FSC Rules | [FSC Mauritius](https://www.fscmauritius.org/en/regulation/communiques-and-circulars) | Semanal | Ídem D8-01 |
| D8-03 | Monitorear cambios en FIAMLA y FIAML Regulations | [FIU Mauritius](https://www.fiumauritius.org/) | Mensual | Actualizar programa AML/CFT si aplica |
| D8-04 | Monitorear cambios en FICA (Sudáfrica) y FIC Guidelines | [FIC South Africa](https://www.fic.gov.za/) | Mensual | Actualizar programa AML/CFT si aplica |
| D8-05 | Monitorear FATF / OECD (estándares internacionales AML) | [FATF](https://www.fatf-gafi.org/) | Trimestral | Evaluar impacto en políticas AML de ambas jurisdicciones |
| D8-06 | Registrar en historial todos los cambios normativos detectados con fecha, descripción e impacto | Interno | Por evento | Entrada en historial de cambios normativos |

---

## Modelo de madurez de controles

Un checklist de auditoría convencional solo responde: **¿existe o no existe el control?** Ese es el nivel 1.
El sistema de Stoic FX va hasta el nivel 3 como mínimo en controles críticos, y aspira al 4.

| Nivel | Nombre | Descripción práctica | Ejemplo — D2-F01 (Solvencia FSCA) |
|---|---|---|---|
| **0** | Inexistente | El control no existe ni se ha considerado | No hay cálculo de solvencia |
| **1** | Inicial | Existe ad hoc, depende de una persona, sin documentar | Mauro sabe que los activos superan pasivos, pero sin registro |
| **2** | Definido | Hay procedimiento escrito y responsable asignado | Existe política que exige cálculo mensual de solvencia |
| **3** | Implementado | Se ejecuta consistentemente y hay evidencia que lo prueba | Balance mensual firmado, 12 meses de histórico disponible |
| **4** | Medido | Se mide efectividad del control con métricas | Ratio activos/pasivos como KPI, alerta automática si baja del 15% |
| **5** | Optimizado | Mejora continua basada en métricas y lecciones aprendidas | Sistema ajusta alertas y genera reportes predictivos |

### Objetivo de madurez por dominio

| Dominio | Objetivo hoy (6 personas) | Objetivo a 18 meses | Justificación |
|---|---|---|---|
| D1 — Licenciamiento | **Nivel 3** | Nivel 4 | Crítico. Sin margen de error. Licencia = el negocio. |
| D2 — Solidez financiera | **Nivel 3** | Nivel 4 | Crítico. Early Warning ante FSCA debe ser instantáneo. |
| D3 — KYC / AML / CFT | **Nivel 3** | Nivel 4 | Crítico. Es el dominio de mayor exposición sancionatoria. |
| D4 — Protección al cliente | Nivel 2 | Nivel 3 | Importante pero más maduro con proceso documentado. |
| D5 — Formación del equipo | **Nivel 3** | Nivel 3 | Evidenciable por persona. RE1/RE5/CPD tienen fechas fijas. |
| D6 — Reportes reguladores | **Nivel 3** | Nivel 4 | Crítico. Vencimientos inamovibles con consecuencias inmediatas. |
| D7 — Tecnología y datos | Nivel 2 | Nivel 3 | Política escrita mínima es suficiente para esta etapa. |
| D8 — Cambios normativos | Nivel 2 | Nivel 3 | Proceso de monitoreo definido y ejecutado, sin métricas aún. |

> **Regla crítica:** Cualquier control en nivel 0 o 1 en los dominios D1, D2, D3 y D6 es **riesgo regulatorio inmediato** — son los primeros en resolver, antes que cualquier otra cosa.

---

## Modelo de datos — Regulatory Universe

Cada control se almacena como un registro con los siguientes campos. Los campos `estado` y `nivel_madurez` son dimensiones distintas y complementarias:

| Campo | Qué mide | Ejemplo |
|---|---|---|
| `estado` | Si la obligación está cumplida **ahora mismo** | "Compliant" — el Form A de este semestre fue presentado |
| `nivel_madurez` | Qué tan **sólido y sostenible** es el proceso detrás | Nivel 2 — se presentó, pero no hay procedimiento escrito ni queda claro quién lo hará el próximo semestre |

```
{
  id:                    "D1-F01",
  dominio:               "D1 — Licenciamiento y gobierno corporativo",
  jurisdiccion:          "FSCA" | "FSC Mauritius" | "Ambas",
  norma_origen:          "FAIS Act S.8",
  descripcion:           "Mantener licencia FSP activa y vigente",
  frecuencia:            "Única" | "Continua" | "Mensual" | "Trimestral" | "Semestral" | "Anual" | "Por evento",
  plazo_especifico:      "Dentro de 4 meses del cierre del ejercicio",
  responsable:           "Mauro Serrano",
  evidencia_requerida:   "Certificado de licencia FSP vigente",
  proxima_fecha:         "2026-12-31",
  estado:                "Compliant" | "En progreso" | "En riesgo" | "Incumplido",
  nivel_madurez:         0 | 1 | 2 | 3 | 4 | 5,
  justificacion_nivel:   "Certificado vigente archivado. Renovación en calendario con alerta 60 días antes.",
  archivo_evidencia:     "ruta/al/archivo.pdf",
  ultima_revision:       "2026-06-18",
  notas:                 ""
}
```

---

## Arquitectura del sistema

### Módulos principales

| Módulo | Descripción |
|---|---|
| **Regulatory Universe** | CRUD de todos los controles por dominio. Tabla filtrable por jurisdicción, dominio, estado, nivel de madurez y responsable. |
| **Compliance Calendar** | Vista mensual/anual de vencimientos. Código de colores: verde (compliant), amarillo (≤30 días), rojo (vencido/en riesgo). |
| **Evidence Repository** | Gestor de documentos vinculado a cada control. Flujo carga → revisión → aprobación. |
| **Regulatory Intelligence** | Monitor semanal de D8. Feed de cambios normativos con clasificación de impacto. |
| **Dashboard** | KPIs: Compliance Rate %, controles en riesgo, controles vencidos, cobertura de evidencias, CPD horas por persona. **Radar chart de Maturity Score por dominio (promedio de niveles del dominio).** |
| **Maturity Assessment** | Heatmap de nivel de madurez actual por control. Vista comparativa estado actual vs. objetivo por dominio. Plan de acción priorizado para controles en nivel 0 o 1 en dominios críticos (D1, D2, D3, D6). |
| **Reportes** | Generador de reportes exportables por dominio, jurisdicción o período. Incluye **Maturity Report** comparable entre períodos — equivalente al informe de auditoría interna ISO. |

### Stack sugerido
- Frontend: React + TypeScript
- Backend: Node.js (Express) o Python (FastAPI)
- Base de datos: PostgreSQL
- Almacenamiento de evidencias: Google Cloud Storage
- Autenticación: Google OAuth
- Notificaciones: Email + integración con herramienta interna Stoic
- Scheduler: Cron jobs para alertas y monitoreo D8

### Roles de usuario

| Rol | Permisos |
|---|---|
| Admin (Mauro) | CRUD completo, aprobación de evidencias, configuración |
| Compliance Officer | Editar controles, cargar evidencias, generar reportes |
| Miembro del equipo | Ver calendario, cargar evidencias personales (D5 capacitación) |

---

## Fases de implementación

| Fase | Alcance | Duración estimada |
|---|---|---|
| **Fase 1 — MVP** | Regulatory Universe (8 dominios prepoblados, con `nivel_madurez`) + Calendario + Dashboard con radar chart de madurez + Auth | Semanas 1–3 |
| **Fase 2 — Evidencias** | Repositorio de documentos + flujo de aprobación + notificaciones por email | Semanas 4–5 |
| **Fase 3 — Inteligencia** | Monitor D8 automático + alertas 30/15/7 días + integración Stoic interno | Semanas 6–8 |
| **Fase 4 — Reportes y madurez** | Generador de reportes + Maturity Assessment (heatmap + plan de acción priorizado) + perfiles D5 + onboarding de equipo | Semanas 9–10 |

---

## Prompt para Antigravity

```
Build a Compliance Management System for Stoic FX (stoicfx.com), a regulated forex/CFD broker 
operating under two jurisdictions: South Africa (FSCA, FAIS Act) and Mauritius (FSC, Securities Act 2005).

The system is structured around 8 regulatory domains (equivalent to ISO 27001 Annex A):
  D1 — Licensing & Corporate Governance
  D2 — Financial Soundness & Capital
  D3 — KYC / AML / CFT
  D4 — Client Protection
  D5 — Staff Training & Competence
  D6 — Regulatory Reporting
  D7 — Technology, Data & Cybersecurity
  D8 — Regulatory Change Monitoring

Core data model: Each regulatory obligation is a record in the "Regulatory Universe" with fields:
id, domain, jurisdiction (FSCA | FSC Mauritius | Both), source_regulation, description, 
frequency, specific_deadline, responsible_person, required_evidence, next_due_date,
status (Compliant | In Progress | At Risk | Overdue),
maturity_level (integer 0-5),
maturity_justification (string — one sentence explaining the level),
evidence_file_path, last_reviewed, notes.

Two separate dimensions per control:
- status: is the obligation met RIGHT NOW?
- maturity_level (CMMI-inspired):
  0 = Non-existent (control not considered)
  1 = Initial (ad hoc, person-dependent, undocumented)
  2 = Defined (written procedure + assigned owner)
  3 = Implemented (consistently executed + evidence available)
  4 = Measured (KPIs tracked, metrics generated)
  5 = Optimized (continuous improvement loop)

Maturity targets by domain:
  Critical (D1, D2, D3, D6): Level 3 now → Level 4 at 18 months
  Standard (D4, D7, D8): Level 2 now → Level 3 at 18 months
  D5 (Training): Level 3 now (individual records per employee)

Modules to build:
1. Regulatory Universe — filterable CRUD table by domain, jurisdiction, status, maturity_level, responsible person.
2. Compliance Calendar — monthly/annual view with color-coded deadlines (green/yellow ≤30 days/red overdue),
   filters by jurisdiction and person.
3. Evidence Repository — document upload per obligation, approval workflow (upload → review → approve),
   version history.
4. Regulatory Intelligence — weekly monitor of FSCA Notices (https://www.fsca.co.za/Notices/) and
   FSC Mauritius communiqués (https://www.fscmauritius.org/en/regulation/communiques-and-circulars),
   auto-classify impact (High/Medium/Low), generate executive summary, alert Admin.
5. Dashboard — KPIs: Compliance Rate %, at-risk obligations, overdue obligations, evidence coverage %,
   CPD hours per team member vs 18h minimum.
   Radar chart: Maturity Score per domain (average maturity_level of all controls in that domain).
6. Maturity Assessment — heatmap of current maturity_level per control.
   Comparison view: current level vs. target level per domain.
   Auto-generated prioritized action plan for any control at level 0 or 1 in critical domains (D1/D2/D3/D6).
7. Reports — exportable PDF/Excel status reports by domain, jurisdiction, or period.
   Include Maturity Report (comparable across periods — equivalent to an ISO internal audit report).

Tech stack: React + TypeScript frontend, FastAPI (Python) backend on Vercel Functions, Supabase (PostgreSQL + RLS + Storage + Auth) for database, file storage, and authentication. Google OAuth via Supabase Auth. Email notifications via Supabase or external email provider. Cron jobs for alerts and D8 monitoring via Vercel Cron or external scheduler.

User roles: Admin (full CRUD + approvals + maturity scoring), Compliance Officer (edit + upload + update maturity),
Team Member (view + upload personal training certificates for D5).

Pre-populate the Regulatory Universe with all obligations listed in the project brief
(D1 through D8 control tables for both FSCA and FSC Mauritius).
Pre-populate maturity_level = 1 and maturity_justification = 'Initial state — pending first assessment' for all records.

Automated alerts: 30, 15, and 7 days before each deadline. Immediate alert for At Risk and Overdue status changes.
Additional alert: any critical domain control (D1/D2/D3/D6) has maturity_level drop to 0 or 1.

Phase 1 MVP: Regulatory Universe (with maturity fields) + Calendar + Dashboard (with radar chart) + Auth + pre-populated data.
```

---

## Referencias regulatorias

| Documento | Jurisdicción | URL |
|---|---|---|
| FAIS Act No. 37 of 2002 | FSCA — Sudáfrica | https://www.fsca.co.za/Regulatory%20Frameworks/Pages/Financial-Advisory-and-Intermediary-Services-Act.aspx |
| Board Notice 194 of 2017 (Fit & Proper) | FSCA — Sudáfrica | https://www.gov.za/sites/default/files/gcis_document/201712/41321bn194.pdf |
| ODP Conduct Standard 2018 | FSCA — Sudáfrica | https://www.fsca.co.za/Notices/ |
| FSCA Notices (actualizaciones) | FSCA — Sudáfrica | https://www.fsca.co.za/Notices/ |
| Securities Act 2005 (FSC Mauritius) | FSC — Mauritius | https://www.fscmauritius.org/media/1011/securities-act-2005-as-amended-08-01-13cc.pdf |
| Securities (Licensing) Rules 2007 | FSC — Mauritius | https://www.fscmauritius.org/media/2129/3-securities-licencing-rules-2007.pdf |
| Financial Services Act 2007 | FSC — Mauritius | https://www.fscmauritius.org/en/regulation/acts |
| FIAMLA 2002 + FIAML Regulations 2018 | FSC — Mauritius | https://www.fscmauritius.org/en/regulation/acts |
| FSC AML/CFT Handbook | FSC — Mauritius | https://www.fscmauritius.org/media/99188/aml-cft-handbook.pdf |
| SEM Financial Reporting Rules 2010 | SEM — Mauritius | https://www.stockexchangeofmauritius.com/media/10936/sem_capital-_adequacy_rules.pdf |
| FSC Communiqués y Circulars | FSC — Mauritius | https://www.fscmauritius.org/en/regulation/communiques-and-circulars |

---

*Documento v3.0 — 18 de junio de 2026*  
*Autor: Mauro Serrano — Stoic FX*  
*Metodología: Estructura de dominios tipo ISO 27001 Annex A + Modelo de Madurez CMMI aplicados a regulación de broker (FSCA + FSC Mauritius)*

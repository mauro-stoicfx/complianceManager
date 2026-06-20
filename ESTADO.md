# ESTADO
## Stoic FX Compliance Management System — Estado actual del proyecto

> Este archivo se actualiza al final de cada sesión de trabajo.
> Es el primer archivo que Mauro lee al retomar el proyecto.
> Última actualización: 19 de junio de 2026

---

## Versión actual

| Ambiente | Versión | Estado |
|---|---|---|
| Producción | — | No deployado aún |
| Desarrollo | v1.3.0 — Inteligencia y Automatización (Fase 3) | En curso |

---

## ✅ Completado

- [x] Definición de los 8 dominios regulatorios (D1–D8) con estructura tipo ISO 27001 Annex A
- [x] Modelo de madurez CMMI (niveles 0–5) incorporado al modelo de datos
- [x] Modelo de datos completo del Regulatory Universe (todos los campos definidos)
- [x] Tablas de controles para FSCA (Sudáfrica) — D1 a D8
- [x] Tablas de controles para FSC Mauritius — D1 a D8
- [x] Benchmark de brokers tier-1 (Oanda, Tickmill, Forex.com, Pepperstone, IC Markets)
- [x] Roadmap de expansión regulatoria (Etapas 0–4)
- [x] Arquitectura multi-entidad definida conceptualmente
- [x] Dominio D9 (Expansion Readiness) definido conceptualmente
- [x] Prompt para Antigravity v3.0 preparado
- [x] Todos los archivos MD del proyecto creados y estructurados
- [x] 6 documentos regulatorios oficiales descargados (FAIS Act, BN194, Securities Act, Financial Services Act, FIAMLA Regs, SEM Capital Rules)
- [x] Arquitectura de archivos MD estandarizada (ARQUITECTURA_MD.md)
- [x] **Fase 1 MVP:** Estructura de controles, base de datos seed, API FastAPI, Dashboard con radar y Calendario.
- [x] **Agrupación colapsable (v1.1.0):** Sección expandible/colapsable por dominio (D1-D8) en la tabla del Universo con total de controles y madurez promedio dinámica en cabecera.
- [x] **Backup automático:** Configuración del repositorio remoto git con Token de Acceso Personal para resguardos desatendidos.
- [x] **Fase 2 Evidencias (v1.2.0):** Repositorio de documentos en Supabase Storage, flujo de revisión y aprobación (UI + DB), simulador de roles para pruebas de control de acceso.
- [x] **Fase 3 Inteligencia (v1.3.0):** Monitor D8 automático de cambios normativos, almacenamiento de alertas legislativas, flujo de revisión con impacto directo en el Universo de Controles, y envío de correos reales con Resend.

---

## 🔴 Pendiente / En progreso

- [ ] Stack de Supabase + Vercel: pendiente de deploy en producción.
- [ ] NotebookLM: documentos aún no subidos por Mauro.

---

## ⚡ Próximos pasos inmediatos (Fase 4)

1. **Maturity Assessment interactivo**: Pantallas dedicadas para auditoría periódica de niveles CMMI.
2. **Generación de Reportes PDF/Excel**: Exportar reportes del estado actual de compliance y madurez para auditores.
3. **Deploy final**: Configurar variables de entorno y lanzar producción en Vercel + Supabase.

---

## 🚧 Blockers activos

| Blocker | Descripción | Responsable |
|---|---|---|
| NotebookLM no configurado | Los documentos regulatorios no están subidos aún. El MCP de NotebookLM no puede usarse hasta que estén indexados. | Mauro |

---

## Archivos del proyecto

| Archivo | Propósito | Estado |
|---|---|---|
| `stoicfx_compliance_project.md` | Brief técnico completo para Antigravity | ✅ Listo v3.0 |
| `ObjetivoyGuia.md` | Norte del proyecto | ✅ Listo |
| `RULES.md` | Reglas operativas para Antigravity | ✅ Listo |
| `ESTADO.md` | Este archivo | ✅ Listo |
| `Memoria.md` | Decisiones técnicas | ✅ Seed inicial listo |
| `Contexto.md` | Conocimiento del dominio | ✅ Seed inicial listo |
| `Changelog.md` | Historial de versiones | ✅ Listo |
| `OportunidadesDeMejora.md` | Backlog futuro | ✅ Listo |
| `BROKERSTIER.md` | Benchmark competitivo | ✅ Listo |
| `WORTHITORNOT.md` | Análisis de viabilidad | ✅ Listo |
| `ARQUITECTURA_MD.md` | Guía de arquitectura MD | ✅ Listo |
| `RegulacionNotebook.md` | Fuentes para NotebookLM — regulación | ✅ Listo |
| `BrokerstiersNotebook.md` | Fuentes para NotebookLM — benchmark | ✅ Listo |

---

*Actualizado: 19 de junio de 2026 — Progreso Fase 3 (Notificaciones, Alertas y Cron Vercel)*

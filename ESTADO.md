# ESTADO
## Stoic FX Compliance Management System — Estado actual del proyecto

> Este archivo se actualiza al final de cada sesión de trabajo.
> Es el primer archivo que Mauro lee al retomar el proyecto.
> Última actualización: 20 de junio de 2026

---

## Versión actual

| Ambiente | Versión | Estado |
|---|---|---|
| Producción | v1.4.1 — Conectividad de API y Almacenamiento | ✅ Deployado |
| Desarrollo | v1.4.1 — Conectividad de API y Almacenamiento | ✅ Completado |

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
- [x] 6 documentos regulatorios oficiales descargados (FAIS Act, BN194, Securities Act, Financial Services Act, FIAMLA Regs, SEM Capital Rules) + 3 documentos FSC adicionales descargados manualmente
- [x] Arquitectura de archivos MD estandarizada (ARQUITECTURA_MD.md)
- [x] **NotebookLM configurado:** 3 notebooks creados con URLs reales registradas en RULES.md
  - RegulacionNotebook: https://notebooklm.google.com/notebook/fbd867e6-0516-4f48-9033-f1460cac3758
  - MetodologiaNotebook: https://notebooklm.google.com/notebook/c6bfaec3-3746-4e76-9989-12cd120b663a
  - BrokerstiersNotebook: https://notebooklm.google.com/notebook/bf129b3f-4466-4e73-9a60-170323c47059
- [x] **Fase 1 MVP (v1.0.0):** Estructura de controles, base de datos seed, API FastAPI, Dashboard con radar y Calendario
- [x] **Agrupación colapsable (v1.1.0):** Sección expandible/colapsable por dominio (D1–D8) con total de controles y madurez promedio dinámica
- [x] **Backup automático:** Repositorio remoto Git con PAT configurado
- [x] **Fase 2 Evidencias (v1.2.0):** Repositorio de documentos en Supabase Storage, flujo de revisión y aprobación, simulador de roles
- [x] **Fase 3 Inteligencia (v1.3.0):** Monitor D8 automático de cambios normativos, alertas legislativas, impacto directo en Universo de Controles, envío de correos reales con Resend
- [x] **Fase 4 Madurez y Reportes (v1.4.0):** Evaluación de madurez CMMI interactiva, heatmap, planes de acción automáticos y centro de reportes (exportación CSV e impresión PDF en A4).

---

## 🔴 Pendiente / En progreso

- [x] Conectar Supabase Storage real (bucket 'compliance-evidence' y variables cargadas desde .env.local)

---

## ⚡ Próximos pasos inmediatos (Fase de producción final)

1. **Pruebas integrales de extremo a extremo** con los roles de usuario en el servidor desplegado.
2. **Conectar Supabase Storage real** configurando políticas de almacenamiento en lugar del almacenamiento simulado local.

---

## 🚧 Blockers activos

Ninguno activo al 19 de junio de 2026.

---

## Archivos del proyecto

| Archivo | Propósito | Estado |
|---|---|---|
| `stoicfx_compliance_project.md` | Brief técnico completo para Antigravity | ✅ Listo v3.0 |
| `ObjetivoyGuia.md` | Norte del proyecto | ✅ Listo |
| `RULES.md` | Reglas operativas para Antigravity (incluye URLs de notebooks) | ✅ Listo |
| `ESTADO.md` | Este archivo | ✅ Listo |
| `Memoria.md` | Decisiones técnicas | ✅ Listo |
| `Contexto.md` | Conocimiento del dominio | ✅ Listo |
| `Changelog.md` | Historial de versiones | ✅ Listo v1.4.0 |
| `OportunidadesDeMejora.md` | Backlog futuro (12 ítems) | ✅ Listo |
| `BROKERSTIER.md` | Benchmark competitivo | ✅ Listo |
| `WORTHITORNOT.md` | Beneficios del sistema | ✅ Listo (reescrito 19-jun) |
| `ARQUITECTURA_MD.md` | Guía de arquitectura MD | ✅ Listo |
| `SesionDiagnostico.md` | Guía para sesión de diagnóstico con el equipo antes de presentar a Mike | ✅ Listo |
| `RegulacionNotebook.md` | Fuentes para NotebookLM — regulación | ✅ Listo |
| `BrokerstiersNotebook.md` | Fuentes para NotebookLM — benchmark | ✅ Listo |
| `MetodologiaNotebook.md` | Fuentes para NotebookLM — metodología CMMI/ISO/COBIT | ✅ Listo |

---

*Actualizado: 20 de junio de 2026 — fin de Fase 4 con Antigravity*

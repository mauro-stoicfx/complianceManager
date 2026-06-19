# Changelog
## Stoic FX — Compliance Management System

> Registro histórico de cambios del proyecto.
> Antigravity agrega una entrada al final de cada sesión de trabajo.
> Nunca se modifica el historial — solo se agregan entradas nuevas.
> Formato: semver (MAJOR.MINOR.PATCH)

---

## [v1.1.0] — 2026-06-19
### Added
- **Universo Regulatorio Agrupado:** Implementada la agrupación de controles por dominio (D1 a D8) en la tabla principal con cabeceras dinámicas y soporte para expandir/colapsar secciones de manera independiente.
- **Estadísticas de Dominio:** Muestra de manera dinámica en la cabecera de cada dominio el total de controles y la madurez CMMI promedio para dicho grupo.
- **Visualización de Versión:** Se muestra la etiqueta de la versión activa (`v1.1.0`) en la cabecera principal del sistema.
- **Backup Automatizado:** Integración de la autenticación mediante GitHub Personal Access Token (PAT) en el flujo Git local para posibilitar resguardos automáticos en el repositorio `complianceManager`.

### Fixed
- Corrección de un error de sintaxis en `src/controls_data.ts` (uso de `None` en lugar de `null` en el control `D3-F05`), el cual causaba pantalla en blanco al cargar la aplicación.

---

## [v1.0.0] — 2026-06-19
### Added
- Inicialización del proyecto Frontend con Vite, React, TypeScript y Tailwind CSS.
- **[App.tsx](file:///c:/Users/mauro/OneDrive/S/STOICFX/Compliance%2520Project/StoicFX%2520Compliance%2520Manager/src/App.tsx):** Interfaz web premium con vista de login, dashboard interactivo con KPIs de compliance, gráfico de radar SVG de madurez CMMI, calendario de vencimientos, tabla del Universo Regulatorio y **selector de idiomas (Español / Inglés)** para toda la interfaz y catálogo de controles.
- **[main.py](file:///c:/Users/mauro/OneDrive/S/STOICFX/Compliance%2520Project/StoicFX%2520Compliance%2520Manager/api/main.py):** API FastAPI con endpoints para controles, calendario y dashboard, integrando base de datos dual (Supabase / local in-memory fallback).
- **[schema.sql](file:///c:/Users/mauro/OneDrive/S/STOICFX/Compliance%2520Project/StoicFX%2520Compliance%2520Manager/supabase/migrations/20260619000000_init.sql) y [seed.sql](file:///c:/Users/mauro/OneDrive/S/STOICFX/Compliance%2520Project/StoicFX%2520Compliance%2520Manager/supabase/migrations/20260619000001_seed.sql):** Esquemas de base de datos inicial y datos de semilla para los controles D1 a D8 de FSCA y FSC Mauritius.
- Artifacts de seguimiento del agente: [task.md](file:///C:/Users/mauro/.gemini/antigravity-ide/brain/6255bfaa-4fd5-4045-ab9e-9c9aed03c291/task.md) e [implementation_plan.md](file:///C:/Users/mauro/.gemini/antigravity-ide/brain/6255bfaa-4fd5-4045-ab9e-9c9aed03c291/implementation_plan.md).

---

## [v0.3.0] — 2026-06-18
### Added
- `ARQUITECTURA_MD.md` — guía maestra de arquitectura de archivos MD para todos los proyectos con Antigravity. Incluye 8 tipos de archivo (OBLIGATORIO/RECOMENDADO), propósito, contenido mínimo y reglas de mantenimiento de cada uno.
- `ESTADO.md` — nuevo archivo de snapshot del estado actual del proyecto (propuesta de mejora implementada)
- `Contexto.md` — nuevo archivo de conocimiento del dominio, separado de `Memoria.md` (propuesta de mejora implementada)
- `Memoria.md` — seed inicial con arquitectura del sistema, modelo de datos SQL, decisiones técnicas clave y variables de entorno
- `ObjetivoyGuia.md` — norte del proyecto con KPIs de éxito, fases y estructura de dominios
- `RULES.md` — reglas operativas completas: stack (Supabase + Vercel + React + FastAPI), MCPs, convenciones, GitHub, seguridad
- `OportunidadesDeMejora.md` — backlog inicial con mejoras identificadas durante el diseño
- `RegulacionNotebook.md` — índice de fuentes regulatorias para NotebookLM
- `BrokerstiersNotebook.md` — índice de fuentes de benchmark para NotebookLM
- `BROKERSTIER.md` — mapa regulatorio completo de brokers tier-1 con benchmark vs. Stoic FX y roadmap de expansión
- `WORTHITORNOT.md` — análisis de viabilidad y valor estratégico del programa de compliance

### Changed
- `stoicfx_compliance_project.md` actualizado a v3.0: incorpora modelo de madurez CMMI (campos `nivel_madurez` y `justificacion_nivel`), sección de madurez por dominio, módulo Maturity Assessment, y radar chart en Dashboard

---

## [v0.2.0] — 2026-06-17
### Added
- `stoicfx_compliance_project.md` v2.0: reorganización completa del Regulatory Universe en 8 dominios tipo ISO 27001 Annex A (D1–D8)
- Tablas detalladas de controles para FSCA (Sudáfrica): D1 a D8
- Tablas detalladas de controles para FSC Mauritius: D1 a D8
- Prompt para Antigravity (Sección 9 del brief)
- 6 documentos regulatorios oficiales descargados: FAIS Act, BN194, Securities Act 2005, Financial Services Act 2007, FIAMLA Regulations 2018, SEM Capital Adequacy Rules 2010

### Changed
- Identificación de Mauritius como segunda jurisdicción regulatoria (antes solo FSCA)
- Stack actualizado: Supabase reemplaza PostgreSQL standalone

---

## [v0.1.0] — 2026-06-17
### Added
- `stoicfx_compliance_project.md` v1.0: primera versión del brief con contexto del negocio, 4 módulos del sistema (Regulatory Universe, Calendar, Evidence Repository, Regulatory Intelligence), arquitectura básica y fases de implementación
- Definición inicial de la estructura del proyecto como sistema de compliance para FSCA + FSC Mauritius
- Identificación del paralelismo con ISO 27001 Annex A como metodología base
- Identificación de los 8 dominios regulatorios

### Context
- Sesión inicial de diseño: Mauro Serrano + Perplexity Computer
- Punto de partida: empresa de 6 personas, 2 licencias activas (FSCA + FSC Mauritius), compliance a cargo de una sola persona

---

*Próximas entradas serán agregadas por Antigravity durante el desarrollo*

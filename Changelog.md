# Changelog
## Stoic FX — Compliance Management System

> Registro histórico de cambios del proyecto.
> Antigravity agrega una entrada al final de cada sesión de trabajo.
> Nunca se modifica el historial — solo se agregan entradas nuevas.
> Formato: semver (MAJOR.MINOR.PATCH)

---

## [v1.4.3] — 2026-06-20
### Fixed
- **Ruta de Importación en Entorno Serverless de Vercel:** Añadido `sys.path` hack al inicio de [main.py](file:///c:/Users/mauro/OneDrive/S/STOICFX/Compliance%20Project/StoicFX%20Compliance%20Manager/api/main.py) para inyectar dinámicamente el directorio raíz del proyecto y el de la API. Esto previene el error 500 originado porque Vercel no encontraba la ruta del módulo `from api.controls_data import ...` cuando la función se ejecuta desde el directorio `/api`.
- **Incremento de Versión Semántica:** Bump de la versión a `1.4.3` en [package.json](file:///c:/Users/mauro/OneDrive/S/STOICFX/Compliance%20Project/StoicFX%20Compliance%20Manager/package.json), [App.tsx](file:///c:/Users/mauro/OneDrive/S/STOICFX/Compliance%20Project/StoicFX%20Compliance%20Manager/src/App.tsx) y [ESTADO.md](file:///c:/Users/mauro/OneDrive/S/STOICFX/Compliance%20Project/StoicFX%20Compliance%20Manager/ESTADO.md).

---

## [v1.4.2] — 2026-06-20
### Fixed
- **Dependencias de Producción en Backend (requirements.txt):** Creado el archivo [requirements.txt](file:///c:/Users/mauro/OneDrive/S/STOICFX/Compliance%20Project/StoicFX%20Compliance%20Manager/api/requirements.txt) en la carpeta `api` con las dependencias requeridas (`fastapi`, `supabase`, `resend`, `python-dotenv`, `pydantic`, `uvicorn`). Esto soluciona el error 500 (FUNCTION_INVOCATION_FAILED) en Vercel originado por la falta de paquetes de Python en producción.
- **Incremento de Versión Semántica:** Bump de la versión a `1.4.2` en [package.json](file:///c:/Users/mauro/OneDrive/S/STOICFX/Compliance%20Project/StoicFX%20Compliance%20Manager/package.json), [App.tsx](file:///c:/Users/mauro/OneDrive/S/STOICFX/Compliance%20Project/StoicFX%20Compliance%20Manager/src/App.tsx) y [ESTADO.md](file:///c:/Users/mauro/OneDrive/S/STOICFX/Compliance%20Project/StoicFX%20Compliance%20Manager/ESTADO.md).

---

## [v1.4.1] — 2026-06-20
### Fixed
- **Enrutamiento de Monitoreo de Salud de la API en Producción:** Corregida la ruta de salud de `/health` a `/api/health` en el frontend y en la API del backend ([main.py](file:///c:/Users/mauro/OneDrive/S/STOICFX/Compliance%20Project/StoicFX%20Compliance%20Manager/api/main.py) y [App.tsx](file:///c:/Users/mauro/OneDrive/S/STOICFX/Compliance%20Project/StoicFX%20Compliance%20Manager/src/App.tsx)) para que Vercel enrute las peticiones correctamente a las funciones de servidor y el sitio salga de "Local Mode (In-memory)" en producción.
- **Incremento de Versión Operativa:** Elevado el número de versión a `1.4.1` en [package.json](file:///c:/Users/mauro/OneDrive/S/STOICFX/Compliance%20Project/StoicFX%20Compliance%20Manager/package.json), [App.tsx](file:///c:/Users/mauro/OneDrive/S/STOICFX/Compliance%20Project/StoicFX%20Compliance%20Manager/src/App.tsx) y en la visualización del sitio para garantizar versionamiento semántico progresivo.

---

## [v1.4.0] — 2026-06-20
### Added
- **Evaluación de Madurez CMMI (Fase 4):** Creada la nueva pestaña "Madurez CMMI" interactiva que despliega un heatmap de distribución de madurez (niveles 0-5) sobre los 8 dominios de control regulados.
- **Acceso Directo a Auditorías:** Habilitado el panel de auditoría directa para que el Administrador/Oficial de Compliance modifique el nivel de madurez, madurez objetivo, justificación de auditoría y notas internas por control.
- **Planes de Acción Correctiva:** Motor automatizado que genera recomendaciones de acción correctiva en tiempo real para controles con una brecha de madurez (`maturity_level < maturity_target`).
- **Centro de Reportes y Auditorías (Fase 4):** Creada la pestaña "Informes" que unifica la exportación del inventario general a formato CSV y la generación de reportes formales PDF a través de hojas de estilo de impresión `@media print` con optimizaciones A4.
- **Conexión de Almacenamiento Real (Supabase Storage):** Verificada la conexión al bucket `compliance-evidence` y la base de datos real. Modificado [main.py](file:///c:/Users/mauro/OneDrive/S/STOICFX/Compliance%20Project/StoicFX%20Compliance%20Manager/api/main.py) para cargar de forma automática las variables de entorno de [.env.local](file:///c:/Users/mauro/OneDrive/S/STOICFX/Compliance%20Project/StoicFX%20Compliance%20Manager/.env.local) usando `python-dotenv` en desarrollo local.
- **Acordeones de Dominios Colapsados por Defecto:** Modificado el estado inicial en [App.tsx](file:///c:/Users/mauro/OneDrive/S/STOICFX/Compliance%20Project/StoicFX%20Compliance%20Manager/src/App.tsx) para que todos los dominios (D1-D8) en la vista de Universo Regulatorio se muestren consolidados (colapsados) de manera predeterminada al cargar la aplicación.
- **URLs de API Dinámicas en Producción:** Corregidas las llamadas hardcodeadas de `http://localhost:8000` en [EvidenceRepository.tsx](file:///c:/Users/mauro/OneDrive/S/STOICFX/Compliance%20Project/StoicFX%20Compliance%20Manager/src/components/EvidenceRepository.tsx) reemplazándolas con una variable `API_BASE_URL` dinámica (vacía en producción para resolver rutas relativas a las Vercel Functions y apuntando a puerto 8000 en desarrollo).

---

## [v1.3.0] — 2026-06-20
### Added
- **Módulo de Inteligencia Regulatoria (Fase 3 - D8):** Implementada la pestaña interactiva "Inteligencia D8" en el frontend para monitorear novedades de FSCA y FSC Mauritius.
- **Detalle y Análisis de Cambios:** Diseñada una pantalla a doble panel en el frontend con soporte para revisar alertas normativas, registrar medidas adoptadas (`action_taken`) y vincular múltiples controles de compliance directamente.
- **Impacto Dinámico en Controles:** Al vincular un cambio normativo, los controles afectados del Universo Regulatorio se actualizan automáticamente al estado "En riesgo" para requerir re-evaluación.
- **Monitoreo Automatizado (Backend):** Implementado el script `api/jobs/monitor_d8.py` para consultar/simular cambios legislativos y notificar por correo electrónico real con Resend.
- **Endpoints de FastAPI:** Expuestas APIs para listar, revisar cambios normativos y gatillar el cron (`/api/cron/monitor-d8`).
- **Migración de Base de Datos:** Creado el script SQL para la tabla `regulatory_changes` con políticas RLS de seguridad.

---

## [v1.2.0] — 2026-06-19
### Added
- **Repositorio de Evidencias (Fase 2):** Creado el nuevo módulo de Evidencias en la UI para listar, filtrar, descargar y subir soporte documental regulatorio por control.
- **Flujo de Aprobación:** Soporte en backend y frontend para la revisión de evidencias (Aprobada / Rechazada) con registro de notas de auditoría y simulación de alertas de correo en consola.
- **Simulador de Roles de Desarrollo:** Añadido un selector interactivo de roles en la cabecera del sistema para alternar rápidamente entre Admin (Mauro), Oficial de Compliance y Miembro del Equipo en ambiente de desarrollo local.
- **Carga Directa desde Control:** Añadido un botón de subida directa de archivos en el Drawer de evaluación de cada control individual, reflejando el histórico de versiones cargadas.
- **Migración SQL de Evidencias:** Creado el script `20260619000002_create_evidence_files.sql` para la base de datos de Supabase.

### Changed
- **Dependencias del Proyecto:** Instalación de los paquetes de desarrollo `@types/react` y `@types/react-dom` para solventar problemas de compilación en el compilador de TypeScript.

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

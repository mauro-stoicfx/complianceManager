# RULES
## Reglas operativas del proyecto — Stoic FX Compliance Management System

> Antigravity debe leer y cumplir estas reglas en cada sesión sin que se las recuerden explícitamente.
> Solo Mauro puede modificar este archivo.

---

## Stack tecnológico — NO cambiar sin aprobación

| Capa | Tecnología | Notas |
|---|---|---|
| Frontend | React + TypeScript | Componentes funcionales, hooks |
| Estilos | Tailwind CSS | Sin CSS modules ni styled-components |
| Backend | FastAPI (Python) | Para endpoints y lógica de negocio |
| Base de datos | Supabase (PostgreSQL) | Usar Supabase RLS para control de acceso por rol |
| Almacenamiento archivos | Supabase Storage | Para el repositorio de evidencias |
| Auth | Supabase Auth + Google OAuth | No implementar auth propio |
| Deploy | Vercel (frontend) | Backend en Vercel Functions o separado según complejidad |
| Control de versiones | GitHub | Repositorio privado |
| Versionamiento | Semantic Versioning (semver) | MAJOR.MINOR.PATCH |

---

## MCPs activos en este proyecto

| MCP | Propósito | Cuándo usarlo |
|---|---|---|
| **NotebookLM** | Consultar documentación de regulación, metodología y benchmarks | Antes de implementar cualquier lógica de negocio relacionada con compliance |
| **TradingView** | Referencia para datos de mercado si se integran en el futuro | Solo cuando el scope lo requiera explícitamente |
| **Supabase MCP** | Gestión directa de base de datos y storage | Para migraciones y consultas durante desarrollo |
| **GitHub MCP** | Control de versiones y PRs | Para commits, branches y releases |

**Instrucción:** Antes de implementar una regla de negocio sobre regulación (ej: qué campos requiere Form A de FSCA, qué plazo tiene el Capital Adequacy Return de FSC), consultar primero el MCP de NotebookLM con el notebook correspondiente. No inventar ni asumir reglas regulatorias.

**Qué notebook consultar según el tipo de pregunta:**

| Pregunta | Notebook | URL |
|---|---|---|
| ¿Qué exige la regulación? ¿Qué dice el FAIS Act / FSC sobre X? | **RegulacionNotebook** | https://notebooklm.google.com/notebook/fbd867e6-0516-4f48-9033-f1460cac3758 |
| ¿Qué tienen Oanda, Pepperstone, ICMarkets? ¿Cuántas licencias necesitamos? | **BrokerstiersNotebook** | https://notebooklm.google.com/notebook/bf129b3f-4466-4e73-9a60-170323c47059 |
| ¿Cómo medimos el nivel de madurez? ¿Qué es CMMI nivel 3? ¿Cómo aplicamos ISO 27001? | **MetodologiaNotebook** | https://notebooklm.google.com/notebook/c6bfaec3-3746-4e76-9989-12cd120b663a |

**Instrucción de autenticación NotebookLM:** Al inicio de cada sesión, antes de hacer cualquier consulta a NotebookLM vía MCP, verificar que la autenticación con Google está activa. Si no hay sesión válida, abrir ventana de navegador para que Mauro complete el login de Google antes de continuar. No intentar consultar NotebookLM sin autenticación confirmada.

---

## Convenciones de código

### Naming
- Componentes React: PascalCase (`RegulatoryUniverse.tsx`)
- Funciones y variables: camelCase (`getMaturityLevel`)
- Constantes: UPPER_SNAKE_CASE (`MAX_MATURITY_LEVEL`)
- Archivos de página: kebab-case (`regulatory-universe.tsx`)
- Tablas de base de datos: snake_case (`regulatory_controls`, `evidence_files`)
- IDs de controles: formato dominio-jurisdicción-número (`D1-F01`, `D3-M04`)

### Estructura de carpetas (frontend)
```
/src
  /components     → Componentes reutilizables
  /pages          → Vistas principales (una por módulo)
  /hooks          → Custom hooks
  /lib            → Clientes de Supabase, utilitarios
  /types          → Interfaces TypeScript
  /constants      → Constantes del dominio (dominios, jurisdicciones, niveles de madurez)
```

### Estructura de carpetas (backend)
```
/api
  /routers        → Endpoints por módulo
  /models         → Modelos Pydantic
  /services       → Lógica de negocio
  /db             → Queries y conexión Supabase
```

---

## Control de versiones — GitHub

- **Repositorio del proyecto:** [complianceManager](https://github.com/mauro-stoicfx/complianceManager.git)
- **Branch principal:** `main` (siempre deployable)
- **Branch de desarrollo:** `develop`
- **Feature branches:** `feature/nombre-de-feature`
- **Fix branches:** `fix/descripcion-del-fix`
- **Commits:** formato `tipo(scope): descripción` — ej: `feat(regulatory-universe): add maturity level field`
- **PRs:** siempre desde feature/fix → develop → main
- **Tags de release:** al mergear a main, crear tag `v1.0.0`

**Antes de cada commit:**
1. Verificar que no hay credenciales ni secrets en el código
2. Verificar que el ESTADO.md está actualizado
3. Agregar entrada al Changelog.md
4. Correr linting (`npm run lint`)

---

## Supabase — reglas específicas

- Todas las variables de conexión van en `.env.local` (nunca en el código)
- Usar Row Level Security (RLS) para todos los accesos a datos por rol
- Esquema de roles: `admin`, `compliance_officer`, `team_member`
- Nunca usar la service key en el frontend — solo en el backend
- Migrations siempre versionadas en `/supabase/migrations/`

---

## Vercel — reglas de deploy

- Variables de entorno configuradas en el dashboard de Vercel, no en archivos
- Preview deployments activados para cada PR
- Production deploy solo desde `main`
- Domain: a definir por Mauro

---

## Seguridad — reglas no negociables

- NUNCA hardcodear API keys, passwords o tokens en el código
- NUNCA exponer la Supabase service key en el cliente
- Todos los endpoints del backend requieren autenticación excepto el health check
- Los datos de clientes del broker (si se integran en el futuro) requieren aprobación explícita de Mauro antes de cualquier implementación

---

## Lo que Antigravity NO debe hacer nunca

- Modificar `RULES.md` o `ObjetivoyGuia.md` sin aprobación explícita de Mauro
- Cambiar el stack tecnológico sin aprobación
- Implementar lógica regulatoria sin consultar NotebookLM primero
- Hacer deploy a producción sin que Mauro lo indique
- Borrar datos de la base de datos sin confirmación explícita
- Asumir que un control regulatorio "ya no aplica" sin verificarlo en la documentación

---

*Última revisión: 19 de junio de 2026 — Mauro Serrano*

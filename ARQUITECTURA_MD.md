# ARQUITECTURA_MD
## Guía maestra de archivos de proyecto para desarrollo con agentes IA

> Este documento define la arquitectura estándar de archivos `.md` que todo proyecto desarrollado con Antigravity debe tener.
> Su propósito es doble: (1) servir como onboarding para el agente en cada sesión nueva, y (2) ser la regla que garantiza consistencia entre proyectos.
>
> **Instrucción para Antigravity:** Al iniciar cualquier proyecto nuevo, crea todos los archivos marcados como OBLIGATORIO. Los marcados RECOMENDADO se crean cuando el proyecto lo justifica. Lee todos los existentes antes de escribir una sola línea de código.

---

## Por qué existe esta arquitectura

Los agentes IA tienen un problema estructural: **pierden contexto entre sesiones**. Sin un sistema de memoria explícito, cada chat nuevo empieza de cero — el agente repite errores ya resueltos, revierte decisiones tomadas, y pierde el norte del proyecto.

Esta arquitectura resuelve ese problema distribuyendo la memoria en archivos especializados. Cada archivo responde una pregunta distinta:

| Pregunta | Archivo |
|---|---|
| ¿Hacia dónde vamos y por qué? | `ObjetivoyGuia.md` |
| ¿Cómo hay que trabajar en este proyecto? | `RULES.md` |
| ¿Qué hay construido y en qué estado está? | `ESTADO.md` |
| ¿Qué decisiones técnicas se tomaron y por qué? | `Memoria.md` |
| ¿Qué conocimiento del dominio necesito? | `Contexto.md` |
| ¿Qué cambió y cuándo? | `Changelog.md` |
| ¿Qué queda pendiente para el futuro? | `OportunidadesDeMejora.md` |
| ¿Qué documentación vive en NotebookLM? | `*Notebook.md` |

---

## Archivos del proyecto

---

### 1. `ObjetivoyGuia.md`
**Clasificación:** OBLIGATORIO  
**Lo lee:** Antigravity al inicio de cada sesión  
**Propósito:** Define el norte del proyecto. Es la única fuente de verdad sobre para qué existe esto y qué problema resuelve. Evita que el agente optimice en la dirección equivocada.

**Contenido mínimo:**
- Nombre y descripción del proyecto en 2-3 líneas
- El problema que resuelve (el "por qué")
- El usuario principal y sus necesidades
- El norte a largo plazo (visión a 12-24 meses)
- Lo que explícitamente NO es este proyecto (para evitar scope creep)
- KPIs o criterios de éxito

**Reglas de mantenimiento:**
- Solo Mauro lo modifica
- Se revisa al inicio de cada fase importante
- Si el norte cambia, se versiona con fecha antes de modificar

**Ejemplo de estructura:**
```
# [Nombre del proyecto]
## El problema
## La solución
## Usuario principal
## Norte a largo plazo
## Fuera de scope
## Cómo medimos el éxito
```

---

### 2. `RULES.md`
**Clasificación:** OBLIGATORIO  
**Lo lee:** Antigravity antes de escribir cualquier código  
**Propósito:** Las restricciones operativas del agente. Define cómo trabajar, no qué construir. Antigravity debe cumplir estas reglas en cada sesión sin necesidad de que se las recuerden.

**Contenido mínimo:**
- Stack tecnológico fijo (lenguajes, frameworks, servicios)
- MCPs activos y cómo usarlos
- Convenciones de código (naming, estructura de carpetas)
- Reglas de control de versiones (GitHub, semver, ramas)
- Servicios de deploy y base de datos
- Reglas de seguridad (variables de entorno, secretos)
- Qué hacer antes de cada commit
- Qué no hacer nunca (ej: no hardcodear credenciales, no modificar RULES.md sin aprobación)

**Reglas de mantenimiento:**
- Solo Mauro lo modifica
- Cualquier cambio de stack o MCP se refleja aquí primero
- Antigravity puede proponer cambios pero no implementarlos sin aprobación

---

### 3. `ESTADO.md`
**Clasificación:** OBLIGATORIO  
**Lo lee:** Antigravity al inicio de cada sesión, antes que cualquier otro archivo  
**Propósito:** Snapshot del estado actual del proyecto. Responde "¿dónde estamos parados ahora mismo?". Es diferente al Changelog (que es histórico) — esto es solo el presente.

**Contenido mínimo:**
- Versión actual en producción
- Versión en desarrollo (si aplica)
- Qué está funcionando (checklist verde)
- Qué está roto o incompleto (checklist rojo)
- Próximos 3 pasos inmediatos
- Blockers activos (si los hay)
- Última fecha de actualización

**Reglas de mantenimiento:**
- Antigravity lo actualiza al final de CADA sesión de trabajo
- Si hay algo roto y no se resuelve en la sesión, queda marcado en rojo con contexto
- Es el primer archivo que Mauro lee cuando retoma el proyecto después de un pauso

---

### 4. `Memoria.md`
**Clasificación:** OBLIGATORIO  
**Lo lee:** Antigravity cuando necesita entender decisiones técnicas pasadas  
**Propósito:** Memoria técnica del proyecto. Documenta decisiones de implementación, patrones elegidos, problemas resueltos y cómo se resolvieron. Es el puente entre sesiones — cuando el chat muere, este archivo garantiza que el contexto técnico no se pierde.

**Contenido mínimo:**
- Arquitectura general del sistema (diagrama o descripción)
- Decisiones técnicas clave con su justificación (ej: "usamos Supabase RLS en lugar de middleware propio porque...")
- Patrones de código establecidos con ejemplos
- Problemas conocidos y cómo se resolvieron
- Dependencias no obvias entre módulos
- Variables de entorno requeridas (nombres, no valores)

**Reglas de mantenimiento:**
- Antigravity lo actualiza cuando toma una decisión técnica relevante
- Se escribe en tiempo pasado y presente, nunca futuro (eso va en OportunidadesDeMejora)
- Si una decisión anterior se revierte, se documenta por qué

**Diferencia con Contexto.md:**
- `Memoria.md` = cómo está construido el sistema
- `Contexto.md` = conocimiento del dominio de negocio

---

### 5. `Contexto.md`
**Clasificación:** OBLIGATORIO cuando el proyecto tiene dominio especializado  
**Lo lee:** Antigravity cuando necesita entender el negocio detrás del código  
**Propósito:** Conocimiento del dominio que el agente necesita para tomar buenas decisiones de producto. Sin este archivo, el agente puede construir algo técnicamente correcto pero funcionalmente incorrecto para el negocio.

**Contenido mínimo:**
- Glosario de términos del dominio
- Actores del sistema y sus roles
- Reglas de negocio críticas (las que no son obvias)
- Restricciones del dominio (ej: regulaciones, limitaciones legales)
- Relaciones entre entidades del negocio

**Reglas de mantenimiento:**
- Mauro lo actualiza cuando el agente comete errores por falta de contexto de dominio
- Antigravity puede proponer adiciones cuando identifica ambigüedades
- No contiene código ni decisiones técnicas (eso va en Memoria.md)

---

### 6. `Changelog.md`
**Clasificación:** OBLIGATORIO  
**Lo lee:** Antigravity cuando necesita entender la evolución del proyecto  
**Propósito:** Registro histórico de cambios. Evita que el agente revierta decisiones ya tomadas o contradiga cambios anteriores. También sirve como bitácora para Mauro.

**Formato estándar (semver):**
```
## [v1.2.0] — 2026-06-18
### Added
- Nueva funcionalidad X
### Changed
- Se modificó Y porque Z
### Fixed
- Bug en W resuelto cambiando V
### Removed
- Se eliminó U porque ya no aplica
```

**Reglas de mantenimiento:**
- Antigravity agrega una entrada al final de cada sesión de trabajo
- Mauro aprueba las entradas antes del siguiente commit
- Nunca se modifica el historial — solo se agregan entradas nuevas

---

### 7. `OportunidadesDeMejora.md`
**Clasificación:** OBLIGATORIO  
**Lo lee:** Antigravity cuando busca qué construir en el siguiente release  
**Propósito:** Backlog de ideas y mejoras futuras. Captura lo que se identifica durante el desarrollo pero no entra en el sprint actual. Evita perder ideas y evita que el scope actual se infle.

**Contenido mínimo por entrada:**
- Título de la mejora
- Descripción breve
- Impacto estimado (Alto / Medio / Bajo)
- Complejidad estimada (Alta / Media / Baja)
- Release sugerido (próximo / mediano plazo / largo plazo)

**Reglas de mantenimiento:**
- Antigravity agrega ítems cuando identifica mejoras durante el desarrollo
- Mauro prioriza y mueve ítems entre releases
- Cuando un ítem se implementa, se mueve al Changelog, no se borra

---

### 8. Archivos `*Notebook.md`
**Clasificación:** RECOMENDADO (OBLIGATORIO en proyectos con dominio especializado)  
**Lo lee:** NotebookLM (se sube como fuente). Antigravity lo referencia para saber qué consultar.  
**Propósito:** Documentación estructurada para alimentar NotebookLM. Cada archivo `*Notebook.md` agrupa documentos relacionados de un área de conocimiento. NotebookLM los convierte en un experto consultable vía MCP durante el desarrollo.

**Convención de nomenclatura:** `[AreaDeConocimiento]Notebook.md`

**Ejemplos:**
- `RegulacionNotebook.md` — regulaciones FSCA y FSC, links a PDFs descargados
- `BrokerstiersNotebook.md` — benchmark competitivo de brokers tier-1
- `TechNotebook.md` — documentación de stack: Supabase, Vercel, React, MCP docs
- `MetodologiaNotebook.md` — ISO 27001, CMMI, COBIT de referencia

**Contenido mínimo por archivo:**
- Propósito: qué preguntas puede responder este notebook
- Lista de fuentes incluidas (PDFs, URLs, textos)
- Resumen de cada fuente (para que NotebookLM las indexe mejor)
- Preguntas frecuentes que este notebook debe poder responder

**Reglas de mantenimiento:**
- Cuando se sube una fuente nueva a NotebookLM, se documenta aquí primero
- Se versiona cuando cambia sustancialmente el contenido del notebook
- El MCP de NotebookLM debe estar configurado para cada notebook separado

---

## Resumen — Qué archivo responde cada pregunta

| Cuando el agente necesita saber... | Lee... |
|---|---|
| ¿Qué es este proyecto y hacia dónde va? | `ObjetivoyGuia.md` |
| ¿Cómo debo trabajar y qué herramientas usar? | `RULES.md` |
| ¿En qué estado está el proyecto ahora mismo? | `ESTADO.md` |
| ¿Por qué está construido así? | `Memoria.md` |
| ¿Qué significa este término del negocio? | `Contexto.md` |
| ¿Qué cambió en versiones anteriores? | `Changelog.md` |
| ¿Qué queda para el futuro? | `OportunidadesDeMejora.md` |
| ¿Puedo consultar a un experto sobre X? | `*Notebook.md` → NotebookLM vía MCP |

---

## Cuándo consultar cada NotebookLM

Los archivos `*Notebook.md` son índices de fuentes cargadas en NotebookLM. Cada notebook tiene un propósito distinto. Antigravity debe saber cuál consultar según el tipo de pregunta:

| Si la pregunta es sobre... | Consultar este notebook |
|---|---|
| Obligaciones regulatorias: qué exige FSCA, qué dice el FAIS Act, qué plazo tiene X reporte, qué requiere la FSC Mauritius | **RegulacionNotebook** |
| Competencia y benchmarks: qué licencias tienen Oanda/Pepperstone/ICMarkets, qué es un broker Tier-1, roadmap de expansión | **BrokerstiersNotebook** |
| Metodología: cómo funciona CMMI, qué significa nivel de madurez 3, cómo aplicar ISO 27001 Annex A, qué es COBIT | **MetodologiaNotebook** |

**Regla crítica:** Nunca asumir ni inventar una regla regulatoria. Si la respuesta debe venir de la regulación, consultar RegulacionNotebook antes de escribir código o tomar una decisión.

**Fase actual de los notebooks:** En esta etapa son fuentes de referencia externa (PDFs oficiales, artículos metodológicos). No contienen el estado real de compliance de Stoic — eso vive en la base de datos Supabase. Cuando el sistema esté en producción, se podrán exportar snapshots del estado de compliance y cargarlos como fuente adicional en NotebookLM.

---

## Orden de lectura recomendado para Antigravity al inicio de cada sesión

```
1. ESTADO.md          → ¿Dónde estamos?
2. ObjetivoyGuia.md   → ¿A dónde vamos?
3. RULES.md           → ¿Cómo trabajo?
4. Changelog.md       → ¿Qué ya se hizo?
5. Memoria.md         → ¿Cómo está construido?
6. Contexto.md        → ¿Qué significa el negocio?
7. *Notebook.md       → ¿Qué expertos tengo disponibles?
```

---

*Documento v1.0 — 18 de junio de 2026*
*Autor: Mauro Serrano*
*Propósito: Estándar de arquitectura MD para todos los proyectos desarrollados con Antigravity*

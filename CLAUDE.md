# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Proyecto

Curso e-learning de **Concientización en Protección de Datos de Pago**, alineado con **PCI DSS 4.0.1**. Es una SPA en React empaquetada como **SCORM 1.2** para publicarse en Moodle. El puntaje mínimo de aprobación es 80%.

## Comandos

```bash
npm run dev              # Servidor de desarrollo local (sin LMS — usa localStorage como fallback)
npm run build            # Build de producción en /dist
npm run preview          # Previsualizar el build
npm run package:scorm    # build + genera imsmanifest.xml + ZIP listo para Moodle
```

El ZIP de salida es `resistance-proteccion-datos-de-pago-scorm.zip` en la raíz (definido en `OUTPUT_FILE` de `scripts/package-scorm.js`).

## Arquitectura

### Flujo de datos

Todo el contenido del curso vive en **`src/data/modules.js`**. Este es el único archivo que hay que editar para añadir, reordenar o modificar contenido. Exporta:
- `courseInfo` — título, versión, `passingScore`
- `modules[]` — array de módulos, cada uno con `blocks[]`

`App.jsx` orquesta la navegación, el progreso y la integración SCORM. Llama a `BlockRenderer` que despacha cada bloque a su componente según `block.type`.

### Sistema de bloques (`src/data/modules.js`)

Cada módulo contiene un array de `blocks`. Tipos disponibles (ver también el comentario de cabecera en `modules.js`):

| Tipo | Componente | Uso |
|---|---|---|
| `hero` | `HeroBlock` | Portada del módulo (`title`, `subtitle` en lenguaje simple, `requirements` opcional con los requisitos PCI DSS en texto chico) |
| `text` | `TextBlock` | HTML enriquecido (`content` es HTML raw) |
| `box` | `InfoBox` | Caja destacada — `variant`: `accent`\|`info`\|`warning`\|`success`\|`purple`; soporta `title`, `text` (HTML), `iconItems[]`, `items[]`, `footer` |
| `datatable` | `DataTable` | Selector de chips + panel de detalle (`columns[]`, `rows[]` con `{icon, highlight, cells[]}`) |
| `reading` | `Reading` | Lectura larga con tabla de contenido |
| `flipcard` | `FlipCard` | Tarjetas interactivas frente/reverso |
| `carousel` | `Carousel` | Carrusel de ítems |
| `imageslides` | `ImageSlides` | PPT exportada como imágenes PNG secuenciales |
| `glossary` | `Glossary` | Acordeón de términos con `icon`, `term`, `definition`, `example` |
| `slides` | `Slides` | Presentación JSX interna |
| `infographic` | `Infographic` | Imagen estática (`image:`) o HTML embebido en iframe (`src:`) |
| `iframepresentation` | `IframePresentation` | PPT standalone en HTML cargada en iframe (`src:`) |
| `video` | `VideoPlayer` | Video HTML5 o YouTube (`title`, `description`, `src`). Si un archivo local no carga, muestra "Video en preparación" |
| `quiz` | `Quiz` | Quiz calificado con retroalimentación por pregunta — afecta el desbloqueo de módulos (`passingScore` opcional, default 80) |
| `scenario` | `ScenarioQuiz` | Simulación ramificada con mockups (`sms`\|`email`\|`wifi`\|`whatsapp`\|`instagram`), retroalimentación por opción — diagnóstico, **no bloquea** el avance |
| `scenariobuilder` | `ScenarioBuilder` | Actividad de ordenar (`mode: 'order'`) o seleccionar (`mode: 'select'`) opciones, con distractores — **no bloquea** el avance |
| `selfcheck` | `SelfCheck` | Preguntas de opción única sin calificación, cierre con `resultTitle`/`resultText` fijo |
| `checklist` | `ChecklistCheck` | Checklist de autoevaluación sin calificación, con bandas de resultado (`results.band1/2/3`) |
| `reflection` | `Reflection` | Pregunta de texto libre (`promptPrefix`, `placeholder`), entre 15 y 300 caracteres, que se guarda en `storageKey`. **Obligatoria** salvo `optional: true`. Con `mode: 'recall'` e `items[]` (`{storageKey, label, prompt?}`) muestra las respuestas anteriores |
| `pyramid` | `ValuePyramid` | Pirámide interactiva de niveles con hover |
| `flyer` | `Flyer` | Tarjeta visual destacada (`badge`, `body`, `color`, `icon`) |
| `downloadcard` | `DownloadCard` | Tarjeta con botón que genera un PDF client-side. `variant` mapea a un generador en `src/utils/`: `incidentCard` → `generateIncidentCard` |
| `closing` | `ModuleClosing` | Cierre de módulo (`moduleLabel`, `summary`, `takeaways[]`, `nextHint`) |
| `more` | `MoreBlock` | Plegable "Para profundizar", cerrado por defecto (`title?`, `blocks[]`). Material de consulta fuera del recorrido principal; no cuenta para el 90 % de scroll |
| `connectionnote` | `ConnectionNote` | Nota de transición entre secciones |
| `versus` | `Versus` | Comparativa de dos columnas |
| `riskmatrix` | `RiskMatrix` | Matriz probabilidad × impacto (componente interactivo hardcodeado) |
| `colombiamap` | `ColombiaMap` | Mapa SVG interactivo de Colombia (datos en `public/world-50m.json`) |

Para agregar un generador de PDF nuevo (como `generateIncidentCard.js`), crear el archivo en `src/utils/`, agregarlo al mapa `GENERATORS` en `src/components/activities/DownloadCard.jsx`, y referenciarlo por `variant` desde `modules.js`.

### Integración SCORM (`src/utils/scorm.js`)

Detecta el API SCORM 1.2 (`window.API`) escalando frames de padres. Si no lo encuentra (dev local), cae silenciosamente a `localStorage` con clave `scorm_dev_data`. El progreso del usuario se guarda en `cmi.suspend_data` como JSON. También hay un segundo caché en `localStorage` con clave `lo_curso_progress`.

### Lógica de desbloqueo (`App.jsx`)

Un módulo se considera **completado** cuando:
1. El usuario ha hecho scroll hasta el 90% del contenido (`moduleScrollDone`).
2. Todos los bloques `quiz` del módulo tienen score ≥ su `passingScore` (default 80) (`moduleQuizzesDone`).
3. Todas las `reflection` obligatorias del módulo tienen respuesta guardada (`reflectionAnswers`).

Los módulos se desbloquean secuencialmente: el módulo N requiere que N-1 esté completado. Los bloques `scenario`, `scenariobuilder`, `selfcheck` y `checklist` **no** afectan este desbloqueo — son diagnósticos o de autoevaluación. El certificado se dispara igual que cualquier módulo (scroll + quizzes del último módulo), no hay gating adicional propio del formulario de cierre.

### Assets estáticos (`public/`)

Las rutas en los bloques son relativas al build (ej. `./Infografías/M1-DatosQueProtegemos.html`):

| Carpeta | Contenido |
|---|---|
| `public/Infografías/*.html` | Infografías interactivas en HTML (embebidas en iframe), una por recurso "INFOGRAFÍA" o "PIEZA GRÁFICA" del contenido fuente. Siguen un template común: frame de 1080px de ancho, fuentes Plus Jakarta Sans/Inter vía Google Fonts, script de auto-resize por `postMessage`. Logo en `../Logo.png`. |
| `public/videos/*.mp4` | Videos locales del curso (lista en `public/videos/README.md`). No se versionan en git; entran al ZIP desde esta carpeta |
| `public/Logo*.png` | Logos usados dentro de las infografías y el certificado |

### Módulos del curso

| # | Título | Tiempo | Actividad de validación | Criterio de avance |
|---|---|---|---|---|
| 0 | Bienvenida | 3 min | — (video de bienvenida) | Solo lectura |
| 1 | ¿Qué estamos protegiendo y por qué importa? | 7 min | Clasificación de datos protegidos (`quiz`) | 5/6 correctas |
| 2 | ¿Cómo empiezan los incidentes? | 12 min | Simulación de phishing (`scenario`) | Diagnóstico, no bloquea |
| 3 | ¿Cómo evitamos ser parte del problema? | 15 min | Pares correcto/incorrecto (`quiz`) | 5/6 correctas |
| 4 | ¿Qué hacemos cuando ocurre un incidente? | 11 min | Ordenamiento de acciones (`scenariobuilder`) | Orden correcto D→B→E: para, reporta, documenta y espera (no bloquea técnicamente) |
| 5 | ¿Cómo lo aplico en mi trabajo? | 9 min | 3 situaciones integradoras (`quiz`, passingScore 100) | Las 3 correctas |

### Certificado (`src/components/CertificateScreen.jsx`)

Se muestra directamente al finalizar el módulo 5. El certificado se genera client-side con `jspdf`; la organización que aparece es fija (`CERTIFICATE_CONFIG.institution`, "Resistance"). La configuración del certificado (nombre del curso, alineación PCI DSS, año) está en `src/config.js` (`CERTIFICATE_CONFIG`). La URL de "volver al curso" en Moodle también está en `src/config.js` (`MOODLE_COURSE_URL`).

## Notas de desarrollo

- En modo dev (`npm run dev`) el SCORM no conecta a ningún LMS; el progreso se guarda en `localStorage`.
- Los bloques `infographic` con `src:` renderizan el HTML en un `<iframe>` con `aspectRatio` configurable (formato `'ancho / alto'`); la altura real se ajusta sola vía `postMessage` desde el HTML.
- El `imsmanifest.xml` se genera dinámicamente en `scripts/package-scorm.js`; no editar manualmente.
- Este curso reemplazó al curso anterior de ciberseguridad general ("Ciberseguridad Cotidiana"/"Ciberseguridad y Protección de la Información"). El repositorio se reinició sin historial de Git al iniciar este curso.
- El contenido se recibe del negocio como PDFs por módulo (`PCI_Curso_M{n}_Contenido_v{n}.pdf`), con bloques clasificados como TEXTO DE PANTALLA, INFOGRAFÍA, ACTIVIDAD o PIEZA GRÁFICA. Al recibir una nueva versión de un módulo ya cargado, hay que diffear contra `modules.js` sección por sección antes de aplicar cambios.

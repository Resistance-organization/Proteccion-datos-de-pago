# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Proyecto

Curso e-learning de **Ciberseguridad y Protección de la Información**. Es una SPA en React empaquetada como **SCORM 1.2** para publicarse en Moodle. El puntaje mínimo de aprobación es 80%.

## Comandos

```bash
npm run dev              # Servidor de desarrollo local (sin LMS — usa localStorage como fallback)
npm run build            # Build de producción en /dist
npm run preview          # Previsualizar el build
npm run package:scorm    # build + genera imsmanifest.xml + ZIP listo para Moodle
```

El ZIP de salida es `resistance-ciberseguridad-scorm.zip` en la raíz.

## Arquitectura

### Flujo de datos

Todo el contenido del curso vive en **`src/data/modules.js`**. Este es el único archivo que hay que editar para añadir, reordenar o modificar contenido. Exporta:
- `courseInfo` — título, versión, `passingScore`
- `modules[]` — array de módulos, cada uno con `blocks[]`

`App.jsx` orquesta la navegación, el progreso y la integración SCORM. Llama a `BlockRenderer` que despacha cada bloque a su componente según `block.type`.

### Sistema de bloques (`src/data/modules.js`)

Cada módulo contiene un array de `blocks`. Tipos disponibles:

| Tipo | Componente | Uso |
|---|---|---|
| `hero` | `HeroBlock` | Portada del módulo |
| `text` | `TextBlock` | HTML enriquecido (`content` es HTML raw) |
| `reading` | `Reading` | Lectura larga con tabla de contenido |
| `flipcard` | `FlipCard` | Tarjetas interactivas frente/reverso |
| `carousel` | `Carousel` | Carrusel de ítems |
| `imageslides` | `ImageSlides` | PPT exportada como imágenes PNG secuenciales |
| `glossary` | `Glossary` | Acordeón de términos con `icon`, `term`, `definition`, `example` |
| `slides` | `Slides` | Presentación JSX interna |
| `infographic` | `Infographic` | Imagen estática (`image:`) o HTML embebido en iframe (`src:`) |
| `iframepresentation` | `IframePresentation` | PPT standalone en HTML cargada en iframe (`src:`) |
| `video` | `VideoPlayer` | Video HTML5 o YouTube |
| `quiz` | `Quiz` | Quiz con retroalimentación — único bloque que afecta el progreso |
| `flyer` | `Flyer` | Tarjeta visual destacada |
| `versus` | `Versus` | Comparativa de dos columnas |
| `riskmatrix` | `RiskMatrix` | Matriz probabilidad × impacto (componente interactivo hardcodeado) |
| `colombiamap` | `ColombiaMap` | Mapa SVG interactivo de Colombia (datos en `public/world-50m.json`) |

### Integración SCORM (`src/utils/scorm.js`)

Detecta el API SCORM 1.2 (`window.API`) escalando frames de padres. Si no lo encuentra (dev local), cae silenciosamente a `localStorage` con clave `scorm_dev_data`. El progreso del usuario se guarda en `cmi.suspend_data` como JSON. También hay un segundo caché en `localStorage` con clave `lo_curso_progress`.

### Lógica de desbloqueo (`App.jsx`)

Un módulo se considera **completado** cuando:
1. El usuario ha hecho scroll hasta el 90% del contenido (`moduleScrollDone`).
2. Todos los bloques `quiz` del módulo tienen score ≥ 80% (`moduleQuizzesDone`).

Los módulos se desbloquean secuencialmente: el módulo N requiere que N-1 esté completado.

### Assets estáticos (`public/`)

Las rutas en los bloques son relativas al build (ej. `./PPT-Ataques/index.html`):

| Carpeta | Contenido |
|---|---|
| `public/PPT-*/index.html` | Presentaciones HTML standalone — cada carpeta es una PPT independiente |
| `public/Infografías/*.html` | Infografías interactivas en HTML (embebidas en iframe) |
| `public/Infografías/*.png` | Imágenes de infografías estáticas |
| `public/Presentaciones/*/` | PPTs exportadas como imágenes PNG (usadas con `imageslides`) |
| `public/Piezas graficas/` | Imágenes ilustrativas para bloques `infographic` |

### Módulos del curso

| # | Título | Tiempo | Recursos destacados |
|---|---|---|---|
| 1 | Fundamentos | 25 min | Tríada CIA (flip cards), 2 PPTs imagen (Tríada, Cifrado), infografía Control de Acceso |
| 2 | Protección de la información | 30 min | PPT-Ataques (HTML), infografía DoS, componente Versus |
| 3 | Detección y respuesta | 20 min | PPT-Phishing (HTML), infografías ReporteCorreos / ReporteIncidentes |
| 4 | Activos y clasificación | 25 min | PPT-Contenedores (HTML), infografías UsoActivos / UsoActivosDetalle |
| 5 | Gestión de riesgos | 30 min | RiskMatrix (interactivo), infografía TratamientoRiesgos |
| 6 | Continuidad del negocio | 20 min | PPT-Continuidad (HTML), infografía RTO-RPO |
| 7 | Inteligencia artificial | 25 min | PPT-IA (HTML), infografías IA-BuenUso-MalUso / IA-UsoSeguro |
| 8 | Normativas | 25 min | PPT-Normativas, PPT-Delitos-informaticos, PPT-Propiedad-Intelectual, infografía PrincipiosDatos |
| 9 | Contexto en Colombia | 25 min | PPT-Ciberataques-Colombia, ColombiaMap (interactivo), infografía Estadisticas Ciberataques |
| 10 | Buenas prácticas | 20 min | PPT-TipsEntorno, infografía 5ReglasDeOro, Glossary con 5 reglas |

### Certificado (`src/components/CertificateScreen.jsx`)

Se muestra al finalizar el módulo 10. Antes de generarlo, aparece un modal para seleccionar la sede (Bogotá, Caldas, Cali, Ibagué, Tuluá, Villavicencio). El certificado se genera client-side con `jspdf`. La configuración del certificado está en `src/config.js`.

## Notas de desarrollo

- En modo dev (`npm run dev`) el SCORM no conecta a ningún LMS; el progreso se guarda en `localStorage`.
- Los bloques `infographic` con `src:` renderizan el HTML en un `<iframe>` con `aspectRatio` configurable (formato `'ancho / alto'`).
- Los módulos 9 y 10 tienen quizzes comentados en `modules.js` (marcados con `// ► Agrega las preguntas cuando estén listas`).
- El `imsmanifest.xml` se genera dinámicamente en `scripts/package-scorm.js`; no editar manualmente.

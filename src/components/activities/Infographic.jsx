import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ImageOff, Maximize2, X, ZoomIn } from 'lucide-react'

const PREVIEW_HEIGHT = 560 // px — altura del recorte previo de las infografías largas
const LONG_HEIGHT = 900    // px — lo que cabe en una pantalla se muestra completo; más alto, se recorta

// '1080 / 1900' → 1900 / 1080
function heightRatio(aspectRatio) {
  const [w, h] = (aspectRatio || '800 / 2400').split('/').map(Number)
  return w > 0 && h > 0 ? h / w : 3
}

export default function Infographic({ block }) {
  const [expanded, setExpanded] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [measuredHeight, setMeasuredHeight] = useState(null)
  const [frameWidth, setFrameWidth] = useState(null)
  const iframeRef = useRef(null)
  const fullscreenIframeRef = useRef(null)
  const frameWrapRef = useRef(null)

  // Ancho disponible: permite estimar el alto antes de que el iframe lo reporte
  useEffect(() => {
    const el = frameWrapRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setFrameWidth(entry.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setFullscreen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Las infografías (iframe) reportan su alto real vía postMessage — evita que
  // la altura declarada (aspectRatio) deje espacio vacío antes de los botones.
  useEffect(() => {
    if (!block.src) return
    const onMessage = (e) => {
      if (e.data && e.data.type === 'infographic-height' && typeof e.data.height === 'number') {
        if (e.source === iframeRef.current?.contentWindow || e.source === fullscreenIframeRef.current?.contentWindow) {
          setMeasuredHeight(e.data.height)
        }
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [block.src])

  // Render iframe-based infographic (HTML file) — same look as image blocks
  if (block.src) {
    const iframeStyle = measuredHeight
      ? { height: `${measuredHeight}px`, display: 'block' }
      : { aspectRatio: block.aspectRatio || '800 / 2400', display: 'block' }
    const height = measuredHeight ?? (frameWidth ? frameWidth * heightRatio(block.aspectRatio) : null)
    const isLong = height == null || height > LONG_HEIGHT
    const collapsed = isLong && !expanded

    const iframeEl = (
      <div ref={frameWrapRef} className="relative" style={{ maxWidth: block.maxWidth ? `${block.maxWidth}px` : '900px', width: '100%', margin: '0 auto' }}>
        <div
          className="relative overflow-hidden rounded-xl transition-all duration-500"
          style={{ maxHeight: collapsed ? `${PREVIEW_HEIGHT}px` : 'none' }}
        >
          <iframe
            ref={iframeRef}
            src={block.src}
            title={block.title || 'Infografía'}
            className="w-full border-0 rounded-xl"
            style={iframeStyle}
            scrolling="no"
          />
          {collapsed && (
            <div
              className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, transparent, white)' }}
            />
          )}
        </div>

        <div className={`flex items-center justify-center gap-3 mt-3 ${collapsed ? '-mt-2 relative z-10' : ''}`}>
          {isLong && (
            <button
              onClick={() => setExpanded(e => !e)}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-primary-50 text-primary font-body text-sm font-medium hover:bg-primary-100 transition-colors border border-primary-100"
            >
              <ZoomIn size={15} />
              {expanded ? 'Ver menos' : 'Ver infografía completa'}
            </button>
          )}
          <button
            onClick={() => setFullscreen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 text-gray-500 font-body text-sm hover:bg-gray-100 transition-colors border border-gray-200"
            title="Pantalla completa"
          >
            <Maximize2 size={15} />
            Pantalla completa
          </button>
        </div>
      </div>
    )

    if (block.fullBleed) {
      return (
        <>
          {iframeEl}
          <AnimatePresence>
            {fullscreen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex flex-col"
                style={{ background: 'rgba(11, 11, 48, 0.95)' }}
              >
                <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-white/10">
                  <p className="text-white font-title font-semibold text-sm truncate">
                    {block.title || 'Infografía'}
                  </p>
                  <button
                    onClick={() => setFullscreen(false)}
                    className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors ml-4 flex-shrink-0"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="flex-1 overflow-auto p-4 sm:p-8">
                  <iframe
                    ref={fullscreenIframeRef}
                    src={block.src}
                    title={block.title || 'Infografía'}
                    className="mx-auto rounded-xl shadow-2xl border-0"
                    style={{ width: '100%', maxWidth: '800px', ...iframeStyle }}
                    scrolling="no"
                  />
                </div>
                <div className="flex-shrink-0 py-3 text-center">
                  <p className="text-white/40 text-xs font-body">
                    Presiona <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white/60">Esc</kbd> o el botón × para cerrar
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )
    }

    return (
      <>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* El HTML embebido ya trae su propio título: aquí no se repite.
              block.title solo se usa en pantalla completa y como título accesible. */}
          {block.intro && (
            <div className="px-6 sm:px-8 py-5 border-b border-gray-100">
              <p className="font-body text-sm text-gray-600">{block.intro}</p>
            </div>
          )}

          <div className="p-4 sm:p-6">
            {iframeEl}
          </div>

          {block.caption && (
            <p className="px-6 pb-5 text-xs text-gray-400 font-body text-center italic">{block.caption}</p>
          )}
        </div>

        <AnimatePresence>
          {fullscreen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex flex-col"
              style={{ background: 'rgba(11, 11, 48, 0.95)' }}
            >
              <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-white/10">
                <p className="text-white font-title font-semibold text-sm truncate">
                  {block.title || 'Infografía'}
                </p>
                <button
                  onClick={() => setFullscreen(false)}
                  className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors ml-4 flex-shrink-0"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-auto p-4 sm:p-8">
                <iframe
                  src={block.src}
                  title={block.title || 'Infografía'}
                  className="mx-auto rounded-xl shadow-2xl border-0"
                  style={{ width: '100%', maxWidth: '800px', aspectRatio: block.aspectRatio || '800 / 2400', display: 'block' }}
                  scrolling="no"
                />
              </div>
              <div className="flex-shrink-0 py-3 text-center">
                <p className="text-white/40 text-xs font-body">
                  Presiona <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white/60">Esc</kbd> o el botón × para cerrar
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    )
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {block.title && (
          <div className="px-6 sm:px-8 py-5 border-b border-gray-100">
            <h2 className="font-title text-xl font-semibold text-gray-800">{block.title}</h2>
            {block.intro && (
              <p className="font-body text-sm text-gray-600 mt-2">{block.intro}</p>
            )}
          </div>
        )}

        <div className="p-4 sm:p-6">
          {block.image ? (
            <div className="relative" style={{ maxWidth: '640px', margin: '0 auto' }}>
              {/* Contenedor con altura limitada en vista previa */}
              <div
                className="relative overflow-hidden rounded-xl transition-all duration-500"
                style={{ maxHeight: expanded ? 'none' : `${PREVIEW_HEIGHT}px` }}
              >
                <img
                  src={block.image}
                  alt={block.title || 'Infografía'}
                  className="w-full rounded-xl shadow-sm cursor-zoom-in"
                  onClick={() => setFullscreen(true)}
                  style={{ display: 'block' }}
                />

                {/* Gradiente fade en la parte inferior cuando está colapsada */}
                {!expanded && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                    style={{
                      background: 'linear-gradient(to bottom, transparent, white)',
                    }}
                  />
                )}
              </div>

              {/* Botones de acción */}
              <div className={`flex items-center justify-center gap-3 mt-3 ${expanded ? '' : '-mt-2 relative z-10'}`}>
                {/* Expandir / colapsar */}
                <button
                  onClick={() => setExpanded(e => !e)}
                  className="flex items-center gap-2 px-5 py-2 rounded-full bg-primary-50 text-primary font-body text-sm font-medium hover:bg-primary-100 transition-colors border border-primary-100"
                >
                  <ZoomIn size={15} />
                  {expanded ? 'Ver menos' : 'Ver infografía completa'}
                </button>

                {/* Pantalla completa */}
                <button
                  onClick={() => setFullscreen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 text-gray-500 font-body text-sm hover:bg-gray-100 transition-colors border border-gray-200"
                  title="Pantalla completa"
                >
                  <Maximize2 size={15} />
                  Pantalla completa
                </button>
              </div>
            </div>
          ) : (
            <div
              className="w-full rounded-xl flex flex-col items-center justify-center gap-4 py-20"
              style={{ background: 'linear-gradient(135deg, #EEEEF6 0%, #D3D3E9 100%)' }}
            >
              <ImageOff size={40} className="text-primary/30" />
              <div className="text-center">
                <p className="font-body text-sm text-primary/60 font-medium">Infografía</p>
                {block.placeholder && (
                  <p className="font-body text-xs text-gray-400 mt-1 max-w-xs">{block.placeholder}</p>
                )}
                <code className="text-xs text-primary/50 mt-2 block">
                  image: "./ruta/a/infografia.png"
                </code>
              </div>
            </div>
          )}
        </div>

        {block.caption && (
          <p className="px-6 pb-5 text-xs text-gray-400 font-body text-center italic">
            {block.caption}
          </p>
        )}
      </div>

      {/* Lightbox — pantalla completa con scroll */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col"
            style={{ background: 'rgba(11, 11, 48, 0.95)' }}
          >
            {/* Barra superior */}
            <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-white/10">
              <p className="text-white font-title font-semibold text-sm truncate">
                {block.title || 'Infografía'}
              </p>
              <button
                onClick={() => setFullscreen(false)}
                className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors ml-4 flex-shrink-0"
              >
                <X size={20} />
              </button>
            </div>

            {/* Imagen con scroll */}
            <div className="flex-1 overflow-auto p-4 sm:p-8">
              <img
                src={block.image}
                alt={block.title || 'Infografía'}
                className="mx-auto rounded-xl shadow-2xl"
                style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
              />
            </div>

            {/* Indicador de cierre */}
            <div className="flex-shrink-0 py-3 text-center">
              <p className="text-white/40 text-xs font-body">
                Presiona <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white/60">Esc</kbd> o el botón × para cerrar
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

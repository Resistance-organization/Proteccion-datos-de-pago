import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2, X, ImageOff, RotateCcw } from 'lucide-react'

export default function ImageSlides({ block }) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [fullscreen, setFullscreen] = useState(false)
  const total = block.images?.length || 0

  const go = useCallback((dir) => {
    setDirection(dir)
    setCurrent(c => Math.max(0, Math.min(total - 1, c + dir)))
  }, [total])

  // Navegación con teclado
  useEffect(() => {
    if (!fullscreen) return
    const handler = (e) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'Escape') setFullscreen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [fullscreen, go])

  const SlideImage = ({ src, alt }) => (
    src ? (
      <img
        src={src}
        alt={alt || `Diapositiva ${current + 1}`}
        className="w-full h-full object-contain"
        draggable={false}
      />
    ) : (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gray-50">
        <ImageOff size={32} className="text-gray-300" />
        <p className="text-xs text-gray-400 font-body text-center px-4">
          Agrega la imagen:<br />
          <code className="text-primary text-xs">{`images[${current}]: "./modulo-01/ppt/slide-${String(current + 1).padStart(2, '0')}.jpg"`}</code>
        </p>
      </div>
    )
  )

  const Controls = ({ compact = false }) => (
    <div className={`flex items-center ${compact ? 'gap-2' : 'gap-4'}`}>
      <button
        onClick={() => go(-1)}
        disabled={current === 0}
        className={`flex items-center gap-1 rounded-lg font-body text-sm transition-all
          ${compact
            ? 'p-2 bg-white/20 text-white hover:bg-white/30 disabled:opacity-30'
            : 'px-4 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed'
          }`}
      >
        <ChevronLeft size={compact ? 18 : 16} />
        {!compact && 'Anterior'}
      </button>

      {/* Dots */}
      <div className="flex gap-1.5">
        {block.images?.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
            className={`h-1.5 rounded-full transition-all
              ${i === current
                ? (compact ? 'bg-white w-5' : 'bg-primary w-5')
                : (compact ? 'bg-white/40 w-1.5' : 'bg-gray-200 w-1.5')
              }`}
          />
        ))}
      </div>

      <button
        onClick={() => go(1)}
        disabled={current === total - 1}
        className={`flex items-center gap-1 rounded-lg font-body text-sm transition-all
          ${compact
            ? 'p-2 bg-white/20 text-white hover:bg-white/30 disabled:opacity-30'
            : 'px-4 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed'
          }`}
      >
        {!compact && 'Siguiente'}
        <ChevronRight size={compact ? 18 : 16} />
      </button>
    </div>
  )

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Encabezado */}
        {block.title && (
          <div className="px-6 sm:px-8 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="font-title text-xl font-semibold text-gray-800">{block.title}</h2>
              <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                <span className="text-xs text-gray-400 font-body">{current + 1} / {total}</span>
                <button
                  onClick={() => setFullscreen(true)}
                  className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-primary transition-colors"
                  title="Pantalla completa"
                >
                  <Maximize2 size={16} />
                </button>
              </div>
            </div>
            {block.intro && (
              <p className="font-body text-sm text-gray-600 mt-2">{block.intro}</p>
            )}
          </div>
        )}

        {/* Área de imagen */}
        <div className="relative bg-gray-50" style={{ aspectRatio: '16/9' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -16 }}
              transition={{ duration: 0.1 }}
              className="absolute inset-0"
            >
              <SlideImage src={block.images?.[current]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controles */}
        <div className="px-4 sm:px-6 py-3 flex items-center justify-between border-t border-gray-100">
          <Controls />
          <button
            onClick={() => { setDirection(-1); setCurrent(0) }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-body text-xs text-gray-400 hover:bg-gray-100 hover:text-primary transition-all ${current === total - 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            title="Volver al inicio"
          >
            <RotateCcw size={13} />
            Reiniciar
          </button>
        </div>
      </div>

      {/* Lightbox fullscreen */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex flex-col"
            onClick={(e) => e.target === e.currentTarget && setFullscreen(false)}
          >
            {/* Imagen */}
            <div className="flex-1 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center p-4"
                >
                  <SlideImage src={block.images?.[current]} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Barra inferior fullscreen */}
            <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 bg-black/60">
              <Controls compact />
              <span className="text-white/60 text-sm font-body">{block.title}</span>
              <button
                onClick={() => setFullscreen(false)}
                className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

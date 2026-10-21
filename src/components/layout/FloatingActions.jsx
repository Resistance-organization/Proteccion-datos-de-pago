import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp, ArrowDown, BookOpen, Award, CheckCircle2 } from 'lucide-react'

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// Indicador de lo que falta para completar el módulo + botón "volver arriba".
// Se ocultan mientras el cierre del módulo está a la vista, porque ahí ya se
// muestra la misma información.
export default function FloatingActions({ moduleKey, readingDone, readingProgress, pendingActivity, isDone, offsetLeft = 0 }) {
  const [scrolledPastHero, setScrolledPastHero] = useState(false)
  const [farDown, setFarDown] = useState(false)
  const [footerVisible, setFooterVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolledPastHero(window.scrollY > 420)
      setFarDown(window.scrollY > window.innerHeight * 1.5)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // El cierre del módulo se vuelve a montar al cambiar de módulo
  useEffect(() => {
    setFooterVisible(false)
    let io
    const t = setTimeout(() => {
      const el = document.getElementById('module-footer')
      if (!el) return
      io = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting))
      io.observe(el)
    }, 500)
    return () => { clearTimeout(t); io?.disconnect() }
  }, [moduleKey])

  const showStatus = scrolledPastHero && !footerVisible
  const showTop = farDown

  return (
    <>
      <div
        className="fixed bottom-5 left-0 right-0 z-30 flex justify-start sm:justify-center pl-4 pr-20 sm:px-20 pointer-events-none transition-[margin] duration-300"
        style={{ marginLeft: offsetLeft }}
      >
        <AnimatePresence>
          {showStatus && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="pointer-events-auto flex items-center gap-1 rounded-full bg-white/95 backdrop-blur shadow-lg ring-1 ring-gray-200 p-1.5 pl-4 pr-1.5 text-sm font-body min-h-[44px]"
              role="status"
            >
              {/* Lectura: siempre visible, en vivo */}
              <span className="inline-flex items-center gap-2 text-gray-700 mr-2" title="Avance de lectura del módulo">
                <span className="relative w-16 h-1.5 rounded-full bg-gray-100 overflow-hidden" aria-hidden="true">
                  <span
                    className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-200"
                    style={{ width: `${Math.round(readingProgress)}%`, background: 'linear-gradient(90deg, #3178BD, #E73780)' }}
                  />
                </span>
                {readingDone
                  ? <CheckCircle2 size={15} className="text-secondary flex-shrink-0" />
                  : <BookOpen size={15} className="text-secondary flex-shrink-0" />}
                <span className="tabular-nums font-semibold">Lectura {Math.round(readingProgress)}%</span>
              </span>

              {isDone ? (
                <button
                  onClick={() => scrollToId('module-footer')}
                  className="inline-flex items-center gap-1.5 rounded-full gradient-primary text-white px-3.5 py-1.5 font-semibold hover:opacity-90"
                >
                  Módulo completado <ArrowDown size={14} />
                </button>
              ) : pendingActivity && (
                <button
                  onClick={() => scrollToId(`block-${pendingActivity.blockIndex}`)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent text-white px-3.5 py-1.5 font-semibold hover:bg-accent-600"
                >
                  <Award size={14} /> {pendingActivity.label}
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Volver arriba"
            title="Volver arriba"
            className="fixed bottom-5 right-5 z-30 w-12 h-12 rounded-full bg-white shadow-lg ring-1 ring-gray-200 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

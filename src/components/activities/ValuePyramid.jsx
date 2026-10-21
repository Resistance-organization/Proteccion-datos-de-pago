import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MousePointerClick } from 'lucide-react'

const COLORS = {
  red:    { grad: 'linear-gradient(135deg, #E8432F 0%, #C22A22 100%)', badge: '#C22A22' },
  orange: { grad: 'linear-gradient(135deg, #F0762A 0%, #DD5C1E 100%)', badge: '#DD5C1E' },
  yellow: { grad: 'linear-gradient(135deg, #F3B23A 0%, #E0982A 100%)', badge: '#B5761C' },
}

const LEVEL_HEIGHTS = [130, 96, 96] // px — la punta es más alta para que quepa el texto
const GAP = 4                         // px — separación entre niveles

// Posición vertical de cada nivel dentro del triángulo completo
function pyramidLayout(count) {
  let y = 0
  const levels = Array.from({ length: count }, (_, i) => {
    const start = i === 0 ? 0 : y + GAP
    const end = start + (LEVEL_HEIGHTS[i] ?? LEVEL_HEIGHTS.at(-1))
    y = end
    return { start, end }
  })
  return Object.assign(levels, { total: y })
}

export default function ValuePyramid({ block }) {
  const [active, setActive] = useState(null)
  const activeLevel = block.levels.find(l => l.id === active)
  const layout = pyramidLayout(block.levels.length)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10"
    >
      <div className="text-left mb-8">
        <h2 className="font-title text-xl sm:text-2xl font-bold text-gray-800">{block.title}</h2>
        {block.hint && (
          <p className="flex items-center gap-1.5 text-sm text-gray-400 font-body italic mt-2">
            <MousePointerClick size={15} /> {block.hint}
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Pirámide — cada nivel es un corte del mismo triángulo, así los
            lados forman una sola pendiente continua sin importar el ancho */}
        <div className="flex flex-col items-center w-full max-w-[420px] mx-auto">
          {block.levels.map((level, i) => {
            const c = COLORS[level.color] || COLORS.red
            const top = layout[i].start / layout.total
            const bottom = layout[i].end / layout.total
            const edge = t => 50 - 50 * t
            return (
              <button
                key={level.id}
                onMouseEnter={() => setActive(level.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(level.id)}
                onBlur={() => setActive(null)}
                onClick={() => setActive(prev => prev === level.id ? null : level.id)}
                aria-pressed={active === level.id}
                style={{
                  height: LEVEL_HEIGHTS[i] ?? LEVEL_HEIGHTS.at(-1),
                  marginTop: i === 0 ? 0 : GAP,
                  background: c.grad,
                  clipPath: `polygon(${edge(top)}% 0%, ${100 - edge(top)}% 0%, ${100 - edge(bottom)}% 100%, ${edge(bottom)}% 100%)`,
                }}
                className={`relative w-full flex flex-col items-center justify-end text-center gap-1.5 pb-4 text-white transition-[filter] duration-200 hover:brightness-110 focus:outline-none focus-visible:brightness-110 ${active === level.id ? 'brightness-110' : ''}`}
              >
                <span className="w-8 h-8 rounded-full bg-white/20 border border-white/50 flex items-center justify-center font-title font-bold text-sm flex-shrink-0">
                  {i + 1}
                </span>
                <h3 className="font-title font-bold text-sm sm:text-base leading-tight px-2">{level.title}</h3>
              </button>
            )
          })}
        </div>

        {/* Panel de detalle */}
        <div className="relative min-h-[180px] bg-gray-50 rounded-xl border border-gray-100 p-6 flex items-center">
          <AnimatePresence mode="wait">
            {activeLevel ? (
              <motion.div
                key={activeLevel.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-title font-bold text-sm flex-shrink-0"
                    style={{ background: (COLORS[activeLevel.color] || COLORS.red).badge }}
                  >
                    {block.levels.findIndex(l => l.id === activeLevel.id) + 1}
                  </span>
                  <div>
                    <p className="font-title text-[10px] font-bold uppercase tracking-widest text-gray-400 leading-tight">{activeLevel.sub}</p>
                    <p className="font-title text-sm font-bold uppercase tracking-wide text-gray-600 leading-tight">{activeLevel.title}</p>
                  </div>
                </div>
                <p className="font-body text-base font-semibold text-gray-800 leading-snug">{activeLevel.content}</p>
                <p className="font-body text-sm text-gray-500 leading-relaxed">{activeLevel.why}</p>
              </motion.div>
            ) : (
              <motion.p
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-body text-sm text-gray-400 italic text-center w-full"
              >
                Pasa el mouse sobre un nivel de la pirámide para ver los detalles →
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {block.footer && (
        <div className="mt-8 rounded-xl px-6 py-4 text-center" style={{ background: 'linear-gradient(135deg, #3A3B74 0%, #212252 100%)' }}>
          <p className="font-title text-sm sm:text-base text-white font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: block.footer }} />
        </div>
      )}
    </motion.div>
  )
}

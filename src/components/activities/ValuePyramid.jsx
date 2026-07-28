import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MousePointerClick } from 'lucide-react'

const COLORS = {
  red:    { grad: 'linear-gradient(135deg, #E8432F 0%, #C22A22 100%)', badge: '#C22A22' },
  orange: { grad: 'linear-gradient(135deg, #F0762A 0%, #DD5C1E 100%)', badge: '#DD5C1E' },
  yellow: { grad: 'linear-gradient(135deg, #F3B23A 0%, #E0982A 100%)', badge: '#B5761C' },
}

export default function ValuePyramid({ block }) {
  const [active, setActive] = useState(null)
  const activeLevel = block.levels.find(l => l.id === active)

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
        {/* Pirámide */}
        <div className="flex flex-col items-center w-full max-w-[360px] mx-auto">
          {block.levels.map((level, i) => {
            const c = COLORS[level.color] || COLORS.red
            const widthPct = 46 + i * 27
            const isTop = i === 0
            const slant = 22
            return (
              <button
                key={level.id}
                onMouseEnter={() => setActive(level.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(level.id)}
                onBlur={() => setActive(null)}
                onClick={() => setActive(prev => prev === level.id ? null : level.id)}
                style={{
                  width: `${widthPct}%`,
                  background: c.grad,
                  clipPath: isTop
                    ? `polygon(50% 0%, 100% 100%, 0% 100%)`
                    : `polygon(${slant}px 0%, calc(100% - ${slant}px) 0%, 100% 100%, 0% 100%)`,
                  marginTop: isTop ? 0 : '-1px',
                }}
                className={`relative flex flex-col items-center justify-end text-center gap-1.5 px-4 text-white transition-transform hover:scale-[1.02] ${isTop ? 'pt-10 pb-4' : 'py-4 sm:py-5'}`}
              >
                <span className="relative w-8 h-8 rounded-full bg-white/20 border border-white/40 flex items-center justify-center font-title font-bold text-xs flex-shrink-0">
                  {i + 1}
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white animate-ping" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white" />
                </span>
                <h3 className="font-title font-bold text-sm sm:text-base leading-tight">{level.title}</h3>
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

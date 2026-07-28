import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'

const ACCENT_COLORS = {
  primary: 'linear-gradient(135deg, #3A3B74 0%, #212252 100%)',
  secondary: 'linear-gradient(135deg, #3178BD 0%, #E73780 100%)',
  accent: 'linear-gradient(135deg, #E73780 0%, #A23EA1 100%)',
  dark: 'linear-gradient(135deg, #1F2937 0%, #111827 100%)',
  light: 'linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%)',
}

function Slide({ slide, index, total }) {
  const bg = ACCENT_COLORS[slide.color] || ACCENT_COLORS.primary
  const isLight = slide.color === 'light'

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl"
      style={{ paddingBottom: '56.25%' }}
    >
      <div
        className="absolute inset-0 flex"
        style={{ background: bg }}
      >
        {/* Contenido de la diapositiva */}
        <div className={`flex-1 flex flex-col justify-center px-10 py-8 ${isLight ? 'text-gray-800' : 'text-white'}`}>
          {slide.badge && (
            <span className={`text-xs font-title font-semibold uppercase tracking-widest mb-3
              ${isLight ? 'text-primary' : 'text-white/60'}`}>
              {slide.badge}
            </span>
          )}
          {slide.title && (
            <h3 className="font-title text-2xl sm:text-3xl font-bold leading-snug mb-3">
              {slide.title}
            </h3>
          )}
          {slide.subtitle && (
            <p className={`font-body text-sm sm:text-base leading-relaxed ${isLight ? 'text-gray-600' : 'text-white/80'}`}>
              {slide.subtitle}
            </p>
          )}
          {slide.bullets && (
            <ul className="mt-4 space-y-2">
              {slide.bullets.map((b, i) => (
                <li key={i} className={`flex items-start gap-2 font-body text-sm ${isLight ? 'text-gray-700' : 'text-white/90'}`}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Imagen lateral */}
        {slide.image && (
          <div className="w-2/5 flex-shrink-0 relative">
            <img
              src={slide.image}
              alt={slide.title || ''}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className={`absolute inset-0 ${isLight ? 'bg-black/5' : 'bg-black/10'}`} />
          </div>
        )}

        {/* Ícono decorativo */}
        {slide.icon && !slide.image && (
          <div className="w-1/3 flex items-center justify-center opacity-20">
            <span className="text-8xl sm:text-9xl">{slide.icon}</span>
          </div>
        )}

        {/* Número de diapositiva */}
        <div className={`absolute bottom-3 right-4 text-xs font-body opacity-40 ${isLight ? 'text-gray-600' : 'text-white'}`}>
          {index + 1} / {total}
        </div>
      </div>
    </div>
  )
}

export default function Slides({ block }) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const total = block.slides.length

  const go = (dir) => {
    setDirection(dir)
    setCurrent(c => Math.max(0, Math.min(total - 1, c + dir)))
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {block.title && (
        <div className="px-6 sm:px-8 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-title text-xl font-semibold text-gray-800">{block.title}</h2>
          <span className="text-xs text-gray-400 font-body">{current + 1} / {total}</span>
        </div>
      )}

      <div className="p-4 sm:p-6">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.3 }}
          >
            <Slide slide={block.slides[current]} index={current} total={total} />
          </motion.div>
        </AnimatePresence>

        {/* Controles */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => go(-1)}
            disabled={current === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-body text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={16} />
            Anterior
          </button>

          {/* Dots */}
          <div className="flex gap-1.5">
            {block.slides.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-primary w-5' : 'bg-gray-200'}`}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            disabled={current === total - 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-body text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Siguiente
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

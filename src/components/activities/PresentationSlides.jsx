import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'

// ─── Paleta de secciones ──────────────────────────────────────────────────────
const COLORS = {
  mint:  { bg: '#EEEEF6', label: '#3A3B74', text: '#1F2937' },
  gray:  { bg: '#F9FAFB', label: '#6B7280', text: '#374151' },
  green: { bg: '#DCFCE7', label: '#166534', text: '#1F2937' },
  amber: { bg: '#FEF3C7', label: '#92400E', text: '#1F2937' },
  red:   { bg: '#FEE2E2', label: '#991B1B', text: '#1F2937' },
  dark:  { bg: '#1E293B', label: '#94A3B8', text: '#CBD5E1' },
  navy:  { bg: '#0F172A', label: '#64748B', text: '#94A3B8' },
}

// ─── Tarjeta de sección ───────────────────────────────────────────────────────
function SectionCard({ label, icon, content, color = 'mint', fullWidth }) {
  const c = COLORS[color] || COLORS.mint
  return (
    <div
      className="flex flex-col p-3 sm:p-4"
      style={{ background: c.bg, gridColumn: fullWidth ? '1 / -1' : undefined }}
    >
      <div className="flex items-center gap-1.5 mb-1.5">
        <span className="text-sm leading-none">{icon}</span>
        <span className="font-title font-bold text-xs uppercase tracking-wider" style={{ color: c.label }}>
          {label}
        </span>
      </div>
      <p className="font-body text-xs sm:text-sm leading-relaxed" style={{ color: c.text }}>
        {content}
      </p>
    </div>
  )
}

// ─── Slide: Portada / Intro ───────────────────────────────────────────────────
function IntroSlide({ slide }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-12 text-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #161641 0%, #3A3B74 100%)' }}
    >
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />
      <span className="text-5xl sm:text-6xl mb-4 relative z-10">{slide.icon}</span>
      <h2 className="font-title font-bold text-white text-base sm:text-xl leading-snug mb-3 relative z-10 max-w-md">
        {slide.title}
      </h2>
      <div className="w-12 h-0.5 mb-4 relative z-10" style={{ background: '#3178BD' }} />
      {slide.paragraphs?.map((p, i) => (
        <p key={i} className="font-body text-white/80 text-xs sm:text-sm leading-relaxed mb-2 max-w-lg relative z-10">
          {p}
        </p>
      ))}
    </div>
  )
}

// ─── Slide: Ataque (estructura flexible de secciones) ────────────────────────
function AttackSlide({ slide, index, total }) {
  const sections = slide.sections || []
  return (
    <div className="absolute inset-0 flex flex-col">
      {/* Header del slide */}
      <div
        className="flex items-center gap-3 px-4 sm:px-5 py-2.5 flex-shrink-0"
        style={{ background: 'linear-gradient(135deg, #212252 0%, #3A3B74 100%)' }}
      >
        <span className="text-xl sm:text-2xl leading-none">{slide.icon}</span>
        <div className="flex-1 min-w-0">
          {slide.category && (
            <p className="text-white/50 font-body text-xs leading-none mb-0.5">{slide.category}</p>
          )}
          <h3 className="font-title font-bold text-white text-sm sm:text-base leading-tight truncate">
            {slide.name}
          </h3>
        </div>
        <span className="text-white/40 font-body text-xs flex-shrink-0">
          {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>

      {/* Secciones en grid */}
      <div
        className="flex-1 min-h-0 grid divide-x divide-y divide-gray-200"
        style={{ gridTemplateColumns: '1fr 1fr' }}
      >
        {sections.map((s, i) => (
          <SectionCard key={i} {...s} />
        ))}
      </div>
    </div>
  )
}

// ─── Slide: Cierre / Resumen ─────────────────────────────────────────────────
function SummarySlide({ slide }) {
  return (
    <div
      className="absolute inset-0 flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #161641 0%, #212252 100%)' }}
    >
      <div className="px-5 sm:px-8 pt-4 pb-3 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎯</span>
          <div>
            <p className="font-body text-xs uppercase tracking-widest mb-0.5" style={{ color: '#3178BD' }}>
              Mensaje final
            </p>
            <h2 className="font-title font-bold text-white text-base sm:text-lg leading-tight">
              {slide.title}
            </h2>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 px-5 sm:px-8 py-4 flex flex-col justify-center gap-3 overflow-auto">
        {slide.bullets?.map((bullet, i) => (
          <div key={i} className="flex items-start gap-3">
            <div
              className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: 'rgba(49, 120, 189, 0.2)' }}
            >
              <span className="font-title font-bold text-xs" style={{ color: '#3178BD' }}>{i + 1}</span>
            </div>
            <p className="font-body text-white/80 text-xs sm:text-sm leading-relaxed">{bullet}</p>
          </div>
        ))}
      </div>

      {slide.message && (
        <div
          className="mx-5 sm:mx-8 mb-4 px-4 py-3 rounded-xl flex-shrink-0"
          style={{ background: 'rgba(49, 120, 189, 0.12)', border: '1px solid rgba(49, 120, 189, 0.25)' }}
        >
          <p className="font-body text-xs sm:text-sm font-semibold text-center leading-relaxed" style={{ color: '#3178BD' }}>
            💡 {slide.message}
          </p>
        </div>
      )}
    </div>
  )
}

// ─── Selector de tipo ─────────────────────────────────────────────────────────
function SlideRenderer({ slide, index, total }) {
  switch (slide.type) {
    case 'intro':   return <IntroSlide slide={slide} />
    case 'attack':  return <AttackSlide slide={slide} index={index} total={total} />
    case 'summary': return <SummarySlide slide={slide} />
    default:        return null
  }
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function PresentationSlides({ block }) {
  const [current, setCurrent] = useState(0)
  const [dir, setDir]         = useState(1)
  const slides = block.slides || []
  const total  = slides.length

  const go = (d) => {
    const next = current + d
    if (next < 0 || next >= total) return
    setDir(d)
    setCurrent(next)
  }

  if (!slides.length) return null

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Encabezado */}
      {block.title && (
        <div className="px-6 sm:px-8 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-title text-xl font-semibold text-gray-800">{block.title}</h2>
          <span className="text-xs text-gray-400 font-body">{current + 1} / {total}</span>
        </div>
      )}

      {/* Frame del slide — aspect ratio 16:9 */}
      <div className="p-3 sm:p-4 bg-gray-100">
        <div
          className="relative w-full overflow-hidden rounded-xl shadow-lg border border-gray-200"
          style={{ paddingBottom: '56.25%', background: '#161641' }}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={current}
              custom={dir}
              initial={{ opacity: 0, x: dir * 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -18 }}
              transition={{ duration: 0.12 }}
              className="absolute inset-0"
            >
              <SlideRenderer slide={slides[current]} index={current} total={total - 2} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controles de navegación */}
      <div className="px-4 sm:px-6 py-3 flex items-center justify-between border-t border-gray-100">
        <button
          onClick={() => go(-1)}
          disabled={current === 0}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-body text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={16} /> Anterior
        </button>

        {/* Dots de navegación */}
        <div className="flex gap-1 flex-wrap justify-center max-w-[240px]">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDir(i > current ? 1 : -1); setCurrent(i) }}
              className={`h-1.5 rounded-full transition-all ${i === current ? 'bg-primary w-4' : 'bg-gray-200 w-1.5'}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          {current === total - 1 && (
            <button
              onClick={() => { setDir(-1); setCurrent(0) }}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg font-body text-xs text-gray-400 hover:bg-gray-100 transition-all"
              title="Volver al inicio"
            >
              <RotateCcw size={12} /> Reiniciar
            </button>
          )}
          <button
            onClick={() => go(1)}
            disabled={current === total - 1}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-body text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Siguiente <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

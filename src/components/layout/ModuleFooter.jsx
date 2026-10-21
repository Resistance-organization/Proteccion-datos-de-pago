import { motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, CheckCircle2, Clock, Lock, Award } from 'lucide-react'
import Icon from '../ui/Icon'

function heroSubtitle(mod) {
  return mod?.blocks.find(b => b.type === 'hero')?.subtitle || mod?.description
}

// Cierre del módulo: presenta el siguiente paso (otro módulo o el certificado)
// y, si el módulo ya está completo, lo celebra.
export default function ModuleFooter({ currentIndex, total, nextModule, isDone, blockReason, onNext, onPrev, onFinish }) {
  const isLast = !nextModule
  const locked = !!blockReason

  return (
    <section id="module-footer" className="mt-14 scroll-mt-24" aria-label="Siguiente paso">
      {isDone && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mb-4 text-secondary font-title font-semibold text-sm uppercase tracking-[0.18em]"
        >
          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.1 }}
          >
            <CheckCircle2 size={18} />
          </motion.span>
          Módulo completado
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        className="relative overflow-hidden rounded-3xl shadow-xl isolate px-7 py-8 sm:px-10 sm:py-10"
        style={{ background: isLast
          ? 'linear-gradient(135deg, #3178BD 0%, #3A3B74 55%, #E73780 140%)'
          : 'linear-gradient(140deg, #3A3B74 0%, #1E1F4A 100%)' }}
      >
        <div className="absolute -right-20 -bottom-20 w-72 h-72 rounded-full -z-10 blur-3xl bg-accent/30" />

        <p className="text-[11px] font-title font-semibold uppercase tracking-[0.22em] text-white/60 mb-4">
          {isLast ? 'Último paso' : isDone ? 'Bien hecho — sigue con' : 'A continuación'}
        </p>

        <div className="flex items-start gap-5">
          <div className="hidden sm:flex flex-shrink-0 w-16 h-16 rounded-2xl bg-white/10 border border-white/15 items-center justify-center text-white">
            {isLast ? <Award size={28} /> : <Icon name={nextModule.icon} size={28} />}
          </div>
          <div className="min-w-0">
            {!isLast && (
              <p className="text-sm font-body text-white/60 mb-1">Módulo {nextModule.id}</p>
            )}
            <h2 className="font-title text-2xl sm:text-3xl font-bold text-white leading-tight text-balance">
              {isLast ? 'Obtén tu certificado' : nextModule.title}
            </h2>
            <p className="mt-2 font-body text-white/75 text-base leading-relaxed">
              {isLast
                ? 'Descarga el certificado que acredita que completaste el curso.'
                : heroSubtitle(nextModule)}
            </p>
            {!isLast && nextModule.estimatedTime && (
              <p className="mt-3 flex items-center gap-1.5 text-white/60 text-sm font-body">
                <Clock size={14} /> {nextModule.estimatedTime}
              </p>
            )}
          </div>
        </div>

        <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-3">
          <button
            onClick={isLast ? onFinish : onNext}
            disabled={locked}
            className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-title font-semibold text-base transition-all
              ${locked
                ? 'bg-white/10 text-white/50 cursor-not-allowed'
                : 'bg-white text-primary shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0'}`}
          >
            {locked && <Lock size={16} />}
            {isLast ? 'Finalizar y obtener certificado' : `Comenzar módulo ${nextModule.id}`}
            {!locked && <ArrowRight size={18} />}
          </button>
          {locked && (
            <p className="text-sm font-body text-white/70">{blockReason}</p>
          )}
        </div>
      </motion.div>

      {/* Navegación secundaria */}
      <div className="mt-5 flex items-center justify-between gap-4 px-1">
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="inline-flex items-center gap-1.5 text-sm font-body font-medium text-gray-500 hover:text-primary disabled:opacity-0 disabled:pointer-events-none transition-colors"
        >
          <ChevronLeft size={16} /> Módulo anterior
        </button>
        <span className="text-xs font-body text-gray-400">
          Parte {currentIndex + 1} de {total} del curso
        </span>
      </div>
    </section>
  )
}

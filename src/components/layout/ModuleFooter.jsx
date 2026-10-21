import { motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, CheckCircle2, Clock, Lock, Award } from 'lucide-react'
import Icon from '../ui/Icon'

// Cierre del módulo: una franja compacta con el siguiente paso (otro módulo o
// el certificado). Si el módulo ya está completo, lo indica arriba.
export default function ModuleFooter({ currentIndex, total, nextModule, isDone, blockReason, onNext, onPrev, onFinish }) {
  const isLast = !nextModule
  const locked = !!blockReason

  return (
    <section id="module-footer" className="mt-12 pb-16 scroll-mt-24" aria-label="Siguiente paso">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        className="rounded-2xl bg-white border border-gray-100 shadow-sm px-5 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-4"
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <span className="flex-shrink-0 w-11 h-11 rounded-xl bg-primary-50 text-primary flex items-center justify-center">
            {isLast ? <Award size={20} /> : <Icon name={nextModule.icon} size={20} />}
          </span>
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-xs font-body text-gray-500">
              {isDone && <CheckCircle2 size={13} className="text-secondary flex-shrink-0" />}
              {isDone && <span className="font-semibold text-secondary">Módulo completado ·</span>}
              {isLast ? 'Último paso' : <>A continuación · Módulo {nextModule.id}</>}
              {!isLast && nextModule.estimatedTime && (
                <span className="inline-flex items-center gap-1 text-gray-400"><Clock size={11} /> {nextModule.estimatedTime}</span>
              )}
            </p>
            <h2 className="font-title text-lg font-semibold text-gray-800 leading-snug truncate">
              {isLast ? 'Obtén tu certificado' : nextModule.title}
            </h2>
            {locked && <p className="text-xs font-body text-amber-600 mt-0.5">{blockReason}</p>}
          </div>
        </div>

        <button
          onClick={isLast ? onFinish : onNext}
          disabled={locked}
          className={`flex-shrink-0 inline-flex items-center justify-center gap-2 whitespace-nowrap px-5 py-2.5 rounded-xl font-title font-semibold text-sm transition-all
            ${locked
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'gradient-primary text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'}`}
        >
          {locked && <Lock size={14} />}
          {isLast ? 'Obtener certificado' : 'Siguiente módulo'}
          {!locked && <ArrowRight size={16} />}
        </button>
      </motion.div>

      {/* Navegación secundaria */}
      <div className="mt-4 flex items-center justify-between gap-4 px-1">
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

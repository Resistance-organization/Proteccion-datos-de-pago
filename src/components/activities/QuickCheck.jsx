import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, CheckCircle2, XCircle, RotateCcw } from 'lucide-react'
import ActivityRibbon from './ActivityRibbon'

// Pregunta rápida sin calificación: rompe los tramos largos de lectura con una
// decisión concreta y retroalimentación inmediata. No afecta el progreso.
export default function QuickCheck({ block }) {
  const [selected, setSelected] = useState(null)
  const answered = selected !== null
  const isCorrect = answered && selected === block.correct

  return (
    <div className="relative pt-2">
      <ActivityRibbon label="Pregunta rápida" icon={Zap} color="secondary" />
      <div className="bg-white rounded-2xl shadow-md ring-2 ring-secondary/20 px-6 sm:px-8 pt-8 pb-6">
        {block.context && (
          <p className="font-body text-sm text-gray-500 mb-2">{block.context}</p>
        )}
        <p className="font-title text-xl font-semibold text-gray-800 leading-snug mb-5">{block.question}</p>

        <div className="space-y-2.5" role="group" aria-label="Opciones">
          {block.options.map((option, i) => {
            const isThis = selected === i
            const isRight = i === block.correct
            let style = 'border-gray-200 bg-white hover:border-secondary-300 hover:bg-secondary-50'
            if (answered && isRight) style = 'border-green-500 bg-green-50'
            else if (answered && isThis) style = 'border-red-400 bg-red-50'
            else if (answered) style = 'border-gray-100 bg-gray-50 opacity-60'
            return (
              <button
                key={i}
                disabled={answered}
                onClick={() => setSelected(i)}
                className={`w-full text-left flex items-start gap-3 px-4 py-3 rounded-xl border-2 transition-all ${style} ${answered ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <span className="flex-1 font-body text-base text-gray-700 leading-snug">{option}</span>
                {answered && isRight && <CheckCircle2 size={20} className="flex-shrink-0 text-green-500" />}
                {answered && isThis && !isRight && <XCircle size={20} className="flex-shrink-0 text-red-400" />}
              </button>
            )
          })}
        </div>

        <AnimatePresence>
          {answered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-5 pt-4 border-t border-gray-100">
                <p className={`font-title font-semibold text-base ${isCorrect ? 'text-green-700' : 'text-gray-800'}`}>
                  {isCorrect ? '¡Exacto!' : 'No exactamente.'}
                </p>
                <p className="mt-1 font-body text-base text-gray-700 leading-relaxed">{block.explanation}</p>
                {!isCorrect && (
                  <button
                    onClick={() => setSelected(null)}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-body font-medium text-secondary hover:underline"
                  >
                    <RotateCcw size={14} /> Intentar de nuevo
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

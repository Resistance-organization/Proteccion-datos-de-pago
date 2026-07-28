import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Sparkles, MessageCircleQuestion, RotateCcw } from 'lucide-react'
import ActivityRibbon from './ActivityRibbon'

// Actividad de autorreflexión sin calificación: preguntas secuenciales de opción
// única sin respuesta correcta, terminan en un mensaje de cierre fijo.

function Question({ question, index, total, onAnswer }) {
  const progressPct = Math.round(((index + 1) / total) * 100)

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-5"
    >
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-body font-semibold text-gray-500">
            Pregunta {index + 1} de {total}
          </span>
          <span className="text-xs font-body text-gray-400">{progressPct}%</span>
        </div>
        <div className="bg-gray-100 rounded-full h-2">
          <div
            className="h-2 rounded-full bg-secondary transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <p className="font-title text-base font-semibold text-gray-800">{question.question}</p>

      <div className="space-y-2 max-w-lg">
        {question.options.map((option, i) => (
          <button
            key={i}
            onClick={() => onAnswer(option)}
            className="w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all
              border-2 border-gray-100 bg-gray-50 hover:border-secondary-200 hover:bg-secondary-50"
          >
            <span className="font-body text-sm text-gray-700">{option}</span>
          </button>
        ))}
      </div>
    </motion.div>
  )
}

export default function SelfCheck({ block, onFinish }) {
  const [current, setCurrent] = useState(0)
  const [finished, setFinished] = useState(false)
  const [answers, setAnswers] = useState([])

  const total = block.questions.length

  const handleAnswer = (option) => {
    setAnswers(prev => [...prev, option])
    if (current < total - 1) {
      setCurrent(current + 1)
    } else {
      setFinished(true)
      onFinish && onFinish()
    }
  }

  const handleRestart = () => {
    setCurrent(0)
    setFinished(false)
    setAnswers([])
  }

  return (
    <div className="relative">
      <ActivityRibbon label="Reflexión" icon={MessageCircleQuestion} color="secondary" />
      <div className="bg-white rounded-2xl shadow-xl ring-4 ring-secondary/25 overflow-hidden">
      <div className="px-6 sm:px-8 pt-7 pb-5 border-b border-gray-100 gradient-primary">
        <h2 className="font-title text-xl font-semibold text-white">{block.title}</h2>
        {block.subtitle && (
          <p className="text-white/70 text-sm font-body mt-1">{block.subtitle}</p>
        )}
      </div>

      <div className="px-6 sm:px-8 py-6">
        <AnimatePresence mode="wait">
          {!finished ? (
            <Question
              key={current}
              question={block.questions[current]}
              index={current}
              total={total}
              onAnswer={handleAnswer}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 max-w-2xl mx-auto"
            >
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 bg-secondary-50">
                <Sparkles size={38} className="text-secondary" />
              </div>
              <h3 className="font-title text-2xl font-bold text-gray-800">{block.resultTitle}</h3>
              <p className="font-body text-gray-500 mt-3 leading-relaxed">{block.resultText}</p>

              <div className="mt-6 grid sm:grid-cols-3 gap-3 text-left">
                {block.questions.map((q, i) => (
                  <div key={q.id} className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                    <p className="text-xs font-body text-gray-400 leading-snug">{q.question}</p>
                    <p className="font-title text-sm font-semibold text-secondary mt-1.5">{answers[i]}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={handleRestart}
                className="flex items-center gap-2 mx-auto mt-6 text-secondary font-body text-sm hover:underline"
              >
                <RotateCcw size={14} />
                Empezar de nuevo
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </div>
    </div>
  )
}

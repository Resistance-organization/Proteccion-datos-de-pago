import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, ChevronRight, Award, RotateCcw, Brain } from 'lucide-react'
import ActivityRibbon from './ActivityRibbon'
import { courseInfo } from '../../data/modules'

function Question({ question, index, total, onAnswer, answered }) {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (selected === null) return
    setSubmitted(true)
    onAnswer(question.id, selected === question.correct)
  }

  const isCorrect = submitted && selected === question.correct

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-2 text-sm text-gray-400 font-body">
        <span className="bg-primary-50 text-primary px-2 py-0.5 rounded-full text-xs font-semibold">
          {index + 1} / {total}
        </span>
      </div>

      <p className="font-title text-xl font-semibold text-gray-800 leading-snug">
        {question.question}
      </p>

      <div className="space-y-2">
        {question.options.map((option, i) => {
          let style = 'border-2 border-gray-100 bg-gray-50 hover:border-primary-200 hover:bg-primary-50'
          if (!submitted && selected === i) {
            style = 'border-2 border-primary bg-primary-50'
          }
          if (submitted && i === question.correct) {
            style = 'border-2 border-green-500 bg-green-50'
          }
          if (submitted && selected === i && i !== question.correct) {
            style = 'border-2 border-red-400 bg-red-50'
          }

          return (
            <button
              key={i}
              disabled={submitted}
              onClick={() => !submitted && setSelected(i)}
              className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all ${style}
                ${submitted ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <span
                className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2
                  ${!submitted && selected === i ? 'border-primary bg-primary text-white' : 'border-gray-300 text-gray-400'}
                  ${submitted && i === question.correct ? 'border-green-500 bg-green-500 text-white' : ''}
                  ${submitted && selected === i && i !== question.correct ? 'border-red-400 bg-red-400 text-white' : ''}
                `}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <span className="font-body text-base text-gray-700 leading-snug">{option}</span>
              {submitted && i === question.correct && (
                <CheckCircle size={18} className="ml-auto text-green-500" />
              )}
              {submitted && selected === i && i !== question.correct && (
                <XCircle size={18} className="ml-auto text-red-400" />
              )}
            </button>
          )
        })}
      </div>

      {/* Botón enviar */}
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={selected === null}
          className={`mt-2 px-6 py-2.5 rounded-xl font-title font-semibold text-sm flex items-center gap-2 transition-all
            ${selected !== null
              ? 'gradient-primary text-white shadow-md hover:shadow-lg hover:opacity-90'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
        >
          Verificar respuesta
          <ChevronRight size={16} />
        </button>
      )}

      {/* Retroalimentación */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className={`rounded-xl p-4 flex gap-3 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}
          >
            {isCorrect
              ? <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
              : <XCircle size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
            }
            <div>
              <p className={`font-title font-semibold text-base ${isCorrect ? 'text-green-700' : 'text-amber-700'}`}>
                {isCorrect ? '¡Correcto!' : 'Respuesta incorrecta'}
              </p>
              {question.explanation && (
                <p className="text-base font-body text-gray-700 leading-relaxed mt-1">{question.explanation}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Quiz({ block, onComplete }) {
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState({})
  const [finished, setFinished] = useState(false)

  const handleAnswer = (id, correct) => {
    setAnswers(prev => ({ ...prev, [id]: correct }))
  }

  const handleNext = () => {
    if (currentQ < block.questions.length - 1) {
      setCurrentQ(currentQ + 1)
    } else {
      setFinished(true)
      const correct = Object.values(answers).filter(Boolean).length
      const score = Math.round((correct / block.questions.length) * 100)
      onComplete && onComplete(score, block.isFinal)
    }
  }

  const handleReset = () => {
    setCurrentQ(0)
    setAnswers({})
    setFinished(false)
  }

  const isCurrentAnswered = answers[block.questions[currentQ]?.id] !== undefined
  const correctCount = Object.values(answers).filter(Boolean).length
  const score = Math.round((correctCount / block.questions.length) * 100)
  // Mismo umbral que usa App.jsx para desbloquear y Moodle (masteryscore) para 'passed'
  const passed = score >= courseInfo.passingScore

  return (
    <div className="relative">
      <ActivityRibbon label="Quiz calificado" icon={Brain} color="accent" />
      <div className="bg-white rounded-2xl shadow-xl ring-4 ring-accent/25 overflow-hidden">
      {/* Encabezado del quiz */}
      <div className="px-6 sm:px-8 pt-7 pb-5 border-b border-gray-100" style={{ background: 'linear-gradient(135deg, #E73780 0%, #A23EA1 100%)' }}>
        <h2 className="font-title text-xl font-semibold text-white">{block.title}</h2>
        {block.subtitle && (
          <p className="text-white/80 text-base font-body mt-1">{block.subtitle}</p>
        )}
        {/* Barra de progreso */}
        <div className="mt-3 bg-white/20 rounded-full h-1.5">
          <div
            className="h-1.5 rounded-full bg-secondary transition-all duration-500"
            style={{ width: `${((currentQ + 1) / block.questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="px-6 sm:px-8 py-6">
        <AnimatePresence mode="wait">
          {!finished ? (
            <div className="space-y-6">
              <Question
                key={currentQ}
                question={block.questions[currentQ]}
                index={currentQ}
                total={block.questions.length}
                onAnswer={handleAnswer}
                answered={isCurrentAnswered}
              />
              {isCurrentAnswered && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={handleNext}
                  className="gradient-primary text-white px-6 py-2.5 rounded-xl font-title font-semibold text-sm flex items-center gap-2 shadow-md hover:opacity-90 transition-opacity"
                >
                  {currentQ < block.questions.length - 1 ? 'Siguiente pregunta' : 'Ver resultados'}
                  <ChevronRight size={16} />
                </motion.button>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4
                ${passed ? 'bg-green-100' : 'bg-amber-100'}`}
              >
                <Award size={40} className={passed ? 'text-green-500' : 'text-amber-500'} />
              </div>
              <h3 className="font-title text-2xl font-bold text-gray-800">
                {passed ? '¡Excelente trabajo!' : '¡Sigue aprendiendo!'}
              </h3>
              <p className="font-body text-gray-500 mt-2">
                Obtuviste <strong className={passed ? 'text-green-600' : 'text-amber-600'}>{score}%</strong> —
                {correctCount} de {block.questions.length} respuestas correctas
              </p>
              {!passed && (
                <>
                  <p className="font-body text-sm text-red-500 mt-3 mb-5 max-w-xs mx-auto">
                    No obtuviste la calificación mínima para pasar al siguiente módulo. ¡Inténtalo de nuevo!
                  </p>
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 mx-auto text-primary font-body text-sm hover:underline"
                  >
                    <RotateCcw size={14} />
                    Intentar de nuevo
                  </button>
                </>
              )}
              {passed && <div className="mb-6" />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, ChevronRight, Compass, Search, Star, ShieldCheck, Gamepad2, Signal, RotateCcw } from 'lucide-react'
import ActivityRibbon from './ActivityRibbon'

// ─── Mockups por tipo de escenario ───────────────────────────────────────────

function PhoneFrame({ children }) {
  return (
    <div className="mx-auto w-full max-w-xs bg-gray-900 rounded-[28px] p-2.5 shadow-lg">
      <div className="bg-gray-50 rounded-[20px] overflow-hidden">{children}</div>
    </div>
  )
}

function SmsMockup({ content }) {
  return (
    <PhoneFrame>
      <div className="px-4 pt-4 pb-2 bg-white border-b border-gray-100">
        <p className="text-xs font-body text-gray-400 text-center">Mensajes</p>
      </div>
      <div className="p-4">
        <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
          <p className="font-title text-xs font-bold text-gray-700 mb-1">{content.sender}</p>
          <p className="font-body text-sm text-gray-800 leading-snug">{content.message}</p>
        </div>
        <p className="text-[10px] text-gray-400 font-body mt-1.5 ml-1">{content.time}</p>
      </div>
    </PhoneFrame>
  )
}

function EmailMockup({ content }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm max-w-md mx-auto">
      <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 flex gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-300" />
      </div>
      <div className="p-4">
        <p className="text-xs font-body text-gray-400">
          De: <span className="text-red-500 font-semibold">{content.sender}</span>
        </p>
        <p className="font-title text-sm font-semibold text-gray-800 mt-1">{content.subject}</p>
        <p className="font-body text-sm text-gray-600 mt-2 leading-relaxed">{content.message}</p>
        <p className="text-[10px] text-gray-400 font-body mt-2">{content.time}</p>
      </div>
    </div>
  )
}

function WifiMockup({ content }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm max-w-md mx-auto p-5 text-center">
      <p className="font-body text-sm text-gray-600 leading-relaxed">{content.message}</p>
      <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-50 border border-secondary-100">
        <Signal size={16} className="text-secondary" aria-hidden="true" />
        <span className="font-title text-sm font-semibold text-secondary">{content.network}</span>
      </div>
    </div>
  )
}

function ChatMockup({ content }) {
  return (
    <PhoneFrame>
      <div className="px-4 py-3 bg-primary flex items-center gap-2">
        <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-xs text-white font-bold">
          {content.avatar || '?'}
        </span>
        <div>
          <p className="text-xs font-title font-semibold text-white">{content.sender}</p>
          <p className="text-[10px] text-white/60 font-body">{content.senderNote}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="bg-secondary-50 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
          <p className="font-body text-sm text-gray-800 leading-snug">{content.message}</p>
        </div>
        <p className="text-[10px] text-gray-400 font-body mt-1.5 ml-1">{content.time}</p>
      </div>
    </PhoneFrame>
  )
}

const MOCKUPS = {
  sms: SmsMockup,
  email: EmailMockup,
  wifi: WifiMockup,
  whatsapp: ChatMockup,
  instagram: ChatMockup,
}

// ─── Pregunta individual ─────────────────────────────────────────────────────

function Situation({ situation, index, total, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const Mockup = MOCKUPS[situation.mockup] || SmsMockup
  const progressPct = Math.round(((index + 1) / total) * 100)

  const handleSelect = (i) => {
    if (submitted) return
    setSelected(i)
    setSubmitted(true)
  }

  const isCorrect = submitted && situation.options[selected]?.correct

  return (
    <motion.div
      key={situation.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-5"
    >
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-body font-semibold text-gray-500">
            Situación {index + 1} de {total}
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

      <div className="grid md:grid-cols-2 gap-6 items-start">
        {/* Columna izquierda — mockup del escenario + feedback */}
        <div className="md:sticky md:top-4 space-y-4">
          <Mockup content={situation.content} />

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
                <p className="text-base font-body text-gray-700 leading-relaxed">{situation.options[selected].feedback}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Columna derecha — pregunta, opciones y botón de avance */}
        <div className="space-y-4">
          <p className="font-title text-base font-semibold text-gray-800">
            {situation.question}
          </p>

          <div className="space-y-2">
            {situation.options.map((option, i) => {
              let style = 'border-2 border-gray-100 bg-gray-50 hover:border-secondary-200 hover:bg-secondary-50'
              if (submitted && option.correct) style = 'border-2 border-green-500 bg-green-50'
              if (submitted && selected === i && !option.correct) style = 'border-2 border-red-400 bg-red-50'

              return (
                <button
                  key={i}
                  disabled={submitted}
                  onClick={() => handleSelect(i)}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all ${style}
                    ${submitted ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2
                      ${submitted && option.correct ? 'border-green-500 bg-green-500 text-white' : ''}
                      ${submitted && selected === i && !option.correct ? 'border-red-400 bg-red-400 text-white' : ''}
                      ${!submitted ? 'border-gray-300 text-gray-400' : ''}
                    `}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="font-body text-base text-gray-700 leading-snug">{option.text}</span>
                  {submitted && option.correct && (
                    <CheckCircle size={18} className="ml-auto text-green-500 flex-shrink-0" />
                  )}
                  {submitted && selected === i && !option.correct && (
                    <XCircle size={18} className="ml-auto text-red-400 flex-shrink-0" />
                  )}
                </button>
              )
            })}
          </div>

          {submitted && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => onAnswer(isCorrect)}
              className="gradient-primary text-white px-6 py-2.5 rounded-xl font-title font-semibold text-sm flex items-center gap-2 shadow-md hover:opacity-90 transition-opacity"
            >
              {index < total - 1 ? 'Siguiente situación' : 'Ver resultado'}
              <ChevronRight size={16} />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Pantalla de resultado (3 bandas, sin punitivo) ──────────────────────────

const RESULT_ICONS = { compass: Compass, search: Search, star: Star, shield: ShieldCheck }

function getBand(correctCount, total, results) {
  if (correctCount >= results.band3.min) return results.band3
  if (correctCount >= results.band2.min) return results.band2
  return results.band1
}

// ─── Componente principal ────────────────────────────────────────────────────

export default function ScenarioQuiz({ block, onFinish }) {
  const [current, setCurrent] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)

  const total = block.situations.length

  const handleAnswer = (wasCorrect) => {
    const newCount = correctCount + (wasCorrect ? 1 : 0)
    setCorrectCount(newCount)
    if (current < total - 1) {
      setCurrent(current + 1)
    } else {
      setFinished(true)
      onFinish && onFinish(newCount, total)
    }
  }

  // Vuelve al inicio para probar otras decisiones (el juego no califica)
  const handleRestart = () => {
    setCurrent(0)
    setCorrectCount(0)
    setFinished(false)
  }

  const band = finished ? getBand(correctCount, total, block.results) : null
  const BandIcon = band ? RESULT_ICONS[band.icon] || Compass : Compass

  return (
    <div className="relative">
      <ActivityRibbon label="Juego" icon={Gamepad2} color="secondary" />
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
            <Situation
              key={current}
              situation={block.situations[current]}
              index={current}
              total={total}
              onAnswer={handleAnswer}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 max-w-lg mx-auto"
            >
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 bg-secondary-50">
                <BandIcon size={38} className="text-secondary" />
              </div>
              <h3 className="font-title text-2xl font-bold text-gray-800">{band.title}</h3>
              <p className="font-body text-gray-500 mt-3 leading-relaxed">{band.text}</p>
              {block.results.commonNote && (
                <p className="font-body text-sm text-gray-400 mt-5 italic leading-relaxed">
                  {block.results.commonNote}
                </p>
              )}
              <button
                onClick={handleRestart}
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-secondary text-secondary font-title font-semibold text-sm hover:bg-secondary-50 transition-colors"
              >
                <RotateCcw size={16} /> Volver a jugar
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </div>
    </div>
  )
}

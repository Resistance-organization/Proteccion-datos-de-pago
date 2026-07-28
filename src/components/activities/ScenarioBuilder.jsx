import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, ChevronRight, Undo2, PartyPopper, ClipboardCheck } from 'lucide-react'
import ActivityRibbon from './ActivityRibbon'

function OrderMode({ scenario, onSubmit }) {
  const [chosen, setChosen] = useState([])
  const [submitted, setSubmitted] = useState(false)

  const toggle = (key) => {
    if (submitted) return
    setChosen(prev => [...prev, key])
  }
  const undo = () => setChosen(prev => prev.slice(0, -1))

  const remaining = scenario.options.filter(o => !chosen.includes(o.key))

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 min-h-[42px] p-3 rounded-xl bg-gray-50 border-2 border-dashed border-gray-200">
        {chosen.length === 0 && <span className="text-sm text-gray-400 font-body">Haz clic en las opciones de abajo, en el orden que harías cada acción</span>}
        {chosen.map((key, i) => (
          <span key={i} className="flex items-center gap-1.5 bg-primary text-white text-sm font-body px-3 py-1.5 rounded-full">
            <span className="font-bold">{i + 1}.</span> {key}
          </span>
        ))}
      </div>

      {!submitted && (
        <div className="space-y-2">
          {remaining.map(opt => (
            <button
              key={opt.key}
              onClick={() => toggle(opt.key)}
              className="w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 border-2 border-gray-100 bg-white hover:border-secondary-200 hover:bg-secondary-50 transition-all"
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 border-gray-300 text-gray-400">{opt.key}</span>
              <span className="font-body text-sm text-gray-700">{opt.text}</span>
            </button>
          ))}
        </div>
      )}

      {!submitted && (
        <div className="flex gap-2">
          {chosen.length > 0 && (
            <button onClick={undo} className="flex items-center gap-1.5 px-4 py-2 rounded-xl border-2 border-gray-200 text-gray-500 text-sm font-body hover:border-gray-300">
              <Undo2 size={14} /> Deshacer
            </button>
          )}
          {chosen.length >= 3 && (
            <button
              onClick={() => setSubmitted(true)}
              className="gradient-primary text-white px-6 py-2.5 rounded-xl font-title font-semibold text-sm shadow-md hover:opacity-90 transition-opacity"
            >
              Verificar orden
            </button>
          )}
        </div>
      )}

      {submitted && (
        <Feedback scenario={scenario} userAnswer={chosen} onNext={() => onSubmit()} />
      )}
    </div>
  )
}

function SelectMode({ scenario, onSubmit }) {
  const [selected, setSelected] = useState(new Set())
  const [submitted, setSubmitted] = useState(false)

  const toggle = (key) => {
    if (submitted) return
    setSelected(prev => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {scenario.options.map(opt => {
          const isSel = selected.has(opt.key)
          let style = 'border-2 border-gray-100 bg-white hover:border-secondary-200 hover:bg-secondary-50'
          if (submitted && scenario.correctKeys.includes(opt.key)) style = 'border-2 border-green-500 bg-green-50'
          if (submitted && isSel && !scenario.correctKeys.includes(opt.key)) style = 'border-2 border-red-400 bg-red-50'
          else if (!submitted && isSel) style = 'border-2 border-secondary bg-secondary-50'

          return (
            <button
              key={opt.key}
              disabled={submitted}
              onClick={() => toggle(opt.key)}
              className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all ${style} ${submitted ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 border-gray-300 text-gray-400">{opt.key}</span>
              <span className="font-body text-sm text-gray-700">{opt.text}</span>
              {submitted && scenario.correctKeys.includes(opt.key) && <CheckCircle size={18} className="ml-auto text-green-500 flex-shrink-0" />}
              {submitted && isSel && !scenario.correctKeys.includes(opt.key) && <XCircle size={18} className="ml-auto text-red-400 flex-shrink-0" />}
            </button>
          )
        })}
      </div>

      {!submitted && (
        <button
          onClick={() => setSubmitted(true)}
          disabled={selected.size === 0}
          className={`px-6 py-2.5 rounded-xl font-title font-semibold text-sm transition-all ${selected.size ? 'gradient-primary text-white shadow-md hover:opacity-90' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
        >
          Verificar respuesta
        </button>
      )}

      {submitted && (
        <Feedback scenario={scenario} userAnswer={[...selected]} onNext={() => onSubmit()} />
      )}
    </div>
  )
}

function Feedback({ scenario, userAnswer, onNext }) {
  const correct = scenario.mode === 'order' ? scenario.correctOrder : scenario.correctKeys
  const isExactMatch = scenario.mode === 'order'
    ? JSON.stringify(userAnswer) === JSON.stringify(correct)
    : userAnswer.length === correct.length && correct.every(k => userAnswer.includes(k))

  return (
    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-3">
      <div className={`rounded-xl p-4 flex gap-3 ${isExactMatch ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
        {isExactMatch
          ? <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
          : <XCircle size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />}
        <div>
          <p className="font-title font-semibold text-sm text-gray-800 mb-1">
            {scenario.mode === 'order' ? `Orden correcto: ${correct.join(', ')}` : `Correctas: ${correct.join(', ')}`}
          </p>
          <p className="text-sm font-body text-gray-600">{scenario.justification}</p>
        </div>
      </div>
      <button
        onClick={onNext}
        className="gradient-primary text-white px-6 py-2.5 rounded-xl font-title font-semibold text-sm flex items-center gap-2 shadow-md hover:opacity-90 transition-opacity"
      >
        Siguiente escenario
        <ChevronRight size={16} />
      </button>
    </motion.div>
  )
}

export default function ScenarioBuilder({ block }) {
  const [current, setCurrent] = useState(0)
  const [finished, setFinished] = useState(false)
  const total = block.scenarios.length

  const handleNext = () => {
    if (current < total - 1) setCurrent(current + 1)
    else setFinished(true)
  }

  const scenario = block.scenarios[current]

  return (
    <div className="relative">
      <ActivityRibbon label="Actividad de validación" icon={ClipboardCheck} color="accent" />
      <div className="bg-white rounded-2xl shadow-xl ring-4 ring-accent/25 overflow-hidden">
      <div className="px-6 sm:px-8 pt-7 pb-5 border-b border-gray-100 gradient-primary">
        <h2 className="font-title text-xl font-semibold text-white">{block.title}</h2>
        {block.subtitle && <p className="text-white/70 text-sm font-body mt-1">{block.subtitle}</p>}
      </div>

      <div className="px-6 sm:px-8 py-6">
        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <span className="text-xs font-body font-semibold text-gray-500">Escenario {current + 1} de {total}</span>
              <p className="font-body text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-xl p-4">{scenario.situation}</p>
              <p className="font-title text-base font-semibold text-gray-800">{scenario.question}</p>

              {scenario.mode === 'order'
                ? <OrderMode key={scenario.id} scenario={scenario} onSubmit={handleNext} />
                : <SelectMode key={scenario.id} scenario={scenario} onSubmit={handleNext} />
              }
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 bg-secondary-50">
                <PartyPopper size={38} className="text-secondary" />
              </div>
              <h3 className="font-title text-2xl font-bold text-gray-800">Actividad completada</h3>
              <p className="font-body text-gray-500 mt-3 max-w-md mx-auto leading-relaxed">
                No hay puntaje mínimo en este ejercicio. Lo importante es que ya sabes cómo aplicar el protocolo de respuesta en situaciones reales.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </div>
    </div>
  )
}

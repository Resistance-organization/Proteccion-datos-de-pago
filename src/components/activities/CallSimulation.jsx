import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, CheckCircle, XCircle, Gamepad2, RotateCcw } from 'lucide-react'
import ActivityRibbon from './ActivityRibbon'

function Line({ speaker, text }) {
  const isAttacker = speaker === 'attacker'
  return (
    <div className={`flex ${isAttacker ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${isAttacker ? 'bg-gray-100 rounded-tl-sm' : 'bg-secondary-50 rounded-tr-sm'}`}>
        <p className="text-[10px] font-title font-bold uppercase tracking-wide text-gray-400 mb-1">
          {isAttacker ? block_speakerLabel(speaker) : 'Tú'}
        </p>
        <p className="font-body text-sm text-gray-800 leading-snug">{text}</p>
      </div>
    </div>
  )
}

function block_speakerLabel() {
  return 'Llamada entrante'
}

function DecisionPoint({ point, onAnswer }) {
  const [selected, setSelected] = useState(null)

  const handleSelect = (i) => {
    if (selected !== null) return
    setSelected(i)
  }

  const submitted = selected !== null
  const isCorrect = submitted && point.options[selected]?.correct

  return (
    <div className="space-y-4">
      <p className="font-title text-sm font-semibold text-gray-800">{point.question}</p>
      <div className="space-y-2">
        {point.options.map((option, i) => {
          let style = 'border-2 border-gray-100 bg-gray-50 hover:border-secondary-200 hover:bg-secondary-50'
          if (submitted && option.correct) style = 'border-2 border-green-500 bg-green-50'
          if (submitted && selected === i && !option.correct) style = 'border-2 border-red-400 bg-red-50'

          return (
            <button
              key={i}
              disabled={submitted}
              onClick={() => handleSelect(i)}
              className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all ${style} ${submitted ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2
                ${submitted && option.correct ? 'border-green-500 bg-green-500 text-white' : ''}
                ${submitted && selected === i && !option.correct ? 'border-red-400 bg-red-400 text-white' : ''}
                ${!submitted ? 'border-gray-300 text-gray-400' : ''}`}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <span className="font-body text-sm text-gray-700">{option.text}</span>
              {submitted && option.correct && <CheckCircle size={18} className="ml-auto text-green-500 flex-shrink-0" />}
              {submitted && selected === i && !option.correct && <XCircle size={18} className="ml-auto text-red-400 flex-shrink-0" />}
            </button>
          )
        })}
      </div>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className={`rounded-xl p-4 flex gap-3 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}
          >
            {isCorrect
              ? <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
              : <XCircle size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />}
            <p className="text-sm font-body text-gray-700">{point.options[selected].feedback}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {submitted && (
        <button
          onClick={() => onAnswer(selected)}
          className="gradient-primary text-white px-6 py-2.5 rounded-xl font-title font-semibold text-sm flex items-center gap-2 shadow-md hover:opacity-90 transition-opacity"
        >
          Continuar
        </button>
      )}
    </div>
  )
}

export default function CallSimulation({ block }) {
  const [stage, setStage] = useState('transcript1') // transcript1 -> decision1 -> (transcript2 -> decision2) -> done
  const [choice1, setChoice1] = useState(null)
  const [choice2, setChoice2] = useState(null)

  const handleDecision1 = (i) => {
    setChoice1(i)
    const branchesToDp2 = block.decisionPoint1.options[i].continuesToDecision2
    setStage(branchesToDp2 ? 'transcript2' : 'done')
  }

  const handleDecision2 = (i) => {
    setChoice2(i)
    setStage('done')
  }

  const handleRestart = () => {
    setStage('transcript1')
    setChoice1(null)
    setChoice2(null)
  }

  const branchedToDecision2 = choice1 !== null && block.decisionPoint1.options[choice1]?.continuesToDecision2
  const choice1Correct = choice1 !== null && block.decisionPoint1.options[choice1]?.correct
  const choice2Correct = choice2 !== null && block.decisionPoint2.options[choice2]?.correct
  const allCorrect = branchedToDecision2 ? (choice1Correct && choice2Correct) : choice1Correct

  return (
    <div className="relative">
      <ActivityRibbon label="Juego" icon={Gamepad2} color="secondary" />
      <div className="bg-white rounded-2xl shadow-xl ring-4 ring-secondary/25 overflow-hidden">
      <div className="px-6 sm:px-8 pt-7 pb-5 border-b border-gray-100 gradient-primary flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
          <Phone size={16} className="text-white" />
        </div>
        <div>
          <h2 className="font-title text-lg font-semibold text-white">{block.title}</h2>
          {block.subtitle && <p className="text-white/70 text-xs font-body">{block.subtitle}</p>}
        </div>
      </div>

      <div className="px-6 sm:px-8 py-6 space-y-5">
        <div className="space-y-2.5">
          {block.transcript1.map((line, i) => <Line key={i} speaker={line.speaker} text={line.text} />)}
        </div>

        {stage === 'transcript1' && (
          <button
            onClick={() => setStage('decision1')}
            className="gradient-primary text-white px-6 py-2.5 rounded-xl font-title font-semibold text-sm shadow-md hover:opacity-90 transition-opacity"
          >
            ¿Qué haces?
          </button>
        )}

        {(stage === 'decision1' || stage === 'transcript2' || stage === 'done') && (
          <DecisionPoint point={block.decisionPoint1} onAnswer={handleDecision1} />
        )}

        {(stage === 'transcript2' || (stage === 'done' && choice1 !== null && block.decisionPoint1.options[choice1]?.continuesToDecision2)) && (
          <div className="space-y-2.5 pt-2 border-t border-dashed border-gray-200">
            {block.transcript2.map((line, i) => <Line key={i} speaker={line.speaker} text={line.text} />)}
          </div>
        )}

        {stage === 'transcript2' && (
          <button
            onClick={() => setStage('decision2')}
            className="gradient-primary text-white px-6 py-2.5 rounded-xl font-title font-semibold text-sm shadow-md hover:opacity-90 transition-opacity"
          >
            ¿Qué haces?
          </button>
        )}

        {(stage === 'decision2' || (stage === 'done' && branchedToDecision2)) && (
          <DecisionPoint point={block.decisionPoint2} onAnswer={handleDecision2} />
        )}

        <AnimatePresence>
          {stage === 'done' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center pt-5 border-t border-dashed border-gray-200"
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${allCorrect ? 'bg-green-100' : 'bg-amber-100'}`}>
                {allCorrect
                  ? <CheckCircle size={30} className="text-green-500" />
                  : <XCircle size={30} className="text-amber-500" />}
              </div>
              <h3 className="font-title text-lg font-bold text-gray-800">
                {allCorrect ? '¡Colgaste a tiempo!' : 'Revisemos qué pasó'}
              </h3>
              <p className="font-body text-sm text-gray-500 mt-2 max-w-md mx-auto leading-relaxed">
                {allCorrect
                  ? 'Reconociste las señales de vishing y protegiste tu cuenta. Ningún banco pide claves ni códigos MFA por teléfono.'
                  : 'En una llamada real, esta decisión habría comprometido tu cuenta. Ningún banco te va a pedir tu clave ni tu código MFA por teléfono: cuelga y verifica siempre por un canal que tú controles.'}
              </p>
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 mx-auto mt-4 text-secondary font-body text-sm hover:underline"
              >
                <RotateCcw size={14} />
                Repetir la simulación
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </div>
    </div>
  )
}

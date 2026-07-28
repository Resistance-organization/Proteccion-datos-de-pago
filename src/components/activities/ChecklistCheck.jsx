import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckSquare, Square, ClipboardCheck } from 'lucide-react'
import ActivityRibbon from './ActivityRibbon'

// Checklist de autoevaluación sin calificación: el participante marca lo que ya
// tiene configurado y recibe un mensaje según cuántos ítems marcó.
export default function ChecklistCheck({ block }) {
  const [checked, setChecked] = useState(() => new Set())
  const [submitted, setSubmitted] = useState(false)

  const toggle = (i) => {
    if (submitted) return
    setChecked(prev => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  const total = block.items.length
  const count = checked.size

  const getBand = () => {
    const { band1, band2, band3 } = block.results
    if (count >= band3.min) return band3
    if (count >= band2.min) return band2
    return band1
  }

  return (
    <div className="relative">
      <ActivityRibbon label="Actividad" icon={ClipboardCheck} color="secondary" />
      <div className="bg-white rounded-2xl shadow-xl ring-4 ring-secondary/25 overflow-hidden">
      <div className="px-6 sm:px-8 pt-7 pb-5 border-b border-gray-100 gradient-primary flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
          <ClipboardCheck size={16} className="text-white" />
        </div>
        <div>
          <h2 className="font-title text-lg font-semibold text-white">{block.title}</h2>
          {block.subtitle && <p className="text-white/70 text-xs font-body">{block.subtitle}</p>}
        </div>
      </div>

      <div className="px-6 sm:px-8 py-6">
        {!submitted ? (
          <>
            <div className="space-y-2 mb-5">
              {block.items.map((item, i) => {
                const isChecked = checked.has(i)
                return (
                  <button
                    key={i}
                    onClick={() => toggle(i)}
                    className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all border-2
                      ${isChecked ? 'border-secondary bg-secondary-50' : 'border-gray-100 bg-gray-50 hover:border-secondary-200'}`}
                  >
                    {isChecked
                      ? <CheckSquare size={18} className="text-secondary flex-shrink-0" />
                      : <Square size={18} className="text-gray-300 flex-shrink-0" />}
                    <span className="font-body text-sm text-gray-700">{item}</span>
                  </button>
                )
              })}
            </div>
            <button
              onClick={() => setSubmitted(true)}
              className="gradient-primary text-white px-6 py-2.5 rounded-xl font-title font-semibold text-sm shadow-md hover:opacity-90 transition-opacity"
            >
              Ver resultado
            </button>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6 max-w-lg mx-auto"
          >
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 bg-secondary-50">
              <span className="font-title text-2xl font-bold text-secondary">{count}/{total}</span>
            </div>
            <p className="font-body text-gray-600 leading-relaxed">{getBand().text}</p>
          </motion.div>
        )}
      </div>
      </div>
    </div>
  )
}

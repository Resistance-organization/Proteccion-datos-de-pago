import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

function GlossaryTerm({ term, index, isOpen, onToggle }) {
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      {/* Header — siempre visible */}
      <button
        onClick={onToggle}
        className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-all
          ${isOpen ? 'gradient-primary' : 'bg-white hover:bg-primary-50'}`}
      >
        {/* Número */}
        <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-title font-bold text-sm
          ${isOpen ? 'bg-white/20 text-white' : 'bg-primary-50 text-primary'}`}>
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Ícono + Término */}
        <div className="flex-1 flex items-center gap-2">
          {term.icon && <span className="text-xl">{term.icon}</span>}
          <span className={`font-title font-semibold text-base ${isOpen ? 'text-white' : 'text-gray-800'}`}>
            {term.term}
          </span>
          {term.badge && (
            <span className={`text-xs px-2 py-0.5 rounded-full font-body
              ${isOpen ? 'bg-white/20 text-white' : 'bg-secondary/20 text-secondary-600'}`}>
              {term.badge}
            </span>
          )}
        </div>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={18} className={isOpen ? 'text-white/70' : 'text-gray-400'} />
        </motion.div>
      </button>

      {/* Cuerpo expandible */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 py-5 bg-white border-t border-primary-100 space-y-3">
              {/* Definición */}
              <p className="font-body text-sm text-gray-700 leading-relaxed">
                {term.definition}
              </p>

              {/* Pregunta clave */}
              {term.question && (
                <div className="flex items-start gap-2">
                  <span className="text-secondary font-title font-bold text-sm flex-shrink-0">¿{term.question}?</span>
                </div>
              )}

              {/* Ejemplo */}
              {term.example && (
                <div className="flex items-start gap-3 bg-primary-50 rounded-lg px-4 py-3">
                  <span className="text-xl flex-shrink-0">💡</span>
                  <div>
                    <p className="font-title font-semibold text-xs text-primary uppercase tracking-wide mb-0.5">Ejemplo</p>
                    <p className="font-body text-sm text-gray-600">{term.example}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Glossary({ block }) {
  const [openIndex, setOpenIndex] = useState(0)

  const toggle = (i) => setOpenIndex(prev => (prev === i ? -1 : i))

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Encabezado */}
      <div className="px-6 sm:px-8 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2 text-primary text-xs font-body uppercase tracking-widest mb-1">
          <span>📖</span>
          <span>Glosario interactivo</span>
        </div>
        <h2 className="font-title text-xl font-semibold text-gray-800">{block.title}</h2>
        {block.intro && (
          <p className="font-body text-sm text-gray-500 mt-1 leading-relaxed">{block.intro}</p>
        )}
      </div>

      {/* Lista de términos */}
      <div className="p-4 sm:p-6 space-y-2">
        {block.terms.map((term, i) => (
          <GlossaryTerm
            key={i}
            term={term}
            index={i}
            isOpen={openIndex === i}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>
    </div>
  )
}

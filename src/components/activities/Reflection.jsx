import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, MessageSquareQuote, RotateCcw } from 'lucide-react'

export default function Reflection({ block, value, onSave }) {
  const [text, setText] = useState(value || '')
  const [saved, setSaved] = useState(Boolean(value))

  if (block.mode === 'recall') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-secondary-50 rounded-2xl border border-secondary-100 px-6 sm:px-10 py-6 sm:py-8"
      >
        <div className="flex items-start gap-3">
          <MessageSquareQuote size={22} className="text-secondary flex-shrink-0 mt-0.5" />
          <p className="font-body text-gray-700 leading-relaxed">
            {block.closingTemplate
              ? block.closingTemplate.replace('{{respuesta}}', value || 'algo importante para ti')
              : `Al empezar el curso escribiste que querías proteger "${value || 'algo importante para ti'}".`}
          </p>
        </div>
      </motion.div>
    )
  }

  const handleSubmit = () => {
    if (!text.trim()) return
    setSaved(true)
    onSave && onSave(block.storageKey, text.trim())
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 sm:px-10 py-6 sm:py-8"
    >
      {block.title && (
        <h2 className="font-title text-xl sm:text-2xl font-semibold text-gray-800 mb-4 pb-3 border-b-2 border-primary-100">
          {block.title}
        </h2>
      )}

      {block.intro && (
        <p className="font-body text-sm text-gray-600 mb-5 leading-relaxed">{block.intro}</p>
      )}

      <div className="max-w-lg">
        <p className="font-title text-base text-gray-700 mb-3">
          {block.promptPrefix || 'Con este curso quiero aprender a proteger'}
        </p>
        <input
          type="text"
          value={text}
          disabled={saved}
          onChange={(e) => setText(e.target.value)}
          placeholder={block.placeholder || 'Escribe aquí...'}
          className="w-full border-2 border-gray-200 focus:border-secondary rounded-xl px-4 py-3 font-body text-sm text-gray-800 outline-none transition-colors disabled:bg-gray-50 disabled:text-gray-500"
        />

        {!saved ? (
          <button
            onClick={handleSubmit}
            disabled={!text.trim()}
            className={`mt-4 px-6 py-2.5 rounded-xl font-title font-semibold text-sm flex items-center gap-2 transition-all
              ${text.trim()
                ? 'gradient-primary text-white shadow-md hover:opacity-90'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
          >
            Guardar y continuar
            <ChevronRight size={16} />
          </button>
        ) : (
          <div className="mt-4 flex items-center gap-4">
            <p className="text-sm font-body text-secondary">
              {block.savedText || 'Guardamos tu respuesta. Vas a poder leerla de nuevo más adelante en el curso.'}
            </p>
            <button
              onClick={() => setSaved(false)}
              className="flex items-center gap-1.5 text-xs font-body text-gray-400 hover:text-secondary transition-colors flex-shrink-0"
            >
              <RotateCcw size={13} />
              Editar
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

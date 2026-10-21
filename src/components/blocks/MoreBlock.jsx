import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, BookOpen } from 'lucide-react'

// Bloque plegable "Para profundizar": material de consulta fuera del recorrido
// principal. Cerrado por defecto. Su contenido lleva data-more-content para
// que App.jsx lo descuente del cálculo de progreso de lectura.
export default function MoreBlock({ block, renderBlock }) {
  const [open, setOpen] = useState(false)
  const contentId = useId()
  const blocks = block.blocks || []
  const count = blocks.length

  return (
    <div className="rounded-2xl border border-gray-200 bg-white/70">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls={contentId}
        className="w-full flex items-center gap-3 px-5 py-4 text-left rounded-2xl hover:bg-gray-50 transition-colors"
      >
        <span className="w-9 h-9 rounded-xl bg-secondary-50 text-secondary flex items-center justify-center flex-shrink-0">
          <BookOpen size={17} />
        </span>
        <span className="flex-1 min-w-0">
          <span className="block font-title font-semibold text-base text-gray-800">
            {block.title || 'Para profundizar'}
          </span>
          <span className="block font-body text-sm text-gray-500">
            {count} {count === 1 ? 'recurso' : 'recursos'}
          </span>
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-8 h-8 rounded-full border border-gray-200 text-gray-500 flex items-center justify-center flex-shrink-0"
        >
          <Plus size={16} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={contentId}
            data-more-content
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="px-3 sm:px-5 pb-5 pt-1 space-y-4">
              {blocks.map((b, i) => (
                <div key={i}>{renderBlock(b, i)}</div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

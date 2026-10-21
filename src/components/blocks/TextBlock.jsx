import { motion } from 'framer-motion'
import { Bookmark } from 'lucide-react'
import { TEMA_PATTERN, temaId } from '../../utils/temaSlug'

export default function TextBlock({ block, moduleNumber, bookmarkedTema, onToggleBookmark }) {
  const temaMatch = block.title?.match(TEMA_PATTERN)

  // Separador de tema: misma tarjeta que el resto de bloques, con
  // jerarquía "Tema N" (etiqueta + ícono) → título grande → párrafos.
  // Lleva un id de anclaje para que el sidebar pueda saltar directo aquí.
  if (temaMatch) {
    const [, temaLabel, temaNumber, restTitle] = temaMatch
    const id = temaId(moduleNumber, temaNumber)
    const isSaved = bookmarkedTema === id
    return (
      <motion.div
        id={id}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 sm:px-10 py-6 sm:py-8 scroll-mt-24"
      >
        <div className="flex items-center gap-2 mb-1.5">
          <button
            type="button"
            onClick={() => onToggleBookmark?.(id)}
            title={isSaved ? 'Quitar de guardados' : 'Guardar este tema'}
            className={`-m-1 p-1 rounded-lg transition-colors flex-shrink-0 ${
              isSaved ? 'text-secondary hover:bg-secondary-50' : 'text-primary hover:bg-primary-50'
            }`}
          >
            <Bookmark size={16} className={isSaved ? 'fill-secondary' : ''} />
          </button>
          <span className="font-title text-sm font-bold tracking-widest uppercase text-primary">
            {temaLabel}
          </span>
        </div>
        <h2 className={`font-title text-2xl sm:text-3xl font-bold text-gray-800 ${block.content ? 'mb-4' : ''}`}>
          {restTitle}
        </h2>
        {block.content && (
          <div
            className="prose-curso"
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        )}
      </motion.div>
    )
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
      <div
        className="prose-curso"
        dangerouslySetInnerHTML={{ __html: block.content }}
      />
    </motion.div>
  )
}

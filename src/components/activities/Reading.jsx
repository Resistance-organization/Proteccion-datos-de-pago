import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'

export default function Reading({ block }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Barra superior */}
      <div className="h-1.5 gradient-primary" />

      <div className="px-6 sm:px-10 py-6 sm:py-8">
        {block.label && (
          <div className="flex items-center gap-2 text-primary text-xs font-body uppercase tracking-widest mb-3">
            <BookOpen size={14} />
            <span>{block.label}</span>
          </div>
        )}

        {block.title && (
          <h2 className="font-title text-2xl sm:text-3xl font-semibold text-gray-800 mb-2 leading-snug">
            {block.title}
          </h2>
        )}

        {block.intro && (
          <p className="text-base text-gray-500 font-body mb-6 border-l-4 border-secondary pl-4 italic">
            {block.intro}
          </p>
        )}

        {/* Contenido HTML */}
        {block.content && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="prose-curso"
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        )}

        {/* Secciones */}
        {block.sections && block.sections.map((section, i) => (
          <div key={i} className="mb-8">
            {section.title && (
              <h3 className="font-title text-xl font-semibold text-gray-700 mb-3 flex items-center gap-2">
                {section.icon && <span>{section.icon}</span>}
                {section.title}
              </h3>
            )}
            <div
              className="prose-curso"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          </div>
        ))}

        {/* Destacado / callout */}
        {block.callout && (
          <div className="mt-6 rounded-xl p-5 flex gap-4"
            style={{ background: 'linear-gradient(135deg, #E6F5EF 0%, #C0E6D5 100%)' }}
          >
            <span className="text-2xl flex-shrink-0">{block.callout.icon || '💡'}</span>
            <div>
              {block.callout.title && (
                <p className="font-title font-semibold text-primary mb-1">{block.callout.title}</p>
              )}
              <p className="font-body text-sm text-gray-700">{block.callout.content}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

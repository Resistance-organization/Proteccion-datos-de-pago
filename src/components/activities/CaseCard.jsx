import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

export default function CaseCard({ block }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative"
      style={{ borderLeft: '5px solid #DC2626' }}
    >
      <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
        <AlertTriangle size={18} className="text-red-500" />
      </div>

      <div className="px-6 sm:px-8 py-6 sm:py-7 space-y-5">
        <div>
          <span className="text-xs font-title font-bold uppercase tracking-widest text-red-500">
            {block.label}
          </span>
          <h2 className="font-title text-xl sm:text-2xl font-semibold text-gray-800 mt-1 pr-10">
            {block.title}
          </h2>
        </div>

        <div>
          <p className="text-xs font-title font-bold uppercase tracking-wider text-gray-400 mb-1">La situación</p>
          <p className="font-body text-sm text-gray-700 leading-relaxed">{block.situation}</p>
        </div>

        <div>
          <p className="text-xs font-title font-bold uppercase tracking-wider text-gray-400 mb-1">Cómo ocurrió</p>
          <p className="font-body text-sm text-gray-700 leading-relaxed">{block.howItHappened}</p>
        </div>

        <div>
          <p className="text-xs font-title font-bold uppercase tracking-wider text-gray-400 mb-1">La consecuencia</p>
          <p className="font-body text-sm text-gray-700 leading-relaxed">{block.consequence}</p>
        </div>

        {block.dataUsed?.length > 0 && (
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <p className="text-xs font-title font-bold uppercase tracking-wider text-gray-400 mb-2">Datos que fueron usados</p>
            <ul className="space-y-1.5">
              {block.dataUsed.map((item, i) => (
                <li key={i} className="font-body text-sm text-gray-700 flex gap-2">
                  <span className="text-red-400 flex-shrink-0">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="bg-primary-50 rounded-xl p-4 border border-primary-100">
          <p className="text-xs font-title font-bold uppercase tracking-wider text-primary mb-1">Lección</p>
          <p className="font-body text-sm text-gray-700 leading-relaxed">{block.lesson}</p>
        </div>

        {block.source && (
          <p className="text-xs font-body text-gray-400 italic">{block.source}</p>
        )}
      </div>
    </motion.div>
  )
}

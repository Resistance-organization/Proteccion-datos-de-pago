import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Check, ArrowRight, Sparkles } from 'lucide-react'

export default function ModuleClosing({ block }) {
  const [checked, setChecked] = useState(new Set())

  const toggle = (i) => {
    setChecked(prev => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  const total = block.takeaways.length
  const done = checked.size

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      className="rounded-2xl overflow-hidden shadow-lg"
    >
      {/* Encabezado */}
      <div
        className="px-6 sm:px-8 py-5 text-left relative overflow-hidden flex items-center gap-4"
        style={{ background: 'linear-gradient(135deg, #3A3B74 0%, #212252 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }} />
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
          className="relative w-11 h-11 flex-shrink-0 rounded-full bg-white/10 border border-white/20 flex items-center justify-center"
        >
          <Trophy size={20} className="text-lime-300" />
        </motion.div>
        <div className="relative min-w-0">
          <p className="text-white/50 text-[11px] font-title font-bold uppercase tracking-widest mb-0.5">
            {block.moduleLabel || 'Módulo completado'}
          </p>
          <h2 className="font-title text-lg sm:text-xl font-bold text-white leading-tight">{block.title}</h2>
          {block.summary && (
            <p className="text-white/70 text-xs font-body mt-1 leading-relaxed">
              {block.summary}
            </p>
          )}
        </div>
      </div>

      {/* Checklist interactivo de aprendizajes */}
      <div className="bg-white px-6 sm:px-10 py-6">
        <div className="flex items-center justify-between mb-4">
          <p className="font-title text-sm font-bold text-gray-700">Para llevar — marca lo que te queda claro</p>
          <span className="text-xs font-body font-semibold text-secondary bg-secondary-50 px-2.5 py-1 rounded-full">
            {done}/{total}
          </span>
        </div>

        <div className="space-y-2">
          {block.takeaways.map((item, i) => {
            const isChecked = checked.has(i)
            return (
              <motion.button
                key={i}
                onClick={() => toggle(i)}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.07, 0.4) }}
                whileTap={{ scale: 0.98 }}
                className={`w-full text-left flex items-start gap-3 px-4 py-3 rounded-xl border-2 transition-all
                  ${isChecked ? 'border-green-200 bg-green-50' : 'border-gray-100 bg-gray-50 hover:border-secondary-200 hover:bg-secondary-50'}`}
              >
                <motion.span
                  animate={isChecked ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border-2 mt-0.5
                    ${isChecked ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}
                >
                  {isChecked && <Check size={13} className="text-white" strokeWidth={3} />}
                </motion.span>
                <span className={`font-body text-sm leading-relaxed transition-all ${isChecked ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                  {item}
                </span>
              </motion.button>
            )
          })}
        </div>

        <AnimatePresence>
          {done === total && total > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 flex items-center gap-2 text-green-600 text-sm font-body font-semibold"
            >
              <Sparkles size={16} /> Repasaste todos los puntos clave de este módulo.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Teaser del próximo módulo */}
        {block.nextHint && (
          <motion.div
            whileHover={{ x: 4 }}
            className="mt-6 flex items-center gap-3 bg-secondary-50 border border-secondary-100 rounded-xl px-5 py-4 cursor-default group"
          >
            <p className="flex-1 text-sm font-body text-gray-700 leading-relaxed">{block.nextHint}</p>
            <ArrowRight size={18} className="text-secondary flex-shrink-0 transition-transform group-hover:translate-x-1" />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

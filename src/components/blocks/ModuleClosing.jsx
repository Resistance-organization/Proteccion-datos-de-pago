import { motion } from 'framer-motion'
import { Trophy, ArrowRight } from 'lucide-react'

// Cada aprendizaje lleva un color de la marca para que no se vean todos iguales
const TONES = [
  { num: 'bg-secondary text-white', bar: 'bg-secondary', card: 'bg-secondary-50' },
  { num: 'bg-accent text-white', bar: 'bg-accent', card: 'bg-accent-50' },
  { num: 'bg-purple-600 text-white', bar: 'bg-purple-600', card: 'bg-purple-50' },
  { num: 'bg-primary text-white', bar: 'bg-primary', card: 'bg-primary-50' },
]

export default function ModuleClosing({ block }) {
  const takeaways = block.takeaways || []
  const cols = takeaways.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      className="rounded-2xl overflow-hidden shadow-lg bg-white"
    >
      {/* Encabezado */}
      <div
        className="px-6 sm:px-10 py-7 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #3A3B74 0%, #212252 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }} />
        <div className="relative flex items-center gap-4">
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
            className="w-12 h-12 flex-shrink-0 rounded-full bg-white/10 border border-white/20 flex items-center justify-center"
          >
            <Trophy size={22} className="text-lime-300" />
          </motion.div>
          <div className="min-w-0">
            <p className="text-lime-300 text-[11px] font-title font-bold uppercase tracking-widest mb-0.5">
              {block.moduleLabel || 'Módulo completado'}
            </p>
            <h2 className="font-title text-xl sm:text-2xl font-bold text-white leading-tight">{block.title}</h2>
          </div>
        </div>
        {block.summary && (
          <p className="relative mt-4 text-white/80 text-base font-body leading-relaxed text-pretty">
            {block.summary}
          </p>
        )}
      </div>

      {/* Lo que te llevas */}
      {takeaways.length > 0 && (
        <div className="px-6 sm:px-10 pt-7 pb-2">
          <p className="font-title text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Lo que te llevas</p>
          <div className={`grid gap-3 ${cols}`}>
            {takeaways.map((item, i) => {
              const tone = TONES[i % TONES.length]
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.08, 0.4) }}
                  className={`relative rounded-xl px-5 pt-5 pb-4 overflow-hidden ${tone.card}`}
                >
                  <span className={`absolute left-0 top-0 h-full w-1 ${tone.bar}`} />
                  <span className={`inline-flex w-8 h-8 rounded-full items-center justify-center font-title font-bold text-sm mb-3 ${tone.num}`}>
                    {i + 1}
                  </span>
                  <p className="font-body text-base text-gray-700 leading-relaxed">{item}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}

      {/* Teaser del próximo módulo */}
      {block.nextHint && (
        <div className="px-6 sm:px-10 pt-5 pb-7">
          <div
            className="flex items-center gap-4 rounded-xl px-5 py-4 text-white"
            style={{ background: 'linear-gradient(135deg, #3178BD 0%, #3A3B74 100%)' }}
          >
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-title font-bold uppercase tracking-widest text-white/60 mb-0.5">Lo que sigue</p>
              <p className="text-base font-body leading-relaxed">{block.nextHint}</p>
            </div>
            <ArrowRight size={20} className="flex-shrink-0" />
          </div>
        </div>
      )}
      {!block.nextHint && <div className="pb-5" />}
    </motion.div>
  )
}

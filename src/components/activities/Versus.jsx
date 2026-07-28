import { motion } from 'framer-motion'

const SIDE_STYLES = {
  attacker: {
    bg: 'linear-gradient(135deg, #7C2D12 0%, #C2410C 100%)',
    badge: 'bg-orange-500/20 text-orange-200 border border-orange-500/30',
    bullet: 'bg-orange-400',
    icon: '⚠️',
  },
  impact: {
    bg: 'linear-gradient(135deg, #212252 0%, #3A3B74 100%)',
    badge: 'bg-white/10 text-green-200 border border-white/20',
    bullet: 'bg-secondary',
    icon: '💥',
  },
  warning: {
    bg: 'linear-gradient(135deg, #78350F 0%, #D97706 100%)',
    badge: 'bg-yellow-400/20 text-yellow-200 border border-yellow-400/30',
    bullet: 'bg-yellow-300',
    icon: '🚨',
  },
  info: {
    bg: 'linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)',
    badge: 'bg-blue-400/20 text-blue-200 border border-blue-400/30',
    bullet: 'bg-blue-300',
    icon: 'ℹ️',
  },
}

function Panel({ side, index }) {
  const style = SIDE_STYLES[side.style || (index === 0 ? 'attacker' : 'impact')]

  return (
    <motion.div
      initial={{ opacity: 0, x: index === 0 ? -32 : 32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.12, duration: 0.5, ease: 'easeOut' }}
      className="flex-1 rounded-2xl overflow-hidden"
      style={{ background: style.bg }}
    >
      <div className="p-6 sm:p-8 h-full flex flex-col">
        {/* Header del panel */}
        <div className="flex items-center gap-3 mb-5">
          <span className="text-2xl">{side.icon || style.icon}</span>
          <div>
            {side.badge && (
              <span className={`text-xs font-body px-2 py-0.5 rounded-full mb-1 inline-block ${style.badge}`}>
                {side.badge}
              </span>
            )}
            <h3 className="font-title font-bold text-white text-lg leading-snug">
              {side.title}
            </h3>
          </div>
        </div>

        {/* Contenido */}
        {side.content && (
          <p className="font-body text-sm text-white/80 leading-relaxed mb-4">
            {side.content}
          </p>
        )}

        {/* Lista de puntos */}
        {side.points && (
          <ul className="space-y-2 flex-1">
            {side.points.map((point, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${style.bullet}`} />
                <span className="font-body text-sm text-white/80 leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  )
}

export default function Versus({ block }) {
  return (
    <div className="overflow-hidden">
      {/* Encabezado */}
      {block.title && (
        <div className="mb-4">
          <h2 className="font-title text-xl font-semibold text-gray-800">{block.title}</h2>
          {block.intro && (
            <p className="font-body text-sm text-gray-500 mt-1">{block.intro}</p>
          )}
        </div>
      )}

      {/* Paneles VS */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch relative">
        <Panel side={block.sides[0]} index={0} />

        {/* Badge VS central */}
        <div className="flex sm:flex-col items-center justify-center gap-2 z-10 py-2 sm:py-0">
          <div className="hidden sm:block w-px flex-1 bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center font-title font-black text-sm flex-shrink-0 shadow-lg"
            style={{ background: 'linear-gradient(135deg, #3178BD, #E73780)', color: 'white' }}
          >
            VS
          </div>
          <div className="hidden sm:block w-px flex-1 bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
        </div>

        <Panel side={block.sides[1]} index={1} />
      </div>

      {/* Nota al pie opcional */}
      {block.note && (
        <div className="mt-4 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <span className="text-base flex-shrink-0">💡</span>
          <p className="font-body text-sm text-amber-800 leading-relaxed">{block.note}</p>
        </div>
      )}
    </div>
  )
}

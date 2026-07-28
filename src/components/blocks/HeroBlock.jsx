import { motion } from 'framer-motion'
import { Clock, ChevronDown } from 'lucide-react'

const ACCENT_STYLES = {
  primary: {
    bg: 'linear-gradient(140deg, #3A3B74 0%, #1E1F4A 100%)',
    badge: 'bg-white/15 text-white',
    dot: 'bg-secondary',
  },
  secondary: {
    bg: 'linear-gradient(155deg, #3178BD 0%, #212252 100%)',
    badge: 'bg-white/15 text-white',
    dot: 'bg-white',
  },
  accent: {
    bg: 'linear-gradient(120deg, #1E1F4A 0%, #3178BD 100%)',
    badge: 'bg-white/15 text-white',
    dot: 'bg-secondary',
  },
}

export default function HeroBlock({ block, moduleNumber, estimatedTime }) {
  const style = ACCENT_STYLES[block.accent || 'primary']

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-2xl overflow-hidden mb-6 shadow-lg"
      style={{ minHeight: '280px', background: style.bg }}
    >
      {/* Imagen de fondo si existe */}
      {block.image && (
        <img
          src={block.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
      )}

      {/* Patrón decorativo */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                          radial-gradient(circle at 80% 20%, white 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col justify-end h-full p-8 sm:p-12" style={{ minHeight: '280px' }}>
        {/* Badge de módulo */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className={`text-xs font-title font-bold uppercase tracking-widest px-3 py-1 rounded-full ${style.badge}`}>
            Módulo {moduleNumber}
          </span>
          {estimatedTime && (
            <span className="flex items-center gap-1 text-white/60 text-xs font-body">
              <Clock size={12} />
              {estimatedTime}
            </span>
          )}
        </motion.div>

        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.45 }}
          className="font-title text-3xl sm:text-4xl font-bold text-white leading-tight text-shadow mb-3"
        >
          {block.title}
        </motion.h1>

        {/* Subtítulo */}
        {block.subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.45 }}
            className="font-body text-white/75 text-base sm:text-lg max-w-2xl leading-relaxed"
          >
            {block.subtitle}
          </motion.p>
        )}

        {/* Indicador de scroll */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-5 right-6 text-white/30"
        >
          <ChevronDown size={20} />
        </motion.div>
      </div>
    </motion.div>
  )
}

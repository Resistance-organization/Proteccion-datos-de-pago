import { motion } from 'framer-motion'
import ContentIcon from '../ui/Icon'

const COLOR_MAP = {
  primary: {
    bg: 'linear-gradient(135deg, #3A3B74 0%, #212252 100%)',
    text: 'text-white',
    sub: 'text-white/70',
  },
  secondary: {
    bg: 'linear-gradient(135deg, #3178BD 0%, #E73780 100%)',
    text: 'text-white',
    sub: 'text-white/80',
  },
  accent: {
    bg: 'linear-gradient(135deg, #E73780 0%, #A23EA1 100%)',
    text: 'text-white',
    sub: 'text-white/80',
  },
  light: {
    bg: 'linear-gradient(135deg, #F9FAFB 0%, #EEEEF6 100%)',
    text: 'text-gray-800',
    sub: 'text-gray-500',
  },
}

export default function Flyer({ block }) {
  const scheme = COLOR_MAP[block.color || 'primary']

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 16 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="rounded-2xl overflow-hidden shadow-md flex"
      style={{ background: scheme.bg }}
    >
      {/* Contenido */}
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7 px-7 sm:px-10 py-8 sm:py-9">
        {block.icon && (
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/15 flex items-center justify-center flex-shrink-0">
            <ContentIcon name={block.icon} size={30} className={scheme.text} />
          </div>
        )}
        <div className="flex-1 min-w-0">
          {block.badge && (
            <span className={`block text-xs font-title font-bold uppercase tracking-widest mb-2 ${scheme.sub}`}>
              {block.badge}
            </span>
          )}
          {block.title && (
            <h2 className={`font-title text-2xl sm:text-3xl font-bold leading-snug mb-3 ${scheme.text}`}>
              {block.title}
            </h2>
          )}
          {block.body && (
            <p className={`font-body text-lg sm:text-xl font-medium leading-relaxed ${block.title ? scheme.sub : scheme.text}`}>
              {block.body}
            </p>
          )}
          {block.cta && (
            <button className="mt-5 self-start px-5 py-2.5 bg-white/20 hover:bg-white/30 rounded-xl font-title font-semibold text-sm text-white transition-colors">
              {block.cta}
            </button>
          )}
        </div>
      </div>

      {/* Imagen decorativa */}
      {block.image && (
        <div className="w-2/5 flex-shrink-0 relative hidden sm:block">
          <img
            src={block.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/15" />
        </div>
      )}
    </motion.div>
  )
}

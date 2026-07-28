import { motion } from 'framer-motion'

const COLORS = {
  accent: 'bg-white text-accent',
  secondary: 'bg-white text-secondary',
  primary: 'bg-white text-primary',
  lime: 'bg-white text-lime-600',
}

// Etiqueta flotante que marca inequívocamente un bloque como actividad interactiva
// (quiz calificado, juego, actividad de validación, etc.)
export default function ActivityRibbon({ label, icon: Icon, color = 'accent' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      className={`absolute -top-3.5 left-5 sm:left-7 z-10 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full shadow-lg text-xs font-title font-bold uppercase tracking-wide ${COLORS[color] || COLORS.accent}`}
    >
      {Icon && <Icon size={13} />} {label}
    </motion.div>
  )
}

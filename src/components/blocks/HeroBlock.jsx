import { motion } from 'framer-motion'
import { Clock, BookOpen, PlayCircle, Sparkles, Award } from 'lucide-react'
import Icon from '../ui/Icon'
import { getModuleTemas } from '../../utils/temaSlug'

const ACCENT_STYLES = {
  primary: {
    bg: 'linear-gradient(140deg, #3A3B74 0%, #1E1F4A 100%)',
    glow: 'rgba(49, 120, 189, 0.45)',
  },
  secondary: {
    bg: 'linear-gradient(155deg, #3178BD 0%, #212252 100%)',
    glow: 'rgba(231, 55, 128, 0.35)',
  },
  accent: {
    bg: 'linear-gradient(120deg, #1E1F4A 0%, #3178BD 100%)',
    glow: 'rgba(231, 55, 128, 0.4)',
  },
}

// Bloques que cuentan como actividad práctica en el resumen de la portada
const ACTIVITY_TYPES = new Set([
  'scenario', 'callsim', 'selfcheck', 'checklist', 'scenariobuilder',
  'actionplan', 'reflection', 'pyramid', 'quickcheck',
])

function moduleStats(mod) {
  if (!mod) return []
  const count = type => mod.blocks.filter(b => (typeof type === 'string' ? b.type === type : type.has(b.type))).length
  const temas = getModuleTemas(mod).length
  const videos = count('video')
  const activities = count(ACTIVITY_TYPES)
  const quizzes = count('quiz')
  const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`
  return [
    temas > 0 && { icon: BookOpen, label: plural(temas, 'tema', 'temas') },
    videos > 0 && { icon: PlayCircle, label: plural(videos, 'video', 'videos') },
    activities > 0 && { icon: Sparkles, label: plural(activities, 'actividad', 'actividades') },
    quizzes > 0 && { icon: Award, label: quizzes === 1 ? 'Quiz calificado' : `${quizzes} quizzes calificados` },
  ].filter(Boolean)
}

export default function HeroBlock({ block, module, moduleNumber, estimatedTime }) {
  const style = ACCENT_STYLES[block.accent || 'primary']
  const stats = moduleStats(module)
  const number = String(moduleNumber).padStart(2, '0')

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-3xl overflow-hidden mb-8 shadow-xl isolate"
      style={{ background: style.bg }}
    >
      {/* Imagen de fondo si existe */}
      {block.image && (
        <img src={block.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20 -z-10" />
      )}

      {/* Capas decorativas: retícula, resplandor y número de módulo */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to left, black, transparent 75%)',
          WebkitMaskImage: 'linear-gradient(to left, black, transparent 75%)',
        }}
      />
      <div
        className="absolute -right-24 -top-24 w-96 h-96 rounded-full -z-10 blur-3xl"
        style={{ background: style.glow }}
      />
      <span
        className="absolute -right-4 -bottom-16 sm:-bottom-24 font-title font-bold leading-none text-white/[0.06] select-none pointer-events-none -z-10"
        style={{ fontSize: 'clamp(12rem, 28vw, 20rem)' }}
        aria-hidden="true"
      >
        {number}
      </span>

      {/* Ícono del módulo como ilustración */}
      {module?.icon && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="hidden md:flex absolute right-12 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full items-center justify-center"
          aria-hidden="true"
        >
          <span className="absolute inset-0 rounded-full border border-white/10" />
          <span className="absolute inset-5 rounded-full border border-white/15" />
          <span className="absolute inset-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20" />
          <Icon name={module.icon} size={40} className="relative text-white" />
        </motion.div>
      )}

      {/* Contenido */}
      <div className="relative px-7 py-9 sm:px-12 sm:py-12 md:pr-64">
        {/* Nivel 1 — contexto */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-5"
        >
          <span className="text-[11px] font-title font-semibold uppercase tracking-[0.22em] px-3 py-1 rounded-full bg-white/15 text-white">
            Módulo {moduleNumber}
          </span>
          {estimatedTime && (
            <span className="flex items-center gap-1.5 text-white/70 text-sm font-body">
              <Clock size={14} />
              {estimatedTime}
            </span>
          )}
        </motion.div>

        {/* Nivel 2 — título */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.45 }}
          className="font-title text-4xl sm:text-5xl font-bold text-white leading-[1.05] tracking-tight text-balance"
        >
          {block.title}
        </motion.h1>

        {/* Nivel 3 — promesa del módulo */}
        {block.subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.45 }}
            className="mt-4 font-body text-white/80 text-lg sm:text-xl max-w-2xl leading-relaxed"
          >
            {block.subtitle}
          </motion.p>
        )}

        {/* Referencia normativa, discreta */}
        {block.requirements && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.38, duration: 0.4 }}
            className="mt-3 font-body text-white/50 text-xs sm:text-sm max-w-2xl leading-relaxed"
          >
            {block.requirements}
          </motion.p>
        )}

        {/* Nivel 4 — qué contiene */}
        {stats.length > 0 && (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.4 }}
            className="mt-8 pt-6 border-t border-white/15 flex flex-wrap gap-x-6 gap-y-3"
            aria-label="Contenido del módulo"
          >
            {stats.map(({ icon: StatIcon, label }) => (
              <li key={label} className="flex items-center gap-2 text-white/85 text-sm font-body font-medium">
                <StatIcon size={16} className="text-white/60" />
                {label}
              </li>
            ))}
          </motion.ul>
        )}
      </div>
    </motion.header>
  )
}

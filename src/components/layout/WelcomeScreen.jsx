import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, PlayCircle, Sparkles, Award, CheckCircle2, Lock, ChevronRight } from 'lucide-react'
import { courseInfo } from '../../data/modules'
import Icon from '../ui/Icon'

// SCORM entrega el nombre como "Apellido, Nombre"
function firstName(studentName) {
  if (!studentName) return ''
  const name = studentName.includes(',') ? studentName.split(',')[1] : studentName
  return name.trim().split(/\s+/)[0] || ''
}

function totalMinutes(modules) {
  return modules.reduce((sum, m) => sum + (parseInt(m.estimatedTime, 10) || 0), 0)
}

function formatDuration(min) {
  const h = Math.floor(min / 60)
  const m = min % 60
  if (!h) return `${m} min`
  return m ? `${h} h ${m} min` : `${h} h`
}

const STEPS = [
  { icon: PlayCircle, title: 'Lee y mira', text: 'Temas cortos, videos e infografías con lo esencial.' },
  { icon: Sparkles, title: 'Practica', text: 'Simulaciones y actividades con situaciones reales.' },
  { icon: Award, title: 'Demuestra', text: `Aprueba cada quiz con ${courseInfo.passingScore}% para avanzar y obtener tu certificado.` },
]

export default function WelcomeScreen({ modules, studentName, currentModule, completedModules, isReturning, onStart, onSelectModule, isModuleUnlocked }) {
  const name = firstName(studentName)

  return (
    <div
      className="min-h-screen relative overflow-hidden isolate font-body text-white"
      style={{ background: 'linear-gradient(140deg, #3A3B74 0%, #1E1F4A 60%, #161641 100%)' }}
    >
      {/* Decoración */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="absolute -top-40 -right-40 w-[36rem] h-[36rem] rounded-full -z-10 blur-3xl bg-secondary/40" />
      <div className="absolute -bottom-48 -left-32 w-[30rem] h-[30rem] rounded-full -z-10 blur-3xl bg-accent/25" />

      <div className="max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12 py-8 sm:py-10 min-h-screen flex flex-col">
        <img src="./Logo blanco.png" alt="Resistance" className="h-9 w-auto self-start" />

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-12 lg:gap-16 items-center py-12">
          {/* Columna principal */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Nivel 1 — saludo */}
            <p className="flex items-center gap-3 text-[13px] font-title font-semibold uppercase tracking-[0.28em] text-secondary-100">
              <span className="w-8 h-[2px] rounded-full bg-accent" aria-hidden="true" />
              {isReturning ? `Qué bueno verte de nuevo${name ? `, ${name}` : ''}` : `Te damos la bienvenida${name ? `, ${name}` : ''}`}
            </p>

            {/* Nivel 2 — título */}
            <h1
              className="mt-6 font-title font-bold leading-[0.92] tracking-tight"
              style={{ fontSize: courseInfo.titleLines ? 'clamp(2.25rem, 5vw, 5rem)' : 'clamp(3.5rem, 7.2vw, 7rem)' }}
            >
              {/* courseInfo.titleLines fija los renglones; si no existe, una palabra por renglón */}
              {(courseInfo.titleLines || courseInfo.title.split(' ')).map((line, i, lines) => (
                <span
                  key={i}
                  className={`block ${i === lines.length - 1 && lines.length > 1 ? 'bg-clip-text text-transparent pb-[0.2em] -mb-[0.2em]' : ''}`}
                  style={i === lines.length - 1 && lines.length > 1
                    ? { backgroundImage: 'linear-gradient(90deg, #8DBDEB 0%, #F58EB9 100%)' }
                    : undefined}
                >
                  {line}
                </span>
              ))}
            </h1>

            {/* Nivel 3 — promesa */}
            <p className="mt-6 text-2xl sm:text-[1.7rem] font-light text-white/85 leading-snug max-w-xl">
              {courseInfo.subtitle}
            </p>

            {/* Nivel 4 — datos clave */}
            <dl className="mt-10 flex flex-wrap gap-y-4 divide-x divide-white/15">
              {[
                [modules.length, 'módulos'],
                [formatDuration(totalMinutes(modules)), 'de duración'],
                [`${courseInfo.passingScore}%`, 'para aprobar'],
              ].map(([value, label], i) => (
                <div key={label} className={i === 0 ? 'pr-4 sm:pr-6' : 'px-4 sm:px-6'}>
                  <dt className="sr-only">{label}</dt>
                  <dd className="font-title text-[1.7rem] sm:text-4xl font-bold leading-none whitespace-nowrap">{value}</dd>
                  <dd className="mt-2 text-[10px] sm:text-[11px] font-title font-semibold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-white/55 whitespace-nowrap">{label}</dd>
                </div>
              ))}
            </dl>

            {/* Nivel 5 — acción */}
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
              <button
                onClick={onStart}
                autoFocus
                className="self-start inline-flex items-center gap-2 whitespace-nowrap px-5 py-2.5 rounded-xl bg-white text-primary font-title font-semibold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-secondary/60"
              >
                {isReturning ? 'Continuar donde quedaste' : 'Comenzar el curso'}
                <ArrowRight size={17} />
              </button>
              {isReturning && (
                <div className="border-l-2 border-accent pl-4 leading-snug">
                  <p className="text-[11px] font-title font-semibold uppercase tracking-[0.2em] text-white/50">Retomas en el módulo {currentModule.id}</p>
                  <p className="mt-1 text-base text-white font-medium">{currentModule.title}</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Columna secundaria: cómo funciona + recorrido */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-3xl bg-white/[0.07] border border-white/10 backdrop-blur-sm p-6 sm:p-8"
          >
            <h2 className="font-title text-sm font-semibold uppercase tracking-[0.2em] text-white/60 mb-5">Cómo funciona</h2>
            <ol className="space-y-4">
              {STEPS.map(({ icon: StepIcon, title, text }, i) => (
                <li key={title} className="flex gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <StepIcon size={18} className="text-secondary-200" />
                  </span>
                  <div>
                    <p className="font-title font-semibold text-base">{i + 1}. {title}</p>
                    <p className="text-sm text-white/65 leading-relaxed">{text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8 mb-2 flex items-baseline justify-between gap-3">
              <h2 className="font-title text-sm font-semibold uppercase tracking-[0.2em] text-white/60 flex items-center gap-2">
                <BookOpen size={14} /> Recorrido
              </h2>
              <p className="text-xs text-white/45">Elige un módulo para ir directo</p>
            </div>
            <ul className="-mx-2">
              {modules.map((m, index) => {
                const done = completedModules.has(m.id)
                const current = isReturning && m.id === currentModule.id
                const locked = isModuleUnlocked ? !isModuleUnlocked(index) : false
                return (
                  <li key={m.id}>
                    <button
                      onClick={() => onSelectModule(index)}
                      disabled={locked}
                      title={locked ? 'Completa el módulo anterior para desbloquearlo' : `Ir al módulo ${m.id}`}
                      className={`group w-full flex items-center gap-3 px-2 py-2.5 rounded-xl text-left text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-200
                        ${locked ? 'cursor-not-allowed opacity-50' : 'hover:bg-white/10'}
                        ${current ? 'bg-white/10' : ''}`}
                    >
                      <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors
                        ${current ? 'bg-secondary text-white' : 'bg-white/[0.08] text-white/60 group-hover:text-white'}`}>
                        <Icon name={m.icon} size={15} />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-[11px] text-white/40 leading-tight">Módulo {m.id} · {m.estimatedTime}</span>
                        <span className={`block truncate ${current ? 'text-white font-semibold' : 'text-white/80 group-hover:text-white'}`}>{m.title}</span>
                      </span>
                      {done && <CheckCircle2 size={16} className="flex-shrink-0 text-secondary-200" aria-label="Completado" />}
                      {locked
                        ? <Lock size={14} className="flex-shrink-0 text-white/40" />
                        : <ChevronRight size={16} className="flex-shrink-0 text-white/30 transition-all group-hover:text-white group-hover:translate-x-0.5" />}
                    </button>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

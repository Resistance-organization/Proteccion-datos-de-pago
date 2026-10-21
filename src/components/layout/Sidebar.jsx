import { useState } from 'react'
import { CheckCircle, Circle, Lock, Clock, LogOut, RotateCcw, ArrowRight } from 'lucide-react'
import { MOODLE_COURSE_URL } from '../../config'
import { courseInfo } from '../../data/modules'
import { getModuleTemas } from '../../utils/temaSlug'
import Icon from '../ui/Icon'
import { motion, AnimatePresence } from 'framer-motion'

export default function Sidebar({ modules, currentIndex, completedModules, onSelectModule, isOpen, isModuleUnlocked, onReset, bookmarkedTema, currentTemaId, onClose }) {
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: 'tween', duration: 0.25 }}
          id="course-sidebar"
          className="fixed left-0 top-16 bottom-0 z-40 w-72 max-w-[85vw] flex flex-col overflow-hidden shadow-xl"
          style={{ background: 'linear-gradient(180deg, #3A3B74 0%, #2D2E63 100%)' }}
        >
          {/* Header del sidebar — el progreso del curso vive en el anillo del header */}
          <div className="px-5 pt-5 pb-4 border-b border-white/10">
            <p className="text-white/45 text-[11px] font-title font-semibold uppercase tracking-[0.2em]">Contenido del curso</p>
            <p className="mt-1 text-white font-title text-lg font-semibold leading-tight">{courseInfo.title}</p>
            <p className="mt-1 text-white/55 text-xs font-body">
              {completedModules.size} de {modules.length} módulos completados
            </p>
          </div>

          {/* Lista de módulos */}
          <nav className="flex-1 overflow-y-auto py-3">
            {modules.map((mod, index) => {
              const isCompleted = completedModules.has(mod.id)
              const isActive = index === currentIndex
              const isLocked = isModuleUnlocked ? !isModuleUnlocked(index) : false
              const temas = isActive ? getModuleTemas(mod) : []

              return (
                <div key={mod.id}>
                <button
                  onClick={() => !isLocked && onSelectModule(index)}
                  disabled={isLocked}
                  className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-all duration-200 group
                    ${isActive
                      ? 'bg-white/15 border-l-4 border-secondary'
                      : 'border-l-4 border-transparent hover:bg-white/8 hover:border-l-4 hover:border-white/20'
                    }
                    ${isLocked ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  {/* Ícono de estado */}
                  <div className="flex-shrink-0 mt-0.5" title={isLocked ? 'Completa el módulo anterior para desbloquear' : ''}>
                    {isLocked ? (
                      <Lock size={16} className="text-white/30" />
                    ) : isCompleted ? (
                      <CheckCircle size={16} className="text-secondary" />
                    ) : isActive ? (
                      <Circle size={16} className="text-white fill-white/30" />
                    ) : (
                      <Circle size={16} className="text-white/30" />
                    )}
                  </div>

                  {/* Texto */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-body text-white/40 flex-shrink-0">
                        {String(mod.id).padStart(2, '0')}
                      </span>
                      <span
                        className={`text-sm font-title truncate leading-snug
                          ${isActive ? 'text-white font-semibold' : isCompleted ? 'text-white/80' : 'text-white/60'}
                        `}
                      >
                        {mod.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Clock size={10} className="text-white/30" />
                      <span className="text-xs text-white/30 font-body">{mod.estimatedTime}</span>
                    </div>
                  </div>

                  {/* Emoji ícono */}
                  <Icon name={mod.icon} size={16} className="flex-shrink-0 mt-0.5 text-white/50" />
                </button>

                {/* Temas del módulo activo — salto directo dentro del contenido */}
                {temas.length > 0 && (
                  <div className="pl-11 pr-3 pb-2 flex flex-col gap-0.5">
                    {temas.map(tema => {
                      const isSaved = bookmarkedTema === tema.id
                      const isCurrent = currentTemaId === tema.id
                      return (
                        <button
                          key={tema.id}
                          onClick={() => {
                            document.getElementById(tema.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                            onClose?.()
                          }}
                          aria-current={isCurrent ? 'location' : undefined}
                          className={`w-full flex items-center gap-1.5 text-left px-3 py-1.5 rounded-lg text-xs font-body transition-colors ${
                            isCurrent ? 'text-white bg-white/10' : 'text-white/55 hover:text-white hover:bg-white/8'
                          }`}
                        >
                          <span className="flex-shrink-0 text-white/40 font-semibold">T{tema.number}</span>
                          <ArrowRight size={11} className="flex-shrink-0 opacity-60" />
                          <span className="truncate">{tema.title}</span>
                          {isSaved && (
                            <span
                              className="ml-auto w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0"
                              title="Tema guardado"
                            />
                          )}
                        </button>
                      )
                    })}
                  </div>
                )}
                </div>
              )
            })}
          </nav>

          {/* Footer del sidebar — botón volver a Moodle + reset */}
          <div className="px-5 py-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (window.opener && !window.opener.closed) {
                    window.opener.focus()
                    window.close()
                  } else {
                    window.location.href = MOODLE_COURSE_URL
                  }
                }}
                className="flex-1 flex items-center gap-2 group hover:bg-white/10 rounded-xl px-2 py-1.5 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors flex-shrink-0">
                  <LogOut size={14} className="text-white/60 group-hover:text-white transition-colors" />
                </div>
                <div className="text-left">
                  <p className="text-white/80 text-xs font-title font-semibold">Capacitación</p>
                  <p className="text-white/40 text-xs font-body group-hover:text-white/60 transition-colors">Volver al curso · 2026</p>
                </div>
              </button>

              <button
                onClick={() => setShowResetConfirm(true)}
                title="Restablecer curso"
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-red-500/20 flex items-center justify-center transition-colors group flex-shrink-0"
              >
                <RotateCcw size={14} className="text-white/40 group-hover:text-red-400 transition-colors" />
              </button>
            </div>
          </div>

          {/* Modal confirmación de reset */}
          <AnimatePresence>
            {showResetConfirm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-7"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
                    <RotateCcw size={22} className="text-red-500" />
                  </div>
                  <h2 className="font-title text-lg font-bold text-gray-900 text-center mb-2">
                    ¿Restablecer el curso?
                  </h2>
                  <p className="font-body text-sm text-gray-500 text-center mb-6">
                    Se borrará todo tu progreso, puntajes y módulos completados. Volverás al inicio como si fuera la primera vez. Esta acción no se puede deshacer.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowResetConfirm(false)}
                      className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 font-title font-semibold text-sm text-gray-600 hover:border-gray-300 transition-all"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => {
                        setShowResetConfirm(false)
                        onReset?.()
                      }}
                      className="flex-1 py-2.5 rounded-xl font-title font-semibold text-sm text-white bg-red-500 hover:bg-red-600 transition-all"
                    >
                      Sí, restablecer
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

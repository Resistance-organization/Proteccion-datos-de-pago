import { useState, useEffect, useCallback, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

import { modules, courseInfo } from './data/modules'
import { scorm } from './utils/scorm'
import { getModuleTemas } from './utils/temaSlug'

import CourseLayout from './components/layout/CourseLayout'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import BlockRenderer from './components/blocks/BlockRenderer'
import CertificateScreen from './components/CertificateScreen'
import ModuleFooter from './components/layout/ModuleFooter'
import FloatingActions from './components/layout/FloatingActions'
import WelcomeScreen from './components/layout/WelcomeScreen'

// ─── Persistencia local ──────────────────────────────────────────────────────

// Evita índices y datos huérfanos cuando el contenido del curso cambió
// (ej. progreso guardado de una versión anterior con más/otros módulos).
const VALID_MODULE_IDS = new Set(modules.map(m => m.id))

function clampModuleIndex(index) {
  if (typeof index !== 'number' || Number.isNaN(index)) return 0
  return Math.min(Math.max(index, 0), modules.length - 1)
}

function keepValidIds(ids) {
  return (ids || []).filter(id => VALID_MODULE_IDS.has(id))
}

function keepValidKeys(obj) {
  return Object.fromEntries(
    Object.entries(obj || {}).filter(([k]) => VALID_MODULE_IDS.has(Number(k)))
  )
}

function loadProgress() {
  try {
    const s = JSON.parse(localStorage.getItem('lo_curso_progress') || '{}')
    return {
      currentModuleIndex:  clampModuleIndex(s.currentModuleIndex),
      completedModules:    new Set(keepValidIds(s.completedModules)),
      quizScores:          keepValidKeys(s.quizScores),
      moduleScrollDone:    new Set(keepValidIds(s.moduleScrollDone)),
      moduleQuizzesDone:   keepValidKeys(s.moduleQuizzesDone),
      reflectionAnswers:   s.reflectionAnswers    || {},
      bookmarkedTema:      s.bookmarkedTema        || null,
    }
  } catch {
    return {
      currentModuleIndex: 0,
      completedModules:   new Set(),
      quizScores:         {},
      moduleScrollDone:   new Set(),
      moduleQuizzesDone:  {},
      reflectionAnswers:  {},
      bookmarkedTema:     null,
    }
  }
}

function saveProgress({ currentModuleIndex, completedModules, quizScores, moduleScrollDone, moduleQuizzesDone, reflectionAnswers, bookmarkedTema }) {
  localStorage.setItem('lo_curso_progress', JSON.stringify({
    currentModuleIndex,
    completedModules:   [...completedModules],
    quizScores,
    moduleScrollDone:   [...moduleScrollDone],
    moduleQuizzesDone:  Object.fromEntries(
      Object.entries(moduleQuizzesDone).map(([k, v]) => [k, [...v]])
    ),
    reflectionAnswers,
    bookmarkedTema:     bookmarkedTema || null,
  }))
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function quizBlocksOf(module) {
  return module.blocks
    .map((b, i) => ({ ...b, blockIndex: i }))
    .filter(b => b.type === 'quiz')
}

// ─── Barra lateral ───────────────────────────────────────────────────────────

const SIDEBAR_PREF_KEY = 'lo_sidebar_open'
const DESKTOP_QUERY = '(min-width: 1024px)'

// En escritorio se respeta la última preferencia; en pantallas pequeñas la
// barra se superpone al contenido, así que arranca cerrada.
function initialSidebarOpen() {
  if (!window.matchMedia(DESKTOP_QUERY).matches) return false
  try { return localStorage.getItem(SIDEBAR_PREF_KEY) !== '0' } catch { return true }
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(DESKTOP_QUERY).matches)
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY)
    const onChange = e => setIsDesktop(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return isDesktop
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function App() {
  const [sidebarOpen,        setSidebarOpen]        = useState(initialSidebarOpen)
  const isDesktop = useIsDesktop()
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0)
  const [completedModules,   setCompletedModules]   = useState(new Set())
  const [quizScores,         setQuizScores]         = useState({})
  const [direction,          setDirection]          = useState(1)
  const [showCertificate,    setShowCertificate]    = useState(false)
  const [studentName,        setStudentName]        = useState('')
  const [showSedeModal,      setShowSedeModal]      = useState(false)
  const [selectedSede,       setSelectedSede]       = useState('')
  const [showWelcome,        setShowWelcome]        = useState(true)

  // Tracking de progreso de lectura
  const [scrollProgress,    setScrollProgress]   = useState(0)
  const [moduleScrollDone,  setModuleScrollDone] = useState(new Set())
  const [moduleQuizzesDone, setModuleQuizzesDone] = useState({}) // { moduleId: Set<blockIndex> }
  const [reflectionAnswers, setReflectionAnswers] = useState({}) // { storageKey: string }
  const [bookmarkedTema,    setBookmarkedTema]    = useState(null) // temaId | null — solo uno a la vez

  const currentModule = modules[currentModuleIndex]

  // ── Inicializar SCORM + cargar progreso ──────────────────────────────────
  useEffect(() => {
    scorm.init()
    setStudentName(scorm.getValue('cmi.core.student_name') || '')

    const saved = loadProgress()
    setCurrentModuleIndex(saved.currentModuleIndex)
    setCompletedModules(saved.completedModules)
    setQuizScores(saved.quizScores)
    setModuleScrollDone(saved.moduleScrollDone)
    setReflectionAnswers(saved.reflectionAnswers)
    setBookmarkedTema(saved.bookmarkedTema)

    // Reconstituir Sets desde arrays guardados
    const rebuilt = {}
    Object.entries(saved.moduleQuizzesDone).forEach(([k, arr]) => {
      rebuilt[k] = new Set(arr)
    })
    setModuleQuizzesDone(rebuilt)

    const scormData = scorm.loadSuspendData()
    if (scormData) {
      if (scormData.completedModules)    setCompletedModules(new Set(keepValidIds(scormData.completedModules)))
      if (scormData.moduleScrollDone)    setModuleScrollDone(new Set(keepValidIds(scormData.moduleScrollDone)))
      if (scormData.quizScores)          setQuizScores(keepValidKeys(scormData.quizScores))
      if (scormData.reflectionAnswers)   setReflectionAnswers(scormData.reflectionAnswers)
      if (scormData.bookmarkedTema)      setBookmarkedTema(scormData.bookmarkedTema)
      if (scormData.currentModuleIndex !== undefined) setCurrentModuleIndex(clampModuleIndex(scormData.currentModuleIndex))
      if (scormData.moduleQuizzesDone) {
        const rebuilt = {}
        Object.entries(keepValidKeys(scormData.moduleQuizzesDone)).forEach(([k, arr]) => {
          rebuilt[k] = new Set(arr)
        })
        setModuleQuizzesDone(rebuilt)
      }
    }

    scorm.setStatus('incomplete')
    return () => scorm.finish()
  }, [])

  // ── Barra de progreso de lectura (scroll del window) ─────────────────────
  useEffect(() => {
    // La pantalla de bienvenida no cuenta como lectura del módulo
    if (showWelcome) return
    const onScroll = () => {
      const scrollTop    = window.scrollY || document.documentElement.scrollTop
      const scrollable   = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const progress     = scrollable > 0 ? Math.min(100, (scrollTop / scrollable) * 100) : 100
      setScrollProgress(progress)

      if (progress >= 90) {
        setModuleScrollDone(prev => {
          if (prev.has(currentModule.id)) return prev
          return new Set([...prev, currentModule.id])
        })
      }
    }

    // Si el contenido cabe en pantalla sin scroll, marcar como leído
    const scrollable = document.documentElement.scrollHeight - document.documentElement.clientHeight
    if (scrollable <= 10) {
      setScrollProgress(100)
      setModuleScrollDone(prev => new Set([...prev, currentModule.id]))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [currentModule.id, showWelcome])

  // ── Tema actual (para el header y el menú) ──────────────────────────────
  const moduleTemas = useMemo(() => getModuleTemas(currentModule), [currentModule])
  const [currentTemaIndex, setCurrentTemaIndex] = useState(-1)

  useEffect(() => {
    setCurrentTemaIndex(-1)
    if (!moduleTemas.length) return
    const onScroll = () => {
      let idx = -1
      moduleTemas.forEach((t, i) => {
        const el = document.getElementById(t.id)
        if (el && el.getBoundingClientRect().top <= 160) idx = i
      })
      setCurrentTemaIndex(idx)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [moduleTemas])

  // ── Cerrar la ventana de sede con Escape ─────────────────────────────────
  useEffect(() => {
    if (!showSedeModal) return
    const onKey = e => { if (e.key === 'Escape') setShowSedeModal(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [showSedeModal])

  // ── Volver al top al cambiar de módulo ───────────────────────────────────
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setScrollProgress(0)
  }, [currentModuleIndex])

  // ── Lógica de desbloqueo ─────────────────────────────────────────────────

  const isModuleFullyDone = useCallback((moduleId) => {
    const mod = modules.find(m => m.id === moduleId)
    if (!mod) return false
    const scrollDone  = moduleScrollDone.has(moduleId)
    const quizBlocks  = quizBlocksOf(mod)
    const doneSets    = moduleQuizzesDone[moduleId] || new Set()
    const allQuizDone = quizBlocks.length === 0 || quizBlocks.every(q => doneSets.has(q.blockIndex))
    return scrollDone && allQuizDone
  }, [moduleScrollDone, moduleQuizzesDone])

  const isModuleUnlocked = useCallback((index) => {
    if (import.meta.env.DEV) return true // TODO: quitar antes de empaquetar a SCORM si se deja código de prueba
    if (index === 0) return true
    return isModuleFullyDone(modules[index - 1].id)
  }, [isModuleFullyDone])

  const currentModuleDone = isModuleFullyDone(currentModule.id)
  const currentScrollDone = moduleScrollDone.has(currentModule.id) || scrollProgress >= 90

  // Razón por la que el botón Siguiente está bloqueado
  const nextBlockReason = () => {
    if (!currentScrollDone) return 'Termina de leer el módulo'
    const quizBlocks = quizBlocksOf(currentModule)
    const doneSets   = moduleQuizzesDone[currentModule.id] || new Set()
    const pending    = quizBlocks.filter(q => !doneSets.has(q.blockIndex))
    if (pending.length > 0) {
      const lastScore = quizScores[currentModule.id]
      if (lastScore !== undefined) {
        return `Necesitas al menos ${courseInfo.passingScore}% en el quiz (obtuviste ${lastScore}%)`
      }
      return 'Completa y aprueba el quiz del módulo'
    }
    return null
  }
  const blockReason = nextBlockReason()

  // Primer quiz que aún no se aprueba (para el indicador flotante)
  const pendingQuizBlock = quizBlocksOf(currentModule)
    .find(q => !(moduleQuizzesDone[currentModule.id] || new Set()).has(q.blockIndex))?.blockIndex ?? null

  // ── Guardar progreso ─────────────────────────────────────────────────────

  const persistProgress = useCallback((overrides = {}) => {
    const state = {
      currentModuleIndex,
      completedModules,
      quizScores,
      moduleScrollDone,
      moduleQuizzesDone,
      reflectionAnswers,
      bookmarkedTema,
      ...overrides,
    }
    saveProgress(state)
    scorm.saveSuspendData({
      completedModules:   [...state.completedModules],
      moduleScrollDone:   [...state.moduleScrollDone],
      quizScores:         state.quizScores,
      currentModuleIndex: state.currentModuleIndex,
      moduleQuizzesDone:  Object.fromEntries(
        Object.entries(state.moduleQuizzesDone).map(([k, v]) => [k, [...v]])
      ),
      reflectionAnswers:  state.reflectionAnswers,
      bookmarkedTema:     state.bookmarkedTema,
    })
  }, [currentModuleIndex, completedModules, quizScores, moduleScrollDone, moduleQuizzesDone, reflectionAnswers, bookmarkedTema])

  // ── Marcar módulo como completado ────────────────────────────────────────

  const markModuleComplete = useCallback((moduleId) => {
    setCompletedModules(prev => {
      const next = new Set([...prev, moduleId])
      if (next.size === modules.length) {
        const scores   = Object.values(quizScores)
        const avgScore = scores.length
          ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
          : 100
        scorm.setScore(avgScore)
        scorm.setStatus(avgScore >= courseInfo.passingScore ? 'passed' : 'completed')
      }
      return next
    })
  }, [quizScores])

  // ── Navegación ───────────────────────────────────────────────────────────

  const goToModule = useCallback((index) => {
    if (index < 0 || index >= modules.length) return
    if (!isModuleUnlocked(index)) return
    setDirection(index > currentModuleIndex ? 1 : -1)

    // Calcular el nuevo set de completados de forma síncrona para poder
    // persistirlo correctamente, ya que React no aplica setCompletedModules
    // hasta el siguiente render y persistProgress usaría el valor viejo.
    let newCompleted = completedModules
    if (!completedModules.has(currentModule.id) && currentModuleDone) {
      newCompleted = new Set([...completedModules, currentModule.id])
      markModuleComplete(currentModule.id)
    }
    setCurrentModuleIndex(index)
    persistProgress({ currentModuleIndex: index, completedModules: newCompleted })
    if (!isDesktop) setSidebarOpen(false)
  }, [currentModuleIndex, currentModule, completedModules, currentModuleDone,
      markModuleComplete, isModuleUnlocked, persistProgress, isDesktop])

  const toggleSidebar = useCallback(() => {
    const next = !sidebarOpen
    setSidebarOpen(next)
    // Solo se recuerda la elección hecha en escritorio
    if (isDesktop) { try { localStorage.setItem(SIDEBAR_PREF_KEY, next ? '1' : '0') } catch {} }
  }, [sidebarOpen, isDesktop])

  const handleNext = () => {
    if (blockReason) return
    if (currentModuleIndex < modules.length - 1) {
      goToModule(currentModuleIndex + 1)
    }
  }

  const handlePrev = () => {
    if (currentModuleIndex > 0) goToModule(currentModuleIndex - 1)
  }

  // ── Completar quiz ───────────────────────────────────────────────────────

  const handleQuizComplete = useCallback((score, isFinal, blockIndex) => {
    const newQuizScores = { ...quizScores, [currentModule.id]: score }
    let newQuizzesDone = moduleQuizzesDone

    if (score >= courseInfo.passingScore) {
      const done = new Set(moduleQuizzesDone[currentModule.id] || [])
      done.add(blockIndex)
      newQuizzesDone = { ...moduleQuizzesDone, [currentModule.id]: done }
      setModuleQuizzesDone(newQuizzesDone)
    }

    setQuizScores(newQuizScores)

    if (isFinal) {
      scorm.setScore(score)
      scorm.setStatus(score >= courseInfo.passingScore ? 'passed' : 'completed')
    }

    // Persistir inmediatamente con los valores calculados (evita stale closure)
    persistProgress({ quizScores: newQuizScores, moduleQuizzesDone: newQuizzesDone })
  }, [currentModule.id, quizScores, moduleQuizzesDone, persistProgress])

  // ── Guardar respuesta de reflexión (texto libre) ─────────────────────────

  const saveReflection = useCallback((storageKey, value) => {
    const newReflectionAnswers = { ...reflectionAnswers, [storageKey]: value }
    setReflectionAnswers(newReflectionAnswers)
    persistProgress({ reflectionAnswers: newReflectionAnswers })
  }, [reflectionAnswers, persistProgress])

  // ── Marcar/desmarcar el tema guardado (bookmark) — solo uno a la vez ────

  const toggleBookmark = useCallback((temaId) => {
    const next = bookmarkedTema === temaId ? null : temaId
    setBookmarkedTema(next)
    persistProgress({ bookmarkedTema: next })
  }, [bookmarkedTema, persistProgress])

  // ── Resetear curso ───────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    localStorage.removeItem('lo_curso_progress')
    localStorage.removeItem('scorm_dev_data')
    scorm.saveSuspendData({})
    scorm.setStatus('not attempted')
    setCurrentModuleIndex(0)
    setCompletedModules(new Set())
    setQuizScores({})
    setModuleScrollDone(new Set())
    setModuleQuizzesDone({})
    setReflectionAnswers({})
    setBookmarkedTema(null)
    setDirection(1)
    window.scrollTo({ top: 0 })
  }, [])

  // ── Certificado ──────────────────────────────────────────────────────────

  const avgScore = Object.values(quizScores).length
    ? Math.round(Object.values(quizScores).reduce((a, b) => a + b, 0) / Object.values(quizScores).length)
    : null

  if (showCertificate) {
    return <CertificateScreen studentName={studentName} score={avgScore} sede={selectedSede} />
  }

  if (showWelcome) {
    const isReturning = currentModuleIndex > 0 || completedModules.size > 0 || moduleScrollDone.size > 0
    return (
      <WelcomeScreen
        modules={modules}
        studentName={studentName}
        currentModule={currentModule}
        completedModules={completedModules}
        isReturning={isReturning}
        onStart={() => { setShowWelcome(false); window.scrollTo({ top: 0 }) }}
        onSelectModule={index => { setShowWelcome(false); goToModule(index); window.scrollTo({ top: 0 }) }}
        isModuleUnlocked={isModuleUnlocked}
      />
    )
  }

  const isLastModule = currentModuleIndex === modules.length - 1

  return (
    <>
    <CourseLayout
      sidebarOpen={sidebarOpen}
      isDesktop={isDesktop}
      onCloseSidebar={() => setSidebarOpen(false)}
      header={
        <Header
          currentModule={currentModule}
          totalModules={modules.length}
          completedCount={completedModules.size}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={toggleSidebar}
          temaIndex={currentTemaIndex}
          temaTotal={moduleTemas.length}
          readingProgress={scrollProgress}
        />
      }
      sidebar={
        <Sidebar
          modules={modules}
          currentIndex={currentModuleIndex}
          completedModules={completedModules}
          onSelectModule={goToModule}
          isOpen={sidebarOpen}
          isModuleUnlocked={isModuleUnlocked}
          onReset={handleReset}
          bookmarkedTema={bookmarkedTema}
          currentTemaId={moduleTemas[currentTemaIndex]?.id}
          onClose={isDesktop ? undefined : () => setSidebarOpen(false)}
        />
      }
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentModuleIndex}
          custom={direction}
          initial={{ opacity: 0, x: direction * 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -30 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {/* Bloques del módulo */}
          <div className="space-y-6">
            {currentModule.blocks.map((block, i) => (
              <div
                key={`${currentModuleIndex}-${i}`}
                id={`block-${i}`}
                className="scroll-mt-24"
              >
                <BlockRenderer
                  block={block}
                  index={i}
                  module={currentModule}
                  moduleNumber={currentModule.id}
                  estimatedTime={currentModule.estimatedTime}
                  onQuizComplete={(score, isFinal) => handleQuizComplete(score, isFinal, i)}
                  onReflectionSave={saveReflection}
                  reflectionAnswers={reflectionAnswers}
                  bookmarkedTema={bookmarkedTema}
                  onToggleBookmark={toggleBookmark}
                />
              </div>
            ))}
          </div>

          <ModuleFooter
            currentIndex={currentModuleIndex}
            total={modules.length}
            nextModule={isLastModule ? null : modules[currentModuleIndex + 1]}
            isDone={currentModuleDone}
            blockReason={blockReason}
            onNext={handleNext}
            onPrev={handlePrev}
            onFinish={() => {
              markModuleComplete(currentModule.id)
              setShowSedeModal(true)
            }}
          />
        </motion.div>
      </AnimatePresence>
    </CourseLayout>

    <FloatingActions
      moduleKey={currentModuleIndex}
      readingDone={currentScrollDone}
      readingProgress={scrollProgress}
      pendingQuizBlock={pendingQuizBlock}
      isDone={currentModuleDone}
      offsetLeft={sidebarOpen && isDesktop ? 288 : 0}
    />

    {/* ── Modal selección de sede ─────────────────────────────────────── */}
    {showSedeModal && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
        onClick={() => setShowSedeModal(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={e => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="sede-modal-title"
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8"
        >
          <button
            onClick={() => setShowSedeModal(false)}
            aria-label="Cerrar"
            className="absolute top-4 right-4 w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X size={18} />
          </button>
          <h2 id="sede-modal-title" className="font-title text-xl font-bold text-primary mb-1 text-center">
            Antes de obtener tu certificado
          </h2>
          <p className="font-body text-sm text-gray-500 text-center mb-6">
            Selecciona la sede a la que perteneces
          </p>

          <div className="flex flex-col gap-2 mb-6">
            {[
              'Bogotá',
              'Caldas - Sercofun Caldas Ltda.',
              'Cali - SERCOFUN LTDA',
              'Ibagué',
              'Tuluá - SERCOFUN TULUÁ LTDA',
              'Villavicencio - SERFUNLLANOS',
            ].map((sede) => (
              <button
                key={sede}
                onClick={() => setSelectedSede(sede)}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 font-body text-sm transition-all
                  ${selectedSede === sede
                    ? 'border-primary bg-primary/5 text-primary font-semibold'
                    : 'border-gray-200 text-gray-700 hover:border-primary/40'
                  }`}
              >
                {sede}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              if (!selectedSede) return
              setShowSedeModal(false)
              setShowCertificate(true)
            }}
            disabled={!selectedSede}
            className={`w-full py-3 rounded-xl font-title font-semibold text-sm transition-all
              ${selectedSede
                ? 'text-white gradient-primary shadow-md hover:opacity-90'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
          >
            Continuar y obtener certificado
          </button>
        </motion.div>
      </div>
    )}
    </>
  )
}

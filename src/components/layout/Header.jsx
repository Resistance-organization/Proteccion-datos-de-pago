// Ícono de menú: tres líneas escalonadas que se cruzan en una X al abrir
function MenuGlyph({ open }) {
  const line = 'absolute left-0 h-[2px] rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(.65,0,.35,1)]'
  return (
    <span className="relative block w-5 h-[14px]" aria-hidden="true">
      <span className={`${line} ${open ? 'top-[6px] w-5 rotate-45' : 'top-0 w-5'}`} />
      <span className={`${line} top-[6px] ${open ? 'w-0 opacity-0 translate-x-2' : 'w-3 opacity-100 group-hover:w-5'}`} />
      <span className={`${line} ${open ? 'top-[6px] w-5 -rotate-45' : 'top-[12px] w-4 group-hover:w-5'}`} />
    </span>
  )
}

// Anillo de progreso del curso (módulos completados)
function ProgressRing({ value, size = 40, stroke = 3.5 }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  return (
    <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
      <defs>
        <linearGradient id="ring-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3178BD" />
          <stop offset="100%" stopColor="#E73780" />
        </linearGradient>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EEEEF6" strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke="url(#ring-gradient)" strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)}
        className="transition-[stroke-dashoffset] duration-700"
      />
    </svg>
  )
}

export default function Header({ currentModule, totalModules, completedCount, sidebarOpen, onToggleSidebar, temaIndex, temaTotal, readingProgress = 0 }) {
  const progress = Math.round((completedCount / totalModules) * 100)
  const showTema = temaTotal > 0 && temaIndex >= 0

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 h-16 flex items-center px-3 sm:px-4 gap-3">
      {/* Mostrar / ocultar barra lateral */}
      <button
        onClick={onToggleSidebar}
        aria-expanded={sidebarOpen}
        aria-controls="course-sidebar"
        aria-label={sidebarOpen ? 'Ocultar menú del curso' : 'Mostrar menú del curso'}
        title={sidebarOpen ? 'Ocultar menú' : 'Mostrar menú'}
        className="group flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-primary hover:bg-primary-50 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
      >
        <MenuGlyph open={sidebarOpen} />
      </button>

      {/* Logo */}
      <img src="./Logo.png" alt="Resistance" className="hidden sm:block h-8 w-auto flex-shrink-0" />

      {/* Dónde estoy: módulo, tema y título, alineados a la derecha */}
      <div className="flex-1 min-w-0 text-right">
        <p className="text-[11px] font-title font-semibold uppercase tracking-[0.18em] text-secondary truncate">
          Módulo {currentModule.id}
          {showTema && <span className="text-gray-400"> · Tema {temaIndex + 1} de {temaTotal}</span>}
        </p>
        <h1 className="text-sm font-title font-normal text-gray-700 truncate leading-tight">
          {currentModule.title}
        </h1>
      </div>

      {/* Progreso del curso */}
      <div
        className="relative flex-shrink-0"
        title={`${completedCount} de ${totalModules} módulos completados`}
        aria-label={`Progreso del curso: ${completedCount} de ${totalModules} módulos completados`}
      >
        <ProgressRing value={progress} />
        <span className="absolute inset-0 flex items-center justify-center text-[11px] font-title font-bold text-primary">
          {progress}%
        </span>
      </div>

      {/* Lectura del módulo actual */}
      <div className="absolute left-0 right-0 bottom-0 h-[3px] bg-transparent" aria-hidden="true">
        <div
          className="h-full transition-[width] duration-200"
          style={{ width: `${readingProgress}%`, background: 'linear-gradient(90deg, #3178BD, #E73780)' }}
        />
      </div>
    </header>
  )
}

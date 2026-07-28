import { courseInfo } from '../../data/modules'

export default function Header({ currentModule, totalModules, completedCount, sidebarOpen, onToggleSidebar }) {
  const progress = Math.round((completedCount / totalModules) * 100)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100 h-16 flex items-center px-4 gap-4">
      {/* Logo */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <img src="./Logo.png" alt="Logo" className="h-9 w-auto" />
      </div>

      <div className="hidden sm:block h-6 w-px bg-gray-200" />

      {/* Título del curso */}
      <div className="hidden sm:block flex-1 min-w-0">
        <h1 className="text-sm font-title font-semibold text-gray-800 truncate">
          {courseInfo.title}
        </h1>
      </div>

      {/* Progreso general del curso */}
      <div className="ml-auto flex items-center gap-3 flex-shrink-0">
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-xs font-body text-gray-500">
            {completedCount} de {totalModules} módulos
          </span>
          <div className="w-32 bg-gray-100 rounded-full h-1.5 mt-1">
            <div
              className="h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #3A3B74, #3178BD)' }}
            />
          </div>
        </div>
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-50">
          <span className="text-primary font-title font-bold text-sm">{progress}%</span>
        </div>
      </div>
    </header>
  )
}

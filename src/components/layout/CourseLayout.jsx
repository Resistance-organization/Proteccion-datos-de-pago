import { AnimatePresence, motion } from 'framer-motion'

export default function CourseLayout({ sidebar, header, children, sidebarOpen, isDesktop, onCloseSidebar }) {
  return (
    <div className="min-h-screen bg-gray-50 font-body">
      {header}
      {sidebar}

      {/* En pantallas pequeñas la barra se superpone: el fondo oscuro la cierra */}
      <AnimatePresence>
        {sidebarOpen && !isDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCloseSidebar}
            className="fixed inset-0 top-16 z-30 bg-primary-900/40 backdrop-blur-[2px]"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <main
        className="pt-16 transition-all duration-300 min-h-screen"
        style={{ marginLeft: sidebarOpen && isDesktop ? '288px' : '0' }}
      >
        <div className="max-w-4xl xl:max-w-6xl mx-auto px-4 sm:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}

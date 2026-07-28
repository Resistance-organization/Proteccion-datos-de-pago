export default function CourseLayout({ sidebar, header, children, sidebarOpen }) {
  return (
    <div className="min-h-screen bg-gray-50 font-body">
      {header}
      {sidebar}
      <main
        className="pt-16 transition-all duration-300 min-h-screen"
        style={{ marginLeft: sidebarOpen ? '288px' : '0' }}
      >
        <div className="max-w-4xl xl:max-w-6xl mx-auto px-4 sm:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Maximize2, X } from 'lucide-react'

// slideHeight: alto del canvas de la presentación (default 1080 = 16:9).
// La proporción se calcula como slideHeight/1920 para el padding-bottom.
export default function IframePresentation({ block }) {
  const slideHeight = block.slideHeight ?? 1080
  const [fullscreen, setFullscreen] = useState(false)

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {block.title && (
          <div className="px-6 sm:px-8 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-title text-xl font-semibold text-gray-800">{block.title}</h2>
            <button
              onClick={() => setFullscreen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-body text-gray-500 hover:bg-gray-100 hover:text-primary transition-colors"
            >
              <Maximize2 size={15} />
              Pantalla completa
            </button>
          </div>
        )}
        {/* Iframe inline — alto proporcional al canvas de la presentación + nav bar (48px) */}
        <div className="relative w-full bg-gray-100" style={{ paddingBottom: `calc(${(slideHeight / 1920 * 100).toFixed(4)}% + 48px)` }}>
          <iframe
            src={block.src}
            title={block.title || 'Presentación'}
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
          />
        </div>
      </div>

      {/* Fullscreen overlay */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-black"
          >
            <div className="flex-shrink-0 flex justify-end px-4 py-2 bg-black/80">
              <button
                onClick={() => setFullscreen(false)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 text-white text-sm font-body hover:bg-white/20 transition-colors"
              >
                <X size={16} /> Cerrar
              </button>
            </div>
            <iframe
              src={block.src}
              title={block.title || 'Presentación'}
              className="flex-1 border-0 w-full"
              allowFullScreen
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

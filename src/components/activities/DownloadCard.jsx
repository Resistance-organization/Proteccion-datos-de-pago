import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Loader, FileText } from 'lucide-react'
import { generateIncidentCard } from '../../utils/generateIncidentCard'

const GENERATORS = {
  incidentCard: generateIncidentCard,
}

export default function DownloadCard({ block }) {
  const [downloading, setDownloading] = useState(false)
  const generate = GENERATORS[block.variant]

  const handleDownload = async () => {
    setDownloading(true)
    try {
      await generate()
    } finally {
      setDownloading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      className="rounded-2xl bg-white border-2 border-dashed border-secondary-200 hover:border-secondary transition-colors"
    >
      <div className="px-6 sm:px-8 py-6 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
        {/* Miniatura de la hoja que se descarga */}
        <div className="relative w-20 h-[6.5rem] flex-shrink-0 rounded-md bg-white shadow-md ring-1 ring-gray-200 overflow-hidden rotate-[-4deg]" aria-hidden="true">
          <div className="h-6" style={{ background: 'linear-gradient(135deg, #3A3B74 0%, #212252 100%)' }} />
          <div className="h-[3px] flex">
            <span className="flex-1 bg-accent" /><span className="flex-1 bg-purple-600" /><span className="flex-1 bg-secondary" />
          </div>
          <div className="px-2 pt-2 space-y-1.5">
            <div className="h-1.5 w-10 rounded bg-gray-200" />
            <div className="grid grid-cols-2 gap-1">
              <div className="h-4 rounded-sm bg-secondary-50 ring-1 ring-secondary-100" />
              <div className="h-4 rounded-sm bg-secondary-50 ring-1 ring-secondary-100" />
            </div>
            <div className="h-5 rounded-sm bg-accent-50" />
          </div>
          <span className="absolute bottom-1 right-1 px-1 rounded-sm bg-accent text-[8px] font-title font-bold text-white leading-tight">PDF</span>
        </div>

        <div className="flex-1">
          <p className="inline-flex items-center gap-1.5 text-xs font-title font-bold uppercase tracking-widest text-secondary mb-1.5">
            <FileText size={13} /> Descargable · PDF
          </p>
          <h3 className="font-title text-xl font-bold text-gray-800">{block.title}</h3>
          <p className="text-gray-600 text-sm font-body mt-1.5 leading-relaxed">{block.description}</p>
        </div>
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex-shrink-0 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-title font-semibold text-sm text-white gradient-primary shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-60 transition-all"
        >
          {downloading
            ? <><Loader size={16} className="animate-spin" /> Generando...</>
            : <><Download size={16} /> Descargar PDF</>
          }
        </button>
      </div>
    </motion.div>
  )
}

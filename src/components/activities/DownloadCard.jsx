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
      className="rounded-2xl overflow-hidden shadow-md"
      style={{ background: 'linear-gradient(135deg, #3A3B74 0%, #212252 100%)' }}
    >
      <div className="px-6 sm:px-10 py-8 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
        <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
          <FileText size={28} className="text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-title text-xl font-bold text-white">{block.title}</h3>
          <p className="text-white/70 text-sm font-body mt-1.5 leading-relaxed">{block.description}</p>
        </div>
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex-shrink-0 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-title font-semibold text-sm text-primary bg-white shadow-lg hover:opacity-90 disabled:opacity-60 transition-all"
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

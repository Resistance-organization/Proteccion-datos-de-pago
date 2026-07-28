import { motion } from 'framer-motion'
import { Link2 } from 'lucide-react'

export default function ConnectionNote({ block }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      className="flex items-center gap-3.5 bg-secondary-50 border border-secondary-100 rounded-2xl px-5 py-4"
    >
      <motion.div
        initial={{ rotate: -25, scale: 0.7 }}
        whileInView={{ rotate: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 200, damping: 12 }}
        className="w-9 h-9 rounded-full bg-secondary/15 flex items-center justify-center flex-shrink-0"
      >
        <Link2 size={16} className="text-secondary" />
      </motion.div>
      <p className="text-sm font-body text-gray-700 leading-relaxed italic">{block.text}</p>
    </motion.div>
  )
}

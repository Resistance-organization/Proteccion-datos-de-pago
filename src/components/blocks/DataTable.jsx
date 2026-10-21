import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Table2, ChevronDown } from 'lucide-react'
import Icon from '../ui/Icon'

const HIGHLIGHTS = {
  red:    { bar: 'bg-red-400',    chip: 'bg-red-50 text-red-600 border-red-200',       chipActive: 'bg-red-500 text-white border-red-500' },
  orange: { bar: 'bg-orange-400', chip: 'bg-orange-50 text-orange-600 border-orange-200', chipActive: 'bg-orange-500 text-white border-orange-500' },
  green:  { bar: 'bg-green-400',  chip: 'bg-green-50 text-green-600 border-green-200',  chipActive: 'bg-green-500 text-white border-green-500' },
  blue:   { bar: 'bg-secondary',  chip: 'bg-secondary-50 text-secondary border-secondary-200', chipActive: 'bg-secondary text-white border-secondary' },
  default:{ bar: 'bg-primary-200',chip: 'bg-primary-50 text-primary border-primary-100', chipActive: 'bg-primary text-white border-primary' },
}

export default function DataTable({ block }) {
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)
  const row = block.rows[active]
  const h = HIGHLIGHTS[row.highlight] || HIGHLIGHTS.default

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
    >
      {block.title && (
        <div className="px-6 sm:px-7 py-4 border-b border-gray-100 flex items-center gap-2.5">
          <Table2 size={17} className="text-secondary flex-shrink-0" />
          <h3 className="font-title text-base font-semibold text-gray-800">{block.title}</h3>
        </div>
      )}

      <div className="p-4 sm:p-5">
        {/* Selector — chips en desktop, dropdown en mobile */}
        <div className="hidden sm:flex flex-wrap gap-2 mb-4">
          {block.rows.map((r, i) => {
            const rh = HIGHLIGHTS[r.highlight] || HIGHLIGHTS.default
            const isActive = i === active
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full border-2 text-sm font-body font-semibold transition-all ${isActive ? rh.chipActive : rh.chip}`}
              >
                <Icon name={r.icon} size={15} className="flex-shrink-0" /> {r.cells[0]}
              </button>
            )
          })}
        </div>

        {/* Dropdown — solo mobile */}
        <div className="sm:hidden relative mb-4">
          <button
            onClick={() => setOpen(o => !o)}
            className={`w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl border-2 text-sm font-body font-semibold ${h.chipActive}`}
          >
            <span className="flex items-center gap-2"><Icon name={row.icon} size={15} className="flex-shrink-0" /> {row.cells[0]}</span>
            <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="absolute z-10 mt-1.5 w-full bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden"
              >
                {block.rows.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => { setActive(i); setOpen(false) }}
                    className="w-full text-left px-4 py-2.5 text-sm font-body text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Icon name={r.icon} size={15} className="flex-shrink-0" /> {r.cells[0]}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Panel de detalle */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.22 }}
            className="relative bg-gray-50 rounded-xl p-4 sm:p-5 space-y-3"
          >
            <span className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${h.bar}`} />
            {row.cells.slice(1).map((cell, j) => (
              <div key={j}>
                {block.columns[j + 1] && (
                  <p className="text-[11px] font-title font-bold uppercase tracking-wider text-gray-400 mb-1">
                    {block.columns[j + 1]}
                  </p>
                )}
                <p className="text-sm font-body text-gray-700 leading-relaxed">{cell}</p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

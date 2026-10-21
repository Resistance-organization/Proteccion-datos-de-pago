import { motion } from 'framer-motion'
import { Zap, Info, AlertTriangle, CheckCircle2, Sparkles } from 'lucide-react'
import ContentIcon from '../ui/Icon'

const VARIANTS = {
  accent: {
    wrap: 'text-white shadow-md',
    style: { background: 'linear-gradient(135deg, #3A3B74 0%, #212252 100%)' },
    icon: Zap,
    iconWrap: 'bg-white/15 text-white',
    title: 'text-white',
    text: 'text-white/85',
    item: 'text-white/90',
    itemIcon: 'text-lime-300',
    chipWrap: 'bg-white/10 border border-white/15',
    footerBorder: 'border-t border-white/15',
  },
  info: {
    wrap: 'bg-secondary-50 border border-secondary-100',
    icon: Info,
    iconWrap: 'bg-secondary-100 text-secondary',
    title: 'text-secondary-700',
    text: 'text-gray-700',
    item: 'text-gray-700',
    itemIcon: 'text-secondary',
    chipWrap: 'bg-white border border-secondary-100',
    footerBorder: 'border-t border-secondary-100',
  },
  warning: {
    wrap: 'bg-amber-50 border border-amber-200',
    icon: AlertTriangle,
    iconWrap: 'bg-amber-100 text-amber-600',
    title: 'text-amber-800',
    text: 'text-amber-900',
    item: 'text-amber-900',
    itemIcon: 'text-amber-600',
    chipWrap: 'bg-white border border-amber-200',
    footerBorder: 'border-t border-amber-200',
  },
  success: {
    wrap: 'bg-green-50 border border-green-200',
    icon: CheckCircle2,
    iconWrap: 'bg-green-100 text-green-600',
    title: 'text-green-800',
    text: 'text-green-900',
    item: 'text-green-900',
    itemIcon: 'text-green-600',
    chipWrap: 'bg-white border border-green-200',
    footerBorder: 'border-t border-green-200',
  },
  purple: {
    wrap: 'bg-purple-50 border border-purple-200',
    icon: Sparkles,
    iconWrap: 'bg-purple-100 text-purple-600',
    title: 'text-purple-800',
    text: 'text-purple-900',
    item: 'text-purple-900',
    itemIcon: 'text-purple-600',
    chipWrap: 'bg-white border border-purple-200',
    footerBorder: 'border-t border-purple-200',
  },
}

export default function InfoBox({ block }) {
  const v = VARIANTS[block.variant || 'info']
  const Icon = v.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`rounded-2xl px-6 py-5 sm:px-7 sm:py-6 ${v.wrap}`}
      style={v.style}
    >
      <div className="flex gap-3.5">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 16 }}
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${v.iconWrap}`}
        >
          <Icon size={19} />
        </motion.div>
        <div className="flex-1 min-w-0">
          {block.title && (
            <p className={`font-title font-bold text-lg sm:text-xl mb-2 ${v.title}`}>{block.title}</p>
          )}
          {block.text && (
            <div
              className={`font-body text-base leading-relaxed space-y-2 ${v.text}`}
              dangerouslySetInnerHTML={{ __html: block.text }}
            />
          )}
          {block.iconItems?.length > 0 && (
            <div className={`mt-4 grid gap-2.5 ${block.iconItemsColumns === 1 ? '' : 'sm:grid-cols-2'}`}>
              {block.iconItems.map((it, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.06 * i + 0.15 }}
                  className={`flex items-center gap-2.5 rounded-xl px-4 py-3 ${v.chipWrap}`}
                >
                  {it.icon && <ContentIcon name={it.icon} size={18} className={`flex-shrink-0 ${v.itemIcon}`} />}
                  <span className={`font-body text-base leading-snug ${v.item}`}>{it.text}</span>
                </motion.div>
              ))}
            </div>
          )}
          {block.items?.length > 0 && (
            <ul className="mt-3 space-y-2">
              {block.items.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 * i + 0.2 }}
                  className={`flex items-start gap-2.5 text-base font-body leading-relaxed ${v.item}`}
                >
                  <CheckCircle2 size={16} className={`flex-shrink-0 mt-0.5 ${v.itemIcon}`} />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          )}
          {block.footer && (
            <p className={`font-body text-base leading-relaxed mt-4 pt-3 font-semibold ${v.title} ${v.footerBorder}`}>{block.footer}</p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

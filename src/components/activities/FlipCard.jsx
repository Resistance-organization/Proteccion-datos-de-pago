import { useState } from 'react'
import { motion } from 'framer-motion'
import { RotateCcw } from 'lucide-react'

function Card({ card, index }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.12, duration: 0.45, ease: 'easeOut' }}
      className="h-52 cursor-pointer"
      style={{ perspective: '1000px' }}
      onClick={() => setFlipped(f => !f)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-full h-full shadow-md hover:shadow-lg transition-shadow"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Frente */}
        <div
          className="flip-card-front flex flex-col items-center justify-center p-6 text-center"
          style={{ background: 'linear-gradient(135deg, #3A3B74 0%, #212252 100%)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          {card.front.icon && (
            <span className="text-4xl mb-3 drop-shadow">{card.front.icon}</span>
          )}
          {card.front.image && (
            <img src={card.front.image} alt="" className="w-16 h-16 object-contain mb-3" />
          )}
          <h3 className="text-white font-title font-semibold text-lg leading-snug">
            {card.front.title}
          </h3>
          {card.front.subtitle && (
            <p className="text-white/70 text-sm font-body mt-1">{card.front.subtitle}</p>
          )}
          <div className="absolute bottom-3 right-3 opacity-40">
            <RotateCcw size={14} className="text-white" />
          </div>
        </div>

        {/* Reverso */}
        <div
          className="flip-card-back flex flex-col items-center justify-center p-6 text-center"
          style={{ background: 'linear-gradient(135deg, #3178BD 0%, #E73780 100%)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {card.back.icon && (
            <span className="text-3xl mb-3">{card.back.icon}</span>
          )}
          <p className="text-white font-body text-sm leading-relaxed">{card.back.content}</p>
          {card.back.link && (
            <a href={card.back.link} className="mt-3 text-white underline text-xs">
              Saber más
            </a>
          )}
          <div className="absolute bottom-3 right-3 opacity-40">
            <RotateCcw size={14} className="text-white" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function FlipCard({ block }) {
  const cols = block.columns || 3

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
      {block.title && (
        <h2 className="font-title text-2xl font-semibold text-gray-800 mb-2">{block.title}</h2>
      )}
      {block.instruction && (
        <p className="text-sm text-gray-500 font-body mb-6 flex items-center gap-1">
          <RotateCcw size={14} />
          {block.instruction}
        </p>
      )}
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(${Math.min(cols, 3)}, 1fr)` }}
      >
        {block.cards.map((card, i) => (
          <Card key={i} card={card} index={i} />
        ))}
      </div>
    </div>
  )
}

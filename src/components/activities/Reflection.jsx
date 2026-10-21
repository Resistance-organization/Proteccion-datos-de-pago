import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, CheckCircle2, MessageSquareQuote, PenLine, Quote } from 'lucide-react'
import ActivityRibbon from './ActivityRibbon'

// Límites de la respuesta. El máximo mantiene cmi.suspend_data (4096 caracteres
// en SCORM 1.2) lejos del tope aunque se respondan todas las reflexiones.
export const REFLECTION_MIN = 15
export const REFLECTION_MAX = 300

const HEADER_BG = 'linear-gradient(135deg, #3A3B74 0%, #3178BD 100%)'

// Reflexión de texto libre. Es obligatoria: App.jsx no da el módulo por
// completado hasta que la respuesta está guardada (salvo block.optional).
export default function Reflection({ block, value, answers, onSave }) {
  if (block.mode === 'recall') {
    return block.items
      ? <RecallList block={block} answers={answers || {}} />
      : <RecallSingle block={block} value={value} />
  }
  return <ReflectionPrompt block={block} value={value} answers={answers || {}} onSave={onSave} />
}

function ReflectionPrompt({ block, value, answers, onSave }) {
  const [text, setText] = useState(value || '')
  const [editing, setEditing] = useState(!value)

  // La respuesta guardada puede llegar después (carga desde el LMS)
  useEffect(() => {
    if (value && !text) { setText(value); setEditing(false) }
  }, [value]) // eslint-disable-line react-hooks/exhaustive-deps
  const trimmed = text.trim()
  const canSave = trimmed.length >= REFLECTION_MIN
  const required = !block.optional

  const handleSubmit = () => {
    if (!canSave) return
    setEditing(false)
    onSave && onSave(block.storageKey, trimmed)
  }

  return (
    <div className="relative pt-2">
      <ActivityRibbon
        label={required ? 'Tu reflexión · Obligatoria' : 'Tu reflexión'}
        icon={PenLine}
        color="secondary"
      />
      <div className="bg-white rounded-2xl shadow-xl ring-4 ring-secondary/20 overflow-hidden">
        {/* Encabezado: la pregunta es lo protagonista */}
        <div className="relative px-6 sm:px-10 pt-9 pb-7 overflow-hidden" style={{ background: HEADER_BG }}>
          <Quote
            size={120}
            className="absolute -right-4 -top-6 text-white/10 rotate-180 pointer-events-none"
            aria-hidden="true"
          />
          {block.title && (
            <p className="relative text-xs font-title font-semibold uppercase tracking-[0.2em] text-secondary-100 mb-3">
              {block.title}
            </p>
          )}
          <h2 className="relative font-title text-2xl sm:text-[1.7rem] font-semibold text-white leading-snug text-pretty pr-10 sm:pr-16">
            {block.promptPrefix}
          </h2>
          {block.intro && (
            <p className="relative mt-3 font-body text-base text-white/80 leading-relaxed text-pretty">{block.intro}</p>
          )}
        </div>

        <div className="px-6 sm:px-10 py-7">
          {/* Respuestas anteriores como contexto (block.recallItems) */}
          <RecallCompact items={block.recallItems} answers={answers} title={block.recallTitle} />

          {editing ? (
            <>
              <label htmlFor={`reflexion-${block.storageKey}`} className="block font-body text-sm text-gray-500 mb-2">
                Escribe tu respuesta con tus palabras. No hay respuestas correctas o incorrectas.
              </label>
              <textarea
                id={`reflexion-${block.storageKey}`}
                rows={4}
                value={text}
                maxLength={REFLECTION_MAX}
                onChange={e => setText(e.target.value)}
                placeholder={block.placeholder || 'Escribe aquí...'}
                className="w-full resize-none border-2 border-gray-200 focus:border-secondary rounded-xl px-4 py-3 font-body text-lg leading-relaxed text-gray-800 outline-none transition-colors placeholder:text-gray-400"
              />
              <div className="mt-2 flex items-center justify-between gap-4 text-sm font-body">
                <span className={canSave ? 'text-secondary' : 'text-gray-400'}>
                  {canSave
                    ? <span className="inline-flex items-center gap-1"><Check size={14} /> Lista para guardar</span>
                    : `Escribe al menos ${REFLECTION_MIN} caracteres`}
                </span>
                <span className="tabular-nums text-gray-400">{text.length}/{REFLECTION_MAX}</span>
              </div>
              <button
                onClick={handleSubmit}
                disabled={!canSave}
                className={`mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-title font-semibold text-base transition-all
                  ${canSave
                    ? 'gradient-primary text-white shadow-md hover:shadow-lg hover:-translate-y-0.5'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
              >
                Guardar respuesta
              </button>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <p className="flex items-center gap-2 text-sm font-title font-semibold text-secondary mb-3">
                <CheckCircle2 size={17} /> Respuesta guardada
              </p>
              <blockquote className="border-l-4 border-secondary pl-4 font-body text-lg text-gray-700 leading-relaxed italic">
                {value || trimmed}
              </blockquote>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                <p className="text-sm font-body text-gray-500">
                  {block.savedText || 'La vas a volver a leer al final del curso.'}
                </p>
                <button
                  onClick={() => setEditing(true)}
                  className="inline-flex items-center gap-1.5 text-sm font-body font-medium text-secondary hover:underline"
                >
                  <PenLine size={14} /> Editar
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

// Versión compacta dentro de la tarjeta de reflexión: una línea por respuesta
function RecallCompact({ items, answers, title }) {
  const shown = (items || []).filter(it => answers[it.storageKey])
  if (shown.length === 0) return null

  return (
    <div className="mb-6 rounded-xl bg-secondary-50 border border-secondary-100 px-4 sm:px-5 py-4">
      <p className="flex items-center gap-2 text-xs font-title font-bold uppercase tracking-wider text-secondary mb-3">
        <MessageSquareQuote size={14} /> {title || 'Lo que escribiste en el curso'}
      </p>
      <ul className="space-y-2">
        {shown.map(it => (
          <li key={it.storageKey} className="flex gap-3 text-sm sm:text-base font-body leading-snug">
            <span className="flex-shrink-0 w-10 font-title font-semibold text-secondary">{it.label}</span>
            <span className="text-gray-700 italic">“{answers[it.storageKey]}”</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Recuerda varias respuestas anteriores: block.items = [{ storageKey, label, prompt? }]
function RecallList({ block, answers }) {
  const items = block.items.filter(it => answers[it.storageKey])
  if (items.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl overflow-hidden shadow-md ring-1 ring-secondary-100"
    >
      <div className="px-6 sm:px-10 pt-7 pb-6" style={{ background: HEADER_BG }}>
        <p className="flex items-center gap-2 text-xs font-title font-semibold uppercase tracking-[0.2em] text-secondary-100 mb-2">
          <MessageSquareQuote size={15} /> {block.eyebrow || 'Tus reflexiones'}
        </p>
        <h2 className="font-title text-2xl font-semibold text-white leading-snug">
          {block.title || 'Lo que fuiste escribiendo en el curso'}
        </h2>
        {block.intro && <p className="mt-2 font-body text-base text-white/80 leading-relaxed">{block.intro}</p>}
      </div>
      <ol className="bg-secondary-50 px-6 sm:px-10 py-6 space-y-5">
        {items.map(it => (
          <li key={it.storageKey} className="bg-white rounded-xl border border-secondary-100 px-5 py-4">
            <p className="text-xs font-title font-bold uppercase tracking-wider text-secondary mb-1">{it.label}</p>
            {it.prompt && <p className="text-sm font-body text-gray-500 mb-2">{it.prompt}</p>}
            <blockquote className="font-body text-base sm:text-lg text-gray-800 leading-relaxed italic">
              “{answers[it.storageKey]}”
            </blockquote>
          </li>
        ))}
      </ol>
    </motion.div>
  )
}

function RecallSingle({ block, value }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-secondary-50 rounded-2xl border border-secondary-100 px-6 sm:px-10 py-6 sm:py-8"
    >
      <div className="flex items-start gap-3">
        <MessageSquareQuote size={22} className="text-secondary flex-shrink-0 mt-0.5" />
        <p className="font-body text-gray-700 leading-relaxed">
          {block.closingTemplate
            ? block.closingTemplate.replace('{{respuesta}}', value || 'algo importante para ti')
            : `Al empezar el curso escribiste que querías proteger "${value || 'algo importante para ti'}".`}
        </p>
      </div>
    </motion.div>
  )
}

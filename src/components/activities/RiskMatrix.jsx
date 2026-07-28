import { useState } from 'react'
import { motion } from 'framer-motion'

const PROBABILITY = [
  { label: 'Casi Seguro', value: 5, short: '5' },
  { label: 'Alta',        value: 4, short: '4' },
  { label: 'Media',       value: 3, short: '3' },
  { label: 'Baja',        value: 2, short: '2' },
  { label: 'Muy Baja',    value: 1, short: '1' },
]

const IMPACT = [
  { label: 'Insignificante', value: 1, short: '1' },
  { label: 'Menor',          value: 2, short: '2' },
  { label: 'Moderado',       value: 3, short: '3' },
  { label: 'Mayor',          value: 4, short: '4' },
  { label: 'Catastrófico',   value: 5, short: '5' },
]

const RISK_LEVELS = [
  { max: 4,  label: 'Bajo',    bg: '#3A3B74', text: '#fff', lightBg: '#EEEEF6' },
  { max: 9,  label: 'Medio',   bg: '#3178BD', text: '#fff', lightBg: '#E8F2FB' },
  { max: 15, label: 'Alto',    bg: '#E73780', text: '#fff', lightBg: '#FDE9F1' },
  { max: 25, label: 'Crítico', bg: '#DC2626', text: '#fff', lightBg: '#FEF2F2' },
]

function getRisk(p, i) {
  const score = p * i
  return RISK_LEVELS.find(r => score <= r.max) || RISK_LEVELS[RISK_LEVELS.length - 1]
}

// Ejemplos predefinidos que se ubican en la matriz
const EXAMPLES = [
  {
    id: 'e1',
    label: 'Equipos sin bloqueo al salir',
    probability: 4,
    impact: 3,
    description: 'Probabilidad Alta × Impacto Moderado = Riesgo Alto',
  },
  {
    id: 'e2',
    label: 'Borrado de registros operativos críticos',
    probability: 2,
    impact: 5,
    description: 'Probabilidad Baja × Impacto Catastrófico = Riesgo Alto',
  },
  {
    id: 'e3',
    label: 'Envío erróneo de listado de clientes',
    probability: 3,
    impact: 4,
    description: 'Probabilidad Media × Impacto Mayor = Riesgo Crítico',
  },
]

export default function RiskMatrix({ block }) {
  const [hovered, setHovered] = useState(null)
  const [activeExample, setActiveExample] = useState(null)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Encabezado */}
      <div className="px-6 sm:px-8 py-5 border-b border-gray-100 gradient-primary">
        <p className="text-white/60 text-xs font-body uppercase tracking-widest mb-1">Herramienta de gestión</p>
        <h2 className="font-title text-xl font-semibold text-white">
          {block?.title || 'Valoración del Riesgo: Probabilidad vs. Impacto'}
        </h2>
        {block?.intro && (
          <p className="text-white/70 text-sm font-body mt-1">{block.intro}</p>
        )}
      </div>

      <div className="p-4 sm:p-6">
        {/* Leyenda */}
        <div className="flex flex-wrap gap-2 mb-6">
          {RISK_LEVELS.map(r => (
            <div key={r.label} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: r.bg }} />
              <span className="text-xs font-body text-gray-600">{r.label}</span>
            </div>
          ))}
        </div>

        {/* Matriz */}
        <div className="overflow-x-auto">
          <div className="min-w-[420px]">
            {/* Flecha eje Y */}
            <div className="flex gap-2 items-start">
              {/* Etiqueta eje Y */}
              <div className="flex flex-col items-center justify-center w-8 flex-shrink-0" style={{ marginTop: '24px' }}>
                <span
                  className="font-body text-xs text-gray-400 writing-mode-vertical"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', whiteSpace: 'nowrap' }}
                >
                  Probabilidad →
                </span>
              </div>

              <div className="flex-1">
                {/* Header columnas (Impacto) */}
                <div className="flex mb-1 ml-20">
                  {IMPACT.map(imp => (
                    <div key={imp.value} className="flex-1 text-center">
                      <p className="text-xs font-body text-gray-500 leading-tight px-0.5">{imp.label}</p>
                    </div>
                  ))}
                </div>
                <div className="flex mb-1 ml-20">
                  <div className="flex-1 text-center col-span-5">
                    <p className="text-xs font-body text-gray-400 tracking-wide">← Impacto →</p>
                  </div>
                </div>

                {/* Filas de la matriz */}
                {PROBABILITY.map(prob => (
                  <div key={prob.value} className="flex items-center gap-1 mb-1">
                    {/* Etiqueta fila */}
                    <div className="w-20 flex-shrink-0 text-right pr-2">
                      <span className="text-xs font-body text-gray-500 leading-tight">{prob.label}</span>
                    </div>

                    {/* Celdas */}
                    {IMPACT.map(imp => {
                      const risk = getRisk(prob.value, imp.value)
                      const score = prob.value * imp.value
                      const isHovered = hovered?.p === prob.value && hovered?.i === imp.value
                      const hasExample = EXAMPLES.find(e => e.probability === prob.value && e.impact === imp.value)

                      return (
                        <motion.div
                          key={imp.value}
                          className="flex-1 aspect-square rounded-md flex items-center justify-center cursor-pointer relative"
                          style={{
                            background: isHovered ? risk.bg : risk.lightBg,
                            border: `2px solid ${isHovered ? risk.bg : 'transparent'}`,
                            transition: 'all 0.15s',
                          }}
                          onMouseEnter={() => setHovered({ p: prob.value, i: imp.value })}
                          onMouseLeave={() => setHovered(null)}
                        >
                          <span
                            className="font-title font-bold text-sm"
                            style={{ color: isHovered ? risk.text : risk.bg }}
                          >
                            {score}
                          </span>
                          {/* Indicador de ejemplo */}
                          {hasExample && (
                            <div
                              className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white"
                              style={{ background: '#1F2937' }}
                            />
                          )}
                        </motion.div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Ejemplos reales */}
        <div className="mt-6 border-t border-gray-100 pt-5">
          <p className="font-title font-semibold text-sm text-gray-700 mb-3">
            Ejemplos en la organización <span className="text-gray-400 font-normal font-body">(● marcados en la matriz)</span>
          </p>
          <div className="space-y-2">
            {EXAMPLES.map((ex, i) => {
              const risk = getRisk(ex.probability, ex.impact)
              return (
                <div
                  key={ex.id}
                  className="flex items-start gap-3 rounded-xl px-4 py-3 border"
                  style={{ borderColor: risk.bg + '40', background: risk.lightBg }}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: risk.bg }}
                  >
                    <span className="font-title font-black text-xs text-white">{i + 1}</span>
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-gray-800">{ex.label}</p>
                    <p className="font-body text-xs mt-0.5" style={{ color: risk.bg }}>{ex.description}</p>
                  </div>
                  <span
                    className="ml-auto text-xs font-title font-bold px-2 py-1 rounded-full flex-shrink-0"
                    style={{ background: risk.bg, color: risk.text }}
                  >
                    {risk.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

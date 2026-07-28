import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckSquare, Square, CheckCircle, ClipboardList } from 'lucide-react'
import ActivityRibbon from './ActivityRibbon'

const HABITS = [
  'Contraseñas únicas en mis cuentas más importantes',
  'Gestor de contraseñas instalado y en uso',
  'MFA activo en correo electrónico',
  'MFA activo en cuentas bancarias',
  'MFA activo en WhatsApp (verificación en dos pasos)',
  'Actualizaciones automáticas en celular y computador',
  'Copia de seguridad de fotos y documentos en la nube',
  'Alertas de transacción activadas en cuentas bancarias',
]

function Field({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-body font-semibold text-gray-500 mb-1.5">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border-2 border-gray-200 focus:border-secondary rounded-xl px-4 py-2.5 font-body text-sm text-gray-800 outline-none transition-colors"
      />
    </div>
  )
}

export default function ActionPlan({ block }) {
  const [checked, setChecked] = useState(new Set())
  const [thisWeek, setThisWeek] = useState('')
  const [bank, setBank] = useState('')
  const [cardBlock, setCardBlock] = useState('')
  const [walletBlock, setWalletBlock] = useState('')
  const [trustedPerson, setTrustedPerson] = useState('')
  const [commitment, setCommitment] = useState('')
  const [saved, setSaved] = useState(false)

  const toggleHabit = (i) => {
    setChecked(prev => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  const canSave = thisWeek.trim() && commitment.trim()

  return (
    <div className="relative">
      <ActivityRibbon label="Actividad final" icon={ClipboardList} color="accent" />
      <div className="bg-white rounded-2xl shadow-xl ring-4 ring-accent/25 overflow-hidden">
      <div className="px-6 sm:px-8 pt-7 pb-5 border-b border-gray-100 gradient-primary flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
          <ClipboardList size={16} className="text-white" />
        </div>
        <div>
          <h2 className="font-title text-lg font-semibold text-white">{block.title}</h2>
          <p className="text-white/70 text-xs font-body mt-0.5">No hay respuestas correctas o incorrectas: este plan es tuyo.</p>
        </div>
      </div>

      <div className="px-6 sm:px-8 py-6 space-y-8">
        {/* Sección 1 */}
        <div>
          <p className="font-title font-semibold text-sm text-gray-800 mb-3">1. Lo que ya tengo (hábitos activos)</p>
          <div className="space-y-2">
            {HABITS.map((habit, i) => {
              const isChecked = checked.has(i)
              return (
                <button
                  key={i}
                  disabled={saved}
                  onClick={() => toggleHabit(i)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl flex items-center gap-3 transition-all border-2
                    ${isChecked ? 'border-secondary bg-secondary-50' : 'border-gray-100 bg-gray-50 hover:border-secondary-200'}`}
                >
                  {isChecked
                    ? <CheckSquare size={17} className="text-secondary flex-shrink-0" />
                    : <Square size={17} className="text-gray-300 flex-shrink-0" />}
                  <span className="font-body text-sm text-gray-700">{habit}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Sección 2 */}
        <div>
          <p className="font-title font-semibold text-sm text-gray-800 mb-1">2. Lo que voy a implementar esta semana</p>
          <p className="text-xs text-gray-400 font-body mb-3">Escribe entre 1 y 3 hábitos que vas a activar en los próximos 7 días. Sé específico.</p>
          <textarea
            disabled={saved}
            value={thisWeek}
            onChange={(e) => setThisWeek(e.target.value)}
            placeholder='Ej: "Esta semana voy a instalar Bitwarden y migrar las contraseñas de mi correo y mi banco."'
            rows={3}
            className="w-full border-2 border-gray-200 focus:border-secondary rounded-xl px-4 py-3 font-body text-sm text-gray-800 outline-none transition-colors resize-none"
          />
        </div>

        {/* Sección 3 */}
        <div>
          <p className="font-title font-semibold text-sm text-gray-800 mb-3">3. Mis números de emergencia</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Mi banco principal y su número de atención al fraude" value={bank} onChange={setBank} placeholder="Ej: Bancolombia — *700" />
            <Field label="Número de bloqueo de mi tarjeta de crédito" value={cardBlock} onChange={setCardBlock} placeholder="" />
            <Field label="Número de bloqueo de Nequi / Daviplata" value={walletBlock} onChange={setWalletBlock} placeholder="" />
            <Field label="Persona de confianza a quien llamar si sospecho un fraude" value={trustedPerson} onChange={setTrustedPerson} placeholder="" />
          </div>
          <p className="text-xs text-gray-400 font-body mt-3">CAI Virtual Policía Nacional: 767 · caivirtual.policia.gov.co — Centro Cibernético Policial: cc.policia.gov.co</p>
        </div>

        {/* Sección 4 */}
        <div>
          <p className="font-title font-semibold text-sm text-gray-800 mb-3">4. Mi compromiso</p>
          <p className="text-sm text-gray-600 font-body mb-2">"Con lo que aprendí en este curso, a partir de hoy voy a..."</p>
          <input
            type="text"
            disabled={saved}
            value={commitment}
            onChange={(e) => setCommitment(e.target.value)}
            placeholder="Completa la frase"
            className="w-full border-2 border-gray-200 focus:border-secondary rounded-xl px-4 py-3 font-body text-sm text-gray-800 outline-none transition-colors"
          />
        </div>

        {!saved ? (
          <button
            onClick={() => setSaved(true)}
            disabled={!canSave}
            className={`px-6 py-3 rounded-xl font-title font-semibold text-sm flex items-center gap-2 transition-all
              ${canSave ? 'gradient-primary text-white shadow-md hover:opacity-90' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
          >
            Guardar mi plan
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl p-4 flex gap-3 bg-green-50 border border-green-200"
          >
            <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm font-body text-gray-700">Tu plan quedó guardado. Ya puedes descargar el kit de emergencia y tu plan personal más abajo.</p>
          </motion.div>
        )}
      </div>
      </div>
    </div>
  )
}

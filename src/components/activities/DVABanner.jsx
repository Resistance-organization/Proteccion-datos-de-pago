import { Hand, Search, CheckCircle2 } from 'lucide-react'

// Identidad visual del curso: Detente - Verifica - Actúa.
// Se repite al final de cada tema en todos los módulos.
export default function DVABanner() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #212252 0%, #0E0F2A 100%)' }}>
      <p className="text-center text-white/50 text-xs font-title font-semibold uppercase tracking-widest pt-4">
        Antes de actuar, siempre:
      </p>
      <div className="grid grid-cols-3 gap-2 px-4 py-4 sm:px-8">
        <div className="flex flex-col items-center gap-1.5 text-center">
          <Hand size={20} className="text-red-400" />
          <p className="font-title font-bold text-sm text-red-400 tracking-wide">DETENTE</p>
          <p className="text-[11px] text-white/50 font-body">No actúes de inmediato</p>
        </div>
        <div className="flex flex-col items-center gap-1.5 text-center">
          <Search size={20} className="text-secondary-300" />
          <p className="font-title font-bold text-sm text-secondary-300 tracking-wide">VERIFICA</p>
          <p className="text-[11px] text-white/50 font-body">Confirma por canal oficial</p>
        </div>
        <div className="flex flex-col items-center gap-1.5 text-center">
          <CheckCircle2 size={20} className="text-lime-400" />
          <p className="font-title font-bold text-sm text-lime-400 tracking-wide">ACTÚA</p>
          <p className="text-[11px] text-white/50 font-body">Solo después de verificar</p>
        </div>
      </div>
    </div>
  )
}

import { jsPDF } from 'jspdf'

const NAVY   = [58, 59, 116]
const RED    = [220, 38, 38]
const RED_BG = [254, 242, 242]
const ORANGE = [234, 122, 30]
const ORANGE_BG = [255, 247, 237]
const BLUE   = [49, 120, 189]
const BLUE_BG = [232, 242, 251]
const INK    = [31, 41, 51]
const INK_M  = [107, 122, 132]
const WHITE  = [255, 255, 255]

function zone(doc, { x, y, w, bg, accent, title, items, headerColor = WHITE }) {
  const lineH = 5.2
  const padTop = 12
  const padSide = 6
  const h = padTop + items.length * lineH + 6

  doc.setFillColor(...bg)
  doc.roundedRect(x, y, w, h, 2, 2, 'F')
  doc.setFillColor(...accent)
  doc.roundedRect(x, y, 3, h, 1.5, 1.5, 'F')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(...accent)
  doc.text(title, x + padSide, y + 8)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(...INK)
  items.forEach((item, i) => {
    doc.text(`•  ${item}`, x + padSide, y + padTop + i * lineH + 4)
  })

  return y + h
}

export async function generateEmergencyKit() {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const W = 210

  doc.setFillColor(...NAVY)
  doc.rect(0, 0, W, 26, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.setTextColor(...WHITE)
  doc.text('KIT DE EMERGENCIA', W / 2, 12, { align: 'center' })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9.5)
  doc.text('¿Qué hago si fui víctima de una estafa digital?', W / 2, 19, { align: 'center' })

  let y = 34
  const x = 12
  const w = W - 24

  y = zone(doc, {
    x, y, w,
    bg: RED_BG, accent: RED,
    title: 'PRIMERAS 24 HORAS — DETENTE Y CONTIENE',
    items: [
      'Cambia la contraseña del correo electrónico PRIMERO',
      'Cambia la contraseña del servicio afectado',
      'Cambia todas las cuentas con la misma clave',
      'Activa MFA en las cuentas afectadas',
      'Llama al banco si hubo movimientos financieros',
      'Toma capturas de pantalla de todo (evidencia)',
      'Avisa a tus contactos si tu cuenta fue comprometida',
    ],
  })
  y += 5

  y = zone(doc, {
    x, y, w,
    bg: ORANGE_BG, accent: ORANGE,
    title: 'PRIMERA SEMANA — REPORTA Y MONITOREA',
    items: [
      'Reporta al CAI Virtual: 767 | caivirtual.policia.gov.co',
      'Reporta a la plataforma afectada',
      'Si fue fraude bancario: Superintendencia Financiera 01 8000 120 100',
      'Denuncia formal: Fiscalía, línea 122 | App Mi Fiscalía',
      'Verifica tus datos en haveibeenpwned.com',
      'Revisa sesiones activas y cierra las que no reconoces',
    ],
  })
  y += 5

  y = zone(doc, {
    x, y, w,
    bg: [236, 253, 245], accent: [22, 163, 74],
    title: 'PRIMER MES — RECUPERA Y BLÍNDATE',
    items: [
      'Auditoría completa de contraseñas con el gestor',
      'MFA en todas las cuentas críticas',
      'Revisión de historial crediticio: TransUnion / DataCrédito',
      'Configura alertas de transacción en todas las cuentas',
      'Documenta el incidente',
    ],
  })
  y += 5

  y = zone(doc, {
    x, y, w,
    bg: BLUE_BG, accent: BLUE,
    title: 'NÚMEROS CLAVE',
    items: [
      'CAI Virtual Policía: 767',
      'Centro Cibernético Policial: cc.policia.gov.co',
      'Fiscalía: 122 | App Mi Fiscalía',
      'Superintendencia Financiera: 01 8000 120 100',
      'Bancolombia: *700 | 604 604 6060',
      'Davivienda: 601 330 3030',
      'HaveIBeenPwned: haveibeenpwned.com',
      'NoMoreRansom: nomoreransom.org',
    ],
  })

  doc.setDrawColor(...NAVY)
  doc.setLineWidth(0.3)
  doc.line(12, 280, W - 12, 280)
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(8.5)
  doc.setTextColor(...INK_M)
  doc.text('Guárdalo en tu celular. Compártelo con tu familia. Esperemos que nunca lo necesites, pero si lo necesitas, todo está aquí.', W / 2, 286, { align: 'center', maxWidth: W - 30 })
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7.5)
  doc.text('Ciberseguridad Cotidiana', W / 2, 292, { align: 'center' })

  doc.save('kit-de-emergencia-ciberseguridad.pdf')
}

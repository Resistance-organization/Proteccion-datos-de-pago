import { jsPDF } from 'jspdf'

const NAVY   = [58, 59, 116]
const BLUE_BG   = [232, 242, 251]
const BLUE      = [49, 120, 189]
const GREEN_BG  = [236, 253, 245]
const GREEN     = [22, 163, 74]
const YELLOW_BG = [255, 251, 235]
const YELLOW    = [217, 164, 33]
const RED_BG    = [254, 242, 242]
const RED       = [220, 38, 38]
const INK    = [31, 41, 51]
const INK_M  = [107, 122, 132]
const WHITE  = [255, 255, 255]

function checklistSection(doc, { x, y, w, bg, accent, title, items }) {
  const lineH = 6.2
  const padTop = 11
  const padSide = 6
  const h = padTop + items.length * lineH + 4

  doc.setFillColor(...bg)
  doc.roundedRect(x, y, w, h, 2, 2, 'F')
  doc.setFillColor(...accent)
  doc.roundedRect(x, y, 3, h, 1.5, 1.5, 'F')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9.5)
  doc.setTextColor(...accent)
  doc.text(title, x + padSide, y + 7.5)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(...INK)
  items.forEach((item, i) => {
    const ly = y + padTop + i * lineH + 3.5
    doc.setDrawColor(...accent)
    doc.setLineWidth(0.35)
    doc.rect(x + padSide, ly - 3, 3.5, 3.5, 'S')
    doc.text(item, x + padSide + 6, ly)
  })

  return y + h
}

export async function generatePersonalPlan() {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const W = 210

  doc.setFillColor(...NAVY)
  doc.rect(0, 0, W, 24, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(15)
  doc.setTextColor(...WHITE)
  doc.text('MI PLAN PERSONAL DE CIBERSEGURIDAD', W / 2, 15, { align: 'center' })

  let y = 30
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.5)
  doc.setTextColor(...INK)
  doc.text('Nombre: ____________________________', 12, y)
  doc.text('Fecha: ______________', 130, y)
  y += 8

  const x = 12
  const w = W - 24

  y = checklistSection(doc, {
    x, y, w, bg: BLUE_BG, accent: BLUE,
    title: 'MIS CUENTAS — Proteger mis accesos',
    items: [
      'Activar MFA en mi correo electrónico (Gmail, Outlook u otro)',
      'Activar MFA en mi cuenta bancaria',
      'Activar verificación en dos pasos en WhatsApp',
      'Activar MFA en Instagram y/o Facebook',
      'Instalar un gestor de contraseñas',
      'Cambiar contraseñas repetidas',
      'Verificar mis correos en haveibeenpwned.com',
    ],
  })
  y += 5

  y = checklistSection(doc, {
    x, y, w, bg: GREEN_BG, accent: GREEN,
    title: 'MIS DISPOSITIVOS — Mantenerlos seguros',
    items: [
      'Activar actualizaciones automáticas en el celular',
      'Activar actualizaciones automáticas en el computador',
      'Verificar que Microsoft Defender esté activo (Windows)',
      'Activar el bloqueo de pantalla automático',
      'Activar "Encontrar mi dispositivo"',
      'Copia de seguridad de mis fotos (Google Fotos / iCloud)',
      'Copia de mis documentos importantes en la nube',
    ],
  })
  y += 5

  y = checklistSection(doc, {
    x, y, w, bg: YELLOW_BG, accent: YELLOW,
    title: 'MI PRIVACIDAD — Controlar lo que comparto',
    items: [
      'Revisar permisos de ubicación (cambiar a "Solo al usar")',
      'Revisar permisos de cámara y micrófono',
      'Configurar mis perfiles como privados',
      'Desinstalar apps que no uso hace más de 3 meses',
      'Activar alertas de transacción en Nequi / Daviplata',
    ],
  })
  y += 5

  y = checklistSection(doc, {
    x, y, w, bg: RED_BG, accent: RED,
    title: 'MI PREPARACIÓN — Estar listo si algo sale mal',
    items: [
      'Guardar el kit de emergencia en mi celular',
      'Anotar el número de bloqueo de mi banco: ______________',
      'Anotar el número de bloqueo de mi tarjeta: ______________',
      'Compartir este plan con alguien de mi familia',
    ],
  })
  y += 8

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(...NAVY)
  doc.text('MI COMPROMISO', x, y)
  y += 6
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.5)
  doc.setTextColor(...INK)
  doc.text('Esta semana voy a completar: ________________________________________', x, y)
  y += 7
  doc.text('Este mes voy a completar: ________________________________________', x, y)

  doc.setDrawColor(...NAVY)
  doc.setLineWidth(0.3)
  doc.line(12, 285, W - 12, 285)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7.5)
  doc.setTextColor(...INK_M)
  doc.text('Ciberseguridad Cotidiana', W / 2, 291, { align: 'center' })

  doc.save('mi-plan-personal-ciberseguridad.pdf')
}

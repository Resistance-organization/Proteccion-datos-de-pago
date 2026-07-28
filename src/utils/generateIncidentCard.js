import { jsPDF } from 'jspdf'

const NAVY = [58, 59, 116]
const GREEN_BG = [236, 253, 245]
const GREEN = [22, 163, 74]
const RED_BG = [254, 242, 242]
const RED = [220, 38, 38]
const BLUE_BG = [232, 242, 251]
const BLUE = [49, 120, 189]
const INK = [31, 41, 51]
const INK_M = [107, 122, 132]
const WHITE = [255, 255, 255]

function stepsZone(doc, { x, y, w, bg, accent, title, steps }) {
  const lineH = 10
  const padTop = 12
  const padSide = 6
  const h = padTop + steps.length * lineH + 4

  doc.setFillColor(...bg)
  doc.roundedRect(x, y, w, h, 2, 2, 'F')
  doc.setFillColor(...accent)
  doc.roundedRect(x, y, 3, h, 1.5, 1.5, 'F')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(...accent)
  doc.text(title, x + padSide, y + 8)

  steps.forEach((step, i) => {
    const ly = y + padTop + i * lineH
    doc.setFillColor(...accent)
    doc.circle(x + padSide + 3, ly + 2, 3, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(...WHITE)
    doc.text(String(i + 1), x + padSide + 3, ly + 3.2, { align: 'center' })

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8.5)
    doc.setTextColor(...INK)
    doc.text(step.title, x + padSide + 9, ly + 1.5)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(...INK_M)
    doc.text(step.detail, x + padSide + 9, ly + 6, { maxWidth: w - padSide - 13 })
  })

  return y + h
}

function bulletZone(doc, { x, y, w, bg, accent, title, items }) {
  const lineH = 5.6
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
    doc.text(`✗  ${item}`, x + padSide, y + padTop + i * lineH + 3.5)
  })

  return y + h
}

function fieldZone(doc, { x, y, w, bg, accent, title, fields }) {
  const lineH = 9
  const padTop = 11
  const padSide = 6
  const h = padTop + fields.length * lineH + 4

  doc.setFillColor(...bg)
  doc.roundedRect(x, y, w, h, 2, 2, 'F')
  doc.setFillColor(...accent)
  doc.roundedRect(x, y, 3, h, 1.5, 1.5, 'F')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9.5)
  doc.setTextColor(...accent)
  doc.text(title, x + padSide, y + 7.5)

  fields.forEach((field, i) => {
    const ly = y + padTop + i * lineH + 3
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7.5)
    doc.setTextColor(...INK)
    doc.text(field, x + padSide, ly)
    doc.setDrawColor(...INK_M)
    doc.setLineWidth(0.3)
    doc.line(x + padSide + 45, ly, x + w - padSide, ly)
  })

  return y + h
}

export async function generateIncidentCard() {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const W = 210

  doc.setFillColor(...NAVY)
  doc.rect(0, 0, W, 26, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(15)
  doc.setTextColor(...WHITE)
  doc.text('SI DETECTAS O SOSPECHAS UN INCIDENTE', W / 2, 11, { align: 'center' })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9.5)
  doc.text('Tarjeta de referencia rápida — Protección de Datos de Pago', W / 2, 18, { align: 'center' })

  let y = 34
  const x = 12
  const w = W - 24

  y = stepsZone(doc, {
    x, y, w,
    bg: BLUE_BG, accent: NAVY,
    title: 'QUÉ HACER — EN ESTE ORDEN',
    steps: [
      { title: '1. Para.', detail: 'No sigas operando con esa información o sistema.' },
      { title: '2. Reporta.', detail: 'Contacta al canal oficial de tu organización. No por WhatsApp ni correo personal.' },
      { title: '3. Documenta.', detail: 'Registra la hora y lo que observaste, sin usar el equipo involucrado si es posible.' },
      { title: '4. Espera instrucciones.', detail: 'No actúes técnicamente sin autorización del equipo de respuesta.' },
    ],
  })
  y += 6

  y = bulletZone(doc, {
    x, y, w,
    bg: RED_BG, accent: RED,
    title: 'QUÉ NO HACER',
    items: [
      'No borres archivos, mensajes ni registros.',
      'No apagues, reinicies ni manipules el equipo involucrado, salvo instrucción expresa.',
      'No lo comentes informalmente antes de reportarlo.',
      'No intentes resolverlo por tu cuenta.',
      'No lo ignores pensando que no fue para tanto.',
    ],
  })
  y += 6

  y = fieldZone(doc, {
    x, y, w,
    bg: GREEN_BG, accent: GREEN,
    title: 'CONTACTOS DE LA ORGANIZACIÓN (completar antes de distribuir)',
    fields: [
      'Canal de reporte (nombre)',
      'Correo electrónico',
      'Teléfono / extensión',
      'Horario de atención',
      'Canal alterno (fuera de horario)',
      'Instrucción específica adicional',
    ],
  })
  y += 4

  doc.setFillColor(...RED_BG)
  doc.roundedRect(x, y, w, 14, 2, 2, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(...RED)
  doc.text('⚠ No distribuir esta tarjeta sin completar la sección de contactos.', x + 6, y + 6)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(...INK_M)
  doc.text('Un canal de reporte en blanco la vuelve inútil en el momento en que más se necesita.', x + 6, y + 11, { maxWidth: w - 12 })

  doc.setDrawColor(...NAVY)
  doc.setLineWidth(0.3)
  doc.line(12, 280, W - 12, 280)
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(8.5)
  doc.setTextColor(...INK_M)
  doc.text('Guárdala en tu celular o imprímela para tu puesto de trabajo.', W / 2, 286, { align: 'center', maxWidth: W - 30 })
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7.5)
  doc.text('Protección de Datos de Pago — PCI DSS', W / 2, 292, { align: 'center' })

  doc.save('tarjeta-referencia-incidentes-pci.pdf')
}

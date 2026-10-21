import { jsPDF } from 'jspdf'

// ── Paleta (colores del curso) ────────────────────────────────
const NAVY_D = [33, 34, 82]      // #212252
const NAVY = [58, 59, 116]       // #3A3B74
const BLUE = [49, 120, 189]      // #3178BD
const PINK = [231, 55, 128]      // #E73780
const PURPLE = [162, 62, 161]    // #A23EA1
const PINK_BG = [253, 238, 245]
const NAVY_BG = [238, 239, 248]
const BORDER = [222, 224, 238]
const INK = [31, 41, 51]
const INK_M = [100, 112, 124]
const WHITE = [255, 255, 255]

const W = 210
const H = 297
const M = 16            // margen lateral
const CW = W - 2 * M    // ancho útil

const STEPS = [
  { title: 'Para.', detail: 'No sigas operando con esa información o ese sistema.' },
  { title: 'Reporta.', detail: 'Usa el canal oficial de tu organización. Nunca WhatsApp ni correo personal.' },
  { title: 'Documenta.', detail: 'Anota la hora y lo que viste, sin usar el equipo involucrado si es posible.' },
  { title: 'Espera instrucciones.', detail: 'No actúes técnicamente sin autorización del equipo de respuesta.' },
]

const DONTS = [
  'No borres archivos, mensajes ni registros.',
  'No apagues, reinicies ni manipules el equipo involucrado, salvo que te lo indiquen.',
  'No lo comentes informalmente antes de reportarlo.',
  'No intentes resolverlo por tu cuenta.',
  'No lo ignores pensando que no fue para tanto.',
]

const CONTACT_FIELDS = [
  'Canal o persona para reportar',
  'Correo electrónico',
  'Teléfono o extensión',
  'Fuera de horario',
]

async function loadImageAsDataURL(src) {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      canvas.getContext('2d').drawImage(img, 0, 0)
      resolve({ data: canvas.toDataURL('image/png'), ratio: img.naturalWidth / img.naturalHeight })
    }
    img.onerror = () => resolve(null)
    img.src = src
  })
}

// Etiqueta de sección: barrita de color + texto en mayúsculas espaciadas
function sectionLabel(doc, { y, text, color }) {
  doc.setFillColor(...color)
  doc.roundedRect(M, y - 3.6, 1.6, 4.6, 0.8, 0.8, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9.5)
  doc.setTextColor(...color)
  doc.setCharSpace(0.6)
  doc.text(text, M + 5, y)
  doc.setCharSpace(0)
}

function header(doc, logo) {
  doc.setFillColor(...NAVY_D)
  doc.rect(0, 0, W, 50, 'F')

  // Franja de acento rosa → morado → azul
  const third = W / 3
  doc.setFillColor(...PINK)
  doc.rect(0, 50, third, 2, 'F')
  doc.setFillColor(...PURPLE)
  doc.rect(third, 50, third, 2, 'F')
  doc.setFillColor(...BLUE)
  doc.rect(third * 2, 50, third + 1, 2, 'F')

  if (logo) {
    const h = 8
    doc.addImage(logo.data, 'PNG', M, 10, h * logo.ratio, h)
  }

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(245, 160, 196)
  doc.setCharSpace(0.8)
  doc.text('TARJETA DE REFERENCIA RÁPIDA', M, 27)
  doc.setCharSpace(0)

  doc.setFontSize(23)
  doc.setTextColor(...WHITE)
  doc.text('Si detectas o sospechas un incidente', M, 37.5)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(196, 198, 228)
  doc.text('Protección de Datos de Pago  ·  PCI DSS 4.0.1', M, 44.5)
}

function stepsGrid(doc, y) {
  const gap = 6
  const cw = (CW - gap) / 2
  const ch = 29

  STEPS.forEach((step, i) => {
    const cx = M + (i % 2) * (cw + gap)
    const cy = y + Math.floor(i / 2) * (ch + gap)

    doc.setFillColor(...WHITE)
    doc.setDrawColor(...BORDER)
    doc.setLineWidth(0.35)
    doc.roundedRect(cx, cy, cw, ch, 3, 3, 'FD')

    // Número grande
    doc.setFillColor(...NAVY)
    doc.circle(cx + 11, cy + 10.5, 5.5, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    doc.setTextColor(...WHITE)
    doc.text(String(i + 1), cx + 11, cy + 12.8, { align: 'center' })

    doc.setFontSize(13)
    doc.setTextColor(...INK)
    doc.text(step.title, cx + 20, cy + 12.5)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9.5)
    doc.setTextColor(...INK_M)
    const lines = doc.splitTextToSize(step.detail, cw - 14)
    doc.text(lines, cx + 7, cy + 21, { lineHeightFactor: 1.35 })
  })

  return y + 2 * ch + gap
}

// Una "x" dibujada con líneas (la fuente estándar del PDF no tiene el símbolo ✗)
function crossMark(doc, cx, cy) {
  doc.setFillColor(...PINK)
  doc.circle(cx, cy, 2.6, 'F')
  doc.setDrawColor(...WHITE)
  doc.setLineWidth(0.6)
  const d = 1.05
  doc.line(cx - d, cy - d, cx + d, cy + d)
  doc.line(cx - d, cy + d, cx + d, cy - d)
}

function dontsPanel(doc, y) {
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  const textW = CW - 22
  const rows = DONTS.map((t) => doc.splitTextToSize(t, textW))
  const lineH = 5
  const rowGap = 3.2
  const pad = 7
  const h = pad * 2 + rows.reduce((s, r) => s + r.length * lineH, 0) + rowGap * (rows.length - 1)

  doc.setFillColor(...PINK_BG)
  doc.roundedRect(M, y, CW, h, 3, 3, 'F')
  doc.setFillColor(...PINK)
  doc.rect(M, y + 3, 1.4, h - 6, 'F')

  let ry = y + pad + 3.6
  rows.forEach((lines) => {
    crossMark(doc, M + 10, ry - 1.3)
    doc.setTextColor(...INK)
    doc.text(lines, M + 16, ry, { lineHeightFactor: 1.4 })
    ry += lines.length * lineH + rowGap
  })

  return y + h
}

function contactFields(doc, y) {
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9.5)
  doc.setTextColor(...INK_M)
  doc.text('Pídele estos datos a tu líder o al área de seguridad y complétalos. Así no tendrás que buscarlos en el momento.', M, y, { maxWidth: CW })

  const gap = 10
  const fw = (CW - gap) / 2
  const fy = y + 11
  CONTACT_FIELDS.forEach((label, i) => {
    const fx = M + (i % 2) * (fw + gap)
    const ly = fy + Math.floor(i / 2) * 14
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7.5)
    doc.setTextColor(...NAVY)
    doc.setCharSpace(0.3)
    doc.text(label.toUpperCase(), fx, ly)
    doc.setCharSpace(0)
    doc.setDrawColor(...BORDER)
    doc.setLineWidth(0.4)
    doc.line(fx, ly + 7, fx + fw, ly + 7)
  })

  return fy + 14 + 7
}

function footer(doc) {
  const by = 264
  doc.setFillColor(...NAVY_BG)
  doc.roundedRect(M, by, CW, 17, 3, 3, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.setTextColor(...NAVY)
  doc.text('Ante la duda, reporta.', W / 2, by + 7.5, { align: 'center' })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...INK_M)
  doc.text('Reportar algo que no era un incidente nunca tiene consecuencias negativas.', W / 2, by + 12.8, { align: 'center' })

  doc.setFontSize(8)
  doc.setTextColor(...INK_M)
  doc.text('Guárdala en tu celular o imprímela para tu puesto de trabajo.', M, H - 9)
  doc.setFont('helvetica', 'bold')
  doc.text('Protección de Datos de Pago', W - M, H - 9, { align: 'right' })
}

export async function generateIncidentCard() {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const logo = await loadImageAsDataURL('./Logo blanco.png')

  header(doc, logo)

  let y = 64
  sectionLabel(doc, { y, text: 'QUÉ HACER, EN ESTE ORDEN', color: NAVY })
  y = stepsGrid(doc, y + 6)

  y += 10
  sectionLabel(doc, { y, text: 'QUÉ NO HACER', color: PINK })
  y = dontsPanel(doc, y + 6)

  y += 10
  sectionLabel(doc, { y, text: '¿A QUIÉN LE REPORTO?', color: NAVY })
  contactFields(doc, y + 7)

  footer(doc)

  doc.save('tarjeta-referencia-incidentes-pci.pdf')
}

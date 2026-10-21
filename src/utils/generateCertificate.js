import { jsPDF } from 'jspdf'
import { CERTIFICATE_CONFIG } from '../config'

async function loadImageAsDataURL(src) {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      resolve(canvas.toDataURL('image/png'))
    }
    img.onerror = () => resolve(null)
    img.src = src
  })
}

export async function generateCertificate({ studentName, score }) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
  const W = 297
  const H = 210

  // ── Paleta ──────────────────────────────────────────────────
  const CREAM     = [248, 245, 238]
  const GREEN     = [58, 59, 116]       // #3A3B74
  const GREEN_D   = [42, 43, 90]        // #2A2B5A
  const GREEN_P   = [232, 242, 251]     // #E8F2FB
  const YELLOW    = [49, 120, 189]      // #3178BD
  const GOLD      = [26, 84, 147]       // #1A5493
  const GOLD_L    = [90, 159, 212]      // #5A9FD4
  const INK       = [31, 41, 51]        // #1F2933
  const INK_SOFT  = [61, 75, 86]        // #3D4B56
  const INK_MUTE  = [107, 122, 132]     // #6B7A84
  const RULE      = [226, 221, 209]
  const WHITE     = [255, 255, 255]
  const CREAM_L   = [248, 248, 255]     // #F8F8FF
  const CREAM_W   = [238, 244, 252]     // #EEF4FC

  const date = new Date().toLocaleDateString('es-CO', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
  const displayName = formatStudentName(studentName)

  // ── 1. Fondo crema ──────────────────────────────────────────
  doc.setFillColor(...CREAM)
  doc.rect(0, 0, W, H, 'F')

  // ── 2. Bandas de esquina ────────────────────────────────────
  // Verde arriba-izquierda
  doc.setFillColor(...GREEN)
  doc.rect(0, 0, 59.5, 3, 'F')
  // Amarilla abajo-derecha
  doc.setFillColor(...YELLOW)
  doc.rect(W - 59.5, H - 3, 59.5, 3, 'F')

  // ── 3. Marco interior ───────────────────────────────────────
  // Buffer blanco exterior (simula outline)
  doc.setFillColor(...WHITE)
  doc.rect(5.5, 5.5, W - 11, H - 11, 'F')
  doc.setFillColor(...CREAM)
  doc.rect(5.5, 5.5, W - 11, H - 11, 'F')
  // Línea verde del marco
  doc.setDrawColor(...GREEN)
  doc.setLineWidth(0.35)
  doc.rect(7.2, 7.2, W - 14.4, H - 14.4, 'S')

  // ── 4. Esquinas doradas (L-shapes) ──────────────────────────
  const CI = 6.3    // inset desde el borde
  const CS = 5.5    // longitud del L
  const CT = 0.55   // grosor
  doc.setFillColor(...YELLOW)
  // TL
  doc.rect(CI, CI, CS, CT, 'F')
  doc.rect(CI, CI, CT, CS, 'F')
  // TR
  doc.rect(W - CI - CS, CI, CS, CT, 'F')
  doc.rect(W - CI - CT, CI, CT, CS, 'F')
  // BL
  doc.rect(CI, H - CI - CT, CS, CT, 'F')
  doc.rect(CI, H - CI - CS, CT, CS, 'F')
  // BR
  doc.rect(W - CI - CS, H - CI - CT, CS, CT, 'F')
  doc.rect(W - CI - CT, H - CI - CS, CT, CS, 'F')

  // ── 5. Cabecera ─────────────────────────────────────────────
  const headerY = 15

  // Logo imagen
  const logoData = await loadImageAsDataURL('./Logo.png')
  if (logoData) {
    doc.addImage(logoData, 'PNG', 19.5, headerY - 5, 0, 14)
  } else {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.setTextColor(...GREEN)
    doc.text(CERTIFICATE_CONFIG.institution, 19.5, headerY + 1)
  }


  // ── 6. Eyebrow "CERTIFICADO DE" ─────────────────────────────
  const eyeY = 36
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(...GREEN)
  const eyeLabel = 'CERTIFICADO DE'
  const eyeW = doc.getTextWidth(eyeLabel)
  // Líneas flanqueantes
  doc.setFillColor(...YELLOW)
  doc.rect(W / 2 - eyeW / 2 - 14, eyeY - 0.8, 10, 0.5, 'F')
  doc.rect(W / 2 + eyeW / 2 + 4, eyeY - 0.8, 10, 0.5, 'F')
  doc.text(eyeLabel, W / 2, eyeY, { align: 'center' })

  // ── 7. Título ────────────────────────────────────────────────
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(28)
  doc.setTextColor(...INK)
  doc.text('Participación y Aprobación', W / 2, 49, { align: 'center' })

  // ── 8. Subtítulo ─────────────────────────────────────────────
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7.5)
  doc.setTextColor(...INK_SOFT)
  doc.text('CAPACITACIÓN EN SEGURIDAD DE LA INFORMACIÓN', W / 2, 56.5, { align: 'center' })

  // ── 9. Texto introductorio ───────────────────────────────────
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...INK_SOFT)
  doc.text('Por medio del presente se certifica que', W / 2, 68, { align: 'center' })

  // ── 10. Nombre ───────────────────────────────────────────────
  doc.setFont('times', 'bolditalic')
  doc.setFontSize(30)
  doc.setTextColor(...GREEN_D)
  doc.text(displayName, W / 2, 82, { align: 'center' })

  // Línea decorativa bajo el nombre
  const nW = doc.getTextWidth(displayName)
  const nHalf = Math.max(nW / 2 + 8, 35)
  doc.setFillColor(...RULE)
  doc.rect(W / 2 - nHalf, 85, nHalf * 2, 0.35, 'F')
  // Diamante central
  doc.setFillColor(...WHITE)
  doc.rect(W / 2 - 4, 83.5, 8, 3.5, 'F')
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(...YELLOW)
  doc.text('◆', W / 2, 86, { align: 'center' })

  // ── 11. Descripción del curso ────────────────────────────────
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9.5)
  doc.setTextColor(...INK_SOFT)
  doc.text('ha completado satisfactoriamente la', W / 2, 96, { align: 'center' })

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  doc.setTextColor(...GREEN)
  const courseLines = CERTIFICATE_CONFIG.courseLabel.split('\n')
  courseLines.forEach((line, i) => {
    doc.text(line, W / 2, 105 + i * 8, { align: 'center' })
  })

  // ── 12. Organización ─────────────────────────────────────────
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7)
  doc.setTextColor(...GREEN_D)
  doc.text(CERTIFICATE_CONFIG.institution.toUpperCase(), W / 2, 127, { align: 'center' })

  // ── 13. Fila de pie: firma | sello | fecha+puntaje ───────────
  const footY = 170

  // — Firma izquierda —
  const sigX = W / 2 - 62
  doc.setDrawColor(...INK)
  doc.setLineWidth(0.3)
  doc.setLineDashPattern([], 0)
  doc.line(sigX - 24, footY, sigX + 24, footY)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7.5)
  doc.setTextColor(...INK)
  doc.text('Responsable de Capacitación', sigX, footY + 5, { align: 'center' })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(6.5)
  doc.setTextColor(...INK_MUTE)
  doc.text(CERTIFICATE_CONFIG.institution.toUpperCase(), sigX, footY + 9, { align: 'center' })

  // — Sello central —
  const sx = W / 2
  const sy = footY - 12
  const sR = 16
  // Aureola dorada exterior
  doc.setFillColor(...GOLD)
  doc.circle(sx, sy, sR, 'F')
  // Anillo amarillo
  doc.setFillColor(...YELLOW)
  doc.circle(sx, sy, sR - 2, 'F')
  // Segundo anillo (simula conic gradient con dorado)
  doc.setFillColor(...GOLD_L)
  doc.circle(sx, sy, sR - 2.8, 'F')
  // Disco interior crema
  doc.setFillColor(...CREAM_L)
  doc.circle(sx, sy, sR - 4.5, 'F')
  // Borde punteado del disco
  doc.setDrawColor(...GOLD)
  doc.setLineWidth(0.3)
  doc.setLineDashPattern([1.2, 1], 0)
  doc.circle(sx, sy, sR - 4.5, 'S')
  doc.setLineDashPattern([], 0)
  // Porcentaje
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.setTextColor(...GOLD)
  doc.text(score != null ? `${score}%` : '—', sx, sy + 1, { align: 'center' })
  // "APROBADO"
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(5.5)
  doc.setTextColor(...GREEN_D)
  doc.text('APROBADO', sx, sy + 6, { align: 'center' })
  // Badge verde bajo el sello
  const badgeLabel = `CIBERSEGURIDAD ${CERTIFICATE_CONFIG.year}`
  const bW = doc.getTextWidth(badgeLabel) + 8
  doc.setFillColor(...GREEN)
  doc.roundedRect(sx - bW / 2, sy + sR - 2.5, bW, 4.5, 2.25, 2.25, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(5)
  doc.setTextColor(...WHITE)
  doc.text(badgeLabel, sx, sy + sR + 1, { align: 'center' })

  // — Fecha y puntaje derecha —
  const metaX = W / 2 + 62
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(6.5)
  doc.setTextColor(...INK_MUTE)
  doc.text('FECHA DE COMPLETACIÓN', metaX, footY - 14, { align: 'center' })
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(...INK)
  doc.text(date, metaX, footY - 8, { align: 'center' })

  if (score != null) {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(6.5)
    doc.setTextColor(...INK_MUTE)
    doc.text('PUNTAJE OBTENIDO', metaX, footY, { align: 'center' })
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.setTextColor(...INK)
    doc.text(`${score}%`, metaX, footY + 6, { align: 'center' })
  }

  // ── 14. Micropiede ───────────────────────────────────────────
  const mY = H - 8
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(6)
  doc.setTextColor(...INK_MUTE)
  doc.text(
    `CAPACITACIÓN OBLIGATORIA ${CERTIFICATE_CONFIG.year}`,
    W / 2 - 45, mY
  )
  // Punto decorativo
  doc.setFillColor(...YELLOW)
  doc.circle(W / 2 + 3, mY - 1.5, 1, 'F')
  // URL
  doc.setTextColor(...INK_MUTE)
  doc.text('elearning.resistance.com.co', W / 2 + 7, mY)
  // SGSI derecha
  doc.setTextColor(...INK_MUTE)
  doc.text('VERIFICADO  ·  SGSI', W - 19.5, mY, { align: 'right' })

  doc.save(`certificado-ciberseguridad-${CERTIFICATE_CONFIG.year}.pdf`)
}

function formatStudentName(raw) {
  if (!raw || raw.trim() === '') return 'Participante'
  if (raw.includes(',')) {
    const [last, first] = raw.split(',').map(s => s.trim())
    return `${first} ${last}`
  }
  return raw.trim()
}

// Patrón compartido para detectar bloques de texto que actúan como
// separador de tema ("Tema 1 — Título") y generar un id de anclaje
// consistente entre el contenido (TextBlock) y la navegación (Sidebar).
export const TEMA_PATTERN = /^(Tema\s+(\d+))\s*—\s*(.+)$/

export function temaId(moduleId, temaNumber) {
  return `tema-${moduleId}-${temaNumber}`
}

// Temas de un módulo, en orden: [{ id, number, title }]
export function getModuleTemas(mod) {
  if (!mod?.blocks) return []
  return mod.blocks
    .filter(b => b.type === 'text' && TEMA_PATTERN.test(b.title || ''))
    .map(b => {
      const [, , temaNumber, temaTitle] = b.title.match(TEMA_PATTERN)
      return { id: temaId(mod.id, temaNumber), number: temaNumber, title: temaTitle }
    })
}

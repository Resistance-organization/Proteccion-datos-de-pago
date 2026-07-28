// Patrón compartido para detectar bloques de texto que actúan como
// separador de tema ("Tema 1 — Título") y generar un id de anclaje
// consistente entre el contenido (TextBlock) y la navegación (Sidebar).
export const TEMA_PATTERN = /^(Tema\s+(\d+))\s*—\s*(.+)$/

export function temaId(moduleId, temaNumber) {
  return `tema-${moduleId}-${temaNumber}`
}

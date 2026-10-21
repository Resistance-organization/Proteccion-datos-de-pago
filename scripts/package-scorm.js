/**
 * Empaqueta el build de Vite como un paquete SCORM 1.2 válido para Moodle.
 * Uso: npm run package:scorm
 */

import archiver from 'archiver'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DIST_DIR = path.resolve(__dirname, '../dist')
const OUTPUT_FILE = path.resolve(__dirname, '../resistance-proteccion-datos-de-pago-scorm.zip')

const MANIFEST = `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="resistance_pci_v1" version="1.0"
  xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="
    http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd
    http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">

  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>

  <organizations default="resistance_org">
    <organization identifier="resistance_org">
      <title>Protección de Datos de Pago</title>
      <item identifier="item_1" identifierref="resource_1" isvisible="true">
        <title>Protección de Datos de Pago</title>
        <adlcp:masteryscore>80</adlcp:masteryscore>
      </item>
    </organization>
  </organizations>

  <resources>
    <resource identifier="resource_1"
              type="webcontent"
              adlcp:scormtype="sco"
              href="index.html">
      <file href="index.html"/>
    </resource>
  </resources>

</manifest>`

async function main() {
  // Verificar que el build existe
  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ No se encontró la carpeta dist/. Ejecuta primero: npm run build')
    process.exit(1)
  }

  // Escribir el imsmanifest.xml en dist/
  fs.writeFileSync(path.join(DIST_DIR, 'imsmanifest.xml'), MANIFEST, 'utf-8')
  console.log('✅ imsmanifest.xml generado')

  // Crear el ZIP
  if (fs.existsSync(OUTPUT_FILE)) fs.unlinkSync(OUTPUT_FILE)

  const output = fs.createWriteStream(OUTPUT_FILE)
  const archive = archiver('zip', { zlib: { level: 9 } })

  output.on('close', () => {
    const kb = Math.round(archive.pointer() / 1024)
    const mb = (kb / 1024).toFixed(1)
    console.log(`✅ Paquete SCORM creado: ${path.basename(OUTPUT_FILE)}`)
    console.log(`   Tamaño: ${kb} KB (${mb} MB)`)
    console.log('\n📤 Listo para subir a Moodle:')
    console.log('   Administración del curso → Agregar actividad → SCORM → Subir archivo')
  })

  archive.on('error', (err) => {
    console.error('❌ Error al crear el ZIP:', err)
    process.exit(1)
  })

  archive.pipe(output)
  archive.directory(DIST_DIR, false)
  await archive.finalize()
}

main().catch(console.error)

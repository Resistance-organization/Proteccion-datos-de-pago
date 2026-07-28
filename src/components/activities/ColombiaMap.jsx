import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps'

// Topojson bundled localmente para que funcione offline en Moodle
const GEO_URL = './world-50m.json'

// Colombia ISO numeric = 170
const COLOMBIA_ID = '170'

const CITIES = [
  {
    name: 'Bogotá D.C.',
    level: 'Muy Alto',
    reason: 'Concentración de sedes administrativas y financieras',
    coordinates: [-74.07, 4.71],
    anchor: 'right',
  },
  {
    name: 'Medellín',
    level: 'Alto',
    reason: 'Alto desarrollo tecnológico y empresarial',
    coordinates: [-75.56, 6.25],
    anchor: 'left',
  },
  {
    name: 'Cali',
    level: 'Alto',
    reason: 'Volumen de servicios de salud y comercio',
    coordinates: [-76.52, 3.43],
    anchor: 'left',
  },
  {
    name: 'Barranquilla',
    level: 'Medio-Alto',
    reason: 'Punto clave de servicios en la Costa Caribe',
    coordinates: [-74.80, 10.96],
    anchor: 'right',
  },
  {
    name: 'Bucaramanga',
    level: 'Medio',
    reason: 'Crecimiento de infraestructura digital',
    coordinates: [-73.13, 7.13],
    anchor: 'right',
  },
]

const LEVEL_COLOR = {
  'Muy Alto':   '#DC2626',
  'Alto':       '#EA580C',
  'Medio-Alto': '#CA8A04',
  'Medio':      '#16A34A',
}

export default function ColombiaMap({ block }) {
  const [hovered, setHovered] = useState(null)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Encabezado */}
      <div className="px-6 sm:px-8 py-5 border-b border-gray-100 gradient-primary">
        <p className="text-white/60 text-xs font-body uppercase tracking-widest mb-1">
          Mapa interactivo
        </p>
        <h2 className="font-title text-xl font-semibold text-white">
          {block?.title || 'Geografía del Ataque: Ciudades más afectadas'}
        </h2>
        {block?.intro && (
          <p className="text-white/70 text-sm font-body mt-1">{block.intro}</p>
        )}
      </div>

      <div className="p-4 sm:p-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ── Mapa real de Colombia ── */}
          <div className="relative flex-shrink-0 mx-auto lg:mx-0 w-full" style={{ maxWidth: '340px' }}>
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                center: [-73.5, 4],
                scale: 1350,
              }}
              width={340}
              height={420}
              style={{ width: '100%', height: 'auto' }}
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map(geo => {
                    const isColombia = geo.id === COLOMBIA_ID
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={isColombia ? '#C8C9E8' : '#F0F0F0'}
                        stroke={isColombia ? '#3A3B74' : '#D1D5DB'}
                        strokeWidth={isColombia ? 1.2 : 0.5}
                        style={{
                          default: { outline: 'none' },
                          hover:   { outline: 'none' },
                          pressed: { outline: 'none' },
                        }}
                      />
                    )
                  })
                }
              </Geographies>

              {/* Marcadores de ciudades */}
              {CITIES.map(city => {
                const color = LEVEL_COLOR[city.level]
                const isActive = hovered?.name === city.name
                return (
                  <Marker
                    key={city.name}
                    coordinates={city.coordinates}
                    onMouseEnter={() => setHovered(city)}
                    onMouseLeave={() => setHovered(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Halo animado cuando está activo */}
                    {isActive && (
                      <circle r={14} fill={color} opacity={0.2} />
                    )}
                    {/* Anillo exterior */}
                    <circle
                      r={isActive ? 9 : 7}
                      fill={color}
                      opacity={0.25}
                      style={{ transition: 'r 0.15s' }}
                    />
                    {/* Punto central */}
                    <circle
                      r={isActive ? 6 : 4.5}
                      fill={color}
                      stroke="white"
                      strokeWidth={1.5}
                      style={{ transition: 'r 0.15s' }}
                    />
                  </Marker>
                )
              })}
            </ComposableMap>

            {/* Tooltip posicionado sobre el mapa */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  key={hovered.name}
                  initial={{ opacity: 0, scale: 0.9, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.12 }}
                  className="absolute top-4 left-1/2 -translate-x-1/2 z-20 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 p-3.5 pointer-events-none"
                >
                  <p className="font-title font-bold text-gray-800 text-sm mb-1.5">
                    📍 {hovered.name}
                  </p>
                  <div className="flex items-center gap-1.5 mb-2">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: LEVEL_COLOR[hovered.level] }}
                    />
                    <span
                      className="text-xs font-body font-semibold"
                      style={{ color: LEVEL_COLOR[hovered.level] }}
                    >
                      Nivel de afectación: {hovered.level}
                    </span>
                  </div>
                  <p className="text-xs font-body text-gray-600 leading-relaxed border-t border-gray-100 pt-2">
                    {hovered.reason}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Tabla lateral ── */}
          <div className="flex-1 min-w-0 w-full">
            <p className="font-title font-semibold text-xs text-gray-400 uppercase tracking-widest mb-3">
              Pasa el cursor sobre el mapa o selecciona una ciudad
            </p>
            <div className="space-y-2">
              {CITIES.map(city => {
                const color = LEVEL_COLOR[city.level]
                const isActive = hovered?.name === city.name
                return (
                  <div
                    key={city.name}
                    onMouseEnter={() => setHovered(city)}
                    onMouseLeave={() => setHovered(null)}
                    className="rounded-xl px-4 py-3 cursor-pointer transition-all duration-150 border"
                    style={{
                      background: isActive ? color + '12' : '#F9FAFB',
                      borderColor: isActive ? color + '50' : '#F3F4F6',
                    }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ background: color }}
                        />
                        <span className="font-title font-semibold text-sm text-gray-800">
                          {city.name}
                        </span>
                      </div>
                      <span
                        className="text-xs font-body font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{ background: color + '20', color }}
                      >
                        {city.level}
                      </span>
                    </div>
                    <p className="text-xs font-body text-gray-500 mt-1 ml-4 leading-relaxed">
                      {city.reason}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Leyenda */}
            <div className="mt-5 pt-4 border-t border-gray-100 flex flex-wrap gap-x-4 gap-y-2">
              {Object.entries(LEVEL_COLOR).map(([level, color]) => (
                <div key={level} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                  <span className="text-xs font-body text-gray-500">{level}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

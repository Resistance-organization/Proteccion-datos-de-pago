import { useRef, useState } from 'react'
import { Play, Clapperboard } from 'lucide-react'

// Ancho = min(100% del contenedor, el ancho que da una altura de 58vh en 16:9)
// así el video nunca sobrepasa la altura de pantalla disponible.
const CAPPED_SIZE = { width: 'min(100%, 103.1vh)', aspectRatio: '16 / 9', margin: '0 auto' }

function YouTubeEmbed({ src, title }) {
  const videoId = src.includes('youtu.be/')
    ? src.split('youtu.be/')[1]?.split('?')[0]
    : src.split('v=')[1]?.split('&')[0]

  return (
    <div className="relative overflow-hidden rounded-xl" style={CAPPED_SIZE}>
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
        title={title || 'Video'}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}

// Se muestra cuando el bloque no tiene src o el archivo local aún no existe
function VideoPlaceholder() {
  return (
    <div
      className="relative rounded-xl flex flex-col items-center justify-center gap-3 text-white/70"
      style={{ ...CAPPED_SIZE, background: 'linear-gradient(135deg, #161641 0%, #212252 100%)' }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
          <Play size={28} className="text-white/50 ml-1" />
        </div>
        <p className="text-sm font-body text-white/50">Video en preparación</p>
      </div>
    </div>
  )
}

function HTML5Video({ src, poster, title }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setPlaying(true)
    }
  }

  if (failed) return <VideoPlaceholder />

  return (
    <div className="relative overflow-hidden rounded-xl bg-black" style={CAPPED_SIZE}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls={playing}
        preload="metadata"
        className="absolute inset-0 w-full h-full object-contain"
        onEnded={() => setPlaying(false)}
        onError={() => setFailed(true)}
      />
      {!playing && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/30 group"
        >
          <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
            <Play size={28} className="text-white ml-1" fill="white" />
          </div>
        </button>
      )}
    </div>
  )
}

export default function VideoPlayer({ block }) {
  const isYoutube = block.src?.includes('youtube') || block.src?.includes('youtu.be')

  return (
    <div
      className="rounded-2xl shadow-md overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #3178BD 0%, #A23EA1 55%, #E73780 100%)',
        padding: '2px',
      }}
    >
      <div className="bg-white rounded-[14px] overflow-hidden">
        {/* Encabezado */}
        <div className="px-6 sm:px-8 pt-5 pb-4">
          <span
            className="inline-flex items-center gap-1.5 text-[11px] font-title font-bold uppercase tracking-widest mb-2 px-2.5 py-1 rounded-full"
            style={{ color: '#A23EA1', background: 'rgba(162, 62, 161, 0.08)' }}
          >
            <Clapperboard size={13} strokeWidth={2.5} />
            Recurso en video
          </span>
          {block.title && (
            <h2 className="font-title text-xl font-semibold text-gray-800">{block.title}</h2>
          )}
          {block.description && (
            <p className="text-sm font-body text-gray-500 mt-1">{block.description}</p>
          )}
        </div>

        <div className="px-4 sm:px-6 pb-4 sm:pb-6">
          {block.src ? (
            isYoutube
              ? <YouTubeEmbed src={block.src} title={block.title} />
              : <HTML5Video src={block.src} poster={block.poster} title={block.title} />
          ) : (
            <VideoPlaceholder />
          )}
        </div>

        {block.caption && (
          <p className="px-6 pb-5 text-xs text-gray-400 font-body text-center">{block.caption}</p>
        )}
      </div>
    </div>
  )
}

import { useRef, useState } from 'react'
import { Play } from 'lucide-react'

function YouTubeEmbed({ src, title }) {
  const videoId = src.includes('youtu.be/')
    ? src.split('youtu.be/')[1]?.split('?')[0]
    : src.split('v=')[1]?.split('&')[0]

  return (
    <div className="relative w-full overflow-hidden rounded-xl" style={{ paddingBottom: '56.25%' }}>
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

function HTML5Video({ src, poster, title }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setPlaying(true)
    }
  }

  return (
    <div className="relative overflow-hidden rounded-xl bg-black">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls={playing}
        className="w-full"
        onEnded={() => setPlaying(false)}
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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Encabezado */}
      {block.title && (
        <div className="px-6 sm:px-8 py-5 border-b border-gray-100">
          <h2 className="font-title text-xl font-semibold text-gray-800">{block.title}</h2>
          {block.description && (
            <p className="text-sm font-body text-gray-500 mt-1">{block.description}</p>
          )}
        </div>
      )}

      <div className="p-4 sm:p-6">
        {block.src ? (
          isYoutube
            ? <YouTubeEmbed src={block.src} title={block.title} />
            : <HTML5Video src={block.src} poster={block.poster} title={block.title} />
        ) : (
          /* Placeholder para cuando no hay video aún */
          <div
            className="w-full rounded-xl flex flex-col items-center justify-center gap-3 text-white/70"
            style={{ paddingBottom: '56.25%', position: 'relative', background: 'linear-gradient(135deg, #161641 0%, #212252 100%)' }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                <Play size={28} className="text-white/50 ml-1" />
              </div>
              <p className="text-sm font-body text-white/50">
                Agrega el video: <code className="text-secondary text-xs">src: "/assets/video.mp4"</code>
              </p>
            </div>
          </div>
        )}
      </div>

      {block.caption && (
        <p className="px-6 pb-5 text-xs text-gray-400 font-body text-center">{block.caption}</p>
      )}
    </div>
  )
}

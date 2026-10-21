import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Download, ExternalLink, Loader } from 'lucide-react'
import { generateCertificate } from '../utils/generateCertificate'
import { MOODLE_COURSE_URL, CERTIFICATE_CONFIG } from '../config'

const CERT_W = 1400
const CERT_H = 990

export default function CertificateScreen({ studentName, score }) {
  const [downloading, setDownloading] = useState(false)
  const wrapRef = useRef(null)
  const scalerRef = useRef(null)

  const displayName = formatName(studentName)
  const today = new Date().toLocaleDateString('es-CO', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&display=swap'
    document.head.appendChild(link)
    return () => { if (document.head.contains(link)) document.head.removeChild(link) }
  }, [])

  useEffect(() => {
    function fit() {
      if (!scalerRef.current || !wrapRef.current) return
      const parent = wrapRef.current.parentElement
      const availW = parent.clientWidth - 32
      const availH = window.innerHeight * 0.62
      const s = Math.min(availW / CERT_W, availH / CERT_H)
      scalerRef.current.style.transform = `scale(${s})`
      scalerRef.current.style.transformOrigin = 'top left'
      wrapRef.current.style.width = `${CERT_W * s}px`
      wrapRef.current.style.height = `${CERT_H * s}px`
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  const handleDownload = async () => {
    setDownloading(true)
    try {
      await generateCertificate({ studentName, score })
    } finally {
      setDownloading(false)
    }
  }

  const handleReturn = () => {
    if (window.opener && !window.opener.closed) {
      window.opener.focus()
      window.close()
    } else {
      window.location.href = MOODLE_COURSE_URL
    }
  }

  return (
    <>
      <style>{certStyles}</style>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col items-center justify-center py-8 px-4"
        style={{
          background: `
            radial-gradient(1200px 700px at 80% -10%, rgba(58,59,116,.10), transparent 60%),
            radial-gradient(900px 600px at -5% 110%, rgba(49,120,189,.10), transparent 55%),
            #ECE7DB
          `,
        }}
      >
        <motion.div
          initial={{ y: -18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-6"
        >
          <h1 className="font-title text-3xl font-bold" style={{ color: '#3A3B74' }}>
            ¡Felicitaciones, {displayName.split(' ')[0]}!
          </h1>
          <p className="text-sm mt-1" style={{ color: '#4A5A52' }}>
            Has completado el curso satisfactoriamente
          </p>
        </motion.div>

        {/* Certificado preview */}
        <motion.div
          initial={{ scale: 0.97, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ overflow: 'hidden' }}
          ref={wrapRef}
          className="mx-auto mb-7 rounded-xl shadow-2xl"
        >
          <div ref={scalerRef} style={{ width: CERT_W, height: CERT_H, position: 'relative' }}>
            <div className="cert-preview">
              <div className="cp-blob cp-b1" />
              <div className="cp-blob cp-b2" />
              <div className="cp-stripes" />

              <div className="cp-frame" />
              <div className="cp-fc cp-fc-tl" />
              <div className="cp-fc cp-fc-tr" />
              <div className="cp-fc cp-fc-bl" />
              <div className="cp-fc cp-fc-br" />

              <div className="cp-content">
                <div className="cp-head">
                  <img
                    src="./Logo.png"
                    alt=""
                    style={{ height: '72px', width: 'auto', display: 'block' }}
                    onError={e => { e.target.style.display = 'none' }}
                  />
                </div>

                <div className="cp-eyebrow">Certificado de</div>
                <div className="cp-title">Participación y Aprobación</div>
                <div className="cp-subtitle">Capacitación en Seguridad de la Información</div>

                <div className="cp-preamble">Por medio del presente se certifica que</div>
                <div className="cp-name">{displayName}</div>
                <div className="cp-name-rule" />

                <p className="cp-statement">
                  ha completado satisfactoriamente la
                  <span className="cp-course">
                    {CERTIFICATE_CONFIG.courseLabel.replace('\n', ' — ')}
                  </span>
                </p>
                <div className="cp-org">
                  <b>{CERTIFICATE_CONFIG.institution}</b>
                </div>

                <div className="cp-footrow">
                  <div className="cp-sign">
                    <div className="cp-sign-ln" />
                    <div className="cp-sign-role">Responsable de Capacitación</div>
                    <div className="cp-sign-who">{CERTIFICATE_CONFIG.institution}</div>
                  </div>

                  <div className="cp-seal" aria-label={`Aprobado con ${score ?? '—'} por ciento`}>
                    <div className="cp-seal-tail cp-tail-l" />
                    <div className="cp-seal-tail cp-tail-r" />
                    <div className="cp-scallop" />
                    <div className="cp-ring" />
                    <div className="cp-disc">
                      <div>
                        <div className="cp-pct">{score != null ? `${score}%` : '—'}</div>
                        <div className="cp-pass">Aprobado</div>
                      </div>
                    </div>
                    <div className="cp-arc">Ciberseguridad {CERTIFICATE_CONFIG.year}</div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center' }}>
                    <div className="cp-meta">
                      <div className="cp-meta-k">Fecha de completación</div>
                      <div className="cp-meta-v">{today}</div>
                    </div>
                    {score != null && (
                      <div className="cp-meta">
                        <div className="cp-meta-k">Puntaje obtenido</div>
                        <div className="cp-meta-v">{score}%</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="cp-microfoot">
                <span><b>Capacitación Obligatoria {CERTIFICATE_CONFIG.year}</b></span>
                <span className="cp-mid">elearning.resistance.com.co</span>
                <span>Verificado · <b>SGSI</b></span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Botones de acción */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-3 w-full max-w-sm"
        >
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-title font-semibold text-sm text-white shadow-lg hover:opacity-90 disabled:opacity-60 transition-all"
            style={{ background: 'linear-gradient(135deg, #3A3B74, #212252)' }}
          >
            {downloading
              ? <><Loader size={16} className="animate-spin" /> Generando PDF...</>
              : <><Download size={16} /> Descargar certificado</>
            }
          </button>

          <button
            onClick={handleReturn}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-title font-semibold text-sm border-2 hover:bg-green-50 transition-all"
            style={{ color: '#3A3B74', borderColor: '#3A3B74' }}
          >
            <ExternalLink size={16} />
            Volver al curso
          </button>
        </motion.div>
      </motion.div>
    </>
  )
}

function formatName(raw) {
  if (!raw || raw.trim() === '') return 'Participante'
  if (raw.includes(',')) {
    const [last, first] = raw.split(',').map(s => s.trim())
    return `${first} ${last}`
  }
  return raw.trim()
}

const certStyles = `
  .cert-preview {
    width: 1400px; height: 990px;
    background: #FFFFFF;
    position: relative; overflow: hidden;
    font-family: "Montserrat", system-ui, sans-serif;
    color: #1F2933;
  }
  .cert-preview::before {
    content: ""; position: absolute; top: 0; left: 0;
    width: 280px; height: 14px; background: #3A3B74; z-index: 5;
  }
  .cert-preview::after {
    content: ""; position: absolute; bottom: 0; right: 0;
    width: 280px; height: 14px; background: #3178BD; z-index: 5;
  }
  .cert-preview .cp-blob {
    position: absolute; border-radius: 60% 40% 55% 45% / 50% 60% 40% 50%;
    pointer-events: none; z-index: 0;
  }
  .cert-preview .cp-b1 {
    top: -220px; right: -200px; width: 520px; height: 520px;
    background: radial-gradient(circle at 35% 35%, #7E80C0 0%, #3A3B74 75%);
    opacity: .10;
  }
  .cert-preview .cp-b2 {
    bottom: -200px; left: -180px; width: 440px; height: 440px;
    background: radial-gradient(circle at 50% 50%, #3178BD 0%, #E73780 100%);
    opacity: .08;
  }
  .cert-preview .cp-stripes {
    position: absolute; width: 200px; height: 200px; border-radius: 50%;
    background-image: repeating-linear-gradient(135deg, rgba(58,59,116,.25) 0 2px, transparent 2px 13px);
    top: -40px; left: -40px; opacity: .35; z-index: 0;
  }
  .cert-preview .cp-frame {
    position: absolute; inset: 34px; z-index: 2;
    border: 1.5px solid #3A3B74;
    outline: 6px solid #FFFFFF;
    box-shadow: 0 0 0 7px rgba(58,59,116,.14);
  }
  .cert-preview .cp-fc {
    position: absolute; width: 26px; height: 26px; z-index: 3;
  }
  .cert-preview .cp-fc::before,
  .cert-preview .cp-fc::after {
    content: ""; position: absolute; background: #3178BD;
  }
  .cert-preview .cp-fc::before { width: 26px; height: 3px; top: 0; left: 0; }
  .cert-preview .cp-fc::after  { width: 3px; height: 26px; top: 0; left: 0; }
  .cert-preview .cp-fc-tl { top: 30px; left: 30px; }
  .cert-preview .cp-fc-tr { top: 30px; right: 30px; transform: scaleX(-1); }
  .cert-preview .cp-fc-bl { bottom: 30px; left: 30px; transform: scaleY(-1); }
  .cert-preview .cp-fc-br { bottom: 30px; right: 30px; transform: scale(-1,-1); }

  .cert-preview .cp-content {
    position: absolute; inset: 34px; z-index: 4;
    padding: 58px 92px 50px;
    display: flex; flex-direction: column; align-items: center;
    text-align: center;
  }
  .cert-preview .cp-head {
    width: 100%; display: flex; align-items: center; justify-content: space-between;
  }
  .cert-preview .cp-lockup { display: flex; align-items: center; }
  .cert-preview .cp-eyebrow {
    margin-top: 30px;
    display: inline-flex; align-items: center; gap: 14px;
    font-size: 13px; letter-spacing: 0.36em; text-transform: uppercase; font-weight: 700;
    color: #3A3B74;
  }
  .cert-preview .cp-eyebrow::before,
  .cert-preview .cp-eyebrow::after {
    content: ""; width: 30px; height: 2px; background: #3178BD;
  }
  .cert-preview .cp-title {
    margin: 14px 0 0;
    font-family: "Oswald", sans-serif; font-weight: 700;
    font-size: 76px; line-height: 0.92; letter-spacing: -0.02em;
    color: #1F2933;
  }
  .cert-preview .cp-subtitle {
    margin-top: 12px;
    font-size: 15px; letter-spacing: 0.34em; text-transform: uppercase; font-weight: 700;
    color: #3D4B56;
  }
  .cert-preview .cp-preamble {
    margin-top: 30px; font-size: 16px; color: #3D4B56; letter-spacing: 0.02em;
  }
  .cert-preview .cp-name {
    margin-top: 10px;
    font-family: "Cormorant Garamond", serif; font-weight: 600; font-style: italic;
    font-size: 70px; line-height: 1; color: #212252; letter-spacing: 0.01em;
  }
  .cert-preview .cp-name-rule {
    width: 540px; max-width: 80%; height: 1.5px;
    background: linear-gradient(90deg, transparent, #E2DDD1 18%, #E2DDD1 82%, transparent);
    margin: 16px 0 0; position: relative;
  }
  .cert-preview .cp-name-rule::after {
    content: "◆"; position: absolute; left: 50%; top: 50%;
    transform: translate(-50%, -52%);
    color: #3178BD; background: #FFFFFF; padding: 0 12px; font-size: 14px;
  }
  .cert-preview .cp-statement {
    margin-top: 24px; max-width: 760px;
    font-size: 19px; line-height: 1.6; color: #3D4B56;
  }
  .cert-preview .cp-course {
    display: block; margin-top: 4px;
    font-family: "Oswald", sans-serif; font-weight: 700;
    font-size: 25px; line-height: 1.25; color: #3A3B74; letter-spacing: -0.01em;
  }
  .cert-preview .cp-org {
    margin-top: 16px; font-size: 13px; letter-spacing: 0.14em;
    text-transform: uppercase; font-weight: 700; color: #6B7A84;
  }
  .cert-preview .cp-org b { color: #212252; }

  .cert-preview .cp-footrow {
    margin-top: auto; width: 100%;
    display: grid; grid-template-columns: 1fr auto 1fr;
    align-items: end; gap: 30px;
  }
  .cert-preview .cp-sign { text-align: center; }
  .cert-preview .cp-sign-ln {
    width: 230px; height: 1.5px; background: #1F2933;
    margin: 0 auto 9px; opacity: .7;
  }
  .cert-preview .cp-sign-role {
    font-family: "Oswald", sans-serif; font-weight: 700;
    font-size: 14px; color: #1F2933;
  }
  .cert-preview .cp-sign-who {
    margin-top: 4px; font-size: 11px; letter-spacing: 0.16em;
    text-transform: uppercase; color: #6B7A84; font-weight: 700;
  }
  .cert-preview .cp-meta { text-align: center; }
  .cert-preview .cp-meta-k {
    font-size: 10.5px; letter-spacing: 0.2em; text-transform: uppercase;
    color: #6B7A84; font-weight: 700;
  }
  .cert-preview .cp-meta-v {
    margin-top: 5px; font-family: "Oswald", sans-serif;
    font-weight: 600; font-size: 16px; color: #1F2933;
  }

  .cert-preview .cp-seal {
    position: relative; width: 168px; height: 168px;
    display: grid; place-items: center;
    margin-bottom: 4px; transform: translateY(-6px);
  }
  .cert-preview .cp-scallop {
    position: absolute; inset: 0; border-radius: 50%;
    background: radial-gradient(circle, #1A5493 0 64%, transparent 65%);
  }
  .cert-preview .cp-ring {
    position: absolute; inset: 11px; border-radius: 50%;
    background: conic-gradient(from 0deg, #3178BD, #5A9FD4, #1A5493, #3178BD);
    box-shadow: inset 0 0 0 3px rgba(255,255,255,.35), 0 8px 20px rgba(49,120,189,.40);
  }
  .cert-preview .cp-disc {
    position: absolute; inset: 24px; border-radius: 50%;
    background: radial-gradient(circle at 50% 35%, #F8F8FF, #EEF4FC);
    border: 2px dashed rgba(49,120,189,.55);
    display: grid; place-items: center; text-align: center;
  }
  .cert-preview .cp-pct {
    font-family: "Oswald", sans-serif; font-weight: 700;
    font-size: 38px; line-height: 1; color: #1A5493;
  }
  .cert-preview .cp-pass {
    margin-top: 3px; font-size: 9.5px; letter-spacing: 0.26em;
    text-transform: uppercase; font-weight: 800; color: #212252;
  }
  .cert-preview .cp-arc {
    position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%);
    background: #3A3B74; color: #fff;
    font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase; font-weight: 800;
    padding: 5px 14px; border-radius: 99px; white-space: nowrap;
    box-shadow: 0 6px 14px rgba(58,59,116,.30);
  }
  .cert-preview .cp-seal-tail {
    position: absolute; bottom: -22px; width: 16px; height: 30px;
    background: #3178BD; z-index: -1;
  }
  .cert-preview .cp-tail-l {
    left: 58px; transform: rotate(12deg);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 78%, 0 100%);
  }
  .cert-preview .cp-tail-r {
    right: 58px; transform: rotate(-12deg);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 78%, 0 100%);
  }

  .cert-preview .cp-microfoot {
    position: absolute; left: 92px; right: 92px; bottom: 50px; z-index: 4;
    display: flex; align-items: center; justify-content: space-between;
    font-size: 10.5px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 700;
    color: #6B7A84;
  }
  .cert-preview .cp-microfoot b { color: #212252; }
  .cert-preview .cp-mid { display: flex; align-items: center; gap: 8px; }
  .cert-preview .cp-mid::before {
    content: ""; width: 6px; height: 6px; border-radius: 99px; background: #3178BD;
  }
`

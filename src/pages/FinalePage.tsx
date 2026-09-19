import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getMissionStats, getSavedEditedImage, type MissionStats } from '../lib/editorState'

function FinalePage() {
  const [editedImage] = useState<string | null>(() => getSavedEditedImage())
  const [missionStats] = useState<MissionStats | null>(() => getMissionStats())
  const [exportStatus, setExportStatus] = useState('')

  const exportPoster = async () => {
    if (!editedImage) {
      setExportStatus('No edited visual available to export yet.')
      return
    }

    try {
      const canvas = document.createElement('canvas')
      canvas.width = 1200
      canvas.height = 1600
      const context = canvas.getContext('2d')
      if (!context) {
        setExportStatus('Could not initialize poster renderer.')
        return
      }

      const sourceImage = await new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image()
        image.onload = () => resolve(image)
        image.onerror = reject
        image.src = editedImage
      })

      const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, '#160f1f')
      gradient.addColorStop(0.45, '#2a1933')
      gradient.addColorStop(1, '#123446')
      context.fillStyle = gradient
      context.fillRect(0, 0, canvas.width, canvas.height)

      context.strokeStyle = 'rgba(255, 179, 71, 0.55)'
      context.lineWidth = 8
      context.strokeRect(28, 28, canvas.width - 56, canvas.height - 56)

      context.fillStyle = 'rgba(10, 10, 14, 0.45)'
      context.fillRect(70, 280, canvas.width - 140, 860)

      const imageX = 100
      const imageY = 320
      const imageW = canvas.width - 200
      const imageH = 760
      context.drawImage(sourceImage, imageX, imageY, imageW, imageH)

      context.fillStyle = '#ffb347'
      context.font = 'bold 92px Bebas Neue, Arial, sans-serif'
      context.fillText('GALLI TO GHAT', 76, 150)

      context.fillStyle = '#f9efe2'
      context.font = '600 42px Manrope, Arial, sans-serif'
      context.fillText('KASHI AFTER DARK RUN SUMMARY', 80, 208)

      context.fillStyle = 'rgba(0, 0, 0, 0.58)'
      context.fillRect(80, 1130, canvas.width - 160, 360)

      const statLine = (label: string, value: string, x: number, y: number) => {
        context.fillStyle = '#8ce6d9'
        context.font = '700 26px Manrope, Arial, sans-serif'
        context.fillText(label, x, y)
        context.fillStyle = '#f9efe2'
        context.font = '800 40px Manrope, Arial, sans-serif'
        context.fillText(value, x, y + 48)
      }

      const scoreValue = missionStats ? `${missionStats.score}` : 'N/A'
      const dodgeValue = missionStats ? `${missionStats.dodges}` : 'N/A'
      const hitValue = missionStats ? `${missionStats.collisions}` : 'N/A'
      const resultValue = missionStats ? missionStats.result.toUpperCase() : 'NO RUN'

      statLine('SCORE', scoreValue, 120, 1200)
      statLine('DODGES', dodgeValue, 120, 1320)
      statLine('HITS', hitValue, 620, 1200)
      statLine('RESULT', resultValue, 620, 1320)

      context.fillStyle = '#ffb347'
      context.font = '700 28px Manrope, Arial, sans-serif'
      context.fillText('BUILD WITH REACT IMAGE EDITOR CHALLENGE', 120, 1465)

      const dataUrl = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = dataUrl
      link.download = 'kashi-galli-finale-poster.png'
      document.body.appendChild(link)
      link.click()
      link.remove()

      setExportStatus('Poster exported successfully.')
    } catch {
      setExportStatus('Poster export failed. Please try again.')
    }
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_0.95fr] lg:gap-8">
      <article className="rounded-3xl border border-saffron-500/35 bg-ink-900/70 p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-teal-200/85">
          Cinematic Payoff
        </p>
        <h2 className="mt-2 font-display text-6xl uppercase leading-none text-saffron-300 sm:text-7xl">
          Ghat Arrival
        </h2>
        <p className="mt-4 max-w-xl text-sand-100/85">
          Finale card will merge mission stats and your edited image into a
          downloadable poster-style share visual for social and hackathon
          submission.
        </p>

        <div className="mt-6 rounded-2xl border border-dashed border-saffron-300/45 bg-saffron-300/10 p-5 text-sm text-sand-100/85">
          Share card export will be implemented after editor state wiring.
        </div>

        {editedImage && (
          <div className="mt-6 rounded-2xl border border-teal-200/30 bg-teal-200/10 p-4">
            <p className="mb-3 text-xs uppercase tracking-[0.16em] text-teal-100">
              Finale Poster Preview
            </p>
            <img
              src={editedImage}
              alt="Saved edited visual for finale"
              className="h-48 w-full rounded-xl object-cover"
            />

            {missionStats && (
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs uppercase tracking-[0.08em] text-teal-100/90 sm:grid-cols-4">
                <div className="rounded-lg border border-teal-200/30 bg-black/20 px-2 py-2 text-center">
                  Score: {missionStats.score}
                </div>
                <div className="rounded-lg border border-teal-200/30 bg-black/20 px-2 py-2 text-center">
                  Dodges: {missionStats.dodges}
                </div>
                <div className="rounded-lg border border-teal-200/30 bg-black/20 px-2 py-2 text-center">
                  Hits: {missionStats.collisions}
                </div>
                <div className="rounded-lg border border-teal-200/30 bg-black/20 px-2 py-2 text-center">
                  Result: {missionStats.result}
                </div>
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={exportPoster}
                className="rounded-full border border-teal-200 bg-teal-200/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-teal-100"
              >
                Export Finale Poster
              </button>
              {exportStatus && <p className="text-xs text-sand-100/80">{exportStatus}</p>}
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/editor"
            className="rounded-full border border-saffron-300 bg-saffron-300/20 px-5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-saffron-100"
          >
            Tune Visual
          </Link>
          <Link
            to="/"
            className="rounded-full border border-white/30 px-5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-sand-100/85"
          >
            Restart Journey
          </Link>
        </div>
      </article>

      <aside className="rounded-3xl border border-white/15 bg-black/25 p-6 sm:p-7">
        <p className="font-display text-4xl uppercase text-teal-200">
          Submission Hooks
        </p>
        <ul className="mt-4 space-y-3 text-sm text-sand-100/90">
          <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            Creative worldbuilding with Kashi identity
          </li>
          <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            React Image Editor used as central mechanic
          </li>
          <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            Cinematic visual execution and smooth flow
          </li>
        </ul>
      </aside>
    </section>
  )
}

export default FinalePage
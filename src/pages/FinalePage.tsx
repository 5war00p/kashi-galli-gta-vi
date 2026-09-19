import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getSavedEditedImage } from '../lib/editorState'

function FinalePage() {
  const [editedImage] = useState<string | null>(() => getSavedEditedImage())

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
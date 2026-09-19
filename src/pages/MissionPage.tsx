import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getSavedEditedImage } from '../lib/editorState'

const hazards = [
  'Rickshaw choke-point',
  'Cows crossing',
  'Festival crowd burst',
  'Low-hanging banners',
]

function MissionPage() {
  const [editedImage] = useState<string | null>(() => getSavedEditedImage())

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_0.95fr] lg:gap-8">
      <article className="rounded-3xl border border-teal-200/35 bg-ink-900/65 p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-teal-200/85">
          Playable Slice
        </p>
        <h2 className="mt-2 font-display text-6xl uppercase leading-none text-teal-200 sm:text-7xl">
          Galli Run
        </h2>
        <p className="mt-4 max-w-xl text-sand-100/85">
          Mission prototype will be a short dodge-run sequence. We will inject the
          customized visual into the mission HUD for instant player identity.
        </p>

        <div className="mt-6 rounded-2xl border border-teal-200/30 bg-teal-200/10 p-4 text-sm text-sand-100/90">
          ETA to ghat: 90s. Keep momentum, avoid collisions, and hit the riverfront
          before the bell drop.
        </div>

        {editedImage && (
          <div className="mt-6 rounded-2xl border border-saffron-300/35 bg-black/30 p-4">
            <p className="mb-3 text-xs uppercase tracking-[0.16em] text-saffron-200">
              Mission HUD Visual
            </p>
            <img
              src={editedImage}
              alt="Saved customized mission visual"
              className="h-40 w-full rounded-xl object-cover"
            />
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/finale"
            className="rounded-full border border-teal-200 bg-teal-200/20 px-5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-teal-100"
          >
            Trigger Finale
          </Link>
          <Link
            to="/editor"
            className="rounded-full border border-white/30 px-5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-sand-100/85"
          >
            Edit Look Again
          </Link>
        </div>
      </article>

      <aside className="rounded-3xl border border-white/15 bg-black/25 p-6 sm:p-7">
        <p className="font-display text-4xl uppercase text-saffron-300">
          Dynamic Hazards
        </p>
        <ul className="mt-4 space-y-3">
          {hazards.map((hazard) => (
            <li
              key={hazard}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-sand-100/90"
            >
              {hazard}
            </li>
          ))}
        </ul>
      </aside>
    </section>
  )
}

export default MissionPage
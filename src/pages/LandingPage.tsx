import { Link } from 'react-router-dom'

const beats = [
  'Neon posters spill across stone walls.',
  'Temple bells sync with street-bike revs.',
  'Incense fog and river wind clash at every turn.',
]

function LandingPage() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
      <article className="rounded-3xl border border-saffron-500/35 bg-ink-900/70 p-6 shadow-[0_15px_70px_rgba(9,7,13,0.55)] backdrop-blur sm:p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-teal-200/85">
          Intro Mission
        </p>
        <h1 className="mt-2 font-display text-6xl uppercase leading-none text-sand-100 sm:text-7xl">
          Kashi Galli
          <span className="block text-saffron-300">After Dark</span>
        </h1>
        <p className="mt-4 max-w-xl text-base text-sand-100/85 sm:text-lg">
          Build your own GTA VI-inspired Kashi vibe. Craft your look in the image
          workshop, then run the narrow gallis to reach the ghat before the aarti
          lights take over the river.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/editor"
            className="rounded-full border border-saffron-300 bg-saffron-300/20 px-5 py-2 text-sm font-bold uppercase tracking-[0.16em] text-saffron-100 transition hover:bg-saffron-300/30"
          >
            Enter Workshop
          </Link>
          <Link
            to="/mission"
            className="rounded-full border border-teal-200/70 px-5 py-2 text-sm font-bold uppercase tracking-[0.16em] text-teal-100 transition hover:bg-teal-200/10"
          >
            Quick Mission
          </Link>
        </div>
      </article>

      <aside className="rounded-3xl border border-white/15 bg-black/25 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur sm:p-7">
        <p className="font-display text-4xl uppercase tracking-wide text-saffron-300">
          Street Moodboard
        </p>
        <ul className="mt-4 space-y-3">
          {beats.map((beat) => (
            <li
              key={beat}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-sand-100/90"
            >
              {beat}
            </li>
          ))}
        </ul>

        <div className="mt-5 rounded-2xl border border-saffron-500/30 bg-saffron-500/10 px-4 py-3 text-sm text-sand-100/90">
          Head to the next screen to customize your ride or avatar with React Image
          Editor.
        </div>
      </aside>
    </section>
  )
}

export default LandingPage
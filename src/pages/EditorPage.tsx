import { Link } from 'react-router-dom'

const tasks = [
  'Upload base ride or avatar image',
  'Apply crop, tint, contrast, and stickers',
  'Save style and carry it into mission HUD',
]

function EditorPage() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_0.95fr] lg:gap-8">
      <article className="rounded-3xl border border-saffron-500/35 bg-ink-900/70 p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-teal-200/85">
          Customization Hub
        </p>
        <h2 className="mt-2 font-display text-6xl uppercase leading-none text-saffron-300 sm:text-7xl">
          Temple Alley
          <span className="block text-sand-100">Workshop</span>
        </h2>
        <p className="mt-4 max-w-xl text-sand-100/85">
          This panel will host React Image Editor as the core mission prep tool.
          Your edited output will be saved and used across mission and finale scenes.
        </p>

        <div className="mt-6 rounded-2xl border border-dashed border-white/30 bg-black/30 p-5 text-sm text-sand-100/75">
          Editor canvas integration is the next implementation step.
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/mission"
            className="rounded-full border border-saffron-300 bg-saffron-300/20 px-5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-saffron-100"
          >
            Continue to Mission
          </Link>
          <Link
            to="/"
            className="rounded-full border border-white/30 px-5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-sand-100/85"
          >
            Back to Arrival
          </Link>
        </div>
      </article>

      <aside className="rounded-3xl border border-white/15 bg-black/25 p-6 sm:p-7">
        <p className="font-display text-4xl uppercase text-teal-200">Build Tasks</p>
        <ul className="mt-4 space-y-3">
          {tasks.map((task, idx) => (
            <li
              key={task}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            >
              <span className="mr-2 font-bold text-saffron-300">0{idx + 1}</span>
              <span className="text-sand-100/90">{task}</span>
            </li>
          ))}
        </ul>
      </aside>
    </section>
  )
}

export default EditorPage
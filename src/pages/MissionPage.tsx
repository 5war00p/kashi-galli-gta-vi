import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  getSavedEditedImage,
  saveMissionStats,
  type MissionResult,
} from '../lib/editorState'

const hazards = [
  'Rickshaw choke-point',
  'Cows crossing',
  'Festival crowd burst',
  'Low-hanging banners',
]

const MISSION_DURATION = 45

const randomHazard = () => hazards[Math.floor(Math.random() * hazards.length)]

function MissionPage() {
  const [editedImage] = useState<string | null>(() => getSavedEditedImage())
  const hasSavedRunRef = useRef(false)
  const [isRunning, setIsRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(MISSION_DURATION)
  const [score, setScore] = useState(0)
  const [collisions, setCollisions] = useState(0)
  const [dodges, setDodges] = useState(0)
  const [currentHazard, setCurrentHazard] = useState(randomHazard)

  const missionFinished = !isRunning && timeLeft === 0
  const result: MissionResult = missionFinished
    ? collisions <= 3
      ? 'success'
      : 'failed'
    : 'in-progress'

  const progressPercent = useMemo(
    () => Math.round(((MISSION_DURATION - timeLeft) / MISSION_DURATION) * 100),
    [timeLeft],
  )

  useEffect(() => {
    if (!isRunning) {
      return
    }

    const timerId = window.setTimeout(() => {
      if (timeLeft <= 1) {
        setTimeLeft(0)
        setIsRunning(false)
        return
      }

      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => window.clearTimeout(timerId)
  }, [isRunning, timeLeft])

  useEffect(() => {
    if (!missionFinished || hasSavedRunRef.current) {
      return
    }

    hasSavedRunRef.current = true
    saveMissionStats({
      score,
      collisions,
      dodges,
      durationSec: MISSION_DURATION,
      result,
      completedAt: new Date().toISOString(),
    })
  }, [missionFinished, collisions, score, dodges, result])

  const startMission = () => {
    setScore(0)
    setCollisions(0)
    setDodges(0)
    setTimeLeft(MISSION_DURATION)
    setCurrentHazard(randomHazard())
    hasSavedRunRef.current = false
    setIsRunning(true)
  }

  const handleDodge = () => {
    if (!isRunning) {
      return
    }
    setScore((prev) => prev + 120)
    setDodges((prev) => prev + 1)
    setCurrentHazard(randomHazard())
  }

  const handleHit = () => {
    if (!isRunning) {
      return
    }
    setScore((prev) => Math.max(0, prev - 75))
    setCollisions((prev) => prev + 1)
    setCurrentHazard(randomHazard())
  }

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

        <div className="mt-6 rounded-2xl border border-white/15 bg-black/30 p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3 text-sm text-sand-100/90">
            <span>Time Left: {timeLeft}s</span>
            <span>Score: {score}</span>
            <span>Collisions: {collisions}</span>
            <span>Dodges: {dodges}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full bg-teal-200 transition-all"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className="mt-4 rounded-xl border border-saffron-300/30 bg-saffron-300/10 p-3 text-sm text-sand-100/90">
            Current hazard: <span className="font-bold text-saffron-200">{currentHazard}</span>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={startMission}
              className="rounded-full border border-teal-200 bg-teal-200/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-teal-100"
            >
              {isRunning ? 'Restart Run' : 'Start Run'}
            </button>
            <button
              type="button"
              onClick={handleDodge}
              disabled={!isRunning}
              className="rounded-full border border-saffron-300 bg-saffron-300/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-saffron-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Dodge
            </button>
            <button
              type="button"
              onClick={handleHit}
              disabled={!isRunning}
              className="rounded-full border border-white/30 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-sand-100/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Took Hit
            </button>
          </div>

          {result !== 'in-progress' && (
            <p className="mt-4 text-sm font-bold uppercase tracking-[0.12em] text-teal-100">
              {result === 'success'
                ? 'Run complete: you reached the ghat.'
                : 'Run failed: too many collisions in the galli.'}
            </p>
          )}
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
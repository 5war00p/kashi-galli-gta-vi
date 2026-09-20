import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import EditorPage from './pages/EditorPage'
import FinalePage from './pages/FinalePage'
import LandingPage from './pages/LandingPage'
import MissionPage from './pages/MissionPage'

const routes = [
  { to: '/', label: 'Arrival' },
  { to: '/editor', label: 'Workshop' },
  { to: '/mission', label: 'Galli Run' },
  { to: '/finale', label: 'Ghat Drop' },
]

function Screen({ children }: { children: ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.45, ease: [0.2, 1, 0.2, 1] }}
      className="mx-auto w-full max-w-6xl px-4 pb-12 pt-4 sm:px-6"
    >
      {children}
    </motion.main>
  )
}

function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen text-sand-100">
      <header className="sticky top-0 z-20 border-b border-saffron-500/30 bg-ink-950/75 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div>
            <p className="font-display text-3xl uppercase tracking-wide text-saffron-300">
              Galli to Ghat
            </p>
            <p className="text-xs uppercase tracking-[0.25em] text-teal-200/80">
              Build Your Kashi Night Run
            </p>
          </div>
          <nav className="flex items-center gap-2">
            {routes.map((route) => (
              <NavLink
                key={route.to}
                to={route.to}
                className={({ isActive }) =>
                  [
                    'rounded-full border px-3 py-1 text-xs uppercase tracking-[0.18em] transition',
                    isActive
                      ? 'border-saffron-300 bg-saffron-300/20 text-saffron-100'
                      : 'border-white/20 text-white/70 hover:border-teal-300/80 hover:text-teal-100',
                  ].join(' ')
                }
              >
                {route.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <Screen>
                <LandingPage />
              </Screen>
            }
          />
          <Route
            path="/editor"
            element={
              <Screen>
                <EditorPage />
              </Screen>
            }
          />
          <Route
            path="/mission"
            element={
              <Screen>
                <MissionPage />
              </Screen>
            }
          />
          <Route
            path="/finale"
            element={
              <Screen>
                <FinalePage />
              </Screen>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App

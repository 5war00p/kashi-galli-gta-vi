const EDITED_IMAGE_KEY = 'kashi-galli:edited-image'
const MISSION_STATS_KEY = 'kashi-galli:mission-stats'

export type MissionResult = 'success' | 'failed' | 'in-progress'

export interface MissionStats {
  score: number
  collisions: number
  dodges: number
  durationSec: number
  result: MissionResult
  completedAt: string
}

export function getSavedEditedImage(): string | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    return localStorage.getItem(EDITED_IMAGE_KEY)
  } catch {
    return null
  }
}

export function saveEditedImage(dataUrl: string) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    localStorage.setItem(EDITED_IMAGE_KEY, dataUrl)
  } catch {
    // Ignore storage write failures (private mode or quota).
  }
}

export function getMissionStats(): MissionStats | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const raw = localStorage.getItem(MISSION_STATS_KEY)
    if (!raw) {
      return null
    }
    return JSON.parse(raw) as MissionStats
  } catch {
    return null
  }
}

export function saveMissionStats(stats: MissionStats) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    localStorage.setItem(MISSION_STATS_KEY, JSON.stringify(stats))
  } catch {
    // Ignore storage write failures (private mode or quota).
  }
}

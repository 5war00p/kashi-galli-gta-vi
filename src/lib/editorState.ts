const EDITED_IMAGE_KEY = 'kashi-galli:edited-image'

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

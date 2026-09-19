import { type ChangeEvent, useMemo, useRef, useState } from 'react'
import ImageEditor, {
  type ImageEditorRef,
  type ImageEditorSaveResult,
} from '@unlayer/react-image-editor'
import { Link } from 'react-router-dom'
import { getSavedEditedImage, saveEditedImage } from '../lib/editorState'

const tasks = [
  'Upload base ride or avatar image',
  'Apply crop, tint, contrast, and stickers',
  'Save style and carry it into mission HUD',
]

function EditorPage() {
  const editorRef = useRef<ImageEditorRef>(null)
  const initialSavedImage = getSavedEditedImage()
  const [imageToEdit, setImageToEdit] = useState('/kashi-base.svg')
  const [savedImage, setSavedImage] = useState<string | null>(initialSavedImage)
  const [status, setStatus] = useState(
    initialSavedImage
      ? 'Loaded your previously saved edited visual from local storage.'
      : 'Load an image and start editing your Kashi style.',
  )

  const editorOptions = useMemo(
    () => ({
      theme: 'dark' as const,
      features: {
        ai: false,
      },
    }),
    [],
  )

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageToEdit(reader.result)
        setStatus(`Loaded ${file.name}. You can now crop, filter, and style it.`)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleSave = ({ dataUrl }: ImageEditorSaveResult) => {
    setSavedImage(dataUrl)
    saveEditedImage(dataUrl)
    setStatus('Saved. This edited visual is ready for mission and finale scenes.')
  }

  const handleCancel = async () => {
    try {
      await editorRef.current?.editor?.reset(imageToEdit)
      setStatus('Unsaved changes were discarded and canvas was reset.')
    } catch {
      setStatus('Could not reset editor right now. Please try again.')
    }
  }

  const downloadSavedImage = async () => {
    if (!savedImage) {
      setStatus('Nothing to download yet. Capture from editor first.')
      return
    }

    try {
      const response = await fetch(savedImage)
      const blob = await response.blob()
      const objectUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = objectUrl
      link.download = 'kashi-galli-edited.png'
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(objectUrl)
      setStatus('Download started.')
    } catch {
      setStatus('Download failed. Please try capturing again.')
    }
  }

  return (
    <section className="grid gap-6 lg:grid-cols-12 lg:gap-8">
      <article className="rounded-3xl border border-saffron-500/35 bg-ink-900/70 p-6 sm:p-8 lg:col-span-8">
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

        <div className="mt-6 rounded-2xl border border-white/20 bg-black/30 p-4 text-sm text-sand-100/85">
          <p className="mb-3">Base visual</p>
          <div className="flex flex-wrap items-center gap-3">
            <label className="cursor-pointer rounded-full border border-saffron-300 bg-saffron-300/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-saffron-100">
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <button
              type="button"
              onClick={() => {
                setImageToEdit('/kashi-base.svg')
                setStatus('Reset to base Kashi visual.')
              }}
              className="rounded-full border border-white/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-sand-100/90"
            >
              Reset Base
            </button>
          </div>
          <p className="mt-3 text-xs text-teal-200/85">{status}</p>
        </div>

        {savedImage && (
          <div className="mt-6 rounded-2xl border border-teal-200/30 bg-teal-200/10 p-4">
            <p className="mb-3 text-xs uppercase tracking-[0.16em] text-teal-100">
              Saved Preview
            </p>
            <img
              src={savedImage}
              alt="Edited mission visual"
              className="h-48 w-full rounded-xl object-cover"
            />
            <button
              type="button"
              onClick={downloadSavedImage}
              className="mt-3 inline-block rounded-full border border-teal-200 bg-teal-200/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-teal-100"
            >
              Download Edited Image
            </button>
          </div>
        )}

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

      <aside className="rounded-3xl border border-white/15 bg-black/25 p-6 sm:p-7 lg:col-span-4">
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

      <div className="rounded-3xl border border-white/15 bg-black/25 p-3 sm:p-4 lg:col-span-12">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3 px-1">
          <p className="text-xs uppercase tracking-[0.22em] text-sand-100/75">Live Editor Canvas</p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/15 bg-ink-950/60 p-1 sm:p-2">
          <ImageEditor
            ref={editorRef}
            image={imageToEdit}
            options={editorOptions}
            minHeight="72vh"
            style={{ width: '100%' }}
            onSave={handleSave}
            onCancel={handleCancel}
            onLoadError={() => setStatus('Could not load that image. Try a different file.')}
            onError={() => setStatus('Editor failed to initialize. Refresh and retry.')}
          />
        </div>
      </div>
    </section>
  )
}

export default EditorPage
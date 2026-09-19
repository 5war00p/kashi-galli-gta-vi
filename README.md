# Galli to Ghat: Kashi GTA VI Inspired Experience

A GTA VI-inspired interactive web experience set in the narrow gallis of Kashi, built for the Build with React Image Editor Challenge.

## Challenge Fit

This project is intentionally aligned with the judging criteria:

- Creativity: The world and narrative are rooted in Kashi gallis and ghat culture rather than a generic city setting.
- Visual execution: Cinematic route flow, stylized gradients, custom hero visual, and motion-driven transitions.
- Use of React Image Editor: Unlayer React Image Editor is the core interaction in the Workshop route.
- Overall experience: Edit -> persist -> reuse flow across Workshop, Mission, and Finale.

## Current Experience Flow

1. Arrival
2. Workshop (React Image Editor)
3. Mission
4. Finale

The edited visual is saved to local storage and appears in both Mission and Finale.

## Implemented Features

- Workshop uses Unlayer React Image Editor for image customization.
- Edited visual persists in local storage and appears in Mission + Finale.
- Mission includes a timed gameplay loop with score, dodges, and collisions.
- Mission run result is persisted and shown in Finale.
- Finale can export a downloadable poster PNG with mission stats overlay.

## How To Demo (Hackathon)

1. Open Workshop and upload/customize an image.
2. Use Save in the editor UI.
3. Go to Mission and complete at least one run.
4. Go to Finale and click Export Finale Poster.
5. Download and share the generated poster image.

## Tech Stack

- React + Vite
- TypeScript
- Tailwind CSS v4
- React Router
- Framer Motion
- Unlayer React Image Editor
- Cloudflare Workers + static assets via Wrangler

## Run Locally

Requirements:

- Node 22.12+ recommended (current build can still pass on 22.11 with warning)
- pnpm

Install and run:

```bash
pnpm install
pnpm dev
```

Quality and build:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

Note: build is gated and already runs lint + typecheck automatically.

## Cloudflare Deployment (Workers + Static Assets)

This repository includes:

- [src/worker.ts](src/worker.ts) as the Worker entrypoint.
- [wrangler.toml](wrangler.toml) configured with an assets directory and SPA fallback.
- Deployment scripts in [package.json](package.json).

Build and deploy:

```bash
pnpm cf:deploy
```

Dry-run deploy (validation without publishing):

```bash
pnpm cf:deploy:dry-run
```

Run locally in Worker mode:

```bash
pnpm cf:dev
```

Before first deployment, authenticate Wrangler and ensure the Worker name in [wrangler.toml](wrangler.toml) is available:

- kashi-galli-gta-vi

## Project Structure

- [src/App.tsx](src/App.tsx): route shell and animated transitions
- [src/pages/LandingPage.tsx](src/pages/LandingPage.tsx): intro scene
- [src/pages/EditorPage.tsx](src/pages/EditorPage.tsx): image editor integration
- [src/pages/MissionPage.tsx](src/pages/MissionPage.tsx): mission scene with persisted visual
- [src/pages/FinalePage.tsx](src/pages/FinalePage.tsx): finale scene with persisted visual
- [src/lib/editorState.ts](src/lib/editorState.ts): local storage helpers

## Submission Checklist

- Public GitHub repository
- Deployed URL on Cloudflare Workers
- Editor workflow demo (GIF or short video)
- README section mapping implementation to challenge criteria

## Known Notes

- Vite prints a Node version recommendation warning on Node 22.11.0.
- Recommended Node version is 22.12+ for warning-free builds.

## Next Implementation Milestones

- Add background ambience and SFX for workshop/mission/finale.
- Add optional keyboard controls for mission actions.
- Add final CTA section with deployed link and challenge submission metadata.

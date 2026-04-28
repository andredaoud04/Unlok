# Unlok MVP

Unlok is a stretching and mobility web app for gym-focused users who usually only stretch when something feels tight, painful, or when they want to unlock a skill.

The MVP is a Vite + React + Tailwind app designed for GitHub + Vercel deployment.

## Core product idea

Unlok is not a generic wellness app.

It is built around:

- Fix something: tight hips, stiff back, tight hamstrings, restricted shoulders.
- Achieve something: front splits, pancake fold, bridge mobility, planche prep.
- Curated programs instead of infinite AI-generated routines.
- Progress through proxy benchmarks instead of medical range-of-motion measurements.
- XP based on stretch difficulty, hold duration, reps, and session completion.

## MVP screens

- Onboarding
- Home / Active Program
- Program Library
- Program Detail
- Log Session
- Progress

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to Vercel

1. Create a GitHub repository.
2. Push this project to GitHub.
3. Go to Vercel.
4. Import the GitHub repo.
5. Use the default Vite settings:
   - Build command: `npm run build`
   - Output directory: `dist`

## Current limitations

This is a front-end MVP.

It uses `localStorage`, not accounts or a database. That is intentional. Add Supabase/Firebase later only after the core product feels worth keeping.

## Safety positioning

Unlok should not claim to diagnose or treat injuries. Use language like:

> Mobility training for tightness, skill goals, and movement prep. Not medical diagnosis or treatment. Stop if pain feels sharp, unusual, or worsening.

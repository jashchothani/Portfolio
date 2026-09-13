# Jash Bharat Chothani — Portfolio

A light-themed, 3D interactive personal portfolio with a working AI assistant ("Ask Jash")
backed by NVIDIA NIM.

```
portfolio/
  frontend/   React + Vite + TypeScript + Tailwind + React Three Fiber
  backend/    Node + Express + TypeScript + NVIDIA NIM integration
```

## Quick start (local development)

You can run both backend and frontend together with a single command from the project root:

```bash
# In the root folder (portfolio):
npm install          # installs concurrently if not installed
npm run dev          # starts backend (port 5000) and frontend (port 5173) concurrently
```

Or run them in separate terminals:

### 1. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

The API starts on `http://localhost:5000`. Check it with:

```bash
curl http://localhost:5000/api/health
```

### 2. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

The site starts on `http://localhost:5173`. It is configured to call the backend at `http://localhost:5000` via `VITE_API_URL`.

## Getting an NVIDIA NIM API key

1. Go to [build.nvidia.com](https://build.nvidia.com) and sign in.
2. Pick a chat model (the backend defaults to `meta/llama-3.2-11b-vision-instruct` — any
   OpenAI-compatible NIM chat model works, just update `NVIDIA_NIM_MODEL` in `.env`).
3. Generate an API key and paste it into `backend/.env` as `NVIDIA_NIM_API_KEY`.

The key is read only on the server (`backend/src/config/env.ts` → `services/nvidiaNim.ts`)
and is never sent to or exposed in the browser.

## Updating your content

Everything you'd want to change lives in two data files — no component code needs touching:

- `frontend/src/data/profile.ts` — what's displayed on the site (skills, projects,
  timeline, socials, etc.)
- `backend/src/data/profile.ts` — what the AI assistant knows about you. Keep this in
  sync with the frontend file whenever you add or change a real fact.

To swap your photo, replace `frontend/src/assets/jash-cutout.webp` (a transparent
background-removed image works best) and update the import in
`frontend/src/sections/Hero.tsx` if you rename the file.

## Deploying

### Frontend → Vercel

1. Push this repo to GitHub.
2. In Vercel, import the repo and set the **root directory** to `frontend`.
3. Vercel auto-detects the Vite framework (a `vercel.json` is included).
4. Add an environment variable:
   - `VITE_API_URL` = your Render backend URL, e.g. `https://your-backend.onrender.com`
5. Deploy.

### Backend → Render

1. In Render, create a new **Web Service** from the same repo, root directory `backend`
   (a `render.yaml` is included if you prefer Render's Blueprint flow).
2. Build command: `npm install && npm run build`
3. Start command: `npm start`
4. Add environment variables:
   - `NODE_ENV=production`
   - `NVIDIA_NIM_API_KEY` = your real key
   - `NVIDIA_NIM_BASE_URL` = `https://integrate.api.nvidia.com/v1`
   - `NVIDIA_NIM_MODEL` = the model you chose
   - `FRONTEND_URL` = your deployed Vercel URL (no trailing slash) — this is required
     for CORS to allow requests from your live site
5. Deploy, then confirm `https://your-backend.onrender.com/api/health` returns `{"status":"ok"}`.

Once both are live, redeploy the frontend if you changed `VITE_API_URL` after the first deploy.

## Architecture notes

- **AI chat**: `React (AIChat.tsx)` → `POST /api/chat` → Express validates + rate-limits
  → builds a system prompt from `backend/src/data/profile.ts` → streams the response
  from NVIDIA NIM back to the browser as Server-Sent Events, so replies appear
  progressively instead of all at once.
- **Contact form**: `POST /api/contact` → validated, rate-limited, and logged server-side.
  See the comment in `backend/src/services/notify.ts` for how to wire up a real email
  provider (e.g. Resend) later — the controller doesn't need to change.
- **Security**: Helmet, strict CORS (only your frontend origin), per-route rate limiting,
  Zod input validation, and a 32kb request body limit are all applied by default.
- **Performance**: the Three.js hero scene is code-split and lazy-loaded so it never
  blocks first paint; particle/shape counts are reduced automatically on small screens.

## Tech stack

**Frontend:** React, Vite, TypeScript, Tailwind CSS, Framer Motion, React Three Fiber,
Three.js, @react-three/drei, Lenis.

**Backend:** Node.js, Express, TypeScript, Zod, Helmet, express-rate-limit, NVIDIA NIM.

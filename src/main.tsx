import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const root = document.getElementById('root')!
const app = <StrictMode><App /></StrictMode>

// The production build pre-renders the page into #root (scripts/prerender.mjs),
// so hydrate it; in `npm run dev` #root is empty, so render from scratch.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)

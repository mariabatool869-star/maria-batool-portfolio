# Maria Batool — Portfolio

**Theme:** violet + rose (#8B5CF6 → #EC4899) on deep purple-black (#0F0A1A). Buttons use the deeper #7C3AED → #DB2777 so white text meets WCAG AA. The hero video, poster, project images and section backgrounds have the violet shift baked into the files (ffmpeg `huesaturation=hue=60:saturation=0.10:colors=c+b:strength=5`, which moves only blue and cyan, so amber accents stay amber); no CSS filters run at runtime. Apply the same filter to any new blue-toned media.

AI Full-Stack Engineer portfolio. Vite 8 + React 19 + TypeScript, Tailwind CSS v4, Framer Motion, self-hosted Roboto. The page is pre-rendered to static HTML at build time, so it loads fast and search engines see all of the main content.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck → client build → server build → pre-render into dist/
npm run preview    # serve the production build locally
npm run lint
```

Node.js 20.19+ or 22.12+.

## Deploy to Vercel

1. Push the project to a new GitHub repository:
   ```bash
   git init && git add . && git commit -m "Maria Batool portfolio"
   git branch -M main
   git remote add origin https://github.com/<user>/maria-batool-portfolio.git
   git push -u origin main
   ```
2. At vercel.com, choose **Add New → Project** and import the repository. Vercel detects Vite. Keep the defaults:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
   - **Install command:** `npm install`
3. Deploy. `vercel.json` adds the security headers (Content-Security-Policy, HSTS, X-Frame-Options, Permissions-Policy and others) and long-term caching for built assets.
4. Set the live address everywhere (the project assumes `https://maria-batool-portfolio.vercel.app`):
   ```bash
   grep -rl "maria-batool-portfolio.vercel.app" index.html public | xargs sed -i 's#https://maria-batool-portfolio.vercel.app#https://YOUR-DOMAIN#g'
   git commit -am "Set live domain" && git push
   ```
5. Check the live site with PageSpeed Insights, and test the share preview with LinkedIn's Post Inspector.

## Still to add (search the code for `SWAP:`)

| Item | Where | Effect while missing |
|---|---|---|
| CV (PDF) | Put it at `public/cv/Maria-Batool-CV.pdf`, then set `config.cvUrl: '/cv/Maria-Batool-CV.pdf'` in `src/data/content.ts` | The "Download full CV" button is hidden, so it can never 404 |
| Calendly link | `config.bookingUrl` | Every "Book a call" / "Book a Discovery Call" button opens a pre-addressed email (subject "Discovery call") |
| Live domain | Step 4 above | Canonical URL, share image and sitemap point at the assumed Vercel address |
| Testimonials | `testimonials` array, real quotes with written permission only | The section stays hidden |

## Editing content

Everything visitors read is in **`src/data/content.ts`**: personal details, hero text and stats, education, flagship projects, the project grid, capabilities, "What I bring", tech stack, experience, section headings (`copy`) and the "Ask about Maria" answers (`askQA`). Components don't need changing for content updates.

- **Flagship projects** (`projects`): `summary` is the paragraph, `how` the key achievements, `liveUrl` the button (GitHub links show "View code").
- **Grid** (`allProjects`): filter buttons appear only for categories that have projects. With 9 or fewer projects, all show at once; above 9, the 9 marked `featured` show first, with a "Show all" button.

## Media

| Asset | Files | Notes |
|---|---|---|
| Hero video | `public/hero.webm`, `public/hero.mp4`, `public/images/hero-poster.webp` | 1280×720 source, made into a seamless 9 s loop with no audio. A 1920×1080 source would look sharper on large screens; re-encode with the commands below |
| Portrait | `public/images/portrait.webp` (+ `.jpg`), `public/images/avatar.webp` (+ `.jpg`) | 800 px hero crop, 192 px avatar for the nav, contact section and footer. "MB" monogram if missing |
| Flagship images | `public/images/projects/<id>.webp` (+ `.jpg`) | 1600×900 |
| Grid images | `public/images/work/<slug>.webp` (+ `.jpg`), `<slug>-lg.webp` | 800×450 card, 1600×900 lightbox; lazy-loaded |
| Share image | `public/images/og-preview.jpg` | 1200×630 |

Re-encoding a new hero video (requires ffmpeg):

```bash
F="[0:v]split[a][b];[a]trim=start=1:end=10,setpts=PTS-STARTPTS[A];[b]trim=start=0:end=1,setpts=PTS-STARTPTS[B];[A][B]xfade=transition=fade:duration=1:offset=8,format=yuv420p[v]"
ffmpeg -i source.mp4 -filter_complex "$F" -map "[v]" -an -c:v libx264 -preset slow -crf 18 -profile:v high -movflags +faststart public/hero.mp4
ffmpeg -i source.mp4 -filter_complex "$F" -map "[v]" -an -c:v libvpx-vp9 -b:v 0 -crf 26 -row-mt 1 public/hero.webm
ffmpeg -i public/hero.mp4 -frames:v 1 poster.png   # save as public/images/hero-poster.webp
```

## Features

- **Hero:** video background with parallax, the portrait in a rotating gradient ring with four count-up stat cards, and the animated neural-network canvas if the video can't play.
- **Projects:** four flagship cards, plus a filterable grid with 3D hover tilt and a lightbox (Escape or a click outside closes it).
- **Finishing touches:** scroll progress bar, cursor dot (desktop), 2% film grain, click ripples and the "Ask about Maria" widget.
- **Performance:** below-the-fold sections load lazily; the business cards, project grid, widget and cursor render just after the page appears.
- **Reduced motion:** visitors who ask for it get the poster image instead of the video, and no parallax, cursor, ring rotation or tilt.

## Project structure

```
public/            media, fonts, favicon, robots.txt, sitemap.xml, bg-ready.js
src/data/content.ts   all content
src/components/    Navbar, Hero, AwardsStrip (education), Projects (flagship + grid + lightbox),
                   Capabilities, Business, TechStack, Experience, Testimonials, Contact, Footer,
                   AskWidget, Enhancements (scroll bar, cursor, grain, ripple)
src/lib/           design tokens, motion helpers, deferred rendering, icons, SafeImage, Avatar
scripts/prerender.mjs   writes the rendered page into dist/index.html
vercel.json        security headers + caching
```

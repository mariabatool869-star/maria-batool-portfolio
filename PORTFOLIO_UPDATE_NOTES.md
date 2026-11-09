# Recruiter-focused portfolio update — 9 November 2026

This is an edited copy of the uploaded React/Vite portfolio, not a modification of the live Vercel deployment.

## What changed

- Shifted first-screen positioning toward **Cybersecurity & AI Engineer**, keeping full-stack development and AI automation visible.
- Added a prominent **NovaShield evidence-first research spotlight** immediately after the education strip, with code, report and DOI links.
- Added NovaShield as the **first flagship case study** and in the filterable security project list, with clearly scoped 468/468 comparisons, five synthetic fixtures, SHA-256 verification and disclosure that the end-to-end live enforcement pipeline is not production-ready.
- Included an illustrative NovaShield *research thumbnail* (not a screenshot of the actual dashboard).
- Updated navigation, abilities, skills, available-for-work wording and contact calls to action for job seekers.
- Corrected portfolio canonical, OpenGraph, social media and sitemap domain references to `maria-batool-fullstack-engineer.vercel.app`.
- Preserved other projects, contact email, original artwork, existing portrait, and site architecture.

## Review before deploying

1. **Check all existing professional claims** against your experience and documents. Existing RNDTEK, tax-assistant, performance statistics and certifications are based on the uploaded source, not independently verified.
2. **Add your actual NovaShield Console screenshot** if you want an interface image rather than the clearly illustrative research thumbnail.
3. **Add a current PDF CV** at `public/cv/Maria-Batool-CV.pdf` and set `config.cvUrl` in `src/data/content.ts`. The button is currently hidden rather than broken.
4. Ensure your email `Maria7Batool@gmail.com` and LinkedIn URL are correct for job applications.
5. Verify project/demo links work and that you have permission to publish descriptions of client projects.
6. The `CITATION.cff` and Zenodo DOI belong to NovaShield's software v0.1.0; the technical manuscript is prepublication and has no separate DOI yet.

## Local preview (Mac / Cursor Terminal)

```bash
cd '/path/to/maria-batool-portfolio'
npm ci
npm run dev
```

Open the localhost URL printed by Vite. After reviewing:

```bash
npm run build
```

Deploy your *reviewed* portfolio source through your existing GitHub/Vercel workflow. No deployment is performed by this archive.

## Validation status

- TypeScript project compilation (`tsc -b`): **PASS** in the editing environment.
- Full Vite bundle: **NOT VERIFIED** in the editing environment, because the uploaded `node_modules` contains macOS-specific native Vite/Rolldown dependencies, and package installation was not available. Run `npm ci` and `npm run build` on your Mac before deploying.

## Safety

The archive omits `node_modules`, `.vercel` project metadata, caches, build directories and environment files. Keep secrets out of Git and never deploy a backup over your original source without comparing it first.

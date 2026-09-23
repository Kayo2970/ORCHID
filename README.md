# ORCHID — Grants & Fellowships Newsletter

A dynamic, searchable website version of the **ORCHID Newsletter (Issue No. 27, September 2026)**,
published by the Office of Research & Innovation (ORI), M.S. Ramaiah University of Applied Sciences.

Built as a dependency-free static site (vanilla HTML/CSS/JS) so it deploys instantly to
**Cloudflare Workers** using native static assets — no framework or build step required.

## Features

- Animated, gradient hero built from the newsletter's own brand palette
- Live countdown timers to every grant deadline, computed client-side
- Interactive September 2026 calendar highlighting deadline days
- Searchable, filterable grant grid (National / International / Fellowships)
- Detail modal for every grant with thrust areas, funding and a direct link to the official call
  (all hyperlinks extracted from the original PPTX and preserved)
- "Schemes Open Throughout the Year" rolling-call directory with tabbed National/International views
- Fully responsive, scroll-reveal animations, sticky nav with scroll-spy

## Project structure

```
public/            # static site — everything Cloudflare Workers serves
  index.html
  style.css
  app.js           # rendering, filtering, countdowns, modal, nav
  data.js          # structured newsletter content (grants, rolling calls, calendar)
  assets/          # RUAS logo & shield extracted from the source deck
wrangler.toml       # Cloudflare Workers config (static assets binding)
worker.js           # minimal Worker entry that serves the static assets
```

## Local development

No build step — just serve the `public/` folder:

```bash
npx http-server public -p 8080
# or
python3 -m http.server 8080 --directory public
```

Then open http://localhost:8080.

## Deploying to Cloudflare Workers

1. Install Wrangler (already listed in `package.json`):

   ```bash
   npm install
   ```

2. Log in to Cloudflare:

   ```bash
   npx wrangler login
   ```

3. Deploy:

   ```bash
   npx wrangler deploy
   ```

Wrangler will publish the contents of `public/` as static assets on your `*.workers.dev`
subdomain (or a custom domain configured in the Cloudflare dashboard). No environment
variables, KV namespaces or bindings are required.

## Updating content

All newsletter content (grants, deadlines, rolling calls, the ORI letter) lives in
`public/data.js` as plain JS objects/arrays — edit that file and refresh to update the site
for a future issue. `app.js` renders everything dynamically from that data, including
countdown badges relative to the visitor's current date.

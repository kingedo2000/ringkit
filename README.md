# Ringkit

Business phone infrastructure — Stripe for voice. Agent-first, developer-first, humans in the loop.

## Layout

- `site/` — the static launch site (Home, Pricing with calculator, Docs, Sign-up, Terms, Privacy, Security). Open `site/index.html` in a browser, or deploy the folder as-is to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages).
- `design/project/` — the design-canvas artboard sources (`.dc.html`) the site is exported from. Edit these on the Claude design canvas, or by hand.
- `design/site-js/` — vanilla JS for the interactive bits (Owners/Developers switch, pricing calculator, sign-up stepper) used in the exported site.
- `design/export_site.py` — regenerates `site/` from `design/project/`. Run `python3 design/export_site.py` after editing artboards. (It expects `project/` and `site-js/` next to it; see the script.)
- `design/SPEC.md` — brand and build spec: positioning, pricing, palette, type, shared nav/footer, trust copy.
- `BRIEF.md` — the rebuild brief the launch pages were built against.

## Pricing (launch)

$1/mo per number · $0.05/min AI answering · $0.50/min live rep · summaries, webhooks and SDKs included · no platform fee, no contracts.

## Open items

- Swap the text wordmark on `#rk-logo` for the mint k-fork wordmark PNG; set the wavefork mark as favicon.
- Decide billing for calls handled by the customer's own team (not stated anywhere yet).
- Legal pages are drafts, not yet reviewed by counsel.
- Next pages: How it works, Integrations, Use cases, Status.

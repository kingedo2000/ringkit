# Ringkit site rebuild — shared spec for page builders

You are writing ONE artboard file (or a few) under
`/tmp/claude-0/-home-claude/b5d16f7d-aed3-52a0-8a53-1959af1b21d4/scratchpad/ringkit/project/`
in the `.dc.html` format, plus (where the page has interactivity) a small vanilla-JS
file for the exported static site. Do NOT run, render, screenshot or verify anything.
Do not read or touch other agents' page files. Reply "done" + a short summary.

## Positioning (use this; keep copy specific, no filler, no invented stats)
- Ringkit is business phone infrastructure: **Stripe for voice**. Developer-first and
  agent-first, with humans in the loop.
- Pay per minute, no platform fee, no contracts.
- AI triages and routes each call to a bot or to the right tier of human — the
  customer's own team or Ringkit's reps. Every call becomes a summary that turns into
  tasks and proposals.
- Line against bot-only products: **"Bots for the easy calls, people for the ones that matter."**
- Hero headline (Home only): "Your phone, answered. By people who know your business."
- Two audiences: Owners (briefed-rep story) and Developers (API story).

## Pricing (FINAL — use these numbers as real, no "TBD" tags anywhere)
- Number: $1/mo · AI answering: $0.05/min · Live rep: $0.50/min · Call notes & summaries: included
- Platform fee $0, no contracts, billed per minute (rounded up to the next minute).
- Worked example you may use: a 5-minute AI-handled call = $0.25; a 6-minute live-rep
  quote call = $3.00.

## Brand
- Wordmark: the real PNG isn't available yet. Use a text wordmark: "ringkit" lowercase,
  Space Grotesk 700, color mint, with a simple inline-SVG "wavefork" stand-in mark
  (a small stroke icon: a horizontal line that forks into two wavy lines — 20×20,
  stroke mint 1.75px, aria-hidden). Give the wordmark container `id="rk-logo"` so the PNG
  can be swapped in later. No cyan square. No cyan anywhere.
- Single accent: **mint #6ee7b7**. Amber **#f59e0b** ONLY as a "human" status color
  (rep nodes, "live rep" rows, a "HUMAN" chip). Nothing else is amber.
- Ground #0a0a0a (black), panels #121316, raised panels #17181c.
  Borders rgba(255,255,255,.09). Text #ededed primary, #a3a7ad secondary (passes 4.5:1
  on #0a0a0a), #6ee7b7 accent text. Links mint; hover #a7f3d0.
- Type: Space Grotesk (500/600/700) headings and wordmark; Inter (400/500/600) body;
  IBM Plex Mono (400/500) for labels, code, data panels. One fonts link in <helmet>:
  https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap
- Monoline inline stroke SVG icons (1.5px, currentColor), aria-hidden. Never emoji.
- Flat panels, 1px border, 8px radius. No glows, no gradients washes, no corner
  brackets, no left-border cards. One soft radial mint glow (≤8% opacity) behind a hero is OK.
- Buttons: primary = solid mint fill, text #0a0a0a, 600 weight, 8px radius, min-height
  44px; secondary = 1px border rgba(255,255,255,.16), text #ededed. Real <a href>/<button>.
- Mono uppercase eyebrow labels (12px, letter-spacing .14em, #a3a7ad) without "//".

## Shared nav + footer (identical markup on every page)
Nav (height ~64px, border-bottom 1px): left wordmark linking to `Main.dc.html`;
right links (Inter 14px/500, #a3a7ad, hover #ededed, min-height 44px):
`How it works` → `Main.dc.html#how`, `Pricing` → `Pricing.dc.html`, `Docs` → `Docs.dc.html`,
`Sign in` → `Signup.dc.html`, and primary button `Get started` → `Signup.dc.html`.
Nav must wrap at phone width (flex-wrap, gap).
Footer: wordmark + "Business phone infrastructure. Stripe for voice." + columns:
Product (How it works, Pricing, Docs, Integrations → `Main.dc.html#integrations`),
Company (Security → `Security.dc.html`, Status → `#`, Work as a Ringkit rep → `#`),
Legal (Terms → `Terms.dc.html`, Privacy → `Privacy.dc.html`), "© 2026 Ringkit".
Links between pages use the `.dc.html` filename exactly as above (they get rewritten on export).

## Trust copy (use verbatim or close; put on Home, Pricing, Signup, Security as fits)
- Recording & consent: "Calls are recorded and transcribed to make the summary. Ringkit
  plays a consent notice on every call and follows two-party-consent rules by state."
- Data handling: "Your business brief, call recordings and summaries are encrypted at
  rest and in transit, and never used to train models for anyone else."
- Number porting: "Keep your existing number. Porting is free and takes 3–10 business days
  with most US carriers; your old line keeps working until the port completes."
- Reliability: "Calls run on redundant carrier routes in multiple US regions. Status
  page and incident history are public."

## Replace all bracketed placeholders with real-sounding, clearly illustrative copy
- "Bison Ct remodel" → "Oakridge kitchen remodel" (made-up). Business example: "Hidden
  Valley Builders" (made-up). [AMOUNT] → "$18,400 estimate". [SERVICE AREA] → "Ventura
  County". [YOUR RATES] → "$95/hr labor · free estimates". [INTEGRATIONS] → "HubSpot,
  Jobber, Housecall Pro, Google Calendar, Slack, email & SMS". [AGENT FRAMEWORKS] →
  "OpenAI Agents, LangChain, Vercel AI SDK, MCP". [PORTING] → the porting trust line.
  [today] → "today". Soften "answered in seconds" → "answered on the first ring, every
  time we're forwarded"; "in an afternoon" → "in under an hour with the quickstart".

## The .dc.html format — rules that bite (each fails silently)
Skeleton — reproduce exactly:
```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Ringkit — Pricing</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<link rel="stylesheet" href="FONTS URL ABOVE">
<style>
body{margin:0;background:#0a0a0a}
a{color:#6ee7b7}a:hover{color:#a7f3d0}
/* classes, keyframes, media queries, hover/focus, pseudo-elements only */
</style>
</helmet>
<div style="width:100%; min-height:100vh; font-family:Inter,sans-serif; color:#ededed; background:#0a0a0a; box-sizing:border-box; overflow-x:hidden; line-height:1.55">
 ... nav, sections, footer ...
</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{"$preview":{"width":1440,"height":HEIGHT}}'>
class Component extends DCLogic {
renderVals() {
return {};
}
}
</script>
</body>
</html>
```
- Keep `<script src="./support.js"></script>` exactly. Close every element, quote every
  attribute. No <iframe>/<object>/<embed>, no external scripts, no network except the fonts
  link. No `data:` URIs. No script-built UI (no innerHTML/appendChild).
- LAYOUT STYLES INLINE (`style="…"`): flex/grid containers inline, grids in the exact
  shape `grid-template-columns: repeat(N, minmax(0, 1fr))`. <helmet><style> only for
  body basics, a/a:hover, keyframes, media queries, hover/focus states, pseudo-elements.
- Fluid page: no px width on root; sections use `max-width:1200px; margin:0 auto;
  padding: … 16px`. At `@media (max-width:760px)` grids collapse to one column (give
  grids classes like `rk-g2`/`rk-g3`/`rk-g4` and collapse them in helmet). No horizontal
  overflow at 390px. Wide tables/code get `overflow-x:auto`; prose-like code blocks use
  `white-space:pre-wrap` on phones.
- Copy is literal markup. `{{hole}}` only for genuinely dynamic values from renderVals();
  no expressions in holes. Events: `onClick="{{ handler }}"`, `onInput="{{ handler }}"`
  with handlers returned from renderVals(); state via this.setState. `<sc-if value="{{flag}}" hint-placeholder-val="{{ true }}">` for branches.
- Accessibility: real <button>/<a>/<input>+<label>; aria-label on icon-only buttons;
  contrast ≥4.5:1; touch targets ≥44px.

## Interactivity: dual implementation
The canvas runs the DC logic. The exported static site strips the DC script and
`{{holes}}`. So for any interactive widget:
1. Mark the live elements with stable `id`s / `data-rk-*` attributes.
2. Implement it in DC style (state + renderVals + holes) for the canvas, giving each hole
   a sensible default in renderVals.
3. ALSO write a vanilla-JS file `…/scratchpad/ringkit/site-js/<page>.js` (no modules,
   no deps) that, on DOMContentLoaded, wires the SAME ids with plain DOM updates
   (textContent / classList / hidden attribute only). It must work if the holes have been
   replaced by their default text.

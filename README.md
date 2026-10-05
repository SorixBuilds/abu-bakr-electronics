# Abu Bakr Electronics — demo website

Frontend-only pitch demo built from `../ABU_BAKR_ELECTRONICS_WEBSITE_HANDOFF.md`. No backend, no prices, no invented business claims.

```bash
npm install
npm run dev      # http://localhost:3000 (the Claude preview uses port 4317)
npm run build && npm start
```

Stack: Next.js 16 (App Router, Turbopack) · Tailwind v4 · Motion · Lenis · Embla · Radix Dialog · Vaul · cmdk · Zustand.

## Presenting

- Normal mode for the walkthrough (handoff §24).
- Add `?review=1` to any URL for **Review Mode**: every unconfirmed item gets a gold `CLIENT TO CONFIRM` tag, and a pill opens the full checklist. `?review=0` turns it off.
- The preloader runs once per browser session. To see it again, open a new private window.

## Where things live

| What | File |
|---|---|
| Client facts and placeholders (WhatsApp number, address, hours, warranty…) | `content/site.ts` |
| Home copy, including headline sets A/B/C | `content/home.ts` |
| Categories, filters and home tiles | `content/categories.ts` |
| The 24 demo appliances | `data/products.ts` |
| The 9 Jinpeng models (manufacturer homepage values only) | `data/mobility.ts` |
| Hero video and editorial photography paths | `content/media.ts` |
| Design tokens (colour, type scale, motion keyframes) | `app/globals.css` |

**To confirm a fact:** set its `value` in `content/site.ts`. It then renders normally and drops out of Review Mode. For example, setting `warrantyStatement.value` turns on item 04 of "The Abu Bakr Standard".

**To show brands:** add verified names to `site.brands`. The typographic Brand Wall appears automatically. Do not use logo files.

## Assets: current state

No stock or manufacturer media is in the repo yet. Every visual uses the handoff's §14.3 no-photo strategy:

- Hero: an animated "interior light" gradient film. When footage exists, set `heroMedia` in `content/media.ts`. The JS source selection, poster and all fallbacks (reduced motion, Save-Data, Low Power Mode, a 2.5 s stall) are already wired.
- Products: refined line drawings per product family (`components/product/ProductPlaceholder.tsx`). Set `image` and `gallery` on a product to use photos.
- Refrigerator spotlight: an illustrated fridge with real steel, glass and matte finishes (`components/home/FridgeArt.tsx`).
- Jinpeng: an illustrated scooty (`components/mobility/ScooterArt.tsx`). Official imagery is pitch-only and needs the client to confirm rights.

To add the hero video once you have a clip (needs ffmpeg), run the commands in handoff §13.2 and output to `public/video/`.

Regenerate the grain tile or the favicons with `node scripts/grain.mjs` and `node scripts/icons.mjs`.

## Departures from the handoff (deliberate)

- **Constellation bounds** hug the actual city spread (lon 65.5–76, lat 24–35) instead of the national extent, so the map fills its canvas. It still has no country outline.
- **Range ring** is a dial around the whole `140–160 KM` numeral (desktop). A small ring around a two-number range was unreadable.
- **Muted text on ivory** is `#5F5D57` instead of `#6B6A64`. The original failed AA contrast on ivory-2 panels.
- **Navbar glass** keeps the spec's 0.72 obsidian. Over ivory sections it reads as warm grey.

## QA status (last run)

- `tsc`, `eslint` and `next build` all pass. All 50 routes are statically generated.
- Lighthouse, simulated mobile: Performance 84–87, Accessibility 96–97, CLS 0. Desktop Performance is 99.
- Simulated-mobile LCP is about 4 s, above the 2.5 s budget. Real video and photography will change this, so re-measure once they are in.
- The only remaining contrast flag is the "Made by Sorix" watermark, which §4.4 deliberately sets to 28% opacity.
- SEO scores about 63 because of `noindex`, which is intentional while `site.demoMode` is true.
- No horizontal overflow at 360 px on any route.
- Claims audit (§23) is clean. Every hit for "warranty", "hours" and similar is a placeholder, a review-only slot, or manufacturer data.

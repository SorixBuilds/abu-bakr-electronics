# Abu Bakr Electronics — demo website (V2)

Frontend-only pitch demo built from `../ABU_BAKR_ELECTRONICS_WEBSITE_HANDOFF.md` (V1) and `../ABU_BAKR_ELECTRONICS_IMPROVEMENTS_V2.md` (V2). Where they conflict, V2 wins. There's no backend, no prices and no invented business claims.

```bash
npm install
npm run dev      # http://localhost:3000 (the Claude preview uses port 4317)
npm run build    # runs scripts/check-assets.mjs first and fails if any photo or video is missing
npm start
```

Stack: Next.js 16 (App Router) · Tailwind v4 · Motion · Lenis · Embla · Radix Dialog · Vaul · cmdk · Zustand.

## Presenting

- Use normal mode for the walkthrough.
- Add `?review=1` to any URL for **Review Mode**: every unconfirmed item gets a `CLIENT TO CONFIRM` tag, and a pill opens the checklist. `?review=0` turns it off.
- The brand intro is a 600 ms monogram fade over the already-visible hero. It plays once per browser session and never blocks the page.

## Palette (V2 §3)

The tokens live in `app/globals.css`.

| Role | Token | Value |
|---|---|---|
| Main dark | `--obsidian` | `#0B0A0C` |
| Brand (wine) | `--wine-900 / 700 / 500` | `#2A0710 / #4A0D1B / #6E1426` |
| Action (cherry) | `--cherry / --cherry-hi` | `#B3122E / #D6243F` |
| Cherry as small text on dark | `--cherry-text` | `#EC5468` |
| Bright surfaces | `--porcelain / --ivory / --stone` | `#FAF8F5 / #F2EEE6 / #E6E0D6` |
| Detail only | `--gold` | `#C9A96A` (monogram and hairlines) |

Sections pick a theme with `theme-dark`, `theme-porcelain`, `theme-light` (ivory) or `theme-wine`. Components then use semantic colours such as `text-fg`, `bg-stage` and `text-accent-text`. The navbar switches to porcelain whenever it sits over a light section.

## Assets

Every visual is a real photo or video. There are no illustrations, and none can be used as a fallback. `npm run build` stops if a referenced file is missing.

| Where | Files | Source |
|---|---|---|
| Hero video | `public/video/hero.mp4` (1.1 MB), `hero-mobile.mp4` (0.3 MB, 9:16 crop), and posters extracted from the clip | Pexels video 19228420 (one of V2's listed alternates) |
| Categories, products, lifestyle, showroom | `public/images/{categories,products,lifestyle,showroom}` | Pexels photos. The IDs are in `content/media.ts` and in V2 §4.3; see "Decisions" below for the extra picks |
| Jinpeng models | `public/images/mobility/*.png` (transparent, trimmed) | jinpeng.com.pk model cards. **Pitch use only.** The client should request the Jinpeng dealer media kit before launch |

Pexels photos and videos may be used commercially without attribution. The raw source downloads sit in `.source/`, which git ignores.

**Swapping a photo:** replace the file and keep its name, or change the path in `data/products.ts` or `content/media.ts`. Use `imagePosition` on a product to change its crop.

**Re-encoding the hero video:** the project bundles `ffmpeg-static`. The commands are in V1 §13.2. For the mobile crop, use `crop=ih*9/16:ih:iw*0.18:0`.

## Decisions taken while implementing V2

- **Hero clip:** I didn't use V2's first pick (Pexels 34208839), because it's a vertical, handheld phone pan; V2's criteria reject shaky footage. I also rejected the Mixkit kitchen clip, which is bright daylight with a recognisable branded mixer. I chose 19228420: a steady slow move with a steel fridge and wall ovens clearly in shot. It's brighter than ideal, so the left overlay carries the copy.
- **Products without a usable photo were removed** (V2 §4.3). I found no clean chest-freezer, floor-standing AC, compact single-door fridge or top-load washer photo, so the demo now has 20 appliances and the 9 Jinpeng models.
- **"Aera 18 Noir" became "Aera 18 Quiet":** the available AC photos show a white unit, so a "matte black" product would contradict its own photo.
- **Extra Pexels picks for V2's open slots:**

  | Slot | Pexels photo ID(s) |
  |---|---|
  | Washer | 19846385 and 38525183 |
  | Air fryer | 29461935 |
  | Soundbar | 6020432 |
  | Speakers | 7772558 and 9842750 |
  | Vacuum | 12167653 |
  | Water dispenser | 18720050 |
  | Showroom | 38418429 and 13068364 |
  | Side-by-side fridge (also the Freshness tile) | 6835157 |
  | Steel fridge | 2343467 |
  | TV rooms | 8089078 and 34538286 |

  I rejected an Apple Store photo because the logo is visible.
- **Cherry as text on dark** uses `#EC5468`, because V2's `--cherry-hi` reaches only 3.9:1 on obsidian. Buttons and fills still use true cherry.
- **The range dial** around "140–160 KM" is cherry-hi instead of electric blue, which V2 removed.

## QA (last run)

- `tsc`, `eslint` and `next build` (including the asset guard) pass. All 46 routes are static.
- On the home page there are 36 `<img>` elements and 1 video, which autoplays. In a local production build the poster paints after about 0.55 s, and the first viewport shows the video, headline, cherry CTA and all four photo cards.
- Lighthouse, simulated mobile: Performance 84–88, Accessibility 100, CLS 0. Desktop home: Performance 100, Accessibility 100.
- Simulated-mobile LCP is about 4 s (Lighthouse's slow-4G throttling); desktop LCP is 0.8 s.
- No horizontal overflow at 360 px on any route.
- The claims audit is clean, and no product, room or vehicle illustrations remain in the code.

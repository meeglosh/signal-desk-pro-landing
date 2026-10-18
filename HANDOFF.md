# Handoff: signaldeskpro.com landing page

Last updated 2026-10-17. Live site is GitHub Pages from `main` (domain in `CNAME`).
The iOS app source lives in `~/signal-desk`; check product claims against that code, not its planning docs.

## What the page is

A single-page "retro hardware" design (`index.html`), built with the scroll-craft skill
and its engine (`scrollcraft.js` / `scrollcraft.css`, copied in, never edited; theme via CSS tokens).
The page behaves like the product: a working console you can hear.

Sections, top to bottom:
1. **Faceplate** – headline, two analog VU meters, pulsing **Power on** key, Silverplatter logo top-right,
   "Signal Desk Pro · for iPhone" label.
2. **Console** – 12 keycaps. Free and most Pro modes really process audio via Web Audio
   (matrix + filters); Pitch and Time are marked "App only". Tap again = A/B to Reference.
3. **Meters** – pinned horizontal rail of 9 meter cards; 7 draw live from the playing audio.
   Rail travel is driven by the engine's `--sc-p` plus a `--travel` var set in JS (not the engine's pan device).
4. **Sources** – pinned act; fake Dropbox sync log with invented file names (Harbor Lights, Kessler).
5. **Export / Library** – two phone screenshots that deal out on scroll, spec list.
6. **Plans** – Free / $4.99 mo / $29.99 yr / $99 lifetime.
7. **FAQ** – 7 questions; mirrored word for word in the FAQPage JSON-LD in `<head>`.
8. **Close** – "Coming soon on iOS", second power key, footer with Silverplatter logo + links.

Power on also: lights a warm "studio lamp" glow behind the faceplate, console deck and sync log
(`::before` pseudo-elements; parents need their own stacking context, see `.face`, `.console`).

## Demo audio

- Plays "Woven – Shellbox v1.08" (owner approved publishing the whole song), silence trimmed.
- Served scrambled as `assets/sd.bin`; the page unscrambles it in memory (xorshift keystream,
  seed `0x5d1a7c3b`, must match `tools/scramble-audio.mjs`). Deterrent only, not real protection.
- To replace: encode MP3 outside the repo, then `node tools/scramble-audio.mjs in.mp3 assets/sd.bin`.
  Never commit a plain MP3 (that's why history was squashed before the first push).
- Source AIF: `~/Library/CloudStorage/Dropbox-Flat7Inc./Michael Jerugim/Apps/Signal Desk Pro/_Boombox currents/`.

## Design decisions the owner made (keep them)

- Darkness of the first design pass is the target. Grain lives **only** in `.panel` backgrounds
  (two SVG-noise layers, dark + light, balanced so brightness doesn't shift). No grain on type or VU faces,
  no page-wide overlay, no vignette.
- Copy tone: Signal Desk is for **referencing and listening**, not finishing/mastering. Avoid "master",
  "finish".
- Silverplatter Audio is the maker: logo top-right of the faceplate, logo + link in footer,
  `silverplatteraudio.com`. Logo SVGs came from Dropbox `Silverplatter/Images and Logo/.../SPAudio_logos_white/SVG`.
- No Woven track titles in on-page text (screenshots still contain them, see below).

## SEO / AEO in place

Canonicals, Open Graph + Twitter tags, `assets/og-image.png` (1200×630 render of the faceplate),
JSON-LD graph (Organization, WebSite, MobileApplication with offers, FAQPage), `robots.txt`,
`sitemap.xml`, compressed screenshots in `assets/screen1.jpg`/`screen2.jpg`.

## Open items

- **Prices** ($4.99 / $29.99 / $99) come from the old site; confirm in App Store Connect / RevenueCat.
  They appear in the Plans section, the FAQ and the JSON-LD.
- **Google sign-in**: the site and privacy policy say "no Google sign-in", but the app still contains
  Google sign-in code and an OAuth URL scheme. Confirm it is unreachable.
- **Screenshots** (`screenshots/`, `assets/screen*.jpg`) are an older build: show 9 of 12 modes and
  "Woven" titles. Replace with fresh ones; regenerate the JPEGs with
  `sips -s format jpeg -s formatOptions 82 -Z 1100`.
- **App Store link**: when live, swap "Coming soon" for the App Store link and add the app ID
  to the MobileApplication JSON-LD.
- Submit `https://signaldeskpro.com/sitemap.xml` in Google Search Console.
- Not verified on a real iPhone (audio decode, touch scrolling, Low Power Mode).

## Verifying changes

Serve locally (`python3 -m http.server 4500`) and screenshot with Playwright at 1440×900 and 390×844.
Check the hero, console with power on, the meter rail mid-scroll, the pinned sync log, and the FAQ.

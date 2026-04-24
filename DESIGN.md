# Ten 2 Ten Stereo — Redesign Direction

## Positioning
Ten 2 Ten is the most trusted car audio and install shop in the San Gabriel Valley. Run by Pete. 15 years deep. Real installs, fair prices, and a soundsystem culture that's been bumping since the CD era. The redesign should feel like walking into a well-lit shop at night — dashboard glow, warm speaker cabinets, clean wiring, confidence.

## 1. Aesthetic Direction
**`industrial-utilitarian` crossed with a late-night dash-glow mood.**

Concrete-gray background, oil-stained charcoal, amber dash-light accents, generous negative space. This is a garage — not a software startup. Raw materials (noise texture, sharp corners, industrial monospace for stats), but with a single warm amber accent that reads as stereo glow / tail light / instrument cluster.

Fully committing — not blending with anything else.

## 2. Typography
Two Google fonts. Neither Inter, Roboto, Arial, Helvetica, Open Sans, Lato, nor Space Grotesk.

- **Display:** `Unbounded` — condensed-feeling display face with personality. Used for H1/H2 and big section numerals. Uppercase tracking for headers to channel an industrial equipment-panel feel.
- **Body:** `DM Sans` — clean, slightly rounded, highly legible at small sizes. Wide weight range.
- **Mono accents:** `JetBrains Mono` for stat counters, service codes ("SVC 01 / SVC 02"), and phone number display — reinforces the industrial/technical tone.

## 3. Color Palette
Derived from a late-night car-shop dashboard — warm amber instrument glow against cold concrete.

```css
--color-primary:    #F5A524;  /* amber — instrument glow / tail light */
--color-secondary:  #171717;  /* near-black — shop floor */
--color-accent:     #EA3C2D;  /* warning/brake red — used for urgent CTAs sparingly */
--color-surface:    #1C1C1C;  /* card/panel — darker than body bg */
--color-text:       #E8E4DC;  /* warm off-white — avoids pure white glare */
--color-muted:      #7A7A7A;  /* secondary text / dividers */
--color-bg:         #0E0E0E;  /* base background — oil-stained charcoal */
```

No Tailwind default blue, no generic green, no purple. Amber + red + near-black + warm off-white only.

## 4. Motion Strategy
- **Entry animations:** Stagger fade-up with small Y-offset (24px). Headlines letter-by-letter where impactful (hero only).
- **Hero headline:** Individual word slides up from below with 60ms stagger.
- **Scroll-triggered:** Number counters (100%, 15+) count up when in view. Service cards scale-in from 0.96 → 1.
- **Hover:** Service cards — amber top-border slides in from left. Buttons — amber background fills from left on hover, icon slides right. Images in grid — slight zoom (1.03) with 400ms ease.
- **Sticky mobile CTA:** Phone icon + "Call Pete" pill, persistent on mobile scroll.
- **Page transitions:** Subtle fade-in on route change. No route-change animations beyond fade.
- **No excessive motion** — this is a shop, not a portfolio site. Every animation earns its keep.

## 5. Layout Signature
**Oversized section numerals.** Every section opens with a massive monospace numeral (01 — 02 — 03 — 04) on the left edge, with the section content offset to the right. This is the memorable visual move — channels test-gear panel / amp face / module numbering. Combined with a thin amber rule that runs vertically between the numeral and content, it becomes the spine of the page.

Secondary: asymmetric service cards — some full-bleed image-left, some image-right, alternating — so the grid never feels like a cookie-cutter template.

## 6. Component System
- **Buttons:** Sharp corners (`rounded-none` or `rounded-sm`). Primary = amber on black with black text. Secondary = outlined amber. Hover = full amber fill.
- **Cards:** Surface color, 1px border in `muted`, no border-radius except `rounded-sm`. Top-border amber on hover.
- **Inputs:** Black background, amber bottom-border on focus, no rounded corners.
- **Dividers:** Hairline amber rules.
- **Badges:** Pill with amber outline, uppercase tracked mono text.

## 7. Imagery Treatment
- All images get a subtle dark overlay (5-15% black).
- Slight grain / noise texture on hero for shop-floor feel.
- Service photos displayed in 4:3 or 3:2 aspect — never perfectly square.
- Gallery grid uses asymmetric sizing (CSS grid with explicit spans).

## 8. Voice / Copy Principles
- Direct, no-bullshit. Short sentences. Names drop ("Ask for Pete").
- Lean into the local angle — "Azusa," "San Gabriel Valley," "SGV."
- Use specific brand mentions where appropriate (Kicker, Apple CarPlay, Class D amps) — the reviews already name-drop these.
- Every section ends with a call to action, but not the same words twice.

## 9. Inspirations (not to copy, but to feel)
- JBL / Pioneer dealer signage from the 90s
- Car-audio-magazine spreads from the era
- Modern industrial design agencies (Order, Wolff Olins case studies)
- Formula 1 team press kits

## 10. What this design is NOT
- Not another "friendly family business" pastel palette
- Not corporate blue + gradient
- Not overly tech-y (no glowing orbs, no dashboards)
- Not cute — this is a real garage, not a branding exercise

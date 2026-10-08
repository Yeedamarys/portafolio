---
name: Damarys León, Full Stack Developer
description: A one-page bilingual portfolio built as a glass display case of tiles on a night-wine ground.
colors:
  night: "#170912"
  ink: "#ffe9f3"
  ink-soft: "#ecc8db"
  ink-muted: "#c39ab1"
  neon: "#ff4fae"
  neon-soft: "#ff8fcb"
  chrome: "#d9d4e0"
  mint: "#5ef2b5"
typography:
  display:
    fontFamily: "'Unbounded Variable', system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 6vw, 5rem)"
    fontWeight: 600
    lineHeight: 0.92
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "'Unbounded Variable', system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  title:
    fontFamily: "'Unbounded Variable', system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body:
    fontFamily: "'Hanken Grotesk Variable', system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "'Hanken Grotesk Variable', system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.43
  signature:
    fontFamily: "'Caveat', cursive"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.1
rounded:
  chip: "8px"
  field: "12px"
  bar: "16px"
  tile-sm: "24px"
  tile-md: "28px"
  tile-lg: "32px"
  pill: "9999px"
spacing:
  gap-mobile: "16px"
  gap-desktop: "20px"
  tile-pad: "24px"
  tile-pad-md: "28px"
  tile-pad-lg: "36px"
  page-max: "1320px"
components:
  button-primary:
    backgroundColor: "{colors.neon}"
    textColor: "{colors.night}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "{colors.neon-soft}"
    textColor: "{colors.night}"
  button-secondary:
    backgroundColor: "rgba(255,255,255,0.04)"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "12px 20px"
  button-secondary-hover:
    backgroundColor: "rgba(255,255,255,0.08)"
  chip:
    backgroundColor: "rgba(255,79,174,0.08)"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.chip}"
    padding: "4px 10px"
  tab-selected:
    backgroundColor: "{colors.neon}"
    textColor: "{colors.night}"
    rounded: "{rounded.pill}"
    padding: "6px 14px"
  tab:
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.pill}"
    padding: "6px 14px"
  lang-toggle-selected:
    backgroundColor: "{colors.chrome}"
    textColor: "{colors.night}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  input:
    backgroundColor: "rgba(0,0,0,0.3)"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "10px 16px"
  tile:
    rounded: "{rounded.tile-md}"
    padding: "{spacing.tile-pad}"
---

# Design System: Damarys León, Full Stack Developer

## Overview

**Creative North Star: "Vitrina de cristal"**

The whole page is one glass display case. Tiles of smoked pink glass with thin neon edges sit on a night-wine ground over a faint pink grid, sized by importance so name, offer, projects and the CV action read in the first desktop viewport. The case is lit from above: every tile's top edge is brighter than its sides, and the three focal tiles (identity, monogram, projects) carry a stronger edge and a pink glow cast downward.

Density is high but calm: a 12-column bento, 20px gutters, generous tile padding, one accent hue doing almost all the work. The 3D smoked-glass DL monogram is the one sculptural object; everything else is flat type on glass. Motion is physical and small: tiles tilt toward the pointer, the monogram follows it on a spring, dialogs grow out of the element that opened them.

It rejects the long stack of full-width sections, the split hero, and rows of equal cards.

**Key Characteristics:**
- Night-wine ground, smoked pink glass tiles, 1px neon edges lit brighter on top.
- One accent family (neon pink) plus one cool counterpoint (chrome silver); mint is status only.
- Unbounded display over Hanken Grotesk text; Caveat appears once, as the signature.
- Radius scales with tile size (32 / 28 / 24px).
- Bilingual ES/EN with identical layout; nothing invented, no placeholder proof.

## Colors

A monochrome wine-to-pink world: every neutral is tinted toward the accent hue (OKLCH hue around 345), with chrome as the single cool note.

### Primary
- **Neon Pink** (neon): primary button fill, selected tab pill, last-name accent in the hero, highlight bullets, signature, focal tile edges (at 30-55% alpha), grid lines (at 7.5% alpha), text selection.
- **Soft Neon** (neon-soft): button hover fill, focus ring, dates and levels (languages, experience, education), lit top edge of tiles, inline icons, secondary emphasis lines.

### Secondary
- **Chrome Silver** (chrome): the one cool accent. Hero role line, "Highlights" subheads, education quote, secondary button border (35% alpha, 70% on hover), selected ES/EN segment, the monogram's specular light.

### Tertiary
- **Signal Mint** (mint): availability dot, WhatsApp icon, copied/sent confirmations. Status only, never decoration.

### Neutral
- **Night Wine** (night): page ground (on `html`), text on neon and chrome fills.
- **Blush Ink** (ink): headings and primary text (16.5:1 on night).
- **Rose Ink** (ink-soft): body copy, inactive tabs and nav (12.5:1).
- **Mauve Ink** (ink-muted): metadata, captions, footer, placeholders (7.8:1).

### Named Rules
**The One Hue Rule.** Every surface, neutral and line is a tint of the wine-pink hue; chrome is the only cool note and mint the only off-hue color, reserved for status.

**The Dark Text On Neon Rule.** Neon and chrome fills always carry night text, never white.

**The Paper Exception.** The CV dialog is a printable white sheet (white panel, slate text, Tailwind pink-700 accents) so it prints and reads as a document. That sub-palette lives only inside the CV.

## Typography

**Display Font:** Unbounded Variable (with system-ui, sans-serif)
**Body Font:** Hanken Grotesk Variable (with system-ui, -apple-system, sans-serif)
**Signature Font:** Caveat 700, used once

**Character:** A wide, geometric display face set tight and heavy against a warm, plain grotesk; the display carries identity, the grotesk carries information.

### Hierarchy
- **Display** (600, clamp 2.6rem to 5rem, 0.92, -0.035em): the name in the identity tile only; last name in neon.
- **Headline** (600, 1.5rem to 1.875rem at sm, -0.02em): the projects tile heading and dialog titles (1.5rem; the project dialog grows to 1.875rem at sm).
- **Title** (600, 1.25rem to 1.5rem at sm, -0.02em): every other tile heading and the active project name.
- **Display accents** (Unbounded 500, 1rem to 1.25rem): hero role line in chrome, about tagline, education quote.
- **Body** (400, 1rem to 1.125rem in the hero, 1.625): paragraphs, capped at 54-68ch.
- **Label** (600, 0.875rem): buttons, tabs, nav, field labels, subheads. Small metadata at 0.75rem. No uppercase tracking labels.
- **Signature** (Caveat 700, 2.25rem, rotated -2deg, neon): the name at the end of About.

### Named Rules
**The Two Voices Rule.** Unbounded for names, headings and the few display accents; Hanken Grotesk for everything read as information. Caveat appears exactly once.

**The Tabular Dates Rule.** Periods and counters use tabular figures.

## Layout

- **Container:** centered, max 1320px, 16px side padding (24px from sm). Header sticks to the top inside the same width.
- **Grid:** one column on mobile; 12 columns from lg (1024px), 16px gap mobile, 20px desktop.
- **Desktop composition:** row 1 identity (7 cols) beside monogram (5 cols); row 2 projects (8 cols) beside a stacked column of Languages over Education (4 cols); row 3 a 5-col stack of Experience over Skills beside a 7-col stack of About over Contact. In each stack the last tile grows to fill, so paired sides stay level.
- **Mobile order** (via order utilities; DOM order is desktop order): identity, projects, monogram, languages and education, experience and skills, about and contact.
- **Tile padding:** 24px base; 28px (sm) for mid tiles; 32-36px (sm) for focal tiles.
- **Breakpoints:** sm 640px (padding, two-column skills, lighter blur below), md 768px (desktop nav replaces the menu button), lg 1024px (12-col bento).
- **Anchors:** `scroll-padding-top: 6rem` and `scroll-mt-24` on tiles clear the sticky header.

## Elevation & Depth

Depth is material, not stacked shadows: translucent glass with backdrop blur over a fixed background of two radial glows (pink top-left at 24%, chrome bottom-right at 9%) and the grid, all parallaxing slightly on scroll. Every tile casts one soft dark drop; focal tiles add a downward pink glow.

### Shadow Vocabulary
- **Glass rest** (`inset 0 1px 0 rgba(255,233,243,0.08), 0 24px 48px -28px rgba(0,0,0,0.85)`): every tile and the header bar.
- **Glass lit** (`inset 0 1px 0 rgba(255,209,234,0.25), 0 22px 60px -30px rgba(255,79,174,0.6), 0 24px 48px -28px rgba(0,0,0,0.85)`): identity, monogram, projects only.
- **Neon button glow** (`0 10px 30px -12px rgba(255,79,174,0.9)`): primary buttons.
- **Dialog** (`0 40px 80px -30px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,79,174,0.12)`): glass dialogs over a `rgba(11,3,8,0.75)` blurred backdrop.

### Named Rules
**The Lit From Above Rule.** Glass edges are 1px neon; the top edge is always brighter than the sides (50% vs 30% at rest, 80% vs 55% lit).

**The Three Lit Tiles Rule.** Only the focal tiles (identity, monogram, projects) get the lit treatment; adding it elsewhere flattens the hierarchy.

**The Grid Behind Glass Rule.** The faint two-axis pink grid (56px cells, 7.5% alpha, radially masked) is native to this world, requested by the owner, and lives only in the fixed background and the 3D monogram's refraction backdrop.

## Shapes

Soft, large radii that scale with the container: 32px focal tiles, 28px mid tiles and dialogs, 24px small tiles, 16px header bar, list rows and images, 12px fields, 8px chips, full pills for buttons, tabs and toggles. Inner structure uses 1px hairlines (`white/6-8%`) rather than nested cards: a project's highlights column is separated by a hairline, not boxed.

## Components

### Buttons
Rounded pills, semibold 14px label, optional 16px Lucide icon, 200ms color transitions, press scale 0.97 (none with reduced motion).
- **Primary:** neon fill, night text, 12px 20px, neon glow; hover soft neon.
- **Secondary:** 4% white fill, 1px chrome border at 35%, ink text; hover border 70%, fill 8%.
- **Quiet:** text only in ink-soft, hover ink (hero "write me" sits flush with the content edge).
- **Header CV:** compact neon pill (8px 14px padding, 12px bold) with a download icon.
- **Contact links:** pill, 10% white border, 4% fill; hover neon border 50% and neon fill 10%.

### Chips
Technology tags: 8px radius, neon fill 8%, neon border 20%, ink-soft 12px semibold text. Static, never interactive.

### Tabs (projects)
A pill track (black 25%, neon border 20%, 4px inset) of pill tabs. The selected tab has a neon pill that slides between tabs on the snappy spring; text turns night. Roving tabindex, Arrow/Home/End keys. Panels swap with a 24px directional slide; on touch they swipe (60px offset or 400px/s velocity).

### Cards / Containers (Tiles)
- **Material:** glass (gradient `rgba(62,22,47,0.5)` to `rgba(31,11,25,0.46)`, blur 16px saturate 140%; 10px/130% under 640px).
- **Corner Style:** by size, see Shapes.
- **Shadow Strategy:** Glass rest, or Glass lit for focal tiles.
- **Behavior:** on fine pointers, tilts up to 3.5deg toward the pointer with a soft-neon glare that follows it; the monogram tile does not tilt.

### Inputs / Fields
12px radius, black 30% fill, neon border 25%, ink text, ink-muted placeholder. Focus: neon border plus a 2px neon ring at 30%. Labels above in ink-soft semibold with "(required)" in muted. Success notice mint-tinted, error notice neon-tinted with a mailto fallback link.

### Navigation
Sticky glass bar (16px radius) with the DL initials badge, anchor links (ink-soft, hover ink on 6% white), ES/EN segmented toggle (selected segment chrome with night text), sound toggle (off by default), CV button. Below md the anchors move into a glass dropdown behind a menu button (Escape closes).

### Dialogs
Portal, fixed, 28px radius, max 768px (576px for experience and contact). Glass tone: near-opaque wine panel with neon border 30%. Paper tone: white printable CV. Grows from the triggering element's rect (scale and translate from top-left over 350ms smooth), content fades in after; exits back into it on the sharp curve. Focus moves to `[data-autofocus]` or the close button, Tab is trapped, Escape and backdrop close, body scroll locks with scrollbar compensation, focus returns to the trigger. Print shows only the CV sheet.

### Glass Monogram (signature)
A three.js extrusion of the DL monogram in smoked pink physical glass (transmission 0.95, IOR 1.5, pink attenuation, clearcoat) with soft-neon edge lines, lit by a pink and a chrome point light, refracting a pink-grid backdrop. It follows the pointer on a damped spring with a slow idle sway and bob. An SVG version from the same geometry (pink gradient body, chrome sheen, blush stroke) shows first and crossfades out when the 3D renders.
- **Load rules:** never on reduced motion, Save-Data, 4 or fewer CPU cores, or no WebGL. Otherwise lazy-imported only after the tile intersects and the page is idle (1.5s idle timeout, 400ms fallback). Pixel ratio capped at 1.75, low-power GPU.
- **Run rules:** the render loop stops off screen and in hidden tabs; frame delta is clamped so it never jumps; everything disposes on unmount.

### Motion Grammar
Durations instant 80ms, fast 180ms, normal 350ms, slow 600ms. Easing smooth `cubic-bezier(0.22,1,0.36,1)` for entrances, sharp `cubic-bezier(0.4,0,0.2,1)` for exits. One page-load stagger: tiles rise 16px and fade in 600ms, 60ms apart. Springs: snappy (300/30) for the tab pill, pointer (150/18, mass 0.6) for tilt and glare. Optional sound chimes on open and copy, off until the visitor enables them.

**The Reduced Motion Rule.** With `prefers-reduced-motion`: no tilt, glare, parallax, slides, rise, press scale or dialog growth; fades shorten to 150-180ms; smooth scrolling off; the monogram stays the static SVG.

### Accessibility
WCAG AA: every text token clears 7:1 on night except neon (6.3:1). Skip link to main, labelled landmarks and tiles, 2px soft-neon focus outline offset 3px, decorative icons `aria-hidden`, monogram exposed as one labelled image, live region for copy confirmation, `lang` on language buttons.

## Do's and Don'ts

### Do:
- **Do** build every new block as a glass tile in the 12-col bento, sized by importance, radius matched to its size (32 / 28 / 24px).
- **Do** keep the lit treatment to the three focal tiles and the top-edge-brighter rule on all glass.
- **Do** use neon for the single primary action in a tile and secondary pills for the rest.
- **Do** open details as a dialog that grows from the element that triggered it, with the full focus contract.
- **Do** gate any new motion on reduced motion and any new 3D on the monogram's load and run rules.
- **Do** write every string in both ES and EN and keep the layout identical across languages.

### Don't:
- **Don't** stack full-width sections, split heroes, or rows of identical cards.
- **Don't** add new hues; tint any new neutral toward the wine-pink hue and keep mint for status.
- **Don't** put white text on neon or chrome fills.
- **Don't** nest boxed cards inside tiles; separate inner columns with hairlines.
- **Don't** add uppercase eyebrow labels or kickers above headings.
- **Don't** invent proof (screenshots, metrics, demos, repos) that does not exist.
- **Don't** let the 3D block content or load before the page is idle.


## Visible refresh (October 2026)

The identity tile now has a compact availability badge, two individually revealed name lines,
a role line, a larger primary CTA with a circular arrow, and a separate location/contact row.
The night-wine and pink identity, real content, bilingual behavior and monogram remain the foundation.

Project tabs are four numbered selector cards: two columns on phones, four from 640px.
The selected card receives a shared-layout illuminated surface; fine-pointer hover lifts it
5px and scales it to 1.025. The detail area has an inset dark surface with clear title,
metadata, outcome, technology tags and actions. No project imagery or proof is invented.

Each tile reveals once when 12% enters the viewport: 28px rise over 600ms, with 85ms
content stagger. Hero text uses individual 22px/500ms reveals. Navigation enters from above,
the active link shares a sliding highlight, and mobile links appear 45ms apart.
Buttons lift 3px on hover and compress to 0.97 on press. Reduced motion removes translation,
scaling and stagger. This supersedes the page-load-only stagger and pill-tab presentation above.

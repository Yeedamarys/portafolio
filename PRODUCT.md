# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Recruiters and hiring managers evaluating a junior/semi-senior Full Stack Developer, in equal measure:

- Companies in Ecuador hiring locally (Spanish-speaking, familiar with SRI electronic invoicing and Odoo).
- International companies hiring remotely (English-speaking, scanning for stack, real production work, and English level).

They usually arrive from a CV, LinkedIn, or a direct link, often on a phone, and spend seconds deciding whether to keep reading.

## Product Purpose

Personal portfolio of Damarys León, Full Stack Developer based in Quito, Ecuador. Its job is to get her contacted for a junior/semi-senior Full Stack role: show what she has built, her stack, her experience, and make the CV and contact one click away. Success means a recruiter understands who she is and what she builds without long scrolling, and reaches out.

## Positioning

Production work for real clients in Ecuador's business software space: electronic invoicing signed and validated with the SRI, an Odoo 17 ERP admin module, and a corporate site with a real-time self-managed admin panel, plus a Flutter mobile app built with Clean Architecture.

## Operating Context

- Visitors compare her against other junior/semi-senior candidates, often from a phone.
- Contact paths: WhatsApp, email, contact form (Formspree when configured, otherwise the visitor's email app), LinkedIn, GitHub.
- The CV is viewed in a dialog and printed or saved as PDF from the browser.

## Capabilities and Constraints

- Stack: React 19, TypeScript, Vite 6, Tailwind CSS 4, motion, Express server for serving.
- Bilingual: English and Spanish with a visible ES/EN switch. Both languages carry the same content.
- Must work well on mobile, respect `prefers-reduced-motion`, stay accessible (keyboard, screen readers, contrast), and load fast.
- Contact form delivery depends on `VITE_FORMSPREE_ID`; without it, the form hands the message to the visitor's email app.

## Brand Commitments

- Name: Damarys León. Monogram: "DL".
- Pink is her identity color and must remain the primary color.
- Handwritten signature (Caveat) appears in the About and CV.
- Quote: "Technology can also be a way to create a better world" / "La tecnología también puede ser una forma de crear un mundo mejor".

## Evidence on Hand

- Real content in `src/data/portfolioData.ts`: profile, four projects (Narubi invoicing & POS, Perfor Construcciones corporate site & CMS, SODI CORP Odoo 17 module, Flutter mobile app), skills, three work experiences, education (Software Engineering, ESPE, 8th semester), languages (Spanish native, English B2).
- No project screenshots, live demos, or public repositories yet. Do not fabricate them; layouts must look complete without images and accept them later.
- No testimonials, metrics, or client logos. Do not invent GitHub statistics, performance numbers, or rankings.

## Product Principles

1. Work first: projects are visible in the first viewport, not buried after decoration.
2. Every claim must be checkable or plainly stated; no invented numbers.
3. Less scrolling: the important information fits in one or two screens on desktop; details open on demand.
4. Equal footing for both audiences: Spanish and English versions are complete, not one translated as an afterthought.
5. Expressive but fast: visual effects never block the content or the contact action.

## Accessibility & Inclusion

WCAG 2.2 AA as the target: keyboard operable dialogs with focus management, labeled form fields, 4.5:1 text contrast, reduced-motion fallbacks for all 3D, tilt, and parallax effects.

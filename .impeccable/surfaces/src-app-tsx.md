---
version: 1
slug: "src-app-tsx"
primary_target: "src/App.tsx"
related_targets: []
---

Scope: the whole portfolio page (single route). Visitor mode: Experience (the work leads from the first viewport).

Audience and job: recruiters in Ecuador and remote international companies decide in seconds whether to contact Damarys. Action: open a project, open the CV, contact. Proof: four real projects, three jobs, stack. No screenshots, demos, or public repos yet; nothing may be invented.

Constraints: bilingual ES/EN switch; mobile first-class; prefers-reduced-motion; WCAG AA; fast load (3D lazy-loaded, never blocks content).

## Direction contract

THESIS: "Vitrina de cristal": the whole portfolio is one glass display case of tiles, so a recruiter reads name, offer, projects, and the CV action without scrolling. It refuses the long stack of full-width sections with a split hero and a row of equal cards.

OWN-WORLD: Night-wine ground (#170912), smoked pink glass tiles with 1px neon-pink edges (#FF4FAE), one chrome-silver accent (#D9D4E0), a faint pink grid behind everything. Unbounded for display, Hanken Grotesk for text, Caveat only for the signature. Tiles vary in size by importance; radius scales with tile size.

STORY: The visitor sees who she is and what she builds, picks a project from tabs inside the projects tile, opens details that grow out of the tile, then opens the CV or writes to her.

FIRST VIEWPORT: Desktop 1440x900: compact header (DL, anchors, ES/EN, CV). Row 1: identity tile (7 cols: name, role, one-line offer, primary actions "See projects" and "CV") beside the 3D glass DL monogram tile (5 cols). Row 2 starts inside the viewport: projects tile (8 cols, tabs for the four projects) beside skills and languages. Mobile: identity tile, then projects as a swipeable tile, then the rest stacked.

FORM: Bento display case, user-approved Proposal A (pinned by the user; concept-seed not run because the direction was pinned). Seed key: none (user-pinned).

SIGNATURE INTERACTION: the glass DL monogram turns toward the pointer with spring physics; project details expand out of the projects tile as a shared element transition; tiles tilt up to 4 degrees with a glare that follows the pointer. One orchestrated page-load stagger. Reduced motion: no transforms, static monogram.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

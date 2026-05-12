---
name: ННКІТІ Web Portal
description: Dark-mode academic portal for the National University of Water and Environmental Engineering's Institute of Computer and Innovative Technologies (ННКІТІ, Рівне, Ukraine)

colors:
  # ── Surfaces ────────────────────────────────────────────────────────────────
  background: "#000000"
  surface: "#080808"
  surface-dim: "#000000"
  surface-bright: "#1a1a1a"
  surface-container-lowest: "#000000"
  surface-container-low: "#0a0a0a"
  surface-container: rgba(255, 255, 255, 0.02)
  surface-container-high: rgba(255, 255, 255, 0.04)
  surface-container-highest: rgba(255, 255, 255, 0.08)
  # ── Text ────────────────────────────────────────────────────────────────────
  on-surface: "#ffffff"
  on-surface-variant: "#9ca3af"
  on-surface-subtle: "#6b7280"
  on-surface-dim: "#4b5563"
  # ── Borders ─────────────────────────────────────────────────────────────────
  outline: rgba(255, 255, 255, 0.08)
  outline-variant: rgba(255, 255, 255, 0.20)
  outline-strong: rgba(255, 255, 255, 0.25)
  # ── Primary (white-on-black system) ─────────────────────────────────────────
  primary: "#ffffff"
  on-primary: "#000000"
  primary-container: rgba(255, 255, 255, 0.10)
  on-primary-container: "#ffffff"
  # ── Accent palette (contextual, not role-based) ──────────────────────────────
  accent-blue: "#3b82f6"
  accent-blue-light: "#60a5fa"
  accent-purple: "#8b5cf6"
  accent-purple-light: "#a78bfa"
  accent-pink: "#ec4899"
  accent-pink-light: "#f472b6"
  accent-green: "#10b981"
  accent-green-light: "#34d399"
  accent-cyan: "#22d3ee"
  accent-amber: "#f59e0b"
  accent-orange: "#fb923c"
  accent-yellow: "#facc15"
  # ── System ──────────────────────────────────────────────────────────────────
  header-bg: rgba(0, 0, 0, 0.70)
  footer-bg: "#080808"
  error: "#ef4444"
  success: "#10b981"

typography:
  # All sizes use CSS clamp() anchored to a 1920 px reference viewport.
  # Format: clamp(mobile-min, vw-at-1920, desktop-max)
  hero:
    fontFamily: Open Sans
    fontSize: "clamp(48px, 6.4583vw, 124px)"
    fontWeight: "800"
    lineHeight: "0.90"
  display:
    fontFamily: Open Sans
    fontSize: "clamp(40px, 5.0000vw, 96px)"
    fontWeight: "800"
    lineHeight: "0.90"
  headline-lg:
    fontFamily: Open Sans
    fontSize: "clamp(28px, 3.3333vw, 64px)"
    fontWeight: "700"
    lineHeight: "1.05"
  headline-md:
    fontFamily: Open Sans
    fontSize: "clamp(24px, 2.5000vw, 48px)"
    fontWeight: "700"
    lineHeight: "1.15"
  headline-sm:
    fontFamily: Open Sans
    fontSize: "clamp(20px, 1.9792vw, 38px)"
    fontWeight: "700"
    lineHeight: "1.20"
  title-lg:
    fontFamily: Open Sans
    fontSize: "clamp(18px, 1.6667vw, 32px)"
    fontWeight: "600"
    lineHeight: "1.30"
  title-md:
    fontFamily: Open Sans
    fontSize: "clamp(16px, 1.2500vw, 24px)"
    fontWeight: "600"
    lineHeight: "1.40"
  body-lg:
    fontFamily: Open Sans
    fontSize: "clamp(14px, 1.0417vw, 20px)"
    fontWeight: "400"
    lineHeight: "1.50"
  body-md:
    fontFamily: Open Sans
    fontSize: "clamp(12px, 0.8333vw, 16px)"
    fontWeight: "400"
    lineHeight: "1.40"
  label:
    fontFamily: Open Sans
    fontSize: "clamp(11px, 0.6250vw, 12px)"
    fontWeight: "600"
    lineHeight: "1.40"
    letterSpacing: 0.25em

rounded:
  # Fluid radii scale with viewport alongside the type and spacing systems
  sm: "clamp(6px, 0.6250vw, 12px)"
  md: "clamp(12px, 1.2500vw, 24px)"
  lg: "clamp(16px, 1.6667vw, 32px)"
  xl: "clamp(24px, 2.0833vw, 40px)"
  # Fixed radii for pixel-precise UI chrome
  fixed-sm: 8px
  fixed-md: 12px
  fixed-lg: 16px
  fixed-xl: 24px
  full: 9999px

spacing:
  # Fluid spacing — same 1920 px anchor as typography
  xs: "clamp(4px, 0.4167vw, 8px)"
  sm: "clamp(8px, 1.2500vw, 24px)"
  md: "clamp(16px, 2.0833vw, 40px)"
  lg: "clamp(24px, 3.1250vw, 60px)"
  xl: "clamp(32px, 4.1667vw, 80px)"
  2xl: "clamp(48px, 6.2500vw, 120px)"
  3xl: "clamp(64px, 8.3333vw, 160px)"
  # Layout chrome
  container-padding-mobile: "max(16px, 4.27vw)"
  container-padding-tablet: "max(20px, 3.13vw)"
  container-padding-desktop: "max(24px, 2.08vw)"
  section-gap-mobile: "min(80px, 21.33vw)"
  section-gap-tablet: "min(120px, 15.63vw)"
  section-gap-desktop: "max(80px, 10.42vw)"
  header-height: 64px

motion:
  fast: "150ms ease"
  base: "200ms ease"
  slow: "300ms ease"
  enter: "700ms ease"
  photo-zoom-duration: 500ms
  page-transition-duration: 300ms
  section-enter-offset: 24px

components:
  header:
    height: 64px
    backgroundColor: rgba(0, 0, 0, 0.70)
    backgroundImage: "linear-gradient(180deg, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.50) 50%, rgba(0,0,0,0.30) 100%)"
    backdropBlur: 12px
    position: fixed
    zIndex: 100
  card:
    backgroundColor: rgba(255, 255, 255, 0.02)
    borderColor: rgba(255, 255, 255, 0.08)
    borderWidth: 1px
    rounded: "{rounded.fixed-xl}"
    transition: "border-color 200ms ease, background-color 200ms ease, transform 300ms ease"
  card-hover:
    backgroundColor: rgba(255, 255, 255, 0.04)
    borderColor: rgba(255, 255, 255, 0.20)
    transform: translateY(-4px)
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    padding: "8px 24px"
    typography: "{typography.label}"
  button-ghost:
    backgroundColor: transparent
    borderColor: rgba(255, 255, 255, 0.15)
    textColor: "{colors.on-surface-variant}"
    rounded: "{rounded.full}"
    padding: "6px 16px"
    typography: "{typography.label}"
  button-ghost-hover:
    backgroundColor: rgba(255, 255, 255, 0.05)
    borderColor: rgba(255, 255, 255, 0.30)
    textColor: "{colors.primary}"
  pill-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    padding: "6px 16px"
  pill-inactive:
    backgroundColor: transparent
    borderColor: rgba(255, 255, 255, 0.15)
    textColor: "{colors.on-surface-subtle}"
    rounded: "{rounded.full}"
  nav-item:
    backgroundColor: transparent
    textColor: "{colors.on-surface-subtle}"
    rounded: 8px
    padding: "10px 12px"
    typography: "{typography.body-md}"
  nav-item-active:
    backgroundColor: rgba(255, 255, 255, 0.08)
    textColor: "{colors.primary}"
    fontWeight: "600"
    accentBarWidth: 2px
    accentBarColor: "{colors.accent-purple-light}"
  input-field:
    backgroundColor: rgba(255, 255, 255, 0.05)
    borderColor: rgba(255, 255, 255, 0.10)
    textColor: "{colors.primary}"
    rounded: 12px
    padding: "12px 16px"
    typography: "{typography.body-lg}"
  input-field-focus:
    backgroundColor: rgba(255, 255, 255, 0.08)
    borderColor: rgba(255, 255, 255, 0.25)
  eyebrow-label:
    textColor: "{colors.on-surface-subtle}"
    typography: "{typography.label}"
    textTransform: uppercase
    letterSpacing: 0.25em
  photo-card:
    overflow: hidden
    rounded: 12px
    imageHoverScale: 1.05
    imageHoverDuration: 500ms
    overlayDefault: rgba(0, 0, 0, 0)
    overlayHover: rgba(0, 0, 0, 0.30)
  sidebar-panel:
    backgroundColor: rgba(255, 255, 255, 0.02)
    borderColor: rgba(255, 255, 255, 0.08)
    borderWidth: 1px
    rounded: 12px
    padding: 16px
  footer:
    backgroundColor: "#080808"
    accentLineColor: "linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)"
    accentLineHeight: 1px
    preFadeHeight: 64px
    preFadeGradient: "linear-gradient(0deg, rgba(8,8,8,1) 0%, transparent 100%)"
---

## Brand & Vision

ННКІТІ (Навчально-науковий інститут комп'ютерних та інноваційних технологій та економіки) is an IT-focused academic institute within the National University of Water and Environmental Engineering in Рівне, Ukraine. The portal serves students, prospective entrants, alumni, faculty, and the public.

The visual identity communicates **technological authority** and **academic prestige** through an uncompromising dark aesthetic. The interface feels like looking at code in a premium IDE — deep black backgrounds, razor-thin white borders, and precise fluid type. Colour is used sparingly and intentionally: each content domain (a department, event type, or statistic) receives a single saturated accent from a rotating palette, keeping the interface alive without sacrificing the austere base.

## Color System

The entire palette rests on a single, total-black canvas (`#000000`). There is no light mode. Surfaces are not defined by grey values but by **white-alpha opacity layers** stacked on black:

| Role | Value | Use |
|---|---|---|
| Base background | `#000000` | Page, body |
| Card resting | `rgba(255,255,255,0.02)` | All card/panel backgrounds |
| Card hover | `rgba(255,255,255,0.04)` | Hovered/focused cards |
| Selected / active | `rgba(255,255,255,0.08)` | Active nav items, selected states |
| Subtle lift | `rgba(255,255,255,0.10)` | Input focus backgrounds, image overlays |
| Border resting | `rgba(255,255,255,0.08)` | All card borders at rest |
| Border hover | `rgba(255,255,255,0.20)` | Card borders on hover |
| Footer surface | `#080808` | Slightly lifted from pure black |

**Text hierarchy** uses Tailwind's gray scale, anchored at pure white for primary content and dimming through three steps:

- Primary text: `#ffffff` — headings, values, active labels
- Secondary text: `#9ca3af` (gray-400) — body paragraphs, descriptions
- Tertiary text: `#6b7280` (gray-500) — metadata, section labels, captions
- Disabled / copyright: `#4b5563` (gray-600)

**Accent colours** rotate across a fixed palette of seven saturated values. Each is applied per-section or per-entity (department, team member, gallery event, statistic block) and used exclusively for: top accent lines on cards, badge backgrounds at `${accent}20` opacity, badge borders at `${accent}50`, icon tints, gradient text endpoints, and radial glow effects at `${accent}18` opacity.

```
Blue    #3b82f6 / light #60a5fa
Purple  #8b5cf6 / light #a78bfa
Pink    #ec4899 / light #f472b6
Green   #10b981 / light #34d399
Cyan    #22d3ee
Amber   #f59e0b
Orange  #fb923c
```

No single accent colour dominates the entire product. The rotation ensures each section feels individually branded while the shared black base maintains unity.

## Typography

A single typeface — **Open Sans** — is used at all scales. The choice prioritises clarity and neutrality over personality; the design's character comes entirely from scale, weight, and colour rather than font expression.

### Fluid Scale

All type sizes use `clamp()` with the 1920 px desktop as the vw reference point. Text scales continuously from mobile-minimum to desktop-maximum with no breakpoint jumps:

| Token | Mobile min | Desktop max | Typical use |
|---|---|---|---|
| `fluid-hero` | 48 px | 124 px | Page hero titles |
| `fluid-6xl` | 40 px | 96 px | Large display |
| `fluid-5xl` | 32 px | 80 px | Section displays |
| `fluid-4xl` | 28 px | 64 px | Section headings (H1) |
| `fluid-3xl` | 24 px | 48 px | Card headings (H2) |
| `fluid-2xl` | 20 px | 38 px | Sub-headings (H2/H3) |
| `fluid-xl` | 18 px | 32 px | Title-level labels |
| `fluid-lg` | 16 px | 24 px | Large body, card titles |
| `fluid-base` | 14 px | 20 px | Body text |
| `fluid-sm` | 12 px | 16 px | Secondary body, captions |
| `fluid-xs` | 11 px | 12 px | Eyebrow labels, badges |

### Weight Usage

- **800 (Extra Bold)** — Hero headings, site logotype, stat numbers
- **700 (Bold)** — Section headings, card titles
- **600 (Semi Bold)** — Navigation items, eyebrow labels, buttons, badge text
- **400 (Regular)** — All body paragraphs, descriptions

### Heading Pattern

Nearly every content section follows a two-line heading pattern:

```
ПРО ІНСТИТУТ                    ← eyebrow: fluid-xs, 600 weight, tracking-[0.25em], text-gray-500
Хто ми насправді                ← headline: fluid-4xl, 700 weight, white
         ^^^^^^^^                 ← last word or phrase uses gradient-text treatment
```

The gradient-text treatment clips a `linear-gradient(to right, accent-A, accent-B)` as text fill, adding the only chromatic variation to an otherwise monochrome heading line.

## Layout & Spacing

### Container

A full-width container (`container-base`) uses fluid horizontal padding via `var(--container-px)` — no fixed max-width. Content breathes proportionally with the viewport rather than snapping at arbitrary breakpoints.

### Spacing Scale

All gap, padding, and margin utilities are fluid, sharing the same vw-anchor as the type scale. This means spacing relationships are preserved proportionally at every viewport size — a gap that is half a heading's size on mobile remains half that heading's size on a large monitor.

### Section Rhythm

Page sections are separated by a `--section-gap` variable (80 px → 200 px fluid), creating a long, breathable scroll. Individual content blocks within sections use the `gap-fluid-md` to `gap-fluid-xl` utilities. The overall feel is generous vertical whitespace — never cramped.

### Grid Patterns

- **Hero layouts**: full-bleed photo with gradient overlay, text bottom-anchored
- **Content grids**: `grid-cols-1 → sm:grid-cols-2 → lg:grid-cols-3 → xl:grid-cols-4` responsive progression
- **Split layouts** (history, department overview): `lg:grid-cols-2` with photo on one side, text on the other, alternating for even/odd blocks
- **Sidebar + main**: `flex` row with `lg:w-64 xl:w-72` sticky sidebar, `flex-1 min-w-0` main content
- **Featured gallery**: 4-column grid, first photo spanning `col-span-2 row-span-2` for editorial emphasis

## Elevation & Depth

This design system uses **no traditional drop shadows**. Depth is expressed entirely through:

1. **White-alpha surface layers** — higher opacity = more elevated
2. **Border opacity** — `rgba(255,255,255,0.08)` at rest, `rgba(255,255,255,0.20)` on hover, `rgba(255,255,255,0.25)` on focus
3. **Backdrop blur** — used only for the fixed header (`backdrop-blur-md`, 12 px) and photo count badges (`backdrop-blur-sm`, 4 px)
4. **Subtle translate-Y on hover** — cards lift `translateY(-4px)` to imply physical elevation

The header receives special treatment: it uses both a dark gradient background and `backdrop-blur-md` to create a frosted-glass effect over whatever page content scrolls beneath it, without any visible border or shadow line.

## Shapes & Borders

All interactive surfaces (cards, panels, inputs, photo containers) use the **fluid radius system**, so corners soften proportionally as the viewport grows — a card that is `12 px` rounded on mobile becomes `24 px` rounded on a large display.

Fixed radii appear for pixel-precise UI elements: navigation item rows (`8 px`), department sidebar items (`rounded-lg` = `8–12 px`), and avatar circles (`rounded-full`).

**Border style** is always `1 px solid` at white-alpha opacity — never coloured, never thicker. Colour information on card edges is reserved for explicit **accent lines**: a 2 px horizontal bar at the top of a highlighted card, rendered in the entity's assigned accent colour.

**Pill shapes** (`rounded-full`) are used for all interactive filter controls (year selector tabs, language switcher, badge labels), creating a clear visual distinction from content cards.

## Motion & Animation

### Page Transitions

Entering pages animate from `filter: blur(10px); opacity: 0` to `blur(0); opacity: 1` over **300 ms**. This blur-in gives navigation a premium, cinematic feel rather than a simple fade.

### Scroll-Driven Section Reveals

Every content section mounts invisible (`opacity: 0; transform: translateY(24px)`) and enters when scrolled into the viewport: `opacity: 1; transform: translateY(0)` over **700 ms**. Staggered children use `transition-delay` in 60–120 ms increments so grids cascade rather than pop in simultaneously.

### Hover Micro-interactions

| Element | Interaction | Duration |
|---|---|---|
| Cards | `translateY(-4px)` + border lighten | 300 ms |
| Photos | `scale(1.05)` | 500 ms |
| Nav links | `translateX(1px)` arrow nudge | 200 ms |
| Sidebar lines | width `w-3` → `w-5` | 200 ms |
| Card caption | `translateY(100%)` → `translateY(0)` slide-in | 300 ms |
| Ghost buttons | border + text lighten | 200 ms |

All transitions use the default `ease` timing function. No spring or bounce physics.

### Gradient Animation

Statistic blocks use a continuously animating `background-position` keyframe (`GradientShift`, 10 s, infinite) on their gradient background — the only perpetual animation in the system, used to draw attention to key numbers on the home page.

## Component Patterns

### Cards

The single most-used component. All cards follow the same base: `rgba(255,255,255,0.02)` fill, `1 px rgba(255,255,255,0.08)` border, `rounded-xl` or `rounded-2xl` radius. On hover the border lightens to `0.20` and the card lifts `4 px`. Accent-coloured cards also receive a top `h-0.5` accent bar and a `radial-gradient` hover glow.

### Sidebar Navigation

Used on the Department page. Two stacked panels (department list, section anchors) inside `rounded-xl` containers. Active items receive `bg-white/[0.08]`, bold text, and a `2 px` vertical accent bar on the left edge. The sidebar itself is `position: sticky; align-self: start` — not the inner wrapper.

### Eyebrow + Heading + Rule

Every major section starts with:
```
[ EYEBROW UPPERCASE LABEL ]        ← xs, gray-500, tracking-[0.25em]
[ Large Heading with Gradient ]    ← 2xl–4xl, bold, gradient last word
[ thin gradient rule line ]        ← 1 px, from accent to transparent
```

### Photo Overlay Cards

Photo containers hide a text caption below the visible area (`translateY(100%)`). On hover the image zooms (`scale(1.05)`) and the caption slides up. An `rgba(0,0,0,0)` overlay darkens to `rgba(0,0,0,0.30)` simultaneously to improve caption legibility.

### Accent Badges / Pills

Used for tags, specialties, year labels, program codes. Background: `${accent}20` (20 % opacity). Border: `${accent}50`. Text: solid accent colour. Always `rounded-full`. This three-layer approach (tinted fill + semi-transparent border + solid text) keeps badges readable at any accent hue without adding visual noise.

### Form Inputs (Ask Question page)

Fields use `rgba(255,255,255,0.05)` backgrounds with `rgba(255,255,255,0.10)` borders. On focus the field activates a coloured accent border (the field's specific accent) and a subtle glow. A `focusedField` state in the parent provides a full-height highlight bar on the left edge of the active field's wrapper.

### Lightbox (Gallery)

Full-screen `fixed` overlay at `z-200`, `bg-black/95 backdrop-blur-sm`. The image is constrained to `85 vw / 85 vh`. Keyboard navigation (←/→/Escape) is always active. A counter pill (`{n} / {total}`) is centred at top. Arrow buttons use `bg-white/10 hover:bg-white/20` to remain discoverable without competing with the photo.

## Image & Media Treatment

All photography is displayed with `object-cover`, cropped to the container. Portrait photos use `object-top` to keep faces visible.

**Hero overlays** always use a vertical gradient darkening toward black at the bottom where text sits: `from-transparent via-black/40 to-black` or `from-black/20 via-black/40 to-black` depending on photo brightness.

**Person avatars** use circular crops (`rounded-full`) with a `ring-2` border in the entity's accent colour at reduced opacity (`ring-blue-500/40`). On elevated contexts (team leadership cards) the ring increases to `ring-4` on hover.

**Gallery masonry** uses CSS `columns` (not CSS Grid) for a true variable-height layout. Wide photos render at `aspect-[3/2]`; portrait photos at `aspect-[2/3]`. The random alternation produces an organic, editorial rhythm without requiring server-side image dimension knowledge.

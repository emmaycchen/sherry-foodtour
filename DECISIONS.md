# Technical Decisions

A running log of the technical decisions made while building the Sherry's Food
Tour landing page. Each entry captures the context, the decision, the reasoning,
and the outcome so future work (and future contributors) can understand *why*
the project looks the way it does.

> Note: dates reflect when these decisions were documented (2026-06-10). The
> underlying work was carried out over the preceding days.

---

## Decision: Project setup — Next.js 16 App Router + Tailwind v4 + TypeScript

**Date:** 2026-06-10
**Context:** We needed a foundation for a marketing/landing site that renders a
Figma design faithfully, loads fast, and is easy to iterate on. The repo began
as a stock `create-next-app` (App Router, JavaScript).
**Decision:** Build on **Next.js 16.2.6** with the **App Router** (`app/`),
**React 19**, **Tailwind CSS v4** (via `@tailwindcss/postcss`, configured
through the CSS-first `@theme` block in `app/globals.css`), and **TypeScript**
for component code. Entry files (`app/layout.js`, `app/page.js`) stayed as JS
from the scaffold; new components are authored in `.tsx`.
**Reason:** App Router gives us Server Components by default and first-class
`next/font` + `next/image` support, which matter for a media-heavy landing page.
Tailwind v4's `@theme` block lets us declare the Figma design tokens (brand
colors, font families) in one place. TypeScript on the components catches prop
and markup mistakes early without forcing a full JS→TS migration of the
scaffold.
**Result:** A working App Router site. `app/page.js` composes nine section
components; design tokens live in `app/globals.css`; Google fonts (Open Sans,
Instrument Sans, Work Sans) plus a local font (Gveret Levin) are wired in
`app/layout.js`. AGENTS.md flags that this Next.js version has breaking changes,
so we consult `node_modules/next/dist/docs/` before using unfamiliar APIs.

---

## Decision: Use the Figma MCP server instead of manual screenshots

**Date:** 2026-06-10
**Context:** The design exists in Figma. We had to get from that design to code,
and the two realistic options were (a) eyeball screenshots and recreate layout
and styling by hand, or (b) connect to the design programmatically via the
Figma MCP server.
**Decision:** Use the **Figma MCP server** as the source of truth for layout,
spacing, colors, typography, and assets — not manual screenshots.
**Reason:** Screenshots only give an approximate visual; every measurement,
color, and font has to be guessed and re-checked by eye, which is slow and
error-prone. The MCP server exposes the *actual* design data — exact hex values,
spacing, font families, and exportable assets — so the build matches the design
instead of approximating it.
**Result:** Brand colors were lifted directly from the design (see the
`/* Brand colors (from Figma) */` block in `app/globals.css`:
`--color-gold: #ffd700`, `--color-cream`, `--color-sage`, `--color-ink`, etc.),
and the typography stack maps Figma's fonts to CSS variables. Components use the
real values (e.g. the Hero CTA's `#FFD700` gold) rather than approximations.

---

## Decision: Add a proper `tsconfig.json` (replacing `jsconfig.json`)

**Date:** 2026-06-10
**Context:** The scaffold shipped with a `jsconfig.json` because it was a
JavaScript project. Once we started writing components in `.tsx`, the editor and
Next.js needed real TypeScript configuration — type checking, JSX handling, and
the `@/*` path alias were not being honored.
**Decision:** Remove `jsconfig.json` and add a **`tsconfig.json`** configured for
Next.js 16: `strict: true`, `jsx: "react-jsx"`, `moduleResolution: "bundler"`,
`allowJs: true`, the `next` TS plugin, and a `@/*` → `./*` path alias. Add the
TypeScript toolchain to `devDependencies` (`typescript`, `@types/node`,
`@types/react`, `@types/react-dom`).
**Reason:** `jsconfig.json` and `tsconfig.json` are mutually exclusive — Next.js
uses the TS config when TypeScript is present and ignores the JS one. Keeping
both (or only the JS one) meant type checking and the path alias silently didn't
work. `allowJs: true` is the key setting: it lets the leftover `.js` entry files
(`layout.js`, `page.js`) coexist with `.tsx` components without forcing a full
conversion.
**Reason it counts as a "fix":** the mismatch between `jsconfig.json` and `.tsx`
files was producing editor/build type errors; switching to `tsconfig.json` with
`allowJs` resolved them.
**Result:** TypeScript now type-checks the `.tsx` components, the `@/*` alias
resolves, and the JS scaffold files still compile. `jsconfig.json` is deleted in
git status; `tsconfig.json` is the new untracked file.

---

## Decision: Download images via Figma MCP into `public/images/`

**Date:** 2026-06-10
**Context:** The design includes photography (hero, tour locations, "the deets"
gallery), brand marks (logo, founder photo), and a set of UI/feature icons. We
needed these as real files the app can serve, and the choice was again MCP
export vs. manually saving images out of Figma.
**Decision:** **Export/download assets through the Figma MCP server** straight
into `public/images/`, keeping Figma's intended formats — `.png`/`.jpg` for
photography, `.svg` for icons and simple vector graphics.
**Reason:** MCP export pulls the assets at the right resolution and format
directly from the design, avoiding the quality loss, wrong crops, and naming
drift that come from manually screenshotting or re-saving by hand. Serving them
from `public/` lets `next/image` optimize the raster photos at request time.
**Result:** `public/images/` holds the photography (`hero.png`, `dadaocheng.png`,
`ningxia.png`, `ximen.png`, `deets_1..3.jpg`), brand assets (`logo.png`,
`sherry.png`), and vector icons (`icon-phone.svg`, `icon-whatsapp.svg`,
`icon-instagram.svg`, `icon-menu.svg`, `icon-play.svg`,
`icon-check-circle.svg`, plus the `why-*` feature assets). Components reference
them through `next/image` (e.g. `<Image src="/images/hero.png" fill priority />`
in `Hero.tsx`).

> Housekeeping: macOS AppleDouble sidecar files (`._*`) accompany these assets on
> this volume and should be excluded from git (e.g. via `.gitignore`) rather than
> committed.

---

## Decision: One component per design section under `app/components/`

**Date:** 2026-06-10
**Context:** The landing page is a single long scroll made of distinct visual
sections. We needed a structure that maps cleanly to the design and keeps each
section independently editable.
**Decision:** Split the page into **one `.tsx` component per Figma section**,
all living in `app/components/`, and compose them top-to-bottom in
`app/page.js`. Components are **React Server Components** by default (no
unnecessary `"use client"`). Section-local data (e.g. the Hero's stats array) is
declared as a plain const inside its component.
**Reason:** A component-per-section structure keeps each part of the page small,
self-contained, and easy to locate against the design. Server Components keep the
client bundle minimal for what is largely static marketing content. `page.js`
reads as a table of contents for the whole page.
**Result:** Nine components — `Navbar`, `Hero`, `WhyUs`, `HotTours`, `TheDeets`,
`MeetFoodie`, `Testimonials`, `BookingForm`, `Footer` — composed in `page.js`
inside a `Navbar / <main> / Footer` shell. `layout.js` provides the font
variables and a `min-h-full flex flex-col` body so the footer sits correctly.

---

## Decision: Mobile-first responsive layout with Tailwind breakpoints

**Date:** 2026-06-10
**Context:** The site has to look right from small phones up to large desktops,
and the Figma design specifies a wide (1440px) desktop canvas. We needed a
consistent responsive strategy across every section.
**Decision:** Author styles **mobile-first** using Tailwind's default breakpoint
prefixes (`sm`, `md`, `lg`). Base (unprefixed) classes target the smallest
screens; larger breakpoints layer on bigger spacing, type scale, and layout.
Content is centered in a `max-w-[1440px]` container matching the Figma frame,
with padding that steps up per breakpoint.
**Reason:** Mobile-first is Tailwind's native model — unprefixed = smallest, then
min-width overrides — which keeps the responsive intent readable and avoids
desktop-down overrides. Capping at `1440px` honors the design's canvas while
letting the layout scale down fluidly.
**Result:** Every section scales across breakpoints. The Hero is representative:
padding (`px-6 pt-28` → `sm:px-10` → `md:px-16` → `lg:px-20 lg:min-h-[1030px]`),
heading type (`text-3xl` → `sm:text-5xl` → `md:text-6xl` → `lg:text-[72px]`), and
the CTA button (`h-12 w-56` → `sm:h-14 w-64` → `md:h-[70px] w-[300px]`) all step
up with the same mobile-first pattern.

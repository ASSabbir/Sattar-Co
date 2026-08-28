# Sattar&Co. — Website (Demo Build)

A premium, animated Next.js website for Sattar&Co., built from the SRS you provided.
Minimal editorial design, dark/light sections, GSAP + Framer Motion scroll animations,
Tailwind CSS. All content currently comes from demo JSON files so you can preview the
whole site before real content and photography are ready.

This README assumes you know **React** but are new to **Next.js** — every Next.js-specific
concept is explained.

---

## 1. Install & run

You need [Node.js](https://nodejs.org) version 18 or newer installed on your computer.

```bash
# 1. Unzip this project, then open a terminal inside the folder
cd sattar-co

# 2. Install all dependencies (reads package.json, downloads everything into node_modules)
npm install

# 3. Start the local dev server
npm run dev
```

Open **http://localhost:3000** in your browser. Save any file and the page updates instantly
(hot reload), same as Create React App / Vite.

To build the production version:

```bash
npm run build
npm run start
```

---

## 2. How this differs from plain React (quick primer)

- **File-based routing.** There's no `react-router`. Every folder inside `app/` becomes a
  URL. `app/team/page.tsx` is the page at `/team`. `app/team/[slug]/page.tsx` is a dynamic
  route — `[slug]` becomes whatever the URL segment is (e.g. `/team/sameer-sattar`), and you
  read it via the `params` prop.
- **Server vs. Client Components.** By default, every component in `app/` runs on the server
  and is *not* interactive (no `useState`, no `onClick`). Any component that needs
  interactivity, animation, or browser APIs starts with `"use client"` at the very top of the
  file — you'll see this at the top of `Navbar.tsx`, `Hero.tsx`, `ContactForm.tsx`, etc. If you
  add a new interactive component and forget this line, you'll get an error telling you to add it.
- **`layout.tsx`** wraps every page (it's where the `<Navbar />`, `<Footer />` and fonts live).
  **`template.tsx`** re-runs on every page change — that's what drives the page-transition fade.
- Everything else (components, props, Tailwind classes, hooks) works exactly like the React you
  already know.

---

## 3. Where to edit content

All real content lives in **`/data/*.json`** — no code changes needed to update text:

| File | Controls |
|---|---|
| `data/firm.json` | Hero statement, "The Firm" intro copy, stats, about paragraphs |
| `data/practiceAreas.json` | The 6 practice-area categories and their sub-areas |
| `data/team.json` | Every team member: name, role, group, bio, practice areas |
| `data/recognition.json` | Directory names (Chambers, Legal 500...) and quotes |
| `data/insights.json` | Insights/articles list |
| `data/news.json` | News & Events list |

Add a new team member by adding a new object to `data/team.json` with a unique `slug` —
their profile page at `/team/that-slug` is generated automatically, no new file needed.
Same for `insights.json` and `news.json`.

---

## 4. Where to add real photography

Every image in the site is currently a **placeholder** — an elegant gradient block with a
small caption (e.g. "Dhaka — Firm Exterior") showing what photo belongs there. This was done
deliberately per the brief (no stock photography, no generic legal imagery) so the layout can
be reviewed before real photography is ready.

Look for `<Plate label="..." />` in the components — that's the placeholder. To swap in a real
photo:

1. Drop the image file into `/public/images/`.
2. Replace the `<Plate .../>` with Next.js's built-in `<Image />` component, e.g.:

```tsx
import Image from "next/image";

<Image
  src="/images/dhaka-office.jpg"
  alt="Sattar&Co. office, Dhaka"
  fill
  className="object-cover"
/>
```

`next/image` automatically handles the WebP/AVIF conversion, lazy loading and responsive
sizing the SRS asks for — you don't need to configure anything extra for local images.

---

## 5. Where the animation lives

- **`components/hero/Hero.tsx`** — the homepage's opening GSAP timeline (wordmark → headline →
  background → nav → scroll cue), matching the SRS's suggested hero sequence.
- **`components/ui/RevealText.tsx`** — reusable "line rises into view on scroll" component,
  used for most headlines across the site.
- **`components/sections/PracticeAreasInteractive.tsx`** — the signature interaction: scroll
  past a practice-area category on the left, and the sticky panel on the right crossfades to
  match. This is the site's answer to Likova's scroll-driven storytelling, built for legal
  content instead of Likova's own visuals.
- **`components/providers/SmoothScrollProvider.tsx`** — sets up Lenis (inertia smooth
  scrolling) and keeps it in sync with GSAP's ScrollTrigger.
- All animation respects `prefers-reduced-motion` — if a visitor has that OS setting on,
  Lenis and the GSAP timelines are skipped or shortened automatically.

---

## 6. What's included vs. what's next

This zip is a **frontend demo**: every page, animation and layout described in the SRS is
built and works with realistic placeholder content. Not included yet (these are later phases
in the SRS's own roadmap — Phase 5 "Content System" and beyond):

- A real CMS / admin panel (content currently comes from the JSON files above)
- A working contact-form backend (the form currently shows a confirmation message but
  doesn't send anywhere — see `components/sections/ContactForm.tsx` for where to add a real
  API call)
- Real photography (see §4)
- Global search
- Authentication / admin roles

## 7. Project structure

```
app/                      Pages (file-based routing)
  page.tsx                 Home
  firm/                    The Firm
  practice-areas/           Practice Areas
  team/                     Team + team/[slug] profile pages
  insights/                 Insights + insights/[slug] articles
  news/                     News + news/[slug] articles
  contact/                   Contact
  disclaimer/                Legal Disclaimer
  layout.tsx                Root layout (fonts, nav, footer)
  template.tsx               Page-transition wrapper
  globals.css                 Global styles, design tokens as CSS

components/
  navigation/                Navbar + mobile menu
  hero/                       Homepage hero
  sections/                    Homepage + page sections
  ui/                           Small reusable pieces (RevealText, Plate, ArrowLink...)
  footer/                        Footer
  providers/                      Smooth-scroll provider

data/                       Demo content (JSON) — edit here for text changes
lib/                        Small helpers (GSAP setup, class-name helper)
```

---

Questions or want something adjusted (colors, fonts, animation timing, page structure)? Every
token lives in one place — `tailwind.config.ts` for colors/type scale, `globals.css` for the
grain/texture and reveal mechanics — so most visual changes are small, contained edits.

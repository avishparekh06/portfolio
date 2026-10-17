# Portfolio v2: Scroll-Driven 3D Journey

Date: 2026-10-16

## Goal

Redesign the portfolio so a single continuous Three.js scene changes as the visitor scrolls. The camera flies along a path, and each section (hero, about, experience, projects, contact) is a stop in the journey. Content stays the same, except where the current resume (`public/resume.pdf`) differs from the site.

## Decisions (agreed)

- **Concept:** journey. The camera travels along a curve through one small "world" per section.
- **Look:** keep the cream clay palette (cream canvas; pink, teal, lavender, peach, ochre, mint accents). Soft, matte, clay-like 3D shapes. Not dark or cosmic.
- **Tech:** react-three-fiber + drei on the existing React 19 / Vite / Tailwind setup. framer-motion stays for HTML reveals.
- **Out of scope:** new copy, new pages, a CMS, model/asset downloads (all shapes are primitives).

## Architecture

- One fixed full-screen `<Canvas>` behind the page. HTML sections scroll over it as normal, selectable, accessible content.
- A single scroll progress value (0 to 1) drives the camera, lighting, background tint, scroll progress bar and nav active-section highlight.
- Camera follows a smooth `CatmullRomCurve3` through five waypoints, one per section. Lighting and background color interpolate between per-section palettes, staying within the cream family.
- Shapes use a shared clay material (matte, soft shading), float gently and react slightly to the pointer.

### File layout

- `src/scene/Scene.jsx`: canvas, lights, background, composes the worlds.
- `src/scene/CameraRig.jsx`: scroll-to-camera-path logic.
- `src/scene/ClayMaterial.jsx`: shared material.
- `src/scene/worlds/{HeroWorld,AboutWorld,ExperienceWorld,ProjectsWorld,ContactWorld}.jsx`
- `src/scene/useScrollProgress.js`: shared scroll value.
- `src/components/*`: HTML sections, restyled to sit over the scene.
- Remove `src/components/ThreeBackground.jsx` (unused, replaced).

## Worlds

- **Hero:** large pink clay blob with orbiting spheres, reacting to the pointer. Camera starts far back and pushes in.
- **About:** lavender and mint shapes like floating stepping stones; camera drifts sideways past them.
- **Experience:** winding path of teal and ochre blocks, one per role in order (Visa, RealWork, Soche, CodeAssist); each role card lines up with its block.
- **Projects:** one floating peach/coral clay tile per project (MyToyota, Pintos, charmV5) in an arc; the nearest tile tilts and glows slightly as its card comes into view.
- **Contact:** shapes settle into a calm cluster around a soft ring; camera pulls back and slows; warmest cream background.

## HTML overlay

- Same sections and copy. Cards use a semi-transparent cream background with a slight blur for readability.
- Content alternates left/right so the 3D objects stay visible on the opposite side.
- Shared reveal animations (fade-up, stagger, heading underline draw) via framer-motion.
- Scroll progress bar at top; nav highlights the active section from the shared scroll value.

## Content corrections (from the updated resume)

Source of truth is `public/resume.pdf`. Changes from the current site copy:

- About / Education: replace "Major in Mathematics · Minor in Business" with "Minor in Statistics and Data Science".
- Coursework: remove "Probability & Statistics"; add "Cloud Native Computing".
- Experience (RealWork, first bullet): "Condensed reporting workload by 40%..." to match the resume wording.
- Skills (Databases): add SQLite.
- Experience tags (Soche): remove "OpenAI API", which the resume does not mention.
- Everything else (GPA 3.89, graduation May 2028, all other bullets, dates, project text, contact details, links) already matches.

## Performance and fallbacks

- Mobile / low-power: lower pixel ratio, fewer shapes, no postprocessing.
- Rendering pauses when the tab is hidden.
- Shared geometry, instancing where useful; primitives only, no downloads.
- `prefers-reduced-motion`: camera snaps between static per-section views; floating and pointer effects disabled.
- No WebGL: plain cream gradient background; all content still works.
- Three.js / r3f in a lazy-loaded chunk so HTML content paints first.

## Verification

- `npm run build` and `npm run lint` pass.
- Check in the dev server at desktop and phone widths; confirm smooth scrolling frame rate; confirm reduced-motion and no-WebGL fallbacks; re-diff site copy against the resume.

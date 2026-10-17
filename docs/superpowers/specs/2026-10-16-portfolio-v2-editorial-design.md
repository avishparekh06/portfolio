# Portfolio v2: Editorial Motion Redesign

Date: 2026-10-16. **Supersedes** `2026-10-16-portfolio-v2-3d-journey-design.md` and its plan (the 3D scroll scene was dropped).

## Direction (agreed)

Reference: Huy Phan portfolio animation (Dribbble 19108355). Full restyle to match its language; no Three.js.

- **Look:** light gray page, black ink, hairline dividers. Giant mixed type: italic serif (Instrument Serif) beside tight medium sans (Inter Tight). Tiny uppercase micro-labels. No cards, no color accents.
- **Loader:** full-screen first-visit loader with a line-art mascot (own drawing, not the reference artist's), a cycling icon above its head, "Loading... NN%", mascot tumbles, overlay slides away. Shown once per session; reduced-motion gets a short fade.
- **Section transitions:** between sections a scroll-linked black "curtain": a thin black band expands to full screen, the section title (first letter italic serif, rest sans) is revealed inside it, then the curtain scrolls away into the next section.
- **Content layout:** editorial rows separated by hairlines (About, "Works" = experience, Projects), hover inverts a row to black. Giant "Let's talk." contact.
- **Monitor:** the whole site sits inside a monitor on a gray stage (header text above; black bezel with camera dot, thicker chin with logo, vents and power LED; tapered metallic neck, oval foot, desk with keyboard and mouse). The screen is the scroll container and everything inside sizes with container units (`cqw`/`cqh`). Below 900px wide (or 520px tall) the mockup is dropped and the window is the screen.
- **Nav:** pinned to the top of the screen; solid gray on the page and solid black while a curtain is open.

## Content

Source of truth is `public/resume.pdf`. Same sections and ids (`home`, `about`, `experience`, `projects`, `contact`). Corrections vs the old site: minor in Statistics and Data Science (not "Major in Mathematics, Minor in Business"); coursework drops "Probability & Statistics", adds "Cloud Native Computing"; SQLite added to databases; RealWork first bullet starts "Condensed"; Soche tags no longer list "OpenAI API".

## Constraints

Accessibility: respect `prefers-reduced-motion` (no curtain animation, short loader); real text throughout; keyboard-reachable links. Build and lint must pass.

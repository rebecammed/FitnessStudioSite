# Fitness Studio Landing Page

Static landing page for a fitness studio. Built with plain HTML5 and CSS3.

<!--
  To do:
  - After the group meeting, update the studio name in the "About" section.
  - Fill the "Tech decisions" once the CSS is finished.
  - Add screenshots for Monday's presentation.
-->

## About

A single-page, responsive landing page for a fitness studio. It presents the
class schedule, trainer bios as cards, and membership tiers as pricing cards.

The visual design is aligned with a group of 4 peers working on the same brief,
but every line of code in this repository is written by me.

<!--
  After the meeting:
  - Replace "a fitness studio" with the real name (ej. "PULSO Studio").
  - If the team decides on a common claim, add it here.
-->

## Live preview

<!-- Add link if deployed -->

## How to view it

1. Clone the repository and open `index.html` in any modern browser.

```bash
git clone https://github.com/tu-usuario/fitness-studio-site.git
cd fitness-studio-site
```

2. Open `index.html` in a browser, or use a local server:
3. Then double-click `index.html`, or right-click it and choose "Open with" →
   your browser.

## Tech stack

- **HTML5** — semantic landmarks, single `h1`, working anchor navigation
- **CSS3** — Flexbox and Grid for different layouts, custom properties for
  colors and spacing, mobile-first responsive
- **No frameworks, no build step**

## Project structure

```
.
├── index.html
├── css/
│   ├── variables.css    # design tokens (colors, spacing, typography)
│   └── styles.css       # layout and components
├── assets/              # images (if any)
├── .gitignore
└── README.md
```

## Sections

1. Navbar
2. Hero
3. About the studio
4. Class schedule
5. Trainers
6. Membership tiers
7. Testimonials
8. Contact
9. Footer

## Tech decisions

<!-- Fill out when the CSS is finished -->

- **CSS Grid** used for: _[pending]_
- **Flexbox** used for: _[pending]_
- **Design tokens** live in `css/variables.css` so the shared look with the
  group can be adjusted in one place
- **Mobile-first** approach: base styles target small screens, media queries
  progressively enhance for tablet and desktop
- **No horizontal scroll** verified at 375px, 768px and 1280px

## Accessibility

<!-- Fill out when the HTML is finished -->

- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`
- Single `<h1>` per page
- Form labels associated with inputs via `for` / `id`
- Navigation links use real anchors to section IDs

## What I would improve with more time

<!-- Fill out when the project is finished: -->

- [ ] Add real photography and testimonials
- [ ] Add a working contact form backend
- [ ] Add keyboard navigation for the schedule tabs

## Author

Rebeca Martínez Medina
[(https://github.com/rebecammed)]

## License

This project was built as part of a practicum program. All rights reserved.

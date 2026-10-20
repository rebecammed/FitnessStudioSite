# Fitness Studio Landing Page

Responsive landing page for a fitness studio. Built with React, Vite and Tailwind CSS.

## About

A single-page landing page for a fitness studio, originally built as a static
HTML/CSS site and rebuilt with React + Tailwind in Week 2 of the practicum.

The visual design is aligned with a group of 4 peers working on the same brief,
but every line of code in this repository is written by me.

## Live preview

> ⏸️ **Temporarily unavailable.** During Week 3 the project is being split into a `client/` and a `server/` structure. The live demo will be back once the refactor is complete and deployed on Vercel (frontend) and Railway (backend).
>
> The previous version was hosted on GitHub Pages. It has been deactivated as part of this refactor.

## How to view it

```bash
npm install
npm run dev
```

Then open http://localhost:5173 in a browser.

## Tech stack

- **React** — component-based UI with `useState` for interactive state
- **Vite** — dev server and build tool
- **Tailwind CSS v4** — utility-first styling with custom design tokens

## Project structure

```
.
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── Schedule.jsx
│   │   ├── ClassCard.jsx
│   │   ├── Trainers.jsx
│   │   ├── TrainerCard.jsx
│   │   ├── StarRating.jsx
│   │   ├── Pricing.jsx
│   │   ├── PriceCard.jsx
│   │   ├── Contact.jsx
│   │   ├── About.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   └── data.js         # All site content as arrays of objects
│   ├── assets/             # Background image and trainer photos
│   ├── App.jsx             # Composes all sections
│   ├── index.css           # Tailwind import and custom theme tokens
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Sections

1. Header with a mobile hamburger menu
2. Hero with background image
3. Class schedule with a day filter
4. Trainers with a star rating
5. Membership tiers
6. Contact form
7. About the studio
8. Footer

## State management

Two components use `useState` to manage interactive state.

### Day filter in Schedule

`Schedule.jsx` uses `useState` to track the selected day, starting at `'Mon'`.
The component renders one button per day. Clicking a button calls
`setSelectedDay(day)`, which updates the state and triggers a re-render.
On each render, the classes array is filtered with
`classes.filter((c) => c.day === selectedDay)`, and only the matching rows
are rendered.

### StarRating controlled component

`StarRating.jsx` is a small controlled component reused inside every
`TrainerCard`. It has two pieces of state: `rating` (the confirmed value)
and `hover` (the star the mouse is currently over). Each of the five stars
is a button with `onClick` to set the rating and `onMouseEnter` /
`onMouseLeave` to update the hover. The colour condition
`star <= (hover || rating)` decides which stars are highlighted. Each
`StarRating` instance has its own state, so rating one trainer doesn't
affect the others.

## Tech decisions

- **Component structure** — one component per section, plus small reusable
  child components (`ClassCard`, `TrainerCard`, `PriceCard`, `StarRating`)
  for repeated items.
- **Data separated from JSX** — all content lives in `src/data/data.js` as
  arrays of objects. Components import what they need and render it with `.map()`.
- **Design tokens in Tailwind** — custom colours and fonts defined in
  `src/index.css` via `@theme`, so a change in one place updates the whole site.
- **Mobile-first responsive** — classes without a prefix target mobile;
  `sm:`, `md:` and `lg:` progressively enhance for larger screens.
- **No horizontal scroll** — verified at 375, 768 and 1280 pixels using
  `document.documentElement.scrollWidth > document.documentElement.clientWidth`
  in DevTools.

## Accessibility

- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`
- Single `<h1>` per page
- Form labels associated with inputs via `htmlFor` / `id`
- Visible focus states on form fields
- `aria-label` on icon-only buttons (hamburger menu, star rating)
- `scroll-padding-top` on `html` to prevent the sticky header from covering
  content when navigating with anchor links

## What I would improve with more time

- Connect the contact form to a backend
- Persist the star ratings in local storage
- Add keyboard navigation for the star rating (arrow keys)
- Add a subtle fade-in animation on section scroll

## Author

Rebeca Martínez Medina
[github.com/rebecammed](https://github.com/rebecammed)

## License

This project was built as part of a practicum program for Mayerfeld Consulting during october 2026. All rights reserved.

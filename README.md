# Veloce Motors 🏎️

> Elite Luxury & Supercar Showroom — A fully responsive single-page application built with vanilla HTML, CSS, and JavaScript.

**Live Site:** [hamza641-sys.github.io](https://hamza641-sys.github.io)

---

## Project Structure

```
AutoMobile Showroom/
├── index.html        → Main HTML structure (SPA layout)
├── style.css         → All styles, themes, animations, responsive breakpoints
├── script.js         → All JavaScript: routing, slider, calculator, forms
├── README.md         → Project documentation
└── assets/
    └── favicon.svg   → Site favicon
```

---

## Features

- **SPA Hash Router** — 10 pages (Home, About, Services, Gallery, Team, Financing, Reviews, FAQ, Contact, Reservation) with smooth transitions
- **Dark / Light Theme** — Toggle with localStorage persistence
- **Hero Slider** — Auto-advancing fullscreen image carousel with Ken Burns effect
- **Fleet Gallery** — 6 luxury/supercar listings with category filter and image lightbox
- **EMI Calculator** — Real-time installment estimator with vehicle selector and down payment slider
- **Vehicle Reservation** — Reserve any car directly from gallery, pre-fills reservation form
- **Test Drive Booking** — Pre-fills contact form with selected vehicle details
- **FAQ Accordion** — Expandable Q&A with live search filter
- **Contact Form** — Validated inquiry form with toast notifications
- **Address → Map Scroll** — Clicking address jumps to embedded Google Maps
- **Stats Counter** — Animated count-up on scroll using IntersectionObserver
- **Newsletter Form** — Email subscription with validation
- **Premium Loader** — Animated hexagon + car icon splash screen
- **AOS Animations** — Scroll-triggered entrance animations throughout
- **404 Page** — Glitch animation with canvas particle background
- **Fully Responsive** — Mobile-first, tested from 360px to 1440px+

---

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Semantic structure, SPA layout |
| CSS3 | Custom properties, Grid, Flexbox, animations |
| Vanilla JavaScript (ES6+) | SPA routing, all interactivity |
| [AOS](https://michaeleskin.com/aos/) | Scroll animations |
| [Font Awesome 6](https://fontawesome.com/) | Icons |
| [Google Fonts](https://fonts.google.com/) | Outfit + Inter typefaces |
| [Unsplash](https://unsplash.com/) | Car & team photography |
| [Google Maps Embed](https://maps.google.com/) | Showroom location map |

---

## Pages / Sections

| Route | Section |
|---|---|
| `#home` | Hero slider + stats counters |
| `#about` | Legacy story + milestones timeline |
| `#services` | 4 showroom service cards |
| `#gallery` | Fleet gallery with filter + lightbox |
| `#team` | 4 team member cards |
| `#finance` | EMI installment calculator |
| `#reviews` | 3 client testimonials |
| `#faq` | Searchable FAQ accordion |
| `#contact` | Contact form + Google Maps |
| `#checkout` | Vehicle reservation form |

---

## Getting Started

No build tools required. Just open `index.html` in any modern browser:

```bash
# Clone the repo
git clone https://github.com/hamza641-sys/AutoMobile-Showroom.git

# Open directly
start index.html
```

Or serve locally with any static server:

```bash
npx serve .
# or
python -m http.server 5500
```

---

## Author

**Hamza** — [@hamza641-sys](https://github.com/hamza641-sys)

---

*© 2026 Veloce Motors. All Rights Reserved.*

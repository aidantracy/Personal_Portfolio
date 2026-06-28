# Aidan Tracy — Personal Portfolio

A fast, static personal portfolio showcasing my software development and
cybersecurity work. Built with plain HTML, CSS, and JavaScript so it loads
instantly and is trivial to host. Deployed on GitHub Pages.

**Live site:** https://aidantracy.github.io/Personal_Portfolio/

## Features

- Two equally-weighted tracks: **Software Development** and **Cybersecurity**
- Dark / light theme toggle (respects your OS preference)
- Responsive layout with a mobile nav
- Working contact form via [Formspree](https://formspree.io) (no backend to maintain)
- Scroll-reveal animations and accessible, semantic markup

## Tech

HTML5 · CSS3 (custom properties, grid) · vanilla JavaScript · Formspree · GitHub Pages

## Project structure

```
.
├── index.html        # single-page site
├── css/style.css     # theme tokens + all styling
├── js/main.js        # theme toggle, nav, form, scroll reveal
├── assets/           # images and résumé PDF
└── README.md
```

## Setup notes (things to finish)

1. **Contact form** — create a free form at [formspree.io](https://formspree.io),
   then replace `YOUR_FORM_ID` in the form `action` in `index.html` with your
   endpoint (e.g. `https://formspree.io/f/abcdwxyz`).
2. **Résumé** — drop your résumé in `assets/Aidan_Tracy_Resume.pdf` so the
   "Download Résumé" button works.
3. **LinkedIn** — the LinkedIn links point to `linkedin.com/in/aidantracy`;
   update them in `index.html` if your handle differs.
4. **Certifications** — update the Cybersecurity section as you earn certs.

## Running locally

Just open `index.html` in a browser, or serve it:

```
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

© Aidan Tracy

# Badri Vishal Kasuba — Personal Website

### 🔗 Live: **https://kasuba-badri-vishal.github.io/**

Source for the personal portfolio of **Badri Vishal Kasuba** — Senior Compiler Engineer at Quadric.io
(joining Amazon as an SDE II in 2026) and MS-by-Research from IIT Bombay.

A hand-built, dependency-free static site: refined light theme with a dark-mode toggle, showcasing
experience, research & publications, projects, skills, achievements and more.

## Stack
- Plain **HTML + CSS + JavaScript** (no framework, no build step)
- Google Fonts (Fraunces · Inter · JetBrains Mono) + Font Awesome icons
- Deployed via **GitHub Pages** (static; `.nojekyll`)

## Structure
```
index.html    → all content & sections
style.css     → design system (light/dark tokens) + components
script.js     → theme toggle, nav, scrollspy, filters, animations
favicon.svg   → monogram favicon
resources/    → images, résumé PDF, videos
```

## Develop locally
Just open `index.html` in a browser, or serve the folder:
```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

© Badri Vishal Kasuba. Built from scratch.

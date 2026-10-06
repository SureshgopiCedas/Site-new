# Manage Automation – product site

A plain static HTML site with no build step. Open `index.html` in a browser, or upload the folder to any static host.

## Structure

```
index.html        Home: hero, pain points, "why" chart, role layers, products, testimonials, book
products.html     Products overview: both products, 7 phases, comparison, platforms
capp.html         CAPP detail: problem, phases, reuse loop, roles, benefits
build-it.html     Build-IT detail: pipeline, outputs, benefits, platforms
about.html        About: story, clarity pillars, testimonials, Cedas
resources.html    Book, coaching/courses/community, product guides, glossary, FAQ
contact.html      Contact form (+ ?topic=demo|capp|buildit|book|coaching preselects topic)
404.html          Not-found page
assets/css/styles.css   All styles (design tokens at the top)
assets/js/site.js       Mobile menu, active nav link, footer year, contact form
assets/js/visuals.js    Animated SVG diagrams (each runs only if its element is on the page)
assets/img/             Logos
partials/               Shared header and footer
tools/sync-partials.ps1 Copies the partials into every page
_original/index.html    The original single-page version (backup)
```

## Editing the header or footer

Edit `partials/header.html` or `partials/footer.html`, then run:

```
powershell -ExecutionPolicy Bypass -File tools\sync-partials.ps1
```

Each page has the shared HTML between `<!--@header-->…<!--/@header-->` and `<!--@footer-->…<!--/@footer-->`. Don't edit inside those markers directly, because the script overwrites them.

## Contact form

The form validates input in the browser but does not send anything yet. To receive messages, set `data-endpoint` on `<form id="contactForm">` in `contact.html` to a form service URL (for example Formspree or a CRM). The URL must accept a POST request.

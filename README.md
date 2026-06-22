# JTR Garage — Website Redesign

A complete, ground-up redesign of **JTR Garage** — Adelaide's home for genuine
JDM & AUDM cars (Skylines, GT-Rs, HSVs) and Japanese-inspired streetwear.

This repo is a fast, dependency-free **static site** (plain HTML/CSS/JS, no build
step) that reimagines the live store at `jtr-garage.myshopify.com`. It's
instantly deployable to GitHub Pages, Netlify, Cloudflare Pages, or any static
host, and doubles as a high-fidelity blueprint for porting the design into a
Shopify Online Store 2.0 / Horizon theme.

> Built with real product data and imagery pulled from the live store, so it
> reflects the actual catalogue — not placeholders.

---

## Why a redesign?

The live store is functional but leaves a lot on the table. A full audit
(see **`STORE-FIXES.md`**) found broken social links (`xhttps://` typo),
copy typos ("Enthuasiasts", "hsitory"), a 404'ing Contact link with no contact
details anywhere, nav labels that don't match collection handles, an empty
featured collection, untagged products, and — critically — **cars sold through
the same "Add to cart" flow as $70 t-shirts**.

This redesign fixes all of that and rebuilds the experience around the brand's
real strength: a dual identity of **car culture + streetwear**, sold
enthusiast-to-enthusiast.

## Design system

Grounded in research into 2025–2026 streetwear, JDM car-culture, and Japanese
design. A **dark, minimalist "techwear" canvas punctuated by a single weaponised
JDM accent** — disciplined darkness, not rainbow maximalism.

| Token | Value | Use |
|------|-------|-----|
| Sumi Black | `#0a0a0b` | Page background |
| Graphite | `#16161a` | Cards / surfaces |
| Bone | `#edeae4` | Primary text |
| Ash | `#8a8a92` | Muted text |
| **Rising Red** | `#e11d2a` | The accent — CTAs, tags, the dot |
| Midnight Purple | `#2a1a4a` | R34 homage, seasonal |

**Type:** [Anton](https://fonts.google.com/specimen/Anton) (condensed gothic
display) × [Inter](https://fonts.google.com/specimen/Inter) (body) ×
[Space Mono](https://fonts.google.com/specimen/Space+Mono) (technical/spec
labels) — all free Google Fonts.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Homepage — hero, dual "worlds" split, latest drop, shop-by-chassis, vehicle feature, value props, story, newsletter |
| `apparel.html` | Streetwear collection with working tee/hoodie filters |
| `vehicles.html` | Vehicle listing + buy/sell + inventory-alert capture |
| `product-*.html` (×4) | Product detail pages — gallery, size selector, add-to-bag, accordions, cross-sell |
| `vehicle-1973-ta22-celica.html` | Vehicle detail page (VDP) — spec table, gallery, **enquiry funnel** (no buy button) |
| `about.html` | Brand story, founder note, stats, why-choose-us |
| `contact.html` | Contact details + form + FAQ hub |
| `404.html` | On-brand "Wrong Turn" page |

## Features

- **Dual funnel** — apparel uses add-to-cart + a client-side bag (localStorage);
  vehicles use an *Enquire / Register Interest* lead-gen funnel. This was the
  single biggest structural fix.
- **Working cart drawer** — add to bag, quantity merge, remove, subtotal,
  persisted across pages.
- **Accessible** — skip link, semantic landmarks, `:focus-visible` rings, 44px+
  targets, ARIA on nav/cart, labelled forms, `prefers-reduced-motion` honoured.
- **Performant** — no frameworks, deferred JS, responsive Shopify-CDN images
  with explicit `width`/`height` (no layout shift), lazy-loading below the fold.
- **SEO** — per-page titles/meta/canonical, Open Graph, Organization JSON-LD.
- **Responsive** — mobile-first, single-column collapse, slide-in mobile nav.

## Run / deploy

It's static — just open `index.html`, or serve the folder:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

Deploy by pushing to any static host (GitHub Pages works out of the box;
`.nojekyll` is included).

## Project structure

```
.
├── index.html, apparel.html, vehicles.html, about.html, contact.html, 404.html
├── product-*.html            # 4 apparel PDPs
├── vehicle-1973-ta22-celica.html
├── assets/
│   ├── css/styles.css        # the full design system
│   └── js/app.js             # cart, nav, gallery, reveals, forms
├── robots.txt, sitemap.xml, .nojekyll
├── STORE-FIXES.md            # immediate fixes for the LIVE Shopify store
└── README.md
```

## Notes & honest caveats

- This is a **storefront prototype**: the cart and all forms are front-end demos
  (no real checkout/payment or email backend). Wire forms to Shopify, a form
  service (Formspree/Klaviyo), or your CRM before going live.
- Product imagery and data are loaded live from the store's Shopify CDN.
- Contact details, ABN, and phone number are **placeholders** — swap in the real
  ones (the slots are marked).
- `STORE-FIXES.md` lists what to change directly in the live Shopify admin if you
  keep the current Horizon theme instead of adopting this redesign.

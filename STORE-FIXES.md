# JTR Garage — Live Store Fix List

Quick, high-impact fixes to apply directly in your **Shopify admin** on the live
store (`jtr-garage.myshopify.com`). These are independent of the redesign in this
repo — you can action them today. Ordered by priority.

> Audited 2026-06-22. The live store runs Shopify's **Horizon** theme.

---

## P0 — Broken / embarrassing (fix first)

| # | Issue | Where | Fix |
|---|-------|-------|-----|
| 1 | **Social links are broken** — Instagram, TikTok & YouTube hrefs have a stray `x` prefix (`xhttps://…`), so every social icon 404s. One YouTube link is empty. | Theme settings → Social media, or the footer/header social blocks | Re-enter clean URLs: `https://instagram.com/…`, `https://tiktok.com/@…`, `https://youtube.com/@…`. Remove the leading `x`. |
| 2 | **Typo on homepage** — "Join Other **Enthuasiasts**!" | Newsletter section heading | Correct to "Enthusiasts". |
| 3 | **Typo on the Celica listing** — "genuine service **hsitory**" | Product description (1973 TA22 Celica) | Correct to "history". |
| 4 | **"Contact Us" nav link 404s** — the menu points to a page that doesn't resolve, and no contact details exist anywhere on the site. | Navigation + Pages | Create/point the Contact page (the sitemap shows a `contact` page exists — relink the menu item to it) and add real email, phone, location & hours. Critical for high-ticket vehicle trust + AU legitimacy. |

## P1 — Navigation & merchandising

| # | Issue | Fix |
|---|-------|-----|
| 5 | **Nav labels don't match collection handles** — menu says "Vehicles" / "Apparel" but the collections are `vehicles-for-sale` / `clothing`; guessed URLs `/collections/vehicles` and `/collections/apparel` 404. | Point the menu items at the real collections. Optionally create the handles `vehicles` and `apparel` as redirects/aliases. |
| 6 | **`frontpage` collection is empty** (0 products) — the default "featured" slot has nothing in it. | Add products to the Home page / featured collection, or repoint the homepage featured section to `clothing`. |
| 7 | **All products have empty `product_type` and `tags`.** No categorisation → no faceted filtering, weaker SEO and collection automation. | Set `product_type` ("Tee", "Hoodie", "Vehicle") and add tags (chassis codes: `r32 r33 r34 s15 ae86 hsv`, plus `tee`/`hoodie`). Enables the "Shop by chassis" filtering the redesign uses. |
| 8 | **Inventory inconsistency** — collection grids show some tees/hoodie as "In stock" while their product pages show every size sold out (or vice-versa). Effectively nothing is reliably purchasable. | Reconcile variant inventory in Products → Inventory so grid and PDP agree. |
| 9 | **Collection descriptions don't render** on the live Clothing / Vehicles pages. | Add intro copy in each collection's Description (the redesign includes ready-to-use copy). |

## P1 — Vehicle listing quality

| # | Issue | Fix |
|---|-------|-----|
| 10 | The Celica has **no structured specs** — just free text. Enthusiasts scan for year, chassis, transmission, engine, odometer, rego, VIN, location. | Add a spec block (metafields or formatted description). See `vehicle-1973-ta22-celica.html` in this repo for the exact Australian-convention spec table. |
| 11 | **Cars use the same "Add to cart" flow as apparel.** A $23k car shouldn't have a buy button — it needs an enquiry funnel. | Use a separate `product.vehicle` template that hides Buy Buttons and shows an "Enquire / Register Interest" form (per the redesign's VDP). |

## P2 — Trust, legitimacy & SEO

- **Add ABN + registered business name + physical/contact details** in the footer (AU consumer-law expectation and a strong trust signal).
- **Confirm policy pages are linked** — `return-policy`, `shipping-policy`, `terms-and-conditions`, `faqs`, `track-order` exist in the sitemap; surface them in the footer.
- **Make sure returns policy is Australian Consumer Law compliant** (no blanket "no refunds").
- **Set per-page SEO titles/meta descriptions** (the redesign provides copy for each).
- **Add the `2026` date context** — "Established 2026 / © 2026" reads as a placeholder to some visitors; consider "Adelaide, South Australia" framing without leaning on the year.

---

### Copy you can paste

**Newsletter heading:** Get the Drop Before Anyone Else
**Newsletter body:** New arrivals, fresh stock and limited streetwear drops — straight to your inbox. No spam, just cars and culture worth your time.

**Meta description (home):** JTR Garage — Adelaide's home for genuine JDM & AUDM cars (Skylines, GT-Rs, HSVs) and Japanese-inspired streetwear. Built by enthusiasts, for enthusiasts.

**Tagline options:** Built for the Scene. · Cars and Culture. Adelaide-Built. · From the Touge to the Streets.

See `README.md` for the full redesign and `assets/` for the design system.

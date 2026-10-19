---
diff_hash: 90e77383e1113e5de57fa887b48a13888ea995c4ceb018d16804764111b0f680
reviewed_at: 2026-10-19T05:34:29Z
---

## Summary

Stack: React (Vite + TypeScript, React Router). Rebrands the electric-bike line as the "Arrow One" scooter (City / Cargo / Pro trims): new catalogue data with legacy slugs for City and Cargo, `frameSize` → `seatHeight`, WebP photos in place of the SVG placeholders, and a new `keyStats()` helper for the product detail page. The prerender script now writes per-route title, description and canonical into each copied `index.html`. Also includes a new contact phone number, scooter wording in the homepage sections, and a rebuilt `dist/index.html` with static og:image tags.

## Findings

### Critical (0)

### High (0)

### Medium (1)
- **src/data/products/electric-bikes.ts:98** — The Off-road product (slug `enersol-offroad`) was replaced by `arrow-one-pro` with no `legacySlugs` entry. City and Cargo both keep their old slugs. *(correctness)*
  - status: open
  - dev_reasoning: N/A
  - ai_reasoning: `/electric-bikes/enersol-offroad` went live in commit 938f89df (merged in PR #6). After this change, `resolveLegacySlug` won't find it, and `prerender-routes.mjs` won't write a page for it. Shared or indexed links will hit the 404 fallback instead of redirecting to the Pro trim, which is what happens for City and Cargo. Fix: add `legacySlugs: ['enersol-offroad']` to `bike-pro`.

### Low (3)
- **scripts/prerender-routes.mjs:97** — `withRouteMeta` puts escaped title, description and URL into `String.replace` replacement strings, but `escapeHtml` doesn't neutralise `$`. *(correctness)*
  - status: open
  - dev_reasoning: N/A
  - ai_reasoning: If a product description or title contains `$&`, `$1`, `` $` `` or `$'` (for example a USD price like "$1,200"), `replace` reads it as a substitution pattern. The prerendered meta tag then comes out corrupted, with no error. Current data has no `$`, so this has no effect today. Fix: use a replacer function (`out.replace(re, (_, p1 = '') => p1 + value)`) or escape `$` as `$$`.
- **src/data/products/types.ts:38** — The new `seatHeight` field is required on `BikeProduct` and filled for every bike, but nothing reads it. *(maintainability)*
  - status: open
  - dev_reasoning: N/A
  - ai_reasoning: `cardSpecs`, `keyStats` and the pages never use `p.seatHeight`. The same value is repeated in `specs['Seat height']`, so the two copies can drift apart. Either show it somewhere (for example in `cardSpecs`) or drop the field and keep only the `specs` entry.
- **src/pages/ProductDetail.tsx:62** — Checks `product.family === 'electric-bikes'` inline instead of using the existing `isBike()` guard. That guard was just imported for the same check in `seo-config.ts`. *(consistency)*
  - status: open
  - dev_reasoning: N/A
  - ai_reasoning: There's already a helper in `src/data/products/types.ts:46` for this check. Using `isBike(product) ? 'trim' : 'Series'` keeps the family test in one place.

## Reviewed files
- dist/index.html (generated build output; checked only that the static meta tags match `index.html` and `seo-config`)
- public/images/bike-cargo.svg (deleted)
- public/images/bike-city.svg (deleted)
- public/images/bike-offroad.svg (deleted)
- public/images/bike-cargo.webp (binary, skipped)
- public/images/bike-city.webp (binary, skipped)
- public/images/bike-pro.webp (binary, skipped)
- scripts/prerender-routes.mjs
- src/components/sections/SmartTechnology.tsx
- src/components/sections/SpecStrip.tsx
- src/data/families.ts
- src/data/products/electric-bikes.ts
- src/data/products/types.ts
- src/lib/brand.ts
- src/lib/seo-config.ts
- src/pages/Home.tsx
- src/pages/ProductDetail.tsx

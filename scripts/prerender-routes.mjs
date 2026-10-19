/**
 * Emit a real `dist/<route>/index.html` for every known route.
 *
 * Why this exists: GitHub Pages has no rewrite rules. The `404.html` copy makes
 * deep links work in a *browser* (JS boots and React Router takes over), but
 * Pages serves it with an HTTP 404 status — and Facebook, WhatsApp, LinkedIn
 * and X all refuse to unfurl a non-2xx response. So a shared link to anything
 * other than `/` produced no preview card at all.
 *
 * Copying index.html to a real path per route makes every route answer 200, so
 * the Open Graph tags baked into index.html are honoured everywhere. Each copy
 * gets that route's title, description and canonical URL written into the head
 * (the same values SeoHead sets at runtime), so a shared product link previews
 * as that product. The share image stays the brand card for every route.
 *
 * Routes come from the app's own data (`routeSeo` + `products`) rather than a
 * hardcoded list, so adding a product or family needs no edit here.
 */
import { build } from 'esbuild';
import { mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, 'dist');
const bundlePath = join(root, 'node_modules', '.cache', 'route-list.mjs');

/** Bundle the app's route data so this plain-node script can read it. */
async function collectRoutes() {
  await mkdir(dirname(bundlePath), { recursive: true });
  await build({
    stdin: {
      contents: `
        import { routeSeo, buildProductSeo, getCanonicalUrl } from '@/lib/seo-config';
        import { products } from '@/data/products';
        import { productPath } from '@/data/families';

        const seo = (m) => ({ title: m.title, description: m.description, url: getCanonicalUrl(m.path) });
        const meta = new Map(Object.entries(routeSeo).map(([path, m]) => [path, seo(m)]));
        for (const p of products) {
          const m = seo(buildProductSeo(p));
          meta.set(productPath(p), m);
          // Pre-rebrand slugs are live in the wild and still resolve; their
          // canonical points at the current URL.
          for (const legacy of p.legacySlugs ?? []) {
            meta.set(productPath({ family: p.family, slug: legacy }), m);
          }
        }
        export const routes = [...meta].map(([path, m]) => ({ path, ...m }));
      `,
      resolveDir: root,
      loader: 'ts',
    },
    bundle: true,
    platform: 'node',
    format: 'esm',
    outfile: bundlePath,
    alias: { '@': join(root, 'src') },
    // asset.ts reads Vite's BASE_URL, which does not exist outside Vite.
    define: { 'import.meta.env': JSON.stringify({ BASE_URL: '/' }) },
    logLevel: 'silent',
  });

  const { routes } = await import(pathToFileURL(bundlePath).href);
  await rm(dirname(bundlePath), { recursive: true, force: true });
  return routes;
}

const shell = join(dist, 'index.html');
const html = await readFile(shell, 'utf8');

if (!html.includes('og:image')) {
  throw new Error('dist/index.html has no og:image — link previews would ship broken.');
}

// SPA fallback for anything not in the route list (still a 404 status).
await writeFile(join(dist, '404.html'), html);

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Swap the shell's homepage tags for this route's. Throws if a tag is missing. */
function withRouteMeta(source, { title, description, url }) {
  const [t, d, u] = [title, description, url].map(escapeHtml);
  const swaps = [
    [/(<title>)[^<]*/, t],
    [/(<meta name="description" content=")[^"]*/, d],
    [/(<link rel="canonical" href=")[^"]*/, u],
    [/(<meta property="og:title" content=")[^"]*/, t],
    [/(<meta property="og:description" content=")[^"]*/, d],
    [/(<meta property="og:url" content=")[^"]*/, u],
    [/(<meta name="twitter:title" content=")[^"]*/, t],
    [/(<meta name="twitter:description" content=")[^"]*/, d],
  ];
  return swaps.reduce((out, [re, value]) => {
    if (!re.test(out)) throw new Error(`index.html is missing ${re} — per-route meta would ship stale.`);
    // A function replacer, so a "$" in copy (prices) is never read as a pattern.
    return out.replace(re, (_, prefix) => prefix + value);
  }, source);
}

const routes = await collectRoutes();
const written = [];

for (const route of routes) {
  const clean = route.path.replace(/\/+$/, '');
  if (!clean) continue; // '/' is dist/index.html already
  const target = join(dist, clean, 'index.html');
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, withRouteMeta(html, route));
  written.push(clean);
}

console.log(`prerender: ${written.length} routes now return 200`);
for (const r of written.sort()) console.log(`  ${r}/`);

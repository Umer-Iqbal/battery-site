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
 * the Open Graph tags baked into index.html are honoured everywhere. All routes
 * therefore share the homepage's image, title and description — intentional for
 * now. Per-page metadata needs true prerendering (rendering React per route);
 * this is the cheap 90% that fixes link previews.
 *
 * Routes come from the app's own data (`routeSeo` + `products`) rather than a
 * hardcoded list, so adding a product or family needs no edit here.
 */
import { build } from 'esbuild';
import { mkdir, copyFile, writeFile, readFile, rm } from 'node:fs/promises';
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
        import { routeSeo } from '@/lib/seo-config';
        import { products } from '@/data/products';
        import { productPath } from '@/data/families';

        const paths = new Set(Object.keys(routeSeo));
        for (const p of products) {
          paths.add(productPath(p));
          // Pre-rebrand slugs are live in the wild and still resolve.
          for (const legacy of p.legacySlugs ?? []) {
            paths.add(productPath({ family: p.family, slug: legacy }));
          }
        }
        export const routes = [...paths];
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

const routes = await collectRoutes();
const written = [];

for (const route of routes) {
  const clean = route.replace(/\/+$/, '');
  if (!clean) continue; // '/' is dist/index.html already
  const target = join(dist, clean, 'index.html');
  await mkdir(dirname(target), { recursive: true });
  await copyFile(shell, target);
  written.push(clean);
}

console.log(`prerender: ${written.length} routes now return 200`);
for (const r of written.sort()) console.log(`  ${r}/`);

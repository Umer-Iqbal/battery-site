/**
 * Resolve a `public/` asset against Vite's base path.
 *
 * Every image reference used to be root-absolute (`/images/x.png`), which
 * breaks under `vite.config.ts`'s `base: '/battery-site/'` — the browser
 * resolves it to the domain root instead of the deployed subpath.
 * BASE_URL always ends in '/'.
 */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}

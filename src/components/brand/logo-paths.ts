/**
 * Enersol mark — "Hex Cell".
 *
 * A single constant-weight hexagon stroke with the top vertex opened and the
 * two ends deliberately offset: a cell seen from above, a solar module, a
 * wheel hub. The offset opening is the ownable detail — keep it.
 *
 * Geometry only, no JSX, so `Logo.tsx` and the static files under
 * `public/brand/` cannot drift apart. Drawn on a 32x32 grid.
 */
export const LOGO_VIEWBOX = '0 0 32 32';
export const LOGO_STROKE_WIDTH = 3;

/** The hexagon, running from the opened top-left end round to the top-right vertex. */
export const LOGO_BODY_PATH =
  'M14.21 5.54 L6.04 10.25 L6.04 21.75 L16 27.5 L25.96 21.75 L25.96 10.25';

/** The short segment into the gap — the "live terminal", drawn in the accent. */
export const LOGO_TERMINAL_PATH = 'M25.96 10.25 L19.78 6.69';

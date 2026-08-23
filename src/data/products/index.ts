import type { ProductFamilyId } from '@/data/families';
import { batteries } from './batteries';
import { electricBikes } from './electric-bikes';
import { isBattery, isBike, type BatteryProduct, type BikeProduct, type Product } from './types';

export * from './types';

export const products: Product[] = [...batteries, ...electricBikes];

/** Typed as BatteryProduct[], so a bike cannot reach the energy calculator. */
export const batteryProducts: BatteryProduct[] = products.filter(isBattery);

export const bikeProducts: BikeProduct[] = products.filter(isBike);

export function productsInFamily(family: ProductFamilyId): Product[] {
  return products.filter((p) => p.family === family);
}

export function findProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Resolve a pre-rebrand slug to its current product. */
export function resolveLegacySlug(slug: string): Product | undefined {
  return products.find((p) => p.legacySlugs?.includes(slug));
}

/** Canonical product for a slug, accepting either the current or an old slug. */
export function resolveProduct(slug: string): Product | undefined {
  return findProduct(slug) ?? resolveLegacySlug(slug);
}

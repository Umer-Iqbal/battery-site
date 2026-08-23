import type { BatteryType, BikeType, ProductFamilyId } from '@/data/families';

export interface SpecChip {
  label: string;
  value: string;
}

interface ProductBase {
  id: string;
  name: string;
  slug: string;
  description: string;
  features: string[];
  /** Flexible detail table — drives the specifications table on the detail page. */
  specs: Record<string, string>;
  image: string;
  price?: number;
  /** Pre-rebrand slugs, kept so shared links keep working. */
  legacySlugs?: readonly string[];
}

export interface BatteryProduct extends ProductBase {
  family: Extract<ProductFamilyId, 'powerpacks'>;
  type: BatteryType;
  voltage: string;
  capacity: string;
  /** Usable energy. Replaces the old PRODUCT_ENERGY_KWH duplicate map. */
  energyKwh: number;
}

export interface BikeProduct extends ProductBase {
  family: Extract<ProductFamilyId, 'electric-bikes'>;
  type: BikeType;
  motorPower: string;
  range: string;
  topSpeed: string;
  battery: string;
  frameSize: string;
}

export type Product = BatteryProduct | BikeProduct;

// Internal names stay Battery*: the chemistry is still LiFePO4, "PowerPack"
// is the customer-facing name for the family.
export const isBattery = (p: Product): p is BatteryProduct => p.family === 'powerpacks';
export const isBike = (p: Product): p is BikeProduct => p.family === 'electric-bikes';

/**
 * The two spec chips a product card shows. The switch is exhaustive on
 * `family`, so adding a family becomes a compile error here — by design.
 *
 * A `highlights` field on each product would re-duplicate data that already
 * lives in the typed fields, which is the mistake PRODUCT_ENERGY_KWH made.
 */
export function cardSpecs(p: Product): SpecChip[] {
  switch (p.family) {
    case 'powerpacks':
      return [
        { label: 'Voltage', value: p.voltage },
        { label: 'Capacity', value: p.capacity },
      ];
    case 'electric-bikes':
      return [
        { label: 'Motor', value: p.motorPower },
        { label: 'Range', value: p.range },
      ];
  }
}

/** One-line summary under a product name on the homepage lineup. */
export function cardSummary(p: Product): string {
  return cardSpecs(p)
    .map((c) => c.value)
    .join(' · ');
}

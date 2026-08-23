import { Battery, Bike, Sun, Zap, type LucideIcon } from 'lucide-react';
import { BRAND } from '@/lib/brand';

export const BATTERY_TYPES = ['Residential', 'Commercial', 'Portable'] as const;
export const BIKE_TYPES = ['City', 'Cargo', 'Off-road'] as const;
export type BatteryType = (typeof BATTERY_TYPES)[number];
export type BikeType = (typeof BIKE_TYPES)[number];

export type ProductFamilyId = 'powerpacks' | 'electric-bikes' | 'solar' | 'inverters';

export interface ProductFamily {
  id: ProductFamilyId;
  label: string;
  /** Lowercase-safe short name for inline copy ("View batteries"). */
  shortLabel: string;
  path: string;
  status: 'live' | 'coming-soon';
  icon: LucideIcon;
  /** Short line for the homepage family card. */
  blurb: string;
  /** Page lead on the family listing. */
  lead: string;
  /** Longer copy for the coming-soon panel. Only used when status is coming-soon. */
  soonBlurb?: string;
  /** Second-level filter pills. Empty for families that aren't live. */
  types: readonly string[];
  seoTitle: string;
  seoDescription: string;
}

export const PRODUCT_FAMILIES: readonly ProductFamily[] = [
  {
    id: 'electric-bikes',
    shortLabel: 'bikes',
    label: 'Electric Bikes',
    path: '/products/electric-bikes',
    status: 'live',
    icon: Bike,
    types: BIKE_TYPES,
    blurb:
      'City, cargo and off-road frames on the same cells we put in our batteries.',
    lead: 'The same cells and the same warranty desk as our batteries, on two wheels. Removable packs you charge indoors.',
    seoTitle: `Electric Bikes | ${BRAND.name}`,
    seoDescription:
      'City, cargo and off-road electric bikes with removable LiFePO4 packs, smart BMS and app monitoring.',
  },
  {
    id: 'powerpacks',
    shortLabel: 'PowerPacks',
    label: 'PowerPacks',
    path: '/products/powerpacks',
    status: 'live',
    icon: Battery,
    types: BATTERY_TYPES,
    blurb:
      'From 12V portable PowerPacks up to 5.1kWh wall-mount systems. 6,000+ cycles, smart BMS, Bluetooth monitoring.',
    lead: 'Grade A LiFePO4 cells, smart BMS and Bluetooth monitoring — from a 15Ah pack you can carry to a 5.1kWh wall-mount system.',
    seoTitle: `PowerPacks — LiFePO4 batteries | ${BRAND.name}`,
    seoDescription:
      'Enersol PowerPacks: LiFePO4 storage from 12V portable units to 5.1kWh wall-mount systems. 6,000+ cycles, 10-year warranty.',
  },
  {
    id: 'solar',
    shortLabel: 'solar',
    label: 'Solar',
    path: '/products/solar',
    status: 'coming-soon',
    icon: Sun,
    types: [],
    blurb: 'Panels and mounting hardware, sized to pair with the batteries you already own.',
    lead: 'Panels and mounting hardware, sized to pair with the batteries you already own.',
    soonBlurb:
      'Panels and mounting hardware sized to the packs we already sell, so one supplier covers generation and storage. Leave us your number and we will tell you when pricing is set.',
    seoTitle: `Solar — coming soon | ${BRAND.name}`,
    seoDescription:
      'Solar panels and mounting hardware sized to pair with Enersol LiFePO4 storage. Coming soon.',
  },
  {
    id: 'inverters',
    shortLabel: 'inverters',
    label: 'Inverters',
    path: '/products/inverters',
    status: 'coming-soon',
    icon: Zap,
    types: [],
    blurb: 'Hybrid inverters matched to our packs, so the whole system carries one warranty.',
    lead: 'Hybrid inverters matched to our packs, so the whole system carries one warranty.',
    soonBlurb:
      'Hybrid inverters matched to our own packs, so generation, storage and conversion all sit under one warranty instead of three. Coming after solar.',
    seoTitle: `Inverters — coming soon | ${BRAND.name}`,
    seoDescription:
      'Hybrid inverters matched to Enersol LiFePO4 packs, so the whole system carries one warranty. Coming soon.',
  },
];

export const FAMILY_BY_ID = Object.fromEntries(
  PRODUCT_FAMILIES.map((f) => [f.id, f])
) as Record<ProductFamilyId, ProductFamily>;

export const LIVE_FAMILIES = PRODUCT_FAMILIES.filter((f) => f.status === 'live');

/** Routes that existed before the PowerPack rename. */
export const LEGACY_FAMILY_ALIASES: Record<string, ProductFamilyId> = {
  batteries: 'powerpacks',
};

export function isFamilyId(value: string | undefined): value is ProductFamilyId {
  return !!value && value in FAMILY_BY_ID;
}

/**
 * Canonical detail URL. Takes a structural argument rather than a Product so
 * this module never has to import the catalogue.
 */
export function productPath(p: { family: ProductFamilyId; slug: string }): string {
  return `/products/${p.family}/${p.slug}`;
}

/**
 * Old `/products?category=X` links are live and shared. Each battery type maps
 * to exactly one family, so the redirect is unambiguous.
 */
export const LEGACY_CATEGORY_MAP: Record<string, { familyId: ProductFamilyId; type: string }> =
  Object.fromEntries(
    BATTERY_TYPES.map((t) => [t, { familyId: 'powerpacks' as ProductFamilyId, type: t }])
  );

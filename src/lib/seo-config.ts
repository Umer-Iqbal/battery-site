import { BRAND } from '@/lib/brand';
import { PRODUCT_FAMILIES, productPath, FAMILY_BY_ID } from '@/data/families';
import { cardSpecs, type Product } from '@/data/products';

export interface SeoMeta {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'product';
  image?: string;
}

const SITE_URL = BRAND.siteUrl;
export const DEFAULT_IMAGE = `${SITE_URL}/brand/og-image.png`;

export const defaultSeo: SeoMeta = {
  title: `${BRAND.name} | ${BRAND.tagline}`,
  description: BRAND.description,
  path: '/',
  type: 'website',
  image: DEFAULT_IMAGE,
};

const STATIC_ROUTES: Record<string, SeoMeta> = {
  '/': defaultSeo,
  '/products': {
    title: `Products | ${BRAND.name}`,
    description:
      'LiFePO4 batteries and electric bikes, with solar and inverters coming. Browse the full Enersol range.',
    path: '/products',
  },
  '/calculator': {
    title: `Energy Calculator | ${BRAND.name}`,
    description: `Calculate your backup runtime, required battery capacity, and ROI with the ${BRAND.name} energy calculator.`,
    path: '/calculator',
  },
  '/mobile-app': {
    title: `Mobile App | ${BRAND.name} Smart Monitoring`,
    description: `Monitor live power flow, cell health, and energy statistics from anywhere with the ${BRAND.name} app.`,
    path: '/mobile-app',
  },
  '/become-dealer': {
    title: `Become a Dealer | ${BRAND.name}`,
    description:
      "Two product lines from one supplier, with a third and fourth coming. Territory protection and dealer pricing.",
    path: '/become-dealer',
  },
  '/contact': {
    title: `Contact Us | ${BRAND.name}`,
    description: `Get a quote or speak with the ${BRAND.name} team about batteries or electric bikes.`,
    path: '/contact',
  },
};

/** Generated from the family config, so adding a family needs no edit here. */
const FAMILY_ROUTES: Record<string, SeoMeta> = Object.fromEntries(
  PRODUCT_FAMILIES.map((f) => [
    f.path,
    { title: f.seoTitle, description: f.seoDescription, path: f.path },
  ])
);

export const routeSeo: Record<string, SeoMeta> = { ...STATIC_ROUTES, ...FAMILY_ROUTES };

const DETAIL_PATH = /^\/products\/[^/]+\/[^/]+\/?$/;

/** null means the page supplies its own SeoHead (product detail). */
export function resolveRouteSeo(pathname: string): SeoMeta | null {
  const hit = routeSeo[pathname] ?? routeSeo[pathname.replace(/\/$/, '')];
  if (hit) return hit;
  if (DETAIL_PATH.test(pathname)) return null;
  return { ...defaultSeo, path: pathname };
}

export function getCanonicalUrl(path: string) {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function absoluteImage(image: string) {
  return image.startsWith('http') ? image : `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`;
}

/**
 * Social crawlers (Slack, WhatsApp, Facebook, LinkedIn) only render raster
 * images, so an SVG product shot yields an imageless card. Fall back to the
 * brand OG card in that case rather than shipping a preview that shows nothing.
 */
export function shareImage(image?: string) {
  if (!image || !/\.(png|jpe?g|webp)$/i.test(image)) return DEFAULT_IMAGE;
  return absoluteImage(image);
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND.name,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo-mark.svg`,
    description: defaultSeo.description,
    areaServed: 'PK',
    sameAs: [],
  };
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BRAND.name,
    url: SITE_URL,
    description: defaultSeo.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/products?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function buildProductSeo(product: Product): SeoMeta {
  return {
    title: `${product.name} | ${BRAND.name}`,
    description: product.description,
    path: productPath(product),
    type: 'product',
    image: shareImage(product.image),
  };
}

export function buildProductSchema(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: absoluteImage(product.image),
    brand: { '@type': 'Brand', name: BRAND.name },
    url: getCanonicalUrl(productPath(product)),
    additionalProperty: cardSpecs(product).map((chip) => ({
      '@type': 'PropertyValue',
      name: chip.label,
      value: chip.value,
    })),
  };
}

export function buildBreadcrumbSchema(product: Product) {
  const family = FAMILY_BY_ID[product.family];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Products', item: getCanonicalUrl('/products') },
      { '@type': 'ListItem', position: 2, name: family.label, item: getCanonicalUrl(family.path) },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: getCanonicalUrl(productPath(product)),
      },
    ],
  };
}

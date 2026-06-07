export interface SeoMeta {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'product';
  image?: string;
}

const SITE_URL = 'https://nexvolt.pk';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

export const defaultSeo: SeoMeta = {
  title: 'NexVolt | Premium LiFePO4 Energy Solutions',
  description:
    "Premium LiFePO4 batteries engineered for Pakistan's energy future. Reliable, innovative, and high-tech energy storage solutions.",
  path: '/',
  type: 'website',
  image: DEFAULT_IMAGE,
};

export const routeSeo: Record<string, SeoMeta> = {
  '/': defaultSeo,
  '/products': {
    title: 'Products | NexVolt LiFePO4 Batteries',
    description:
      'Browse NexVolt residential, commercial, and portable LiFePO4 battery systems. 6000+ cycles, 10-year warranty.',
    path: '/products',
  },
  '/calculator': {
    title: 'Energy Calculator | NexVolt',
    description:
      'Calculate your backup runtime, required battery capacity, and ROI with the NexVolt energy calculator.',
    path: '/calculator',
  },
  '/mobile-app': {
    title: 'Mobile App | NexVolt Smart Monitoring',
    description:
      'Monitor live power flow, cell health, and energy statistics from anywhere with the NexVolt mobile app.',
    path: '/mobile-app',
  },
  '/become-dealer': {
    title: 'Become a Dealer | NexVolt',
    description:
      "Join Pakistan's fastest growing energy storage distribution network. Premium margins and full dealer support.",
    path: '/become-dealer',
  },
  '/contact': {
    title: 'Contact Us | NexVolt',
    description:
      'Get a quote or speak with the NexVolt team about LiFePO4 energy storage for your home or business.',
    path: '/contact',
  },
};

export function getCanonicalUrl(path: string) {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NexVolt',
    url: SITE_URL,
    logo: `${SITE_URL}/vite.svg`,
    description: defaultSeo.description,
    areaServed: 'PK',
    sameAs: [],
  };
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'NexVolt',
    url: SITE_URL,
    description: defaultSeo.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/products?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function buildProductSchema(product: {
  name: string;
  description: string;
  slug: string;
  voltage: string;
  capacity: string;
  image: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image.startsWith('http') ? product.image : `${SITE_URL}${product.image}`,
    brand: { '@type': 'Brand', name: 'NexVolt' },
    url: getCanonicalUrl(`/products/${product.slug}`),
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Voltage', value: product.voltage },
      { '@type': 'PropertyValue', name: 'Capacity', value: product.capacity },
    ],
  };
}

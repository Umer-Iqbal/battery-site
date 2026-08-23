/**
 * Single source of truth for everything that changes when the company is
 * renamed or its contact details move. Imports nothing, so anything may
 * import it.
 */
export const BRAND = {
  name: 'Enersol',
  /** TODO(confirm): registered entity for the footer copyright line. */
  legalName: 'Enersol',
  domain: 'enersol.pro',
  siteUrl: 'https://enersol.pro',
  email: 'enersol328@gmail.com',
  phoneE164: '+923058857549',
  phoneDisplay: '0305 8857549',
  location: 'Lahore, Pakistan',
  tagline: 'PowerPacks & Electric Bikes',
  description:
    "LiFePO4 batteries and electric bikes engineered for Pakistan — reliable storage that rides out load-shedding, and e-bikes on the same cells.",
  themeColor: '#009DFF',
} as const;

/** Official profiles. Order here is the order they render. */
export const SOCIAL_PROFILES = [
  { id: 'facebook', label: 'Facebook', href: 'https://web.facebook.com/profile.php?id=61593574205677' },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/enersol.pro?igsi=MWZ1M2g3eGp6Mm42Zw==' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/enerso-pro/' },
  { id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/channel/UCmxLNVxqBxTJ1E9-Edd23BA' },
] as const;

/** The one place the unconfirmed entity name renders. */
export function copyrightLine(year: number = new Date().getFullYear()): string {
  return `© ${year} ${BRAND.legalName}. All rights reserved.`;
}

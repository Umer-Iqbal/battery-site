import { useEffect } from 'react';
import {
  SeoMeta,
  buildOrganizationSchema,
  buildWebSiteSchema,
  getCanonicalUrl,
  DEFAULT_IMAGE,
  absoluteImage,
} from '@/lib/seo-config';
import { BRAND } from '@/lib/brand';

interface SeoHeadProps {
  meta: SeoMeta;
  schema?: Record<string, unknown> | Record<string, unknown>[];
}

function upsertMeta(name: string, content: string, attribute: 'name' | 'property' = 'name') {
  let el = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attribute, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export default function SeoHead({ meta, schema }: SeoHeadProps) {
  useEffect(() => {
    const url = getCanonicalUrl(meta.path);
    // Must be absolute: social crawlers reject relative og:image paths.
    const image = absoluteImage(meta.image ?? DEFAULT_IMAGE);

    document.title = meta.title;
    upsertMeta('description', meta.description);
    upsertMeta('robots', 'index, follow');
    upsertLink('canonical', url);

    upsertMeta('og:title', meta.title, 'property');
    upsertMeta('og:description', meta.description, 'property');
    upsertMeta('og:type', meta.type ?? 'website', 'property');
    upsertMeta('og:url', url, 'property');
    upsertMeta('og:image', image, 'property');
    upsertMeta('og:image:secure_url', image, 'property');
    upsertMeta('og:image:alt', meta.title, 'property');
    upsertMeta('og:site_name', BRAND.name, 'property');
    upsertMeta('og:locale', 'en_US', 'property');

    upsertMeta('twitter:card', 'summary_large_image');
    upsertMeta('twitter:title', meta.title);
    upsertMeta('twitter:description', meta.description);
    upsertMeta('twitter:image', image);
    upsertMeta('twitter:image:alt', meta.title);

    const schemas = schema
      ? Array.isArray(schema) ? schema : [schema]
      : [buildOrganizationSchema(), buildWebSiteSchema()];

    const scriptId = 'site-json-ld';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
  }, [meta, schema]);

  return null;
}

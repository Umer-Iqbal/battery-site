import { Navigate, useSearchParams } from 'react-router-dom';
import { FAMILY_BY_ID, LEGACY_CATEGORY_MAP, LIVE_FAMILIES } from '@/data/families';

/**
 * /products has no chooser screen — it opens the first live family directly and
 * the family tabs handle switching from there. One less click to a product.
 *
 * Also absorbs the pre-rebrand `?category=` deep links, which used to be
 * handled by the chooser page.
 */
export default function ProductsRedirect() {
  const [searchParams] = useSearchParams();
  const legacyCategory = searchParams.get('category');
  const legacy = legacyCategory ? LEGACY_CATEGORY_MAP[legacyCategory] : undefined;

  if (legacy) {
    const target = `${FAMILY_BY_ID[legacy.familyId].path}?type=${encodeURIComponent(legacy.type)}`;
    return <Navigate to={target} replace />;
  }

  return <Navigate to={LIVE_FAMILIES[0].path} replace />;
}

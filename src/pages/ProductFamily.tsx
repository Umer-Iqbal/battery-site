import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  cardSpecs,
  productsInFamily,
  resolveLegacySlug,
  type Product,
} from '../data/products';
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { cn } from '@/utils/cn';
import LazyImage from '@/components/ui/LazyImage';
import { Search, Grid, List as ListIcon, ArrowRight, Bell } from 'lucide-react';
import {
  FAMILY_BY_ID,
  LEGACY_FAMILY_ALIASES,
  isFamilyId,
  productPath,
  PRODUCT_FAMILIES,
  type ProductFamilyId,
} from '@/data/families';
import NotFound from './NotFound';
import SmartTechnology from '@/components/sections/SmartTechnology';
import CalculatorPreview from '@/components/sections/CalculatorPreview';

export default function ProductFamily() {
  const { family: familyParam } = useParams<{ family: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  // `type` is the current param; `category` is accepted as a read-only alias
  // so old /products?category=X links survive the redirect into a family.
  const typeParam = searchParams.get('type') ?? searchParams.get('category');

  const isFamily = isFamilyId(familyParam);
  const family = isFamily ? FAMILY_BY_ID[familyParam] : undefined;
  const categories = family ? ['All', ...family.types] : ['All'];
  const validCategory = categories.includes(typeParam ?? '') ? typeParam! : 'All';

  const [activeCategory, setActiveCategory] = useState(validCategory);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setActiveCategory(validCategory);
  }, [validCategory]);

  // Reset the filter when moving between families, or a battery type would
  // stick and empty out the bikes grid.
  useEffect(() => {
    setSearchQuery('');
  }, [familyParam]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    searchParams.delete('category');
    if (cat === 'All') {
      searchParams.delete('type');
    } else {
      searchParams.set('type', cat);
    }
    setSearchParams(searchParams, { replace: true });
  };

  // A single segment after /products is ambiguous: it may be a family, or an
  // old flat product URL. Resolve the latter here rather than 404ing it.
  if (!isFamily || !family) {
    // /products/batteries predates the PowerPack rename.
    const aliased = familyParam ? LEGACY_FAMILY_ALIASES[familyParam] : undefined;
    if (aliased) {
      const suffix = searchParams.toString();
      return <Navigate to={`${FAMILY_BY_ID[aliased].path}${suffix ? `?${suffix}` : ''}`} replace />;
    }
    const legacy = familyParam ? resolveLegacySlug(familyParam) : undefined;
    if (legacy) return <Navigate to={productPath(legacy)} replace />;
    return <NotFound />;
  }

  if (family.status === 'coming-soon') {
    return <ComingSoon familyId={family.id} />;
  }

  const familyProducts = productsInFamily(family.id);
  const filteredProducts = familyProducts.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.type === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-6 min-h-screen bg-background"
    >
      <div className="container mx-auto">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/products" className="hover:text-foreground transition-colors">Products</Link>
          <span className="text-border">/</span>
          <span className="text-foreground font-medium">{family.label}</span>
        </div>

        {/* Family tabs — the new top level of the product IA */}
        {/* The rule lives on the wrapper and the row is nudged over it, so the
            scroll container itself never overflows vertically — otherwise
            overflow-x forces overflow-y to auto and a scrollbar appears
            inside a 40px strip at every width. */}
        <div className="border-b border-border mb-12">
          <div className="flex items-stretch gap-8 overflow-x-auto no-scrollbar -mb-px">
          {PRODUCT_FAMILIES.map((f) => {
            const Icon = f.icon;
            const active = f.id === family.id;
            return (
              <Link
                key={f.id}
                to={f.path}
                className={cn(
                  'flex items-center gap-2.5 pb-4 border-b-2 whitespace-nowrap transition-colors shrink-0',
                  active ? 'border-primary' : 'border-transparent'
                )}
              >
                <Icon size={18} className={active ? 'text-primary' : 'text-muted-foreground'} />
                <span className={cn('text-[15px] font-medium', active ? 'text-foreground' : 'text-muted-foreground')}>
                  {f.label}
                </span>
                {f.status === 'coming-soon' && (
                  <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground bg-muted px-1.5 py-0.5 rounded-sm">
                    Soon
                  </span>
                )}
              </Link>
            );
          })}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-foreground">{family.label}</h1>
            <p className="text-muted-foreground text-lg">{family.lead}</p>
          </div>

          <div className="flex bg-muted p-1 rounded-lg border border-border">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={cn('p-2 rounded-lg transition-all', viewMode === 'grid' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground')}
            >
              <Grid size={20} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={cn('p-2 rounded-lg transition-all', viewMode === 'list' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground')}
            >
              <ListIcon size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          <div className="flex-grow relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder={`Search ${family.shortLabel}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-background border border-border rounded-lg py-3 pl-12 pr-6 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={cn(
                  'px-5 py-3 rounded-lg border transition-all text-sm font-medium',
                  activeCategory === cat
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'bg-background border-border text-muted-foreground hover:text-foreground'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className={cn(
              'grid gap-6',
              viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
            )}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} viewMode={viewMode} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProducts.length === 0 && familyProducts.length > 0 && (
          <div className="text-center py-24">
            <h3 className="text-xl text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6">Nothing in {family.label} matches that filter yet.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                handleCategoryChange('All');
              }}
              className="btn-secondary"
            >
              Clear filters
            </button>
          </div>
        )}

        {familyProducts.length === 0 && (
          <div className="text-center py-24 max-w-xl mx-auto">
            <h3 className="text-2xl font-semibold tracking-tight text-foreground mb-3">
              {family.label} are landing shortly
            </h3>
            <p className="text-muted-foreground mb-8">
              The range is confirmed but the models are not listed yet. Tell us what you need and
              we will come back to you with prices as soon as they are set.
            </p>
            <Link to="/contact" className="btn-primary">
              Ask about {family.shortLabel}
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>

      {/* PowerPack-specific content, kept off the landing page so the
          homepage stays even-handed between the product lines. */}
      {family.id === 'powerpacks' && familyProducts.length > 0 && (
        <div className="-mx-6 mt-20 border-t border-border">
          <SmartTechnology />
          <CalculatorPreview />
        </div>
      )}
    </motion.div>
  );
}

function ProductCard({ product, viewMode }: { product: Product; viewMode: 'grid' | 'list' }) {
  if (viewMode === 'list') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="card-interactive p-6 flex flex-col md:flex-row gap-8 items-center group"
      >
        <div className="w-full md:w-48 aspect-square rounded-lg overflow-hidden bg-muted p-4">
          <LazyImage src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="flex-grow">
          <div className="text-xs font-medium text-primary mb-2 uppercase tracking-widest">{product.type}</div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">{product.name}</h3>
          <p className="text-muted-foreground mb-4 max-w-xl text-sm">{product.description}</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(product.specs).slice(0, 3).map(([key, value]) => (
              <div key={key} className="text-xs bg-muted px-3 py-1 rounded-lg text-muted-foreground">
                <span className="font-medium text-foreground">{key}:</span> {value}
              </div>
            ))}
          </div>
        </div>
        <Link
          to={productPath(product)}
          className="min-w-[160px] py-3 bg-foreground text-background font-medium rounded-lg text-center hover:opacity-90 transition-all flex items-center justify-center gap-2 text-sm"
        >
          View Details
          <ArrowRight size={16} />
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="card-interactive p-6 flex flex-col h-full group"
    >
      <div className="aspect-square rounded-lg mb-6 p-4 bg-muted overflow-hidden relative">
        <LazyImage src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 right-3 px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-medium uppercase rounded-lg">
          {product.type}
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2 text-foreground">{product.name}</h3>
      <p className="text-muted-foreground text-sm mb-6 flex-grow line-clamp-3">{product.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
        {cardSpecs(product).map((chip) => (
          <div key={chip.label}>
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5">{chip.label}</div>
            <div className="font-medium text-foreground">{chip.value}</div>
          </div>
        ))}
      </div>

      <Link
        to={productPath(product)}
        className="py-3 border border-border hover:bg-foreground hover:text-background text-foreground font-medium rounded-lg text-center transition-all flex items-center justify-center gap-2 text-sm"
      >
        View Details
        <ArrowRight size={16} />
      </Link>
    </motion.div>
  );
}

function ComingSoon({ familyId }: { familyId: ProductFamilyId }) {
  const family = FAMILY_BY_ID[familyId];
  const Icon = family.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-6 min-h-screen bg-background"
    >
      <div className="container mx-auto">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/products" className="hover:text-foreground transition-colors">Products</Link>
          <span className="text-border">/</span>
          <span className="text-foreground font-medium">{family.label}</span>
        </div>

        <div className="rounded-lg border border-border bg-surface-elevated px-8 py-20 text-center">
          <div className="w-16 h-16 rounded-lg bg-background border border-border flex items-center justify-center mx-auto mb-8 text-primary">
            <Icon size={30} />
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 text-foreground">
            {family.label} is on the way
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            {family.soonBlurb ?? family.lead}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              Tell me when it lands
              <Bell size={16} />
            </Link>
            <Link to="/products/powerpacks" className="btn-secondary">Browse PowerPacks</Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

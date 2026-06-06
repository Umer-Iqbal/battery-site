import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products, Product } from '../data/products';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import LazyImage from '@/components/ui/LazyImage';
import { Search, Grid, List as ListIcon, ArrowRight } from 'lucide-react';

const categories = ['All', 'Residential', 'Commercial', 'Portable'];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-foreground">Product Suite</h1>
            <p className="text-muted-foreground">High-performance energy solutions tailored for every need.</p>
          </div>

          <div className="flex bg-muted p-1 rounded-sm border border-border">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={cn('p-2 rounded-sm transition-all', viewMode === 'grid' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground')}
            >
              <Grid size={20} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={cn('p-2 rounded-sm transition-all', viewMode === 'list' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground')}
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
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-background border border-border rounded-sm py-3 pl-12 pr-6 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'px-5 py-3 rounded-sm border transition-all text-sm font-medium',
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

        {filteredProducts.length === 0 && (
          <div className="text-center py-24">
            <h3 className="text-xl text-muted-foreground">No products found matching your criteria.</h3>
          </div>
        )}
      </div>
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
        className="border border-border p-6 flex flex-col md:flex-row gap-8 items-center group hover:border-primary/30 transition-colors bg-background"
      >
        <div className="w-full md:w-48 aspect-square overflow-hidden bg-muted p-4">
          <LazyImage src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="flex-grow">
          <div className="text-xs font-medium text-primary mb-2 uppercase tracking-widest">{product.category}</div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">{product.name}</h3>
          <p className="text-muted-foreground mb-4 max-w-xl text-sm">{product.description}</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(product.specs).slice(0, 3).map(([key, value]) => (
              <div key={key} className="text-xs bg-muted px-3 py-1 rounded-sm text-muted-foreground">
                <span className="font-medium text-foreground">{key}:</span> {value}
              </div>
            ))}
          </div>
        </div>
        <Link
          to={`/products/${product.slug}`}
          className="min-w-[160px] py-3 bg-foreground text-background font-medium rounded-sm text-center hover:opacity-90 transition-all flex items-center justify-center gap-2 text-sm"
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
      className="border border-border p-6 flex flex-col h-full group hover:border-primary/30 transition-colors bg-background"
    >
      <div className="aspect-square mb-6 p-4 bg-muted overflow-hidden relative">
        <LazyImage src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 right-3 px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-medium uppercase rounded-sm">
          {product.category}
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2 text-foreground">{product.name}</h3>
      <p className="text-muted-foreground text-sm mb-6 flex-grow line-clamp-3">{product.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
        <div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5">Voltage</div>
          <div className="font-medium text-foreground">{product.voltage}</div>
        </div>
        <div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5">Capacity</div>
          <div className="font-medium text-foreground">{product.capacity}</div>
        </div>
      </div>

      <Link
        to={`/products/${product.slug}`}
        className="py-3 border border-border hover:bg-foreground hover:text-background text-foreground font-medium rounded-sm text-center transition-all flex items-center justify-center gap-2 text-sm"
      >
        View Details
        <ArrowRight size={16} />
      </Link>
    </motion.div>
  );
}

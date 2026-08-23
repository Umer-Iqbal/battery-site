import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cardSpecs, findProduct, resolveLegacySlug } from '../data/products';
import { cn } from '@/utils/cn';
import SeoHead from '@/components/SeoHead';
import LazyImage from '@/components/ui/LazyImage';
import { buildBreadcrumbSchema, buildProductSchema, buildProductSeo } from '@/lib/seo-config';
import { FAMILY_BY_ID, productPath } from '@/data/families';
import NotFound from './NotFound';
import {
  ArrowLeft,
  ShieldCheck,
  Zap,
  RefreshCcw,
  Battery,
  MessageSquare,
} from 'lucide-react';

export default function ProductDetail() {
  const { family: familyParam, slug } = useParams<{ family: string; slug: string }>();
  const product = slug ? findProduct(slug) : undefined;

  if (!product) {
    // Pre-rebrand slugs still circulate; send them to the canonical URL.
    const legacy = slug ? resolveLegacySlug(slug) : undefined;
    if (legacy) return <Navigate to={productPath(legacy)} replace />;
    return <NotFound />;
  }

  // Right product, wrong family segment — normalise rather than 404.
  if (product.family !== familyParam) {
    return <Navigate to={productPath(product)} replace />;
  }

  const family = FAMILY_BY_ID[product.family];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-background min-h-screen"
    >
      <SeoHead
        meta={buildProductSeo(product)}
        schema={[buildProductSchema(product), buildBreadcrumbSchema(product)]}
      />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-secondary/30 border-b border-border">
        <div className="container mx-auto">
          <Link to={family.path} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-12 transition-colors group text-sm">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to {family.label}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}>
              <div className="text-primary font-medium uppercase tracking-widest mb-4 text-sm">{product.type} Series</div>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-foreground">{product.name}</h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">{product.description}</p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-3.5 bg-foreground text-background font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 text-sm"
                >
                  Inquire Now <MessageSquare size={18} />
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
              <LazyImage src={product.image} alt={product.name} className="w-full max-w-lg mx-auto" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key numbers — units, not feature labels, so this reads for any family */}
      <section className="py-16 border-b border-border bg-background">
        <div className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {cardSpecs(product).map((chip, i) => (
            <div key={chip.label} className="flex flex-col gap-3 text-center items-center">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-primary">
                {i % 2 === 0 ? <Zap size={20} /> : <Battery size={20} />}
              </div>
              <div className="text-2xl font-semibold tracking-tight text-foreground">{chip.value}</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground -mt-2">{chip.label}</div>
            </div>
          ))}
          <div className="flex flex-col gap-3 text-center items-center">
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-primary">
              <ShieldCheck size={20} />
            </div>
            <div className="text-2xl font-semibold tracking-tight text-foreground">{family.label.split(' ')[0]}</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground -mt-2">Range</div>
          </div>
          <div className="flex flex-col gap-3 text-center items-center">
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-primary">
              <RefreshCcw size={20} />
            </div>
            <div className="text-2xl font-semibold tracking-tight text-foreground">{product.type}</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground -mt-2">Series</div>
          </div>
        </div>
      </section>

      {/* What you get — features need a home now the strip carries numbers */}
      <section className="py-24 px-6 bg-background border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight mb-10 text-center text-foreground">
            What you get
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
            {product.features.map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <ShieldCheck size={18} className="text-accent shrink-0 mt-1" />
                <span className="text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold tracking-tight mb-10 text-center text-foreground">Technical Specifications</h2>
            <div className="rounded-lg border border-border overflow-hidden bg-background">
              <table className="w-full text-left text-sm">
                <tbody>
                  {Object.entries(product.specs).map(([key, value], i) => (
                    <tr key={key} className={cn('border-b border-border', i % 2 === 0 ? 'bg-muted/30' : 'bg-background')}>
                      <td className="py-4 px-6 text-muted-foreground font-medium">{key}</td>
                      <td className="py-4 px-6 font-medium text-foreground">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight mb-4 text-foreground">Looking at the whole range?</h2>
          <p className="text-muted-foreground mb-8">{family.lead}</p>
          <Link to={family.path} className="inline-block px-8 py-3.5 bg-foreground text-background font-medium rounded-lg hover:opacity-90 transition-opacity text-sm">
            All {family.label}
          </Link>
        </div>
      </section>
    </motion.div>
  );
}

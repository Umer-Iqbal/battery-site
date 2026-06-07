import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { cn } from '@/utils/cn';
import SeoHead from '@/components/SeoHead';
import LazyImage from '@/components/ui/LazyImage';
import { buildProductSchema } from '@/lib/seo-config';
import {
  ArrowLeft,
  ShieldCheck,
  Zap,
  RefreshCcw,
  Battery,
  Download,
  MessageSquare,
} from 'lucide-react';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find(p => p.slug === slug);

  if (!product) {
    return (
      <div className="pt-32 pb-24 px-6 text-center">
        <h1 className="text-4xl font-semibold mb-6 text-foreground">Product Not Found</h1>
        <Link to="/products" className="text-primary hover:underline">Back to products</Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-background min-h-screen"
    >
      <SeoHead
        meta={{
          title: `${product.name} | NexVolt`,
          description: product.description,
          path: `/products/${product.slug}`,
          type: 'product',
          image: product.image,
        }}
        schema={buildProductSchema(product)}
      />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-secondary/30 border-b border-border">
        <div className="container mx-auto">
          <Link to="/products" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-12 transition-colors group text-sm">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}>
              <div className="text-primary font-medium uppercase tracking-widest mb-4 text-sm">{product.category} Series</div>
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

      {/* Highlights */}
      <section className="py-16 border-b border-border bg-background">
        <div className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {product.features.map((feature, i) => (
            <div key={i} className="flex flex-col gap-3 text-center items-center">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-primary">
                {i % 4 === 0 && <ShieldCheck size={20} />}
                {i % 4 === 1 && <Zap size={20} />}
                {i % 4 === 2 && <RefreshCcw size={20} />}
                {i % 4 === 3 && <Battery size={20} />}
              </div>
              <h4 className="font-medium text-sm text-foreground">{feature}</h4>
            </div>
          ))}
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

            <div className="mt-8 flex justify-center">
              <button type="button" className="flex items-center gap-2 text-primary font-medium hover:underline text-sm">
                <Download size={18} /> Download Datasheet (PDF)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight mb-4 text-foreground">Need More Capacity?</h2>
          <p className="text-muted-foreground mb-8">
            Explore our full range of residential and commercial energy storage solutions.
          </p>
          <Link to="/products" className="inline-block px-8 py-3.5 bg-foreground text-background font-medium rounded-lg hover:opacity-90 transition-opacity text-sm">
            View All Products
          </Link>
        </div>
      </section>
    </motion.div>
  );
}

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/**
 * GitHub Pages serves 404.html as a copy of index.html, so before this page
 * existed an unknown URL rendered the layout around an empty <main>.
 */
export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-6 min-h-screen bg-background flex items-center justify-center"
    >
      <div className="container mx-auto max-w-xl text-center">
        <p className="text-xs font-medium tracking-widest text-primary uppercase mb-4">404</p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-foreground">
          That page has moved, or never existed
        </h1>
        <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
          If you followed an old link, our product pages were reorganised when we became Enersol.
          Everything is still here — just one level deeper.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/products" className="btn-primary">
            Browse products
            <ArrowRight size={16} />
          </Link>
          <Link to="/contact" className="btn-secondary">Contact us</Link>
        </div>
      </div>
    </motion.div>
  );
}

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import LazyImage from '../ui/LazyImage';
import WhatsAppButton from '../ui/WhatsAppButton';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Full-bleed product image */}
      <div className="absolute inset-0">
        <LazyImage
          src="/images/hero-battery.jpg"
          alt="NexVolt LiFePO4 Battery System"
          className="w-full h-full object-cover object-center"
          fallbackClassName="w-full h-full min-h-screen"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
      </div>

      {/* Content — bottom third, Tesla-style */}
      <div className="relative z-10 container mx-auto px-6 pb-24 pt-32 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-foreground mb-6"
        >
          Power Without Compromise
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Premium LiFePO4 batteries engineered for Pakistan&apos;s energy future.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/products"
            className="min-w-[200px] px-8 py-3.5 bg-foreground text-background font-medium rounded-sm hover:opacity-90 transition-opacity text-sm tracking-wide"
          >
            Explore Products
          </Link>
          <WhatsAppButton variant="hero" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="relative z-10 flex justify-center pb-8"
      >
        <ChevronDown size={28} className="text-muted-foreground animate-bounce" />
      </motion.div>
    </section>
  );
}

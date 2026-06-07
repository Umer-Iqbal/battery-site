import Hero from '../components/sections/Hero';
import SpecStrip from '../components/sections/SpecStrip';
import EnergyFlow from '../components/sections/EnergyFlow';
import DayNightCycle from '../components/sections/DayNightCycle';
import SmartTechnology from '../components/sections/SmartTechnology';
import CalculatorPreview from '../components/sections/CalculatorPreview';
import ContactStrip from '../components/sections/ContactStrip';
import LazyImage from '../components/ui/LazyImage';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { products } from '../data/products';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-background"
    >
      <Hero />
      <SpecStrip />
      {/* <EnergyFlow /> */}
      {/* <DayNightCycle /> */}
      <SmartTechnology />

      {/* Mobile App — full-bleed Tesla-style */}
      <section className="py-24 md:py-32 bg-secondary/30 border-y border-border">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-medium tracking-widest text-primary uppercase mb-4">Smart Monitoring</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-foreground leading-tight">
              Your Battery.<br />Always In Sight.
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Monitor live power flow, cell health, and energy statistics from anywhere in the world.
            </p>
            <Link
              to="/mobile-app"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline group"
            >
              Learn About the App
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <LazyImage
              src={`${import.meta.env.BASE_URL}images/nexvolt_mobile_app_mockup_1780678692443.png`}
              alt="NexVolt Mobile App"
              className="w-full max-w-sm mx-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Product Lineup — minimal cards */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-foreground">
              Product Lineup
            </h2>
            <p className="text-muted-foreground text-lg">
              From portable 15Ah units to 5kWh wall-mount systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.slug}`}
                className="group card-interactive p-6"
              >
                <div className="aspect-square rounded-lg bg-muted mb-6 flex items-center justify-center overflow-hidden">
                  <LazyImage
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">{product.capacity}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/products" className="btn-secondary">
              View All Products
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <CalculatorPreview />

      {/* Dealer CTA — minimal */}
      <section className="py-24 md:py-32 bg-secondary/30 border-y border-border">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <p className="text-xs font-medium tracking-widest text-accent uppercase mb-4">Business Opportunity</p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-foreground">
            Become a NexVolt Dealer
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            Join Pakistan&apos;s fastest growing energy storage distribution network.
          </p>
          <Link to="/become-dealer" className="btn-primary">
            Apply for Dealership
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <ContactStrip />
    </motion.div>
  );
}

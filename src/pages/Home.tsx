import Hero from '../components/sections/Hero';
import SpecStrip from '../components/sections/SpecStrip';
import EnergyFlow from '../components/sections/EnergyFlow';
import DayNightCycle from '../components/sections/DayNightCycle';
import CalculatorPreview from '../components/sections/CalculatorPreview';
import ContactStrip from '../components/sections/ContactStrip';
import LazyImage from '../components/ui/LazyImage';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { batteryProducts, bikeProducts, cardSummary } from '../data/products';
import { productPath } from '@/data/families';

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
      {/* <EnergyFlow /> */}
      {/* <DayNightCycle /> */}
      <SpecStrip />


      {/* Electric bikes — leads, same card anatomy */}
      {bikeProducts.length > 0 && (
        <section className="py-24 md:py-32 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-foreground">
                Electric bikes
              </h2>
              <p className="text-muted-foreground text-lg">
                Same cells, same BMS, same warranty desk &mdash; on two wheels instead of a wall
                bracket.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {bikeProducts.map((product) => (
                <Link
                  key={product.id}
                  to={productPath(product)}
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
                  <p className="text-sm text-muted-foreground mb-2">{cardSummary(product)}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                </Link>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link to="/products/electric-bikes" className="btn-secondary">
                All bikes
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Battery lineup */}
      <section className="py-24 md:py-32 bg-secondary/30 border-y border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-foreground">
              The PowerPack lineup
            </h2>
            <p className="text-muted-foreground text-lg">
              From a 15Ah PowerPack you can carry to a 5.1kWh wall-mount system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {batteryProducts.map((product) => (
              <Link
                key={product.id}
                to={productPath(product)}
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
                <p className="text-sm text-muted-foreground mb-2">{cardSummary(product)}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/products/powerpacks" className="btn-secondary">
              All PowerPacks
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>


      <CalculatorPreview />

      <ContactStrip />
    </motion.div>
  );
}

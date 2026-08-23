import { motion } from 'framer-motion';

// One cross-family stat plus one per line — three battery claims here made the
// whole page read as a battery shop. [bracketed] figures are still placeholders.
const specs = [
  { value: '2', label: 'Product lines, one supplier' },
  { value: '6,000+', label: 'Battery cycles' },
  { value: '[60] km', label: 'Bike range, eco mode' },
];

export default function SpecStrip() {
  return (
    <section className="border-y border-border bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
          {specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="py-8 sm:py-10 text-center"
            >
              <div className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
                {spec.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1 uppercase tracking-widest">
                {spec.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

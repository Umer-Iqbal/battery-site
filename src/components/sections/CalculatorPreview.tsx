import { Link } from 'react-router-dom';
import { ArrowRight, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CalculatorPreview() {
  return (
    <section className="py-24 md:py-32 bg-secondary/30 border-y border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <Calculator size={32} className="text-primary mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-foreground">
            Calculate Your Energy Needs
          </h2>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            Find the right NexVolt battery capacity, estimated backup runtime, and potential savings
            for your home or business.
          </p>
          <Link
            to="/calculator"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-foreground text-background font-medium rounded-sm hover:opacity-90 transition-opacity text-sm tracking-wide"
          >
            Start Energy Calculator
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

/** Slider rows mirror the real quick-estimate controls on /calculator. */
const SLIDERS = [
  { label: 'Daily Utility Consumption', value: '10 kWh', fill: 0.18, lo: 'Low (apartment)', hi: 'High (industrial)' },
  { label: 'Desired Backup Duration', value: '4 hrs', fill: 0.26, lo: 'Critical loads', hi: 'Full day' },
  { label: 'Peak Load Multiplier', value: '1.5×', fill: 0.36, lo: 'Steady load', hi: 'Heavy peaks' },
];

const READOUT = [
  { label: 'Average load', value: '0.42 kW' },
  { label: 'Peak load (est.)', value: '0.63 kW' },
  { label: 'Required capacity', value: '2.45 kWh', strong: true },
  { label: 'Backup runtime', value: '~7 hrs' },
];

export default function CalculatorPreview() {
  const reduceMotion = useReducedMotion();

  // Slider fills sweep in on scroll; with reduced motion they simply start full.
  const fillTransition = (i: number) =>
    reduceMotion
      ? { duration: 0 }
      : { duration: 0.7, delay: 0.25 + i * 0.12, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <section className="py-24 md:py-32 bg-background border-t border-border overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-medium tracking-widest text-primary uppercase mb-4">
              Energy Calculator
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-foreground">
              Sizing a battery bank?
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              List what you need to keep running through an outage and get the capacity, the
              runtime and what it saves you against a generator.
            </p>
            <Link to="/calculator" className="btn-primary">
              Start Energy Calculator
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Live-looking preview of the real tool, built from markup rather than
              a screenshot so it stays crisp and follows the design tokens. */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            aria-hidden
          >
            <div className="rounded-lg border border-border bg-surface-elevated p-5 flex flex-col justify-between gap-6">
              {SLIDERS.map((s, i) => (
                <div key={s.label}>
                  <div className="flex items-baseline justify-between gap-3 mb-3">
                    <span className="text-[13px] font-medium text-foreground leading-tight">{s.label}</span>
                    <span className="text-[13px] font-semibold text-primary tabular-nums shrink-0">{s.value}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted relative">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full bg-primary/25"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.fill * 100}%` }}
                      viewport={{ once: true }}
                      transition={fillTransition(i)}
                    />
                    <motion.span
                      className="absolute top-1/2 w-4 h-4 -mt-2 -ml-2 rounded-full bg-primary shadow-lg shadow-primary/40"
                      initial={{ left: 0, scale: 0.6, opacity: 0 }}
                      whileInView={{ left: `${s.fill * 100}%`, scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={fillTransition(i)}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                    <span>{s.lo}</span>
                    <span>{s.hi}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-primary/30 bg-primary/5 p-5">
              <p className="text-[11px] font-medium uppercase tracking-widest text-primary mb-4">
                Live recommendation
              </p>
              <div className="flex flex-col gap-3">
                {READOUT.map((r, i) => (
                  <motion.div
                    key={r.label}
                    className="flex items-center justify-between gap-3 text-[13px]"
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={reduceMotion ? { duration: 0 } : { duration: 0.4, delay: 0.5 + i * 0.09 }}
                  >
                    <span className="text-muted-foreground">{r.label}</span>
                    <span
                      className={`tabular-nums ${r.strong ? 'font-semibold text-foreground' : 'font-medium text-foreground'}`}
                    >
                      {r.value}
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-5 pt-5 border-t border-border"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.5, delay: 0.9 }}
              >
                <p className="text-[15px] font-semibold text-foreground leading-snug">
                  Enersol PowerGate 5.1kWh
                </p>
                <p className="text-[13px] text-muted-foreground mt-0.5">Total: 5.12 kWh installed</p>
                <div className="grid grid-cols-2 gap-3 mt-5 pt-5 border-t border-border">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                      Annual savings
                    </p>
                    <p className="text-sm font-semibold text-accent tabular-nums">Rs. 54,750</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                      Payback
                    </p>
                    <p className="text-sm font-semibold text-foreground tabular-nums">~4.2 yrs</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

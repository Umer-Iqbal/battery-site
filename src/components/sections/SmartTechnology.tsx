import { ShieldCheck, RefreshCcw, Zap, Thermometer, Bluetooth, Battery } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'LiFePO4 Chemistry',
    description: 'Safest lithium technology with superior thermal and chemical stability for long-term home use.',
    icon: ShieldCheck,
    visual: 'Grade A cells with multi-layer protection',
  },
  {
    title: '6000+ Cycle Life',
    description: 'Designed to last over 15 years with daily charging and discharging cycles.',
    icon: RefreshCcw,
    visual: '15+ years of reliable performance',
  },
  {
    title: 'Smart BMS & Monitoring',
    description: 'Advanced cell balancing, thermal protection, and real-time Bluetooth monitoring via the NexVolt app.',
    icon: Zap,
    visual: 'Real-time SOC, voltage & health data',
  },
];

export default function SmartTechnology() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-foreground">
            Battery Intelligence
          </h2>
          <p className="text-muted-foreground text-lg">
            NexVolt batteries are intelligent energy systems — not just cells.
          </p>
        </div>

        <div className="space-y-24 md:space-y-32">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const reversed = index % 2 === 1;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${reversed ? 'lg:direction-rtl' : ''}`}
              >
                <div className={reversed ? 'lg:order-2' : ''}>
                  <div className="w-12 h-12 rounded-sm border border-border flex items-center justify-center mb-6 text-primary">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className={`aspect-[4/3] bg-secondary border border-border flex items-center justify-center ${reversed ? 'lg:order-1' : ''}`}>
                  <div className="text-center px-8">
                    <Icon size={48} className="text-primary mx-auto mb-4 opacity-60" />
                    <p className="text-sm text-muted-foreground uppercase tracking-widest">{feature.visual}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Compact feature pills */}
        <div className="mt-24 pt-16 border-t border-border grid grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { icon: Thermometer, label: 'Thermal Management' },
            { icon: Bluetooth, label: 'Bluetooth Monitoring' },
            { icon: Battery, label: '99% Efficiency' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 text-muted-foreground">
              <Icon size={18} className="text-primary shrink-0" />
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { ShieldCheck, RefreshCcw, Zap, Thermometer, Bluetooth, Battery } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'LiFePO4 Chemistry',
    description: 'Safest lithium technology with superior thermal and chemical stability for long-term home use.',
    icon: ShieldCheck,
    renderVisual: () => (
      <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-from)_0%,transparent_65%)] from-primary/10 to-transparent" />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-48 h-48 rounded-full border border-primary/20"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute w-64 h-64 rounded-full border border-primary/10"
        />
        <div className="relative z-10 w-24 h-24 rounded-2xl bg-background/50 backdrop-blur-sm border border-border shadow-2xl flex items-center justify-center mb-6">
          <ShieldCheck size={48} className="text-primary" />
        </div>
        <p className="relative z-10 text-sm text-foreground font-medium uppercase tracking-widest max-w-[220px] mx-auto text-center leading-relaxed">
          Grade A cells with multi-layer protection
        </p>
      </div>
    ),
  },
  {
    title: '6000+ Cycle Life',
    description: 'Designed to last over 15 years with daily charging and discharging cycles.',
    icon: RefreshCcw,
    renderVisual: () => (
      <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-[280px] bg-background/60 backdrop-blur-md border border-border rounded-xl p-6 shadow-xl relative z-10">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Lifecycle Status</span>
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md font-medium">Active</span>
          </div>
          <div className="relative h-24 w-full flex items-end justify-between gap-2 mb-4">
            {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${height}%` }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="w-full bg-primary/20 rounded-t-sm relative group"
              >
                <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-sm transition-all duration-300" style={{ height: '30%' }} />
              </motion.div>
            ))}
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-foreground">6,000<span className="text-sm font-medium text-muted-foreground ml-1">cycles</span></span>
            <span className="text-xs text-primary font-medium flex items-center gap-1"><RefreshCcw size={12} /> 15+ Yrs</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Smart BMS & Monitoring',
    description: 'Advanced cell balancing, thermal protection, and real-time Bluetooth monitoring via the NexVolt app.',
    icon: Zap,
    renderVisual: () => (
      <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-[280px] bg-background/60 backdrop-blur-md border border-border rounded-xl p-6 shadow-xl relative z-10">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-muted-foreground font-semibold tracking-wider">SYSTEM HEALTH</span>
            </div>
            <span className="text-lg font-bold text-foreground">99%</span>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">Cell Balancing</span>
                <span className="text-foreground font-medium">Optimal</span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} whileInView={{ width: '100%' }} transition={{ duration: 1 }} viewport={{ once: true }} className="h-full bg-primary" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">Temperature</span>
                <span className="text-foreground font-medium">24°C</span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} whileInView={{ width: '40%' }} transition={{ duration: 1 }} viewport={{ once: true }} className="h-full bg-accent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
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
                  <div className="w-12 h-12 rounded-lg border border-border flex items-center justify-center mb-6 text-primary">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div
                  className={`aspect-[4/3] rounded-2xl border border-border flex items-center justify-center relative overflow-hidden bg-surface-elevated/50 ${reversed ? 'lg:order-1' : ''}`}
                >
                  <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)', backgroundSize: '12px 12px' }} />
                  {feature.renderVisual()}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Compact feature pills */}
        <div className="mt-24 pt-16 border-t border-border grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Thermometer, label: 'Thermal Management', desc: 'Active cooling & heating' },
            { icon: Bluetooth, label: 'Bluetooth 5.0', desc: 'Real-time app monitoring' },
            { icon: Battery, label: '99% Efficiency', desc: 'Maximized energy utilization' },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-start gap-4 p-6 rounded-2xl border border-border bg-surface-elevated hover:border-primary/30 hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-primary/5 group-hover:border-primary/20 transition-all">
                <Icon size={24} className="text-primary" />
              </div>
              <div>
                <h4 className="text-base font-semibold text-foreground mb-1">{label}</h4>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

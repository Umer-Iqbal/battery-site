import { motion } from 'framer-motion';
import { Activity, Battery, Bike, Bluetooth, ShieldCheck, Thermometer } from 'lucide-react';

/** Rows in the app mock-up — a wall pack and a bike pack side by side. */
const DEVICES = [
  {
    icon: Battery,
    title: 'PowerGate · Lounge wall',
    detail: 'Discharging · 1.2 kW',
    value: '82%',
    valueClass: 'text-accent',
  },
  {
    icon: Bike,
    title: 'City bike · Garage',
    detail: 'Charging · full in 40 min',
    value: '61%',
    valueClass: 'text-primary',
  },
  {
    icon: Thermometer,
    title: 'Pack temperature',
    detail: 'All cells within 2 °C',
    value: '34 °C',
    valueClass: 'text-foreground',
  },
];

const PILLS = [
  { icon: Thermometer, label: 'Thermal management', desc: 'Built for Pakistani summers' },
  { icon: Bluetooth, label: 'Bluetooth 5.0', desc: 'Real-time app monitoring' },
  { icon: ShieldCheck, label: 'Serviced locally', desc: 'Warranty handled in-country' },
];

export default function SmartTechnology() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-foreground">
            Intelligent, not just charged
          </h2>
          <p className="text-muted-foreground text-lg">
            Every Enersol pack — in a wall bracket or a bike frame — runs the same smart BMS and
            reports to the same app.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          <div>
            <div className="w-12 h-12 rounded-lg border border-border flex items-center justify-center mb-6 text-primary">
              <Activity size={24} />
            </div>
            <h3 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 text-foreground">
              One app, every pack
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Live cell health, charge state, temperature and cycle count — for the battery on your
              wall and the bike in your garage, in the same list. Set charge limits before a long
              outage, and see which cell is dragging before it fails.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-surface-elevated p-6 sm:p-8" aria-hidden>
            <div className="flex flex-col gap-4">
              {DEVICES.map((d, i) => {
                const Icon = d.icon;
                return (
                  <motion.div
                    key={d.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
                    className="flex items-center gap-4 p-5 rounded-lg bg-background border border-border"
                  >
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0 text-primary">
                      <Icon size={20} />
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="text-sm font-medium text-foreground truncate">{d.title}</div>
                      <div className="text-xs text-muted-foreground truncate">{d.detail}</div>
                    </div>
                    <div className={`text-xl font-semibold tabular-nums shrink-0 ${d.valueClass}`}>
                      {d.value}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        <div className="mt-20 pt-16 border-t border-border grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLS.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="flex items-start gap-4 p-6 rounded-lg border border-border bg-surface-elevated"
            >
              <div className="w-12 h-12 rounded-lg bg-background border border-border flex items-center justify-center shrink-0 text-primary">
                <Icon size={24} />
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

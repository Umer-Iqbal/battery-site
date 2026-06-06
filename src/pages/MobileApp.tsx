import { motion } from 'framer-motion';
import LazyImage from '@/components/ui/LazyImage';
import {
  Smartphone,
  Shield,
  Activity,
  Thermometer,
  Battery,
  Bell,
  Wifi,
  Zap,
  ChevronRight,
} from 'lucide-react';

const appFeatures = [
  { icon: <Activity className="text-primary" />, title: 'Real-time SoC', desc: 'Monitor State of Charge with 1% accuracy.' },
  { icon: <Zap className="text-accent" />, title: 'Power Flow', desc: 'Visualize energy moving from solar to home.' },
  { icon: <Thermometer className="text-energy-solar" />, title: 'Cell Temp', desc: 'Track thermal status of individual cells.' },
  { icon: <Shield className="text-energy-grid" />, title: 'Health Audit', desc: 'Identify cell balancing issues instantly.' },
  { icon: <Bell className="text-destructive" />, title: 'Smart Alerts', desc: 'Receive notifications for critical events.' },
  { icon: <Wifi className="text-primary" />, title: 'Remote OTA', desc: 'Update firmware with a single tap.' },
];

export default function MobileApp() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-6 min-h-screen bg-background overflow-hidden"
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-20 mb-32">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-2 mb-6 text-primary">
              <Smartphone size={24} />
              <span className="font-medium tracking-widest uppercase text-xs">The NexVolt Ecosystem</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-8 leading-tight text-foreground">
              Energy Control <br />
              <span className="text-gradient">In Your Pocket</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Experience total transparency. Our custom-built mobile app communicates
              directly with the NexVolt Cloud, giving you insights previously only
              available to factory technicians.
            </p>
            <div className="flex flex-wrap gap-6 mb-16">
              <LazyImage src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-14 cursor-pointer hover:opacity-80 transition-opacity" />
              <LazyImage src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Play Store" className="h-14 cursor-pointer hover:opacity-80 transition-opacity" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {appFeatures.slice(0, 4).map((f, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <div className="w-10 h-10 bg-muted rounded-sm flex items-center justify-center shrink-0 border border-border">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{f.title}</h4>
                    <p className="text-xs text-muted-foreground">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10"
            >
              <LazyImage src="/images/nexvolt_mobile_app_mockup_1780678692443.png" alt="App Mockup" className="w-full max-w-lg mx-auto" />
            </motion.div>

            <div className="absolute top-1/4 -right-10 border border-border bg-surface-elevated p-4 rounded-sm z-20">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span className="text-xs font-medium text-foreground">System Status: Optimal</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appFeatures.map((feature, i) => (
            <div key={i} className="p-8 border border-border bg-background hover:border-primary/30 transition-colors group">
              <div className="w-14 h-14 bg-muted rounded-sm flex items-center justify-center mb-6 border border-border group-hover:scale-105 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground mb-6 text-sm">{feature.desc}</p>
              <button type="button" className="flex items-center gap-2 text-primary font-medium text-sm">
                Learn more <ChevronRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

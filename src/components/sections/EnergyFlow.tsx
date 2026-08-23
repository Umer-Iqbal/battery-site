import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Home, Zap, BatteryMedium } from 'lucide-react';
import { cn } from '@/utils/cn';

const modes = [
  {
    id: 'solar',
    label: 'Solar Charging',
    icon: Sun,
    colorClass: 'text-energy-solar',
    borderActive: 'border-energy-solar/40 bg-energy-solar/10',
    flowKw: 4.2,
    direction: 'charging' as const,
    sourcePath: 'M 60 80 Q 200 80 320 200',
    strokeClass: 'stroke-energy-solar',
  },
  {
    id: 'grid',
    label: 'Grid Peak Shaving',
    icon: Zap,
    colorClass: 'text-energy-grid',
    borderActive: 'border-energy-grid/40 bg-energy-grid/10',
    flowKw: 3.1,
    direction: 'charging' as const,
    sourcePath: 'M 60 280 Q 200 280 320 200',
    strokeClass: 'stroke-energy-grid',
  },
  {
    id: 'backup',
    label: 'Home Backup',
    icon: Home,
    colorClass: 'text-energy-backup',
    borderActive: 'border-energy-backup/40 bg-energy-backup/10',
    flowKw: 2.8,
    direction: 'discharging' as const,
    sourcePath: 'M 320 200 Q 440 200 560 200',
    strokeClass: 'stroke-energy-backup',
  },
];

const batteryLevels = { solar: 92, grid: 78, backup: 45 };

function FlowPath({ d, strokeClass, delay = 0 }: { d: string; strokeClass: string; delay?: number }) {
  return (
    <>
      <motion.path
        d={d}
        fill="none"
        strokeWidth="2"
        strokeDasharray="6 4"
        className={cn(strokeClass, 'opacity-30')}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay }}
      />
      <motion.path
        d={d}
        fill="none"
        strokeWidth="2"
        className={strokeClass}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay }}
      />
      {[0, 0.5, 1].map((offset, i) => (
        <motion.circle
          key={i}
          r="4"
          className={strokeClass.replace('stroke-', 'fill-')}
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', delay: delay + i * 0.6 }}
          style={{ offsetPath: `path('${d}')` }}
        />
      ))}
    </>
  );
}

export default function EnergyFlow() {
  const [activeMode, setActiveMode] = useState('solar');
  const current = modes.find(m => m.id === activeMode)!;
  const soc = batteryLevels[activeMode as keyof typeof batteryLevels];

  return (
    <section className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-foreground">
            Intelligent Energy Flow
          </h2>
          <p className="text-muted-foreground text-lg">
            Switch between modes to see how Enersol optimizes your home energy ecosystem.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {modes.map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => setActiveMode(mode.id)}
              aria-pressed={activeMode === mode.id}
              className={cn(
                'px-6 py-3 rounded-lg flex items-center gap-2 transition-all border text-sm font-medium',
                activeMode === mode.id
                  ? cn(mode.borderActive, 'text-foreground')
                  : 'bg-background border-border text-muted-foreground hover:text-foreground'
              )}
            >
              <mode.icon size={18} className={cn(activeMode === mode.id ? mode.colorClass : 'text-muted-foreground')} />
              {mode.label}
            </button>
          ))}
        </div>

        <div className="relative max-w-5xl mx-auto rounded-lg border border-border bg-background p-8 md:p-12">
          <div className="grid grid-cols-3 gap-8 md:gap-12 relative min-h-[300px]">
            {/* Sources */}
            <div className="flex flex-col justify-between items-center py-6 z-10">
              <motion.div
                animate={{ scale: activeMode === 'solar' ? 1.05 : 1, opacity: activeMode === 'solar' ? 1 : 0.5 }}
                className={cn(
                  'w-20 h-20 md:w-24 md:h-24 rounded-lg flex items-center justify-center border transition-all duration-500',
                  activeMode === 'solar' ? modes[0].borderActive : 'border-border bg-muted',
                  activeMode === 'solar' && 'ring-2 ring-energy-solar/20'
                )}
              >
                <Sun size={40} className={activeMode === 'solar' ? 'text-energy-solar' : 'text-muted-foreground'} />
              </motion.div>
              <motion.div
                animate={{ scale: activeMode === 'grid' ? 1.05 : 1, opacity: activeMode === 'grid' ? 1 : 0.5 }}
                className={cn(
                  'w-20 h-20 md:w-24 md:h-24 rounded-lg flex items-center justify-center border transition-all duration-500',
                  activeMode === 'grid' ? modes[1].borderActive : 'border-border bg-muted',
                  activeMode === 'grid' && 'ring-2 ring-energy-grid/20'
                )}
              >
                <Zap size={40} className={activeMode === 'grid' ? 'text-energy-grid' : 'text-muted-foreground'} />
              </motion.div>
            </div>

            {/* Battery */}
            <div className="flex items-center justify-center relative z-10">
              <div className="relative w-36 md:w-48 h-52 md:h-64 bg-muted rounded-lg border border-border p-5 flex flex-col justify-between overflow-hidden ring-2 ring-primary/10">
                <motion.div
                  animate={{ height: `${soc}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="absolute bottom-0 left-0 right-0 bg-primary/20"
                />
                <div className="flex justify-between items-start z-10">
                  <BatteryMedium size={28} className="text-primary" />
                  <span className="text-lg font-semibold text-foreground">Enersol</span>
                </div>
                <div className="z-10 text-center">
                  <motion.div
                    key={soc}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="text-3xl md:text-4xl font-semibold text-foreground mb-1"
                  >
                    {soc}%
                  </motion.div>
                  <div className="text-[10px] uppercase tracking-widest text-primary font-medium">
                    {current.direction === 'charging' ? 'Charging' : 'Discharging'}
                  </div>
                </div>
                <div className="z-10 flex gap-1.5">
                  {[0, 1, 2].map(i => (
                    <div key={i} className={cn('h-1 flex-1 rounded-full', i < Math.ceil(soc / 34) ? 'bg-primary' : 'bg-primary/20')} />
                  ))}
                </div>
              </div>
            </div>

            {/* Home */}
            <div className="flex items-center justify-center z-10">
              <motion.div
                animate={{ scale: activeMode === 'backup' ? 1.05 : 1, opacity: activeMode === 'backup' ? 1 : 0.5 }}
                className={cn(
                  'w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center border transition-all duration-500',
                  activeMode === 'backup' ? modes[2].borderActive : 'border-border bg-muted',
                  activeMode === 'backup' && 'ring-2 ring-energy-backup/20'
                )}
              >
                <Home size={48} className={activeMode === 'backup' ? 'text-energy-backup' : 'text-muted-foreground'} />
              </motion.div>
            </div>

            {/* SVG flow paths */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0" viewBox="0 0 620 360" preserveAspectRatio="xMidYMid meet">
              <AnimatePresence mode="wait">
                <motion.g
                  key={activeMode}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <FlowPath d={current.sourcePath} strokeClass={current.strokeClass} />
                </motion.g>
              </AnimatePresence>
            </svg>
          </div>

          {/* Live metrics */}
          <motion.div
            key={activeMode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 pt-8 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          >
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Flow Rate</div>
              <div className={cn('text-xl font-semibold tabular-nums', current.colorClass)}>
                {current.direction === 'charging' ? '+' : '-'}{current.flowKw} kW
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Battery SOC</div>
              <div className="text-xl font-semibold text-foreground tabular-nums">{soc}%</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Direction</div>
              <div className="text-xl font-semibold text-foreground capitalize">{current.direction}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Mode</div>
              <div className="text-xl font-semibold text-foreground">{current.label.split(' ')[0]}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

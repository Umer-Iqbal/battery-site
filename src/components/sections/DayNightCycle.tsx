import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Home } from 'lucide-react';
import { cn } from '@/utils/cn';

function getSolarIntensity(time: number): number {
  const hour = (time / 100) * 24;
  if (hour < 6 || hour > 20) return 0;
  return Math.sin(((hour - 6) / 14) * Math.PI);
}

function getTwilightFactor(time: number): number {
  const hour = (time / 100) * 24;
  if (hour >= 7 && hour <= 17) return 0;
  if (hour < 5 || hour > 21) return 0;
  if (hour >= 5 && hour < 7) return (hour - 5) / 2;
  if (hour > 17 && hour <= 21) return (21 - hour) / 4;
  return 0;
}

function formatTimeLabel(time: number): string {
  const totalMinutes = Math.round((time / 100) * 24 * 60);
  const hours = Math.floor(totalMinutes / 60) % 24;
  const minutes = totalMinutes % 60;
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

function getPhaseLabel(time: number): string {
  const hour = (time / 100) * 24;
  if (hour < 5) return 'Midnight';
  if (hour < 7) return 'Dawn';
  if (hour < 11) return 'Morning';
  if (hour < 14) return 'Midday';
  if (hour < 17) return 'Afternoon';
  if (hour < 20) return 'Dusk';
  return 'Night';
}

export default function DayNightCycle() {
  const [time, setTime] = useState(50);

  const solar = useMemo(() => getSolarIntensity(time), [time]);
  const twilight = useMemo(() => getTwilightFactor(time), [time]);
  const isCharging = solar > 0.15;
  const batteryLevel = Math.round(38 + solar * 54);
  const solarKw = (solar * 4.2).toFixed(1);
  const homeKw = ((1 - solar) * 2.8 + 0.3).toFixed(1);
  const isNight = solar < 0.1 && twilight < 0.2;
  const skyOpacity = 0.3 + solar * 0.5 + twilight * 0.2;

  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-foreground">24/7 Energy Autonomy</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Drag the slider to see how Enersol manages your home&apos;s energy cycle from dawn till dusk.
          </p>
        </div>

        <div className="relative rounded-lg border border-border bg-surface-elevated p-8 md:p-12 overflow-hidden min-h-[500px]">
          {/* Theme-aware sky layers */}
          <div
            className="absolute inset-0 transition-opacity duration-700 pointer-events-none bg-[hsl(var(--sky-day))]"
            style={{ opacity: skyOpacity }}
          />
          <div
            className="absolute inset-0 transition-opacity duration-700 pointer-events-none bg-gradient-to-b from-energy-solar/20 via-transparent to-transparent"
            style={{ opacity: solar }}
          />
          <div
            className="absolute inset-0 transition-opacity duration-700 pointer-events-none bg-gradient-to-b from-energy-grid/10 via-transparent to-primary/5"
            style={{ opacity: isNight ? 0.6 : twilight }}
          />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 items-center h-full">
            {/* Solar */}
            <div className="text-center space-y-6">
              <motion.div
                animate={{ scale: 0.85 + solar * 0.25, opacity: 0.25 + solar * 0.75 }}
                transition={{ duration: 0.4 }}
                className="w-32 h-32 bg-muted rounded-lg border border-border flex items-center justify-center mx-auto"
              >
                <Sun
                  size={64}
                  className="text-energy-solar transition-all duration-500"
                  style={{ filter: solar > 0.1 ? `drop-shadow(0 0 ${solar * 16}px hsl(var(--energy-solar)/0.6))` : 'none' }}
                />
              </motion.div>
              <div className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                {solar > 0.1 ? 'Solar Generating' : 'Standby'}
              </div>
              <motion.div animate={{ opacity: solar > 0.1 ? 1 : 0 }} className="text-energy-backup font-semibold">
                +{solarKw} kW
              </motion.div>
            </div>

            {/* Battery */}
            <div className="text-center relative">
              <div className="w-48 h-72 bg-muted rounded-lg border border-border mx-auto p-6 flex flex-col justify-between overflow-hidden relative">
                <div
                  className={cn(
                    'w-20 h-20 rounded-full border-4 mx-auto transition-all duration-500 flex items-center justify-center',
                    isCharging
                      ? 'border-primary shadow-[0_0_20px_hsl(var(--primary)/0.3)]'
                      : 'border-accent shadow-[0_0_20px_hsl(var(--accent)/0.3)]'
                  )}
                >
                  <div className="text-xl font-bold text-foreground">{batteryLevel}%</div>
                </div>

                <div className="text-[10px] uppercase tracking-widest font-bold text-foreground transition-colors duration-500">
                  {isCharging ? 'Charging' : 'Discharging'}
                </div>

                <div
                  className="absolute bottom-0 left-0 right-0 bg-primary/20 transition-all duration-700"
                  style={{ height: `${batteryLevel}%` }}
                />
              </div>

              <svg className="absolute inset-0 w-full h-full -z-10 pointer-events-none overflow-visible" viewBox="0 0 400 300">
                {solar > 0.05 && (
                  <motion.path
                    d="M -20 150 Q 100 150 200 150"
                    className="stroke-energy-solar"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: solar }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                {solar < 0.85 && (
                  <motion.path
                    d="M 200 150 Q 300 150 420 150"
                    className="stroke-energy-backup"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 - solar * 0.8 }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </svg>
            </div>

            {/* Home */}
            <div className="text-center space-y-6">
              <motion.div
                animate={{ opacity: 0.4 + (1 - solar) * 0.6 }}
                transition={{ duration: 0.4 }}
                className="w-32 h-32 bg-muted rounded-lg border border-border flex items-center justify-center mx-auto"
              >
                <Home
                  size={64}
                  className={cn('transition-colors duration-500', solar < 0.5 ? 'text-primary' : 'text-muted-foreground')}
                />
              </motion.div>
              <div className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Home Backup</div>
              <motion.div animate={{ opacity: solar < 0.7 ? 1 : 0.3 }} className="text-primary font-semibold">
                {homeKw} kW Active
              </motion.div>
            </div>
          </div>

          {/* Time slider */}
          <div className="relative z-10 mt-16 max-w-2xl mx-auto space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground font-medium">{getPhaseLabel(time)}</span>
              <span className="text-primary font-semibold tabular-nums">{formatTimeLabel(time)}</span>
            </div>
            <div className="flex items-center gap-4">
              <Sun className={cn('shrink-0 transition-colors duration-500', solar > 0.3 ? 'text-energy-solar' : 'text-muted-foreground')} size={24} />
              <input
                type="range"
                min="0"
                max="100"
                value={time}
                onChange={(e) => setTime(Number(e.target.value))}
                aria-label="Time of day"
                className="day-night-slider flex-grow"
              />
              <Moon className={cn('shrink-0 transition-colors duration-500', solar < 0.3 ? 'text-energy-grid' : 'text-muted-foreground')} size={24} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

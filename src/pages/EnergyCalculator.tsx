import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';
import { cn } from '@/utils/cn';
import { productPath } from '@/data/families';
import RangeSlider from '@/components/ui/RangeSlider';
import {
  calculateEnergyNeeds,
  calculateDailyKwhFromAppliances,
  type ApplianceInput,
} from '@/lib/energy-calculator';

const defaultAppliances: ApplianceInput[] = [
  { name: 'Ceiling Fan', watts: 80, hours: 8, qty: 3 },
  { name: 'LED Bulb', watts: 12, hours: 6, qty: 5 },
];

function ResultsPanel({ results }: { results: ReturnType<typeof calculateEnergyNeeds> }) {
  const { recommendation } = results;

  return (
    <div className="rounded-lg border border-primary/30 bg-primary/5 p-6 lg:sticky lg:top-28">
      <h2 className="text-sm font-medium uppercase tracking-widest text-primary mb-4">Live Recommendation</h2>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Average load</span>
          <span className="font-medium text-foreground tabular-nums">{results.avgLoadKw} kW</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Peak load (est.)</span>
          <span className="font-medium text-foreground tabular-nums">{results.peakLoadKw} kW</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Required capacity</span>
          <span className="font-semibold text-foreground tabular-nums">{results.nominalKwhRequired} kWh</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Backup runtime</span>
          <span className="font-medium text-foreground tabular-nums">~{results.backupRuntimeHours} hrs</span>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="text-lg font-semibold text-foreground mb-1">
            {recommendation.productName}
            {recommendation.unitsNeeded > 1 && ` × ${recommendation.unitsNeeded}`}
          </div>
          <div className="text-muted-foreground">
            Total: {recommendation.totalCapacityKwh.toFixed(2)} kWh installed
          </div>
          <Link to={productPath(recommendation)} className="text-primary text-sm hover:underline mt-2 inline-block">
            View product →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div>
            <div className="text-xs text-muted-foreground uppercase mb-1">Annual Savings</div>
            <div className="font-semibold text-accent">Rs. {results.annualSavingsPkr.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase mb-1">Payback Period</div>
            <div className="font-semibold text-foreground">~{results.paybackYears} yrs</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const TABS = [
  { id: 'quick' as const, label: 'Quick estimate' },
  { id: 'appliance' as const, label: 'By appliance' },
];

export default function EnergyCalculator() {
  // No mode-chooser screen and no separate results page — the tool and its
  // recommendation sit on one screen and update as you drag.
  const [tab, setTab] = useState<'quick' | 'appliance'>('quick');

  const [dailyLoad, setDailyLoad] = useState(10);
  const [backupHours, setBackupHours] = useState(4);
  const [peakMultiplier, setPeakMultiplier] = useState(1.5);
  const [appliances, setAppliances] = useState<ApplianceInput[]>(defaultAppliances);

  const applianceDailyKwh = useMemo(() => calculateDailyKwhFromAppliances(appliances), [appliances]);

  const results = useMemo(
    () =>
      calculateEnergyNeeds({
        dailyKwh: tab === 'appliance' ? applianceDailyKwh : dailyLoad,
        backupHours,
        peakMultiplier,
      }),
    [tab, applianceDailyKwh, dailyLoad, backupHours, peakMultiplier]
  );

  const updateAppliance = (index: number, field: keyof ApplianceInput, value: string | number) => {
    setAppliances(prev => prev.map((a, i) => i === index ? { ...a, [field]: value } : a));
  };
  const addAppliance = () => setAppliances(prev => [...prev, { name: 'New Appliance', watts: 100, hours: 4, qty: 1 }]);
  const removeAppliance = (index: number) => setAppliances(prev => prev.filter((_, i) => i !== index));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-6 min-h-screen bg-background"
    >
      <div className="container mx-auto max-w-5xl">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-medium tracking-widest text-primary uppercase mb-4">Energy Calculator</p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-foreground">
            Size your battery bank
          </h1>
          <p className="text-muted-foreground text-lg">
            Drag the sliders or list your appliances — the recommendation updates as you go.
          </p>
        </div>

        <div
          className="flex bg-muted p-1 rounded-lg border border-border w-full sm:w-auto sm:inline-flex mb-10"
          role="tablist"
          aria-label="Calculation method"
        >
          {TABS.map(t => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                'flex-1 sm:flex-none px-6 min-h-[44px] rounded-lg text-sm font-medium transition-colors cursor-pointer',
                tab === t.id ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
          <AnimatePresence mode="wait">
            {tab === 'quick' ? (
              <motion.div
                key="quick"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="rounded-lg border border-border bg-surface-elevated p-8 space-y-10"
              >
                <RangeSlider
                  label="Daily Utility Consumption"
                  value={dailyLoad}
                  min={1}
                  max={100}
                  unit=" kWh"
                  hintMin="Low (Apartment)"
                  hintMax="High (Industrial)"
                  onChange={setDailyLoad}
                />
                <RangeSlider
                  label="Desired Backup Duration"
                  value={backupHours}
                  min={1}
                  max={24}
                  unit=" hrs"
                  hintMin="Critical Loads"
                  hintMax="Full Day"
                  accent="accent"
                  onChange={setBackupHours}
                />
                <RangeSlider
                  label="Peak Load Multiplier"
                  value={peakMultiplier}
                  min={1}
                  max={3}
                  step={0.1}
                  unit="×"
                  hintMin="Steady Load"
                  hintMax="Heavy Peaks"
                  onChange={setPeakMultiplier}
                />
              </motion.div>
            ) : (
              <motion.div
                key="appliance"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="rounded-lg border border-border bg-surface-elevated p-8 space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-foreground">Your Appliances</h2>
                  <button
                    type="button"
                    onClick={addAppliance}
                    className="flex items-center gap-1 text-sm text-primary hover:underline cursor-pointer min-h-[44px]"
                  >
                    <Plus size={14} /> Add
                  </button>
                </div>

                <div className="space-y-4 max-h-[420px] overflow-y-auto">
                  {appliances.map((app, i) => (
                    <div key={i} className="grid grid-cols-12 gap-2 items-end border border-border p-4 rounded-lg bg-background">
                      <div className="col-span-12 sm:col-span-4">
                        <label htmlFor={`app-name-${i}`} className="text-xs text-muted-foreground">Name</label>
                        <input id={`app-name-${i}`} value={app.name} onChange={(e) => updateAppliance(i, 'name', e.target.value)} className="form-input py-2 text-sm" />
                      </div>
                      <div className="col-span-4 sm:col-span-2">
                        <label htmlFor={`app-watts-${i}`} className="text-xs text-muted-foreground">Watts</label>
                        <input id={`app-watts-${i}`} type="number" value={app.watts} onChange={(e) => updateAppliance(i, 'watts', Number(e.target.value))} className="form-input py-2 text-sm" />
                      </div>
                      <div className="col-span-4 sm:col-span-2">
                        <label htmlFor={`app-hours-${i}`} className="text-xs text-muted-foreground">Hrs/day</label>
                        <input id={`app-hours-${i}`} type="number" value={app.hours} onChange={(e) => updateAppliance(i, 'hours', Number(e.target.value))} className="form-input py-2 text-sm" />
                      </div>
                      <div className="col-span-3 sm:col-span-2">
                        <label htmlFor={`app-qty-${i}`} className="text-xs text-muted-foreground">Qty</label>
                        <input id={`app-qty-${i}`} type="number" value={app.qty} onChange={(e) => updateAppliance(i, 'qty', Number(e.target.value))} className="form-input py-2 text-sm" />
                      </div>
                      <div className="col-span-1 flex justify-end">
                        <button
                          type="button"
                          onClick={() => removeAppliance(i)}
                          aria-label={`Remove ${app.name}`}
                          className="text-muted-foreground hover:text-destructive p-2 cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between text-sm mb-6">
                    <span className="text-muted-foreground">Calculated daily consumption</span>
                    <span className="font-semibold text-foreground tabular-nums">{applianceDailyKwh} kWh</span>
                  </div>
                  <RangeSlider
                    label="Desired Backup Duration"
                    value={backupHours}
                    min={1}
                    max={24}
                    unit=" hrs"
                    accent="accent"
                    onChange={setBackupHours}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <ResultsPanel results={results} />
        </div>

      </div>
    </motion.div>
  );
}

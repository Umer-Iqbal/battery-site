import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, Home, Calculator, ChevronRight, ArrowLeft, Send, Plus, Trash2 } from 'lucide-react';
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

function ResultsPanel({ results, compact = false }: { results: ReturnType<typeof calculateEnergyNeeds>; compact?: boolean }) {
  const { recommendation } = results;

  return (
    <div className={`border border-primary/30 bg-primary/5 p-6 ${compact ? '' : 'rounded-sm'}`}>
      <h3 className="text-sm font-medium uppercase tracking-widest text-primary mb-4">Live Recommendation</h3>

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
          <Link to={`/products/${recommendation.slug}`} className="text-primary text-sm hover:underline mt-2 inline-block">
            View product →
          </Link>
        </div>

        {!compact && (
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
        )}
      </div>
    </div>
  );
}

export default function EnergyCalculator() {
  const [mode, setMode] = useState<'selection' | 'quick' | 'advanced' | 'results'>('selection');
  const [resultsSource, setResultsSource] = useState<'quick' | 'advanced'>('quick');

  const [dailyLoad, setDailyLoad] = useState(10);
  const [backupHours, setBackupHours] = useState(4);
  const [peakMultiplier, setPeakMultiplier] = useState(1.5);

  const [appliances, setAppliances] = useState<ApplianceInput[]>(defaultAppliances);

  const advancedDailyKwh = useMemo(() => calculateDailyKwhFromAppliances(appliances), [appliances]);

  const quickResults = useMemo(
    () => calculateEnergyNeeds({ dailyKwh: dailyLoad, backupHours, peakMultiplier }),
    [dailyLoad, backupHours, peakMultiplier]
  );

  const advancedResults = useMemo(
    () => calculateEnergyNeeds({ dailyKwh: advancedDailyKwh, backupHours, peakMultiplier }),
    [advancedDailyKwh, backupHours, peakMultiplier]
  );

  const displayResults = resultsSource === 'advanced' ? advancedResults : quickResults;

  const updateAppliance = (index: number, field: keyof ApplianceInput, value: string | number) => {
    setAppliances(prev => prev.map((a, i) => i === index ? { ...a, [field]: value } : a));
  };

  const addAppliance = () => {
    setAppliances(prev => [...prev, { name: 'New Appliance', watts: 100, hours: 4, qty: 1 }]);
  };

  const removeAppliance = (index: number) => {
    setAppliances(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-6 min-h-screen bg-background"
    >
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <div className="w-14 h-14 bg-primary/10 rounded-sm flex items-center justify-center mx-auto mb-6">
            <Calculator className="text-primary" size={28} />
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-foreground">Energy Calculator</h1>
          <p className="text-muted-foreground text-lg">Find the right NexVolt battery for your backup needs.</p>
        </div>

        <AnimatePresence mode="wait">
          {mode === 'selection' && (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <button
                type="button"
                onClick={() => setMode('quick')}
                className="border border-border bg-surface-elevated p-10 text-left hover:border-primary/40 transition-colors group"
              >
                <div className="w-16 h-16 bg-energy-grid/10 rounded-sm flex items-center justify-center mb-6">
                  <Zap className="text-energy-grid" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Quick Estimate</h3>
                <p className="text-muted-foreground mb-6 text-sm">Enter daily kWh and backup hours for instant recommendations.</p>
                <span className="text-primary font-medium flex items-center gap-2 text-sm">
                  Start Quick Tool <ChevronRight size={16} />
                </span>
              </button>

              <button
                type="button"
                onClick={() => setMode('advanced')}
                className="border border-border bg-surface-elevated p-10 text-left hover:border-primary/40 transition-colors group"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-sm flex items-center justify-center mb-6">
                  <Home className="text-accent" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Advanced Load Audit</h3>
                <p className="text-muted-foreground mb-6 text-sm">Add appliances to calculate exact daily consumption.</p>
                <span className="text-primary font-medium flex items-center gap-2 text-sm">
                  Detailed Audit <ChevronRight size={16} />
                </span>
              </button>
            </motion.div>
          )}

          {mode === 'quick' && (
            <motion.div
              key="quick"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              <div className="border border-border bg-surface-elevated p-8 space-y-10">
                <button type="button" onClick={() => setMode('selection')} className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors">
                  <ArrowLeft size={16} /> Back
                </button>

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

                <button
                  type="button"
                  onClick={() => { setResultsSource('quick'); setMode('results'); }}
                  className="w-full py-4 bg-foreground text-background font-medium rounded-sm hover:opacity-90 transition-opacity"
                >
                  View Full Results
                </button>
              </div>

              <ResultsPanel results={quickResults} />
            </motion.div>
          )}

          {mode === 'advanced' && (
            <motion.div
              key="advanced"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              <div className="border border-border bg-surface-elevated p-8 space-y-6">
                <button type="button" onClick={() => setMode('selection')} className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors">
                  <ArrowLeft size={16} /> Back
                </button>

                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Your Appliances</h3>
                  <button type="button" onClick={addAppliance} className="flex items-center gap-1 text-sm text-primary hover:underline">
                    <Plus size={14} /> Add
                  </button>
                </div>

                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                  {appliances.map((app, i) => (
                    <div key={i} className="grid grid-cols-12 gap-2 items-end border border-border p-4 rounded-sm bg-background">
                      <div className="col-span-12 sm:col-span-4">
                        <label className="text-xs text-muted-foreground">Name</label>
                        <input value={app.name} onChange={(e) => updateAppliance(i, 'name', e.target.value)} className="form-input py-2 text-sm" />
                      </div>
                      <div className="col-span-4 sm:col-span-2">
                        <label className="text-xs text-muted-foreground">Watts</label>
                        <input type="number" value={app.watts} onChange={(e) => updateAppliance(i, 'watts', Number(e.target.value))} className="form-input py-2 text-sm" />
                      </div>
                      <div className="col-span-4 sm:col-span-2">
                        <label className="text-xs text-muted-foreground">Hrs/day</label>
                        <input type="number" value={app.hours} onChange={(e) => updateAppliance(i, 'hours', Number(e.target.value))} className="form-input py-2 text-sm" />
                      </div>
                      <div className="col-span-3 sm:col-span-2">
                        <label className="text-xs text-muted-foreground">Qty</label>
                        <input type="number" value={app.qty} onChange={(e) => updateAppliance(i, 'qty', Number(e.target.value))} className="form-input py-2 text-sm" />
                      </div>
                      <div className="col-span-1 flex justify-end">
                        <button type="button" onClick={() => removeAppliance(i)} className="text-muted-foreground hover:text-destructive p-2">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between text-sm mb-6">
                    <span className="text-muted-foreground">Calculated daily consumption</span>
                    <span className="font-semibold text-foreground">{advancedDailyKwh} kWh</span>
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

                <button
                  type="button"
                  onClick={() => { setDailyLoad(advancedDailyKwh); setResultsSource('advanced'); setMode('results'); }}
                  className="w-full py-4 bg-foreground text-background font-medium rounded-sm hover:opacity-90 transition-opacity"
                >
                  View Full Results
                </button>
              </div>

              <ResultsPanel results={advancedResults} />
            </motion.div>
          )}

          {mode === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <ResultsPanel results={displayResults} />

              <div className="border border-border bg-surface-elevated p-8">
                <h3 className="text-xl font-semibold mb-6 text-foreground">Get Detailed Proposal</h3>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
                  <input type="text" placeholder="Full Name" className="form-input" />
                  <input type="email" placeholder="Email Address" className="form-input" />
                  <input type="tel" placeholder="Phone Number" className="form-input" />
                  <button type="submit" className="bg-foreground text-background font-medium rounded-sm flex items-center justify-center gap-2 hover:opacity-90">
                    Submit <Send size={16} />
                  </button>
                </form>
              </div>

              <button type="button" onClick={() => setMode('selection')} className="w-full text-center text-muted-foreground hover:text-foreground transition-colors text-sm">
                Start a new calculation
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

import { cn } from '@/utils/cn';

interface RangeSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  hintMin?: string;
  hintMax?: string;
  accent?: 'primary' | 'accent';
  onChange: (value: number) => void;
}

export default function RangeSlider({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  hintMin,
  hintMax,
  accent = 'primary',
  onChange,
}: RangeSliderProps) {
  return (
    <div>
      <label className="block text-base font-semibold mb-4 flex justify-between text-foreground">
        <span>{label}</span>
        <span className="text-primary tabular-nums">
          {value}{unit}
        </span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={cn(
          'slider-track w-full',
          accent === 'accent' && 'accent-accent'
        )}
      />
      {(hintMin || hintMax) && (
        <div className="flex justify-between mt-3 text-xs text-muted-foreground uppercase tracking-widest">
          <span>{hintMin}</span>
          <span>{hintMax}</span>
        </div>
      )}
    </div>
  );
}

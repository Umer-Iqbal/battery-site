import { products } from '@/data/products';

const PRODUCT_ENERGY_KWH: Record<string, number> = {
  'nv-1215': 0.192,
  'nv-12100': 1.28,
  'nv-48100': 5.12,
};

const SAFETY_FACTOR = 1.25;
const DOD_USABLE = 0.85;
const DEFAULT_GRID_RATE_PKR = 50;

export interface ApplianceInput {
  name: string;
  watts: number;
  hours: number;
  qty: number;
}

export interface CalculatorInput {
  dailyKwh: number;
  backupHours: number;
  peakMultiplier?: number;
  gridRatePkr?: number;
}

export interface ProductRecommendation {
  productId: string;
  productName: string;
  slug: string;
  unitEnergyKwh: number;
  unitsNeeded: number;
  totalCapacityKwh: number;
}

export interface CalculatorResult {
  dailyKwh: number;
  backupHours: number;
  avgLoadKw: number;
  peakLoadKw: number;
  backupEnergyKwh: number;
  nominalKwhRequired: number;
  recommendation: ProductRecommendation;
  backupRuntimeHours: number;
  annualSavingsPkr: number;
  paybackYears: number;
}

export function calculateDailyKwhFromAppliances(appliances: ApplianceInput[]): number {
  const wh = appliances.reduce((sum, a) => sum + a.watts * a.hours * a.qty, 0);
  return Math.round((wh / 1000) * 10) / 10;
}

export function recommendProduct(nominalKwh: number): ProductRecommendation {
  const sorted = products
    .map((p) => ({
      product: p,
      energy: PRODUCT_ENERGY_KWH[p.id] ?? 1,
    }))
    .sort((a, b) => a.energy - b.energy);

  for (const { product, energy } of sorted) {
    if (energy >= nominalKwh) {
      return {
        productId: product.id,
        productName: product.name,
        slug: product.slug,
        unitEnergyKwh: energy,
        unitsNeeded: 1,
        totalCapacityKwh: energy,
      };
    }
  }

  const largest = sorted[sorted.length - 1];
  const unitsNeeded = Math.ceil(nominalKwh / largest.energy);
  return {
    productId: largest.product.id,
    productName: largest.product.name,
    slug: largest.product.slug,
    unitEnergyKwh: largest.energy,
    unitsNeeded,
    totalCapacityKwh: largest.energy * unitsNeeded,
  };
}

export function calculateEnergyNeeds(input: CalculatorInput): CalculatorResult {
  const { dailyKwh, backupHours, peakMultiplier = 1.5, gridRatePkr = DEFAULT_GRID_RATE_PKR } = input;

  const avgLoadKw = dailyKwh / 24;
  const peakLoadKw = avgLoadKw * peakMultiplier;
  const backupEnergyKwh = avgLoadKw * backupHours * SAFETY_FACTOR;
  const nominalKwhRequired = backupEnergyKwh / DOD_USABLE;

  const recommendation = recommendProduct(nominalKwhRequired);
  const usableCapacity = recommendation.totalCapacityKwh * DOD_USABLE;
  const backupRuntimeHours = peakLoadKw > 0 ? usableCapacity / peakLoadKw : 0;

  const annualSavingsPkr = Math.round(dailyKwh * gridRatePkr * 365 * 0.3);
  const estimatedSystemCost = recommendation.totalCapacityKwh * 45000;
  const paybackYears = annualSavingsPkr > 0 ? estimatedSystemCost / annualSavingsPkr : 0;

  return {
    dailyKwh,
    backupHours,
    avgLoadKw: Math.round(avgLoadKw * 100) / 100,
    peakLoadKw: Math.round(peakLoadKw * 100) / 100,
    backupEnergyKwh: Math.round(backupEnergyKwh * 100) / 100,
    nominalKwhRequired: Math.round(nominalKwhRequired * 100) / 100,
    recommendation,
    backupRuntimeHours: Math.round(backupRuntimeHours * 10) / 10,
    annualSavingsPkr,
    paybackYears: Math.round(paybackYears * 10) / 10,
  };
}

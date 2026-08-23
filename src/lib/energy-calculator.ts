import { batteryProducts } from '@/data/products';
import type { ProductFamilyId } from '@/data/families';

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
  /** Always 'batteries' — the type makes recommending a bike impossible. */
  family: ProductFamilyId;
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

/**
 * Smallest battery that covers the requirement, else the largest one stacked.
 *
 * Sources from `batteryProducts`, which is typed BatteryProduct[] — so
 * `energyKwh` is non-optional (no `?? 1` fallback guessing) and an electric
 * bike cannot be recommended as energy storage.
 */
export function recommendProduct(nominalKwh: number): ProductRecommendation {
  const sorted = [...batteryProducts].sort((a, b) => a.energyKwh - b.energyKwh);
  if (sorted.length === 0) {
    throw new Error('recommendProduct: no battery products in the catalogue');
  }

  const exact = sorted.find((p) => p.energyKwh >= nominalKwh);
  if (exact) {
    return {
      productId: exact.id,
      productName: exact.name,
      slug: exact.slug,
      family: exact.family,
      unitEnergyKwh: exact.energyKwh,
      unitsNeeded: 1,
      totalCapacityKwh: exact.energyKwh,
    };
  }

  const largest = sorted[sorted.length - 1];
  const unitsNeeded = Math.ceil(nominalKwh / largest.energyKwh);
  return {
    productId: largest.id,
    productName: largest.name,
    slug: largest.slug,
    family: largest.family,
    unitEnergyKwh: largest.energyKwh,
    unitsNeeded,
    totalCapacityKwh: largest.energyKwh * unitsNeeded,
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

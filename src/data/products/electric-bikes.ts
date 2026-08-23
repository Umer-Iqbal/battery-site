import { asset } from '@/utils/asset';
import type { BikeProduct } from './types';

/**
 * PLACEHOLDER CATALOGUE — not real product data.
 *
 * Every figure in [square brackets] is invented, and the images are line-art
 * stand-ins captioned "PHOTO PENDING". This exists so the electric-bikes
 * family renders end to end while the real models are being finalised.
 *
 * Before launch: replace every bracketed value, swap in real photography, and
 * delete this comment. `grep -rn '\[' src/data/products/electric-bikes.ts`
 * lists everything still outstanding.
 */
export const electricBikes: BikeProduct[] = [
  {
    id: 'bike-city',
    family: 'electric-bikes',
    name: 'Enersol [City model]',
    slug: 'enersol-city',
    type: 'City',
    motorPower: '[250]W',
    range: '[60] km',
    topSpeed: '[25] km/h',
    battery: 'Enersol [48V 15Ah (720Wh)], removable',
    frameSize: '[M / L]',
    description:
      'Built for the daily commute inside the city, on a removable pack you carry indoors to charge.',
    features: [
      'Removable [720]Wh pack with a carry handle',
      'Smart BMS, monitored in the Enersol app',
      '[5]-level pedal assist plus throttle',
      '[IP65] rated against rain and road spray',
      '[2]-year bike warranty, [5] years on the pack',
      'Serviced at any Enersol dealer, parts in stock',
    ],
    specs: {
      Motor: '[250]W rear hub, [45] Nm',
      Battery: 'Enersol [48V 15Ah (720Wh)], removable',
      Range: '[60] km eco · [40] km throttle only',
      'Assisted top speed': '[25] km/h',
      'Charge time': '[4] hours, 0 to 100%',
      Frame: '[6061 aluminium], sizes [M / L]',
      Brakes: '[Hydraulic disc, 180 mm front and rear]',
      Weight: '[24] kg including battery',
    },
    image: asset('images/bike-city.svg'),
  },
  {
    id: 'bike-cargo',
    family: 'electric-bikes',
    name: 'Enersol [Cargo model]',
    slug: 'enersol-cargo',
    type: 'Cargo',
    motorPower: '[500]W',
    range: '[45] km',
    topSpeed: '[25] km/h',
    battery: 'Enersol [48V 20Ah (960Wh)], removable',
    frameSize: '[One size]',
    description: 'Front rack and reinforced frame for shop runs and last-mile delivery work.',
    features: [
      'Carries [80] kg on the front rack',
      'Removable [960]Wh pack with a carry handle',
      'Smart BMS, monitored in the Enersol app',
      '[Hydraulic disc] brakes front and rear',
      '[2]-year frame warranty, [5] years on the pack',
      'Serviced at any Enersol dealer, parts in stock',
    ],
    specs: {
      Motor: '[500]W rear hub, [70] Nm',
      Battery: 'Enersol [48V 20Ah (960Wh)], removable',
      Range: '[45] km loaded · [65] km empty',
      'Assisted top speed': '[25] km/h',
      'Load capacity': '[80] kg front rack',
      'Charge time': '[5] hours, 0 to 100%',
      Frame: '[Reinforced 6061 aluminium], one size',
      Weight: '[34] kg including battery',
    },
    image: asset('images/bike-cargo.svg'),
  },
  {
    id: 'bike-offroad',
    family: 'electric-bikes',
    name: 'Enersol [Off-road model]',
    slug: 'enersol-offroad',
    type: 'Off-road',
    motorPower: '[750]W',
    range: '[70] km',
    topSpeed: '[45] km/h',
    battery: 'Enersol [48V 20Ah (960Wh)], removable',
    frameSize: '[M / L / XL]',
    description: 'Fat tyres and long-travel suspension for broken roads and unpaved tracks.',
    features: [
      '[100] mm travel front suspension',
      '[4.0] inch fat tyres',
      'Removable [960]Wh pack with a carry handle',
      'Smart BMS, monitored in the Enersol app',
      '[2]-year frame warranty, [5] years on the pack',
      'Serviced at any Enersol dealer, parts in stock',
    ],
    specs: {
      Motor: '[750]W rear hub, [85] Nm',
      Battery: 'Enersol [48V 20Ah (960Wh)], removable',
      Range: '[70] km eco · [45] km throttle only',
      'Assisted top speed': '[45] km/h',
      Suspension: '[100] mm travel, hydraulic fork',
      Tyres: '[26 x 4.0] inch',
      Frame: '[6061 aluminium], sizes [M / L / XL]',
      Weight: '[32] kg including battery',
    },
    image: asset('images/bike-offroad.svg'),
  },
];

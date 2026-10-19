import { asset } from '@/utils/asset';
import type { BikeProduct } from './types';

/**
 * PLACEHOLDER SPECS — the Arrow One line is real, the numbers are not final.
 *
 * Every figure in [square brackets] is an estimate pitched at what comparable
 * 60–72V scooters sell with in Pakistan. Copy that describes the hardware
 * (disc brakes front and rear, swingarm drive, LED lamps, grab rail, colours)
 * is taken from the product photos and is not bracketed.
 *
 * Before launch: confirm every bracketed value and delete this comment.
 * `grep -rn '\[' src/data/products/electric-bikes.ts` lists what is left.
 */
export const electricBikes: BikeProduct[] = [
  {
    id: 'bike-city',
    family: 'electric-bikes',
    name: 'Arrow One City',
    slug: 'arrow-one-city',
    legacySlugs: ['enersol-city'],
    type: 'City',
    motorPower: '[1200]W',
    range: '[80] km',
    topSpeed: '[60] km/h',
    battery: 'Enersol [60V 30Ah (1.8 kWh)] LiFePO4, removable',
    description:
      'The everyday Arrow One in gloss black with a chrome grab rail. A long two-up seat, a flat floorboard and a pack you lift out and charge indoors.',
    features: [
      'Removable [1.8] kWh LiFePO4 pack, charges from any 3-pin socket',
      'Disc brakes front and rear with combined braking',
      'LED headlamp with signature light bar, LED tail lamp',
      'Long two-up seat with a chrome grab rail',
      'Smart BMS, monitored in the Enersol app',
      '[2]-year scooter warranty, [3] years on the pack',
    ],
    specs: {
      Motor: '[1200]W swingarm-mounted motor, sealed drive',
      Battery: 'Enersol [60V 30Ah (1.8 kWh)] LiFePO4, removable',
      Range: '[80] km eco · [60] km sport',
      'Top speed': '[60] km/h',
      'Charge time': '[5–6] hours, 0 to 100%',
      Brakes: 'Disc front and rear, combined braking',
      Suspension: 'Telescopic fork · rear shock',
      Tyres: '[12] inch tubeless',
      'Dimensions (L × W × H)': '[1850 × 700 × 1150] mm, same body on every trim',
      'Seat height': '[760] mm',
      'Load capacity': '[150] kg, rider and pillion',
      'Kerb weight': '[95] kg with battery',
      Colour: 'Gloss black, chrome grab rail',
    },
    image: asset('images/bike-city.webp'),
  },
  {
    id: 'bike-cargo',
    family: 'electric-bikes',
    name: 'Arrow One Cargo',
    slug: 'arrow-one-cargo',
    legacySlugs: ['enersol-cargo'],
    type: 'Cargo',
    motorPower: '[1500]W',
    range: '[90] km',
    topSpeed: '[65] km/h',
    battery: 'Enersol [72V 30Ah (2.2 kWh)] LiFePO4, removable',
    description:
      'The Arrow One for delivery and shop runs, in titanium grey. Same body, more torque for a loaded top box, and a bigger pack for a full shift.',
    features: [
      'Removable [2.2] kWh LiFePO4 pack, enough for a full delivery shift',
      'Grab rail doubles as a top-box mount',
      'Disc brakes front and rear with combined braking',
      'Rated for [180] kg of rider and load',
      'Smart BMS, monitored in the Enersol app',
      '[2]-year scooter warranty, [3] years on the pack',
    ],
    specs: {
      Motor: '[1500]W swingarm-mounted motor, sealed drive',
      Battery: 'Enersol [72V 30Ah (2.2 kWh)] LiFePO4, removable',
      Range: '[90] km eco · [65] km fully loaded',
      'Top speed': '[65] km/h',
      'Charge time': '[6–7] hours, 0 to 100%',
      Brakes: 'Disc front and rear, combined braking',
      Suspension: 'Telescopic fork · rear shock',
      Tyres: '[12] inch tubeless',
      'Dimensions (L × W × H)': '[1850 × 700 × 1150] mm, same body on every trim',
      'Seat height': '[760] mm',
      'Load capacity': '[180] kg, rider and cargo',
      'Kerb weight': '[100] kg with battery',
      Colour: 'Titanium grey, lime graphics',
    },
    image: asset('images/bike-cargo.webp'),
  },
  {
    id: 'bike-pro',
    family: 'electric-bikes',
    name: 'Arrow One Pro',
    slug: 'arrow-one-pro',
    // The old off-road placeholder's URL is public; the Pro is its nearest match.
    legacySlugs: ['enersol-offroad'],
    type: 'Pro',
    motorPower: '[2000]W',
    range: '[110] km',
    topSpeed: '[75] km/h',
    battery: 'Enersol [72V 40Ah (2.9 kWh)] LiFePO4, removable',
    description:
      'The flagship Arrow One in midnight blue with lime accents. Same body, with the strongest motor and the largest pack in the line.',
    features: [
      'Removable [2.9] kWh LiFePO4 pack in the same Arrow One body',
      'Eco, city and sport ride modes',
      'Disc brakes front and rear with combined braking',
      'Midnight blue finish with a lime accent stripe',
      'Smart BMS, monitored in the Enersol app',
      '[3]-year scooter warranty, [3] years on the pack',
    ],
    specs: {
      Motor: '[2000]W swingarm-mounted motor, sealed drive',
      Battery: 'Enersol [72V 40Ah (2.9 kWh)] LiFePO4, removable',
      Range: '[110] km eco · [75] km sport',
      'Top speed': '[75] km/h',
      'Charge time': '[7–8] hours, 0 to 100%',
      Brakes: 'Disc front and rear, combined braking',
      Suspension: 'Telescopic fork · rear shock',
      Tyres: '[12] inch tubeless',
      'Dimensions (L × W × H)': '[1850 × 700 × 1150] mm, same body on every trim',
      'Seat height': '[760] mm',
      'Load capacity': '[150] kg, rider and pillion',
      'Kerb weight': '[105] kg with battery',
      Colour: 'Midnight blue, lime accents',
    },
    image: asset('images/bike-pro.webp'),
  },
];

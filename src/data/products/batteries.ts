import { asset } from '@/utils/asset';
import type { BatteryProduct } from './types';

export const batteries: BatteryProduct[] = [
  {
    id: 'bat-12-15',
    family: 'powerpacks',
    name: 'Enersol 12V 15Ah',
    slug: 'enersol-12v-15ah',
    legacySlugs: ['nexvolt-12v-15ah'],
    type: 'Portable',
    voltage: '12.8V',
    capacity: '15Ah (192Wh)',
    energyKwh: 0.192,
    description:
      'Compact and lightweight high-performance LiFePO4 battery for portable applications.',
    features: ['Ultra-lightweight', 'Built-in Smart BMS', 'Long cycle life (6000+)', 'Fast charging'],
    specs: {
      'Nominal Voltage': '12.8V',
      Capacity: '15Ah',
      Energy: '192Wh',
      'Max. Continuous Discharge': '15A',
      Dimensions: '151 x 98 x 101 mm',
      Weight: '1.8 kg',
    },
    image: asset('images/small.png'),
  },
  {
    id: 'bat-12-100',
    family: 'powerpacks',
    name: 'Enersol 12V 100Ah',
    slug: 'enersol-12v-100ah',
    legacySlugs: ['nexvolt-12v-100ah'],
    type: 'Residential',
    voltage: '12.8V',
    capacity: '100Ah (1280Wh)',
    energyKwh: 1.28,
    description:
      'The standard choice for home energy storage, providing reliable power for deep-cycle applications.',
    features: ['Grade A Cells', 'IP65 Waterproof', 'Bluetooth Monitoring', 'Replaceable Lead-Acid'],
    specs: {
      'Nominal Voltage': '12.8V',
      Capacity: '100Ah',
      Energy: '1280Wh',
      'Max. Continuous Discharge': '100A',
      Dimensions: '329 x 172 x 214 mm',
      Weight: '11 kg',
    },
    image: asset('images/medium.png'),
  },
  {
    id: 'bat-48-100',
    family: 'powerpacks',
    name: 'Enersol PowerGate 5.1kWh',
    slug: 'enersol-powergate-48v-100ah',
    legacySlugs: ['nexvolt-powergate-48v-100ah'],
    type: 'Residential',
    voltage: '51.2V',
    capacity: '100Ah (5.12kWh)',
    energyKwh: 5.12,
    description:
      'Wall-mounted premium energy storage solution for modern homes and solar integration.',
    features: [
      'Scalable up to 15 units',
      'Liquid Crystal Display',
      'CAN/RS485 Communication',
      'Wall-mount installation',
    ],
    specs: {
      'Nominal Voltage': '51.2V',
      Capacity: '100Ah',
      Energy: '5120Wh',
      'Max. Continuous Discharge': '100A',
      Dimensions: '442 x 480 x 133 mm',
      Weight: '44 kg',
    },
    image: asset('images/large.png'),
  },
];

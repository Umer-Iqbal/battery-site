export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'Residential' | 'Commercial' | 'Portable';
  voltage: string;
  capacity: string;
  price?: number;
  description: string;
  features: string[];
  specs: Record<string, string>;
  image: string;
}

export const products: Product[] = [
  {
    id: 'nv-1215',
    name: 'NexVolt 12V 15Ah',
    slug: 'nexvolt-12v-15ah',
    category: 'Portable',
    voltage: '12.8V',
    capacity: '15Ah (192Wh)',
    description: 'Compact and light weight high-performance LiFePO4 battery for portable applications.',
    features: ['Ultra-lightweight', 'Built-in Smart BMS', 'Long cycle life (6000+)', 'Fast charging'],
    specs: {
      'Nominal Voltage': '12.8V',
      'Capacity': '15Ah',
      'Energy': '192Wh',
      'Max. Continuous Discharge': '15A',
      'Dimensions': '151 x 98 x 101 mm',
      'Weight': '1.8 kg'
    },
    image: `${import.meta.env.BASE_URL}images/small.png`
  },
  {
    id: 'nv-12100',
    name: 'NexVolt 12V 100Ah',
    slug: 'nexvolt-12v-100ah',
    category: 'Residential',
    voltage: '12.8V',
    capacity: '100Ah (1280Wh)',
    description: 'The standard choice for home energy storage, providing reliable power for deep-cycle applications.',
    features: ['Grade A Cells', 'IP65 Waterproof', 'Bluetooth Monitoring', 'Replaceable Lead-Acid'],
    specs: {
      'Nominal Voltage': '12.8V',
      'Capacity': '100Ah',
      'Energy': '1280Wh',
      'Max. Continuous Discharge': '100A',
      'Dimensions': '329 x 172 x 214 mm',
      'Weight': '11 kg'
    },
    image: '/images/medium.png'
  },
  {
    id: 'nv-48100',
    name: 'NexVolt PowerGate 5.1kWh',
    slug: 'nexvolt-powergate-48v-100ah',
    category: 'Residential',
    voltage: '51.2V',
    capacity: '100Ah (5.12kWh)',
    description: 'Wall-mounted premium energy storage solution for modern homes and solar integration.',
    features: ['Scalable up to 15 units', 'Liquid Crystal Display', 'CAN/RS485 Communication', 'Tesla Powerwall Rival'],
    specs: {
      'Nominal Voltage': '51.2V',
      'Capacity': '100Ah',
      'Energy': '5120Wh',
      'Max. Continuous Discharge': '100A',
      'Dimensions': '442 x 480 x 133 mm',
      'Weight': '44 kg'
    },
    image: '/images/large.png'
  }
];

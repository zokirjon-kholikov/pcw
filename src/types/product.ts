export type Category = 'Smartfon' | 'Noutbuk';

export interface Product {
  id: string;
  name: string;
  brand: string;
  emoji: string;
  category: Category;
  price: number;
  rating: number;
  releaseYear: number;
  display: string;
  refreshRateHz: number;
  processor: string;
  ramGb: number;
  storageGb: number;
  camera: string;
  battery: string;
  weightG: number;
  os: string;
}

export interface Measure {
  num: number;
  unit: string;
}

export interface SpecRow {
  key: string;
  label: string;
  accessor: (p: Product) => string | number | boolean;
  format: (p: Product) => string;
  rank?: {
    better: 'higher' | 'lower';
    value: (p: Product) => Measure | null;
  };
}

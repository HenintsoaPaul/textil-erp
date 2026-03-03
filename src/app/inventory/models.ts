export interface Variant {
  id: string;
  size: string;
  color: string;
  sku: string;
  currentStock: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  lowStockThreshold: number;
  variants: Variant[];
}

export type StockMovementType = 'IN' | 'OUT';

export interface StockMovement {
  id: string;
  productId: string;
  variantId: string;
  type: StockMovementType;
  quantity: number;
  reason: string;
  timestamp: Date;
}

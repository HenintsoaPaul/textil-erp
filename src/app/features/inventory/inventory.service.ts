import { Injectable, signal } from '@angular/core';
import { Product, StockMovement, Variant } from '../core/models';

@Injectable({
    providedIn: 'root'
})
export class InventoryService {
    private products = signal<Product[]>([
        {
            id: '1',
            name: 'Cotton T-Shirt',
            description: '100% Cotton premium T-shirt',
            category: 'Apparel',
            lowStockThreshold: 10,
            variants: [
                { id: '1-1', size: 'S', color: 'White', sku: 'TS-WHT-S', currentStock: 15 },
                { id: '1-2', size: 'M', color: 'White', sku: 'TS-WHT-M', currentStock: 5 },
                { id: '1-3', size: 'L', color: 'White', sku: 'TS-WHT-L', currentStock: 20 },
            ]
        },
        {
            id: '2',
            name: 'Denim Jeans',
            description: 'Slim fit blue denim jeans',
            category: 'Apparel',
            lowStockThreshold: 5,
            variants: [
                { id: '2-1', size: '32', color: 'Blue', sku: 'DJ-BLU-32', currentStock: 8 },
                { id: '2-2', size: '34', color: 'Blue', sku: 'DJ-BLU-34', currentStock: 3 },
            ]
        }
    ]);

    private movements = signal<StockMovement[]>([]);

    getProducts() {
        return this.products;
    }

    getProductById(id: string) {
        return this.products().find(p => p.id === id);
    }

    addProduct(product: Product) {
        this.products.update(prev => [...prev, product]);
    }

    updateProduct(product: Product) {
        this.products.update(prev => prev.map(p => p.id === product.id ? product : p));
    }

    updateStock(productId: string, variantId: string, quantity: number, type: 'IN' | 'OUT', reason: string) {
        const product = this.products().find(p => p.id === productId);
        if (!product) return;

        const variant = product.variants.find(v => v.id === variantId);
        if (!variant) return;

        const change = type === 'IN' ? quantity : -quantity;

        // Update product stock
        this.products.update(prev => prev.map(p => {
            if (p.id === productId) {
                return {
                    ...p,
                    variants: p.variants.map(v => v.id === variantId ? { ...v, currentStock: v.currentStock + change } : v)
                };
            }
            return p;
        }));

        // Record movement
        const movement: StockMovement = {
            id: Math.random().toString(36).substr(2, 9),
            productId,
            variantId,
            type,
            quantity,
            reason,
            timestamp: new Date()
        };
        this.movements.update(prev => [movement, ...prev]);
    }

    getMovements() {
        return this.movements;
    }
}

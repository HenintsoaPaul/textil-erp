import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryService } from '../../inventory/inventory.service';
import { Product, Variant } from '../../core/models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {
  private service = inject(InventoryService);
  products = this.service.getProducts();

  getTotalStock(product: Product): number {
    return product.variants.reduce((acc, curr) => acc + curr.currentStock, 0);
  }

  getStockBadgeClass(stock: number, threshold: number): string {
    const base = "px-3 py-1 rounded-lg text-sm font-bold ";
    if (stock <= 0) return base + "bg-rose-100 text-rose-700 ring-1 ring-rose-200";
    if (stock <= threshold) return base + "bg-amber-100 text-amber-700 ring-1 ring-amber-200";
    return base + "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200";
  }

  quickViewHistory(id: string) {
    // This will be navigated by a proper route later
    console.log('Viewing history for product:', id);
  }

  // Mock data
}

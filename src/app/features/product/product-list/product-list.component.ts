import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryService } from '../../inventory/inventory.service';
import { Product, Variant } from '../../inventory/models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="p-6 bg-gray-50 min-h-screen">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">Product Inventory</h1>
          <p class="text-gray-500 mt-1">Manage and track your product stock levels across all variants.</p>
        </div>
        <button 
          routerLink="/inventory/new"
          class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-200 transition-all duration-200 flex items-center gap-2 transform active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Product
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (product of products(); track product.id) {
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col">
            <div class="p-6 border-b border-gray-50">
              <div class="flex justify-between items-start">
                <div>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 mb-2">
                    {{ product.category }}
                  </span>
                  <h2 class="text-xl font-bold text-gray-900">{{ product.name }}</h2>
                </div>
                <button [routerLink]="['/inventory/edit', product.id]" class="text-gray-400 hover:text-indigo-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                </button>
              </div>
              <p class="text-gray-500 text-sm mt-3 line-clamp-2 leading-relaxed">{{ product.description }}</p>
            </div>
            
            <div class="p-4 bg-gray-50/50 flex-grow">
              <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Variants & Stock</h3>
              <div class="space-y-2">
                @for (variant of product.variants; track variant.id) {
                  <div class="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 shadow-sm transition-all hover:border-indigo-200">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                        {{ variant.size }}
                      </div>
                      <div>
                        <div class="text-sm font-semibold text-gray-900">{{ variant.color }}</div>
                        <div class="text-[10px] text-gray-400 font-mono">{{ variant.sku }}</div>
                      </div>
                    </div>
                    <div class="flex items-center gap-3">
                      <div [class]="getStockBadgeClass(variant.currentStock, product.lowStockThreshold)">
                        {{ variant.currentStock }}
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>

            <div class="p-4 bg-white border-t border-gray-100 flex justify-between items-center text-sm">
              <span class="text-gray-500 font-medium">Total Stock: <span class="text-gray-900 font-bold ml-1">{{ getTotalStock(product) }}</span></span>
              <button 
                (click)="quickViewHistory(product.id)"
                class="text-indigo-600 hover:text-indigo-700 font-bold inline-flex items-center gap-1 group"
              >
                Stock History
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3 h-3 group-hover:translate-x-0.5 transition-transform">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  `
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
}

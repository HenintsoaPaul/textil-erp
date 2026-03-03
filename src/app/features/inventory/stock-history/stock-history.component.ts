import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryService } from '../inventory.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-stock-history',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="p-6 bg-gray-50 min-h-screen">
      <div class="max-w-6xl mx-auto">
        <div class="flex items-center gap-4 mb-8">
          <button routerLink="/inventory" class="text-gray-400 hover:text-indigo-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <div>
            <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">Stock Movement History</h1>
            <p class="text-gray-500 mt-1">Audit log of all manual and automatic stock adjustments.</p>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-gray-50/50 border-b border-gray-100">
                  <th class="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Timestamp</th>
                  <th class="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Product & Variant</th>
                  <th class="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Type</th>
                  <th class="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Qty</th>
                  <th class="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Reason</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                @for (move of movements(); track move.id) {
                  <tr class="hover:bg-gray-50/50 transition-colors">
                    <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {{ move.timestamp | date:'MMM d, y HH:mm' }}
                    </td>
                    <td class="px-6 py-4">
                      <div class="text-sm font-bold text-gray-900">{{ getProductName(move.productId) }}</div>
                      <div class="text-[10px] text-gray-400 uppercase font-bold tracking-tight">
                        {{ getVariantName(move.productId, move.variantId) }}
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <span [class]="move.type === 'IN' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100' : 'bg-rose-50 text-rose-700 ring-1 ring-rose-100'" 
                        class="px-2.5 py-1 rounded-lg text-xs font-bold inline-flex items-center gap-1">
                        @if (move.type === 'IN') {
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3 h-3">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v4.59L7.3 9.24a.75.75 0 00-1.1 1.02l3.25 3.5a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V6.75z" clip-rule="evenodd" />
                          </svg>
                        } @else {
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3 h-3">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v4.59L7.3 9.24a.75.75 0 00-1.1 1.02l3.25 3.5a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V6.75z" clip-rule="evenodd" class="rotate-180 origin-center" />
                          </svg>
                        }
                        {{ move.type }}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-sm font-mono font-bold text-gray-700">
                      {{ move.type === 'IN' ? '+' : '-' }}{{ move.quantity }}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-500 italic max-w-xs truncate">
                      {{ move.reason }}
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="5" class="px-6 py-12 text-center text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-12 h-12 mx-auto mb-3 opacity-20">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                      </svg>
                      No movements recorded yet.
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `
})
export class StockHistoryComponent {
    private service = inject(InventoryService);
    movements = this.service.getMovements();

    getProductName(productId: string): string {
        return this.service.getProductById(productId)?.name || 'Unknown Product';
    }

    getVariantName(productId: string, variantId: string): string {
        const product = this.service.getProductById(productId);
        const variant = product?.variants.find(v => v.id === variantId);
        return variant ? `${variant.size} / ${variant.color}` : 'Unknown Variant';
    }
}

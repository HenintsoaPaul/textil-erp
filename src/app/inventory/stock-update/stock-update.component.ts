import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InventoryService } from '../inventory.service';
import { Router, RouterLink } from '@angular/router';
import { Product, Variant } from '../models';

@Component({
    selector: 'app-stock-update',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    template: `
    <div class="p-6 bg-gray-50 min-h-screen">
      <div class="max-w-2xl mx-auto">
        <div class="flex items-center gap-4 mb-8">
          <button routerLink="/inventory" class="text-gray-400 hover:text-indigo-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <div>
            <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">Manual Stock Adjustment</h1>
            <p class="text-gray-500 mt-1">Directly increase or decrease stock levels for a specific variant.</p>
          </div>
        </div>

        <form [formGroup]="updateForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <div class="space-y-2">
              <label class="text-sm font-bold text-gray-700 ml-1">Select Product</label>
              <select 
                formControlName="productId"
                (change)="onProductChange()"
                class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none appearance-none transition-all bg-white"
              >
                <option value="">Choose a product...</option>
                @for (product of products(); track product.id) {
                  <option [value]="product.id">{{ product.name }} ({{ product.category }})</option>
                }
              </select>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-bold text-gray-700 ml-1">Select Variant</label>
              <select 
                formControlName="variantId"
                class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none appearance-none transition-all bg-white disabled:bg-gray-50 disabled:text-gray-400"
                [attr.disabled]="!selectedProduct() ? true : null"
              >
                <option value="">Choose a variant...</option>
                @for (variant of variants(); track variant.id) {
                  <option [value]="variant.id">{{ variant.size }} / {{ variant.color }} (Stock: {{ variant.currentStock }})</option>
                }
              </select>
            </div>

            <div class="grid grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-sm font-bold text-gray-700 ml-1">Adjustment Type</label>
                <div class="flex gap-2 p-1 bg-gray-50 rounded-xl border border-gray-100">
                  <button 
                    type="button"
                    (click)="updateForm.patchValue({ type: 'IN' })"
                    [class]="updateForm.get('type')?.value === 'IN' ? 'bg-white shadow-sm ring-1 ring-emerald-500/20 text-emerald-600' : 'text-gray-400 hover:text-gray-600'"
                    class="flex-1 py-2 rounded-lg font-bold text-sm transition-all"
                  >
                    STOCK IN
                  </button>
                  <button 
                    type="button"
                    (click)="updateForm.patchValue({ type: 'OUT' })"
                    [class]="updateForm.get('type')?.value === 'OUT' ? 'bg-white shadow-sm ring-1 ring-rose-500/20 text-rose-600' : 'text-gray-400 hover:text-gray-600'"
                    class="flex-1 py-2 rounded-lg font-bold text-sm transition-all"
                  >
                    STOCK OUT
                  </button>
                </div>
              </div>

              <div class="space-y-2">
                <label class="text-sm font-bold text-gray-700 ml-1">Quantity</label>
                <input 
                  type="number" 
                  formControlName="quantity"
                  min="1"
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                >
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-bold text-gray-700 ml-1">Reason for Adjustment</label>
              <textarea 
                formControlName="reason"
                rows="2"
                placeholder="e.g. Restock, Damaged items, Returns..."
                class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none resize-none"
              ></textarea>
            </div>
          </div>

          <button 
            type="submit" 
            [disabled]="updateForm.invalid"
            class="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-bold shadow-xl shadow-indigo-100 transition-all flex items-center justify-center gap-2 transform active:scale-95"
          >
            Confirm Adjustment
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  `
})
export class StockUpdateComponent implements OnInit {
    private fb = inject(FormBuilder);
    private service = inject(InventoryService);
    private router = inject(Router);

    updateForm!: FormGroup;
    products = this.service.getProducts();
    selectedProduct = signal<Product | null>(null);
    variants = signal<Variant[]>([]);

    ngOnInit() {
        this.updateForm = this.fb.group({
            productId: ['', Validators.required],
            variantId: ['', Validators.required],
            type: ['IN', Validators.required],
            quantity: [1, [Validators.required, Validators.min(1)]],
            reason: ['', Validators.required]
        });
    }

    onProductChange() {
        const productId = this.updateForm.get('productId')?.value;
        const product = this.service.getProductById(productId);
        this.selectedProduct.set(product || null);
        this.variants.set(product?.variants || []);
        this.updateForm.patchValue({ variantId: '' });
    }

    onSubmit() {
        if (this.updateForm.valid) {
            const { productId, variantId, quantity, type, reason } = this.updateForm.value;
            this.service.updateStock(productId, variantId, quantity, type, reason);
            this.router.navigate(['/inventory/history']);
        }
    }
}

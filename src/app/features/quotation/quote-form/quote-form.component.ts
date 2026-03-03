import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuotationService } from '../quotation.service';
import { InventoryService } from '../../inventory/inventory.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Quote, QuoteItem, QuoteStatus, Customer } from '../models';
import { Product, Variant } from '../../inventory/models';

@Component({
  selector: 'app-quote-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './quote-form.component.html'
})
export class QuoteFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private quoteService = inject(QuotationService);
  private invService = inject(InventoryService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  quoteForm!: FormGroup;
  isEdit = false;
  quoteId?: string;
  customers = this.quoteService.getCustomers();
  products = this.invService.getProducts();
  totals = signal({ subtotal: 0, discountAmount: 0, total: 0 });

  ngOnInit() {
    this.quoteId = this.route.snapshot.params['id'];
    this.isEdit = !!this.quoteId;

    this.quoteForm = this.fb.group({
      customerId: ['', Validators.required],
      date: [new Date().toISOString().split('T')[0], Validators.required],
      expiryDate: [new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], Validators.required],
      items: this.fb.array([], Validators.required),
      discountPercentage: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      status: ['Draft', Validators.required],
      notes: ['']
    });

    if (this.isEdit && this.quoteId) {
      const quote = this.quoteService.getQuoteById(this.quoteId);
      if (quote) {
        this.quoteForm.patchValue({
          customerId: quote.customerId,
          date: new Date(quote.date).toISOString().split('T')[0],
          expiryDate: new Date(quote.expiryDate).toISOString().split('T')[0],
          discountPercentage: quote.discountPercentage,
          status: quote.status,
          notes: quote.notes
        });
        quote.items.forEach(item => this.addItem(item));
        this.calculateAllTotals();
      }
    } else {
      this.addItem();
    }
  }

  get itemControls() {
    return this.quoteForm.get('items') as FormArray;
  }

  addItem(item?: QuoteItem) {
    const itemGroup = this.fb.group({
      id: [item?.id || Math.random().toString(36).substr(2, 9)],
      productId: [item?.productId || '', Validators.required],
      variantId: [item?.variantId || '', Validators.required],
      productName: [item?.productName || ''],
      variantName: [item?.variantName || ''],
      quantity: [item?.quantity || 1, [Validators.required, Validators.min(1)]],
      unitPrice: [item?.unitPrice || 0, [Validators.required, Validators.min(0)]],
      totalPrice: [item?.totalPrice || 0]
    });
    this.itemControls.push(itemGroup);
  }

  removeItem(index: number) {
    this.itemControls.removeAt(index);
    this.calculateAllTotals();
  }

  onProductChange(index: number) {
    const productId = this.itemControls.at(index).get('productId')?.value;
    const product = this.invService.getProductById(productId);
    if (product) {
      this.itemControls.at(index).patchValue({
        productName: product.name,
        variantId: '',
        unitPrice: 0,
        totalPrice: 0
      });
    }
    this.calculateAllTotals();
  }

  onVariantChange(index: number) {
    const productId = this.itemControls.at(index).get('productId')?.value;
    const variantId = this.itemControls.at(index).get('variantId')?.value;
    const product = this.invService.getProductById(productId);
    const variant = product?.variants.find(v => v.id === variantId);
    if (variant) {
      this.itemControls.at(index).patchValue({
        variantName: `${variant.size} / ${variant.color}`,
        unitPrice: 50, // Mock price
      });
      this.updateItemTotal(index);
    }
  }

  getVariantsForProduct(productId: string): Variant[] {
    return this.invService.getProductById(productId)?.variants || [];
  }

  updateItemTotal(index: number) {
    const group = this.itemControls.at(index);
    const qty = group.get('quantity')?.value || 0;
    const price = group.get('unitPrice')?.value || 0;
    group.patchValue({ totalPrice: qty * price });
    this.calculateAllTotals();
  }

  calculateAllTotals() {
    const items = this.itemControls.value as QuoteItem[];
    const discountPct = this.quoteForm.get('discountPercentage')?.value || 0;
    this.totals.set(this.quoteService.calculateTotals(items, discountPct));
  }

  onSubmit() {
    if (this.quoteForm.valid) {
      const formValue = this.quoteForm.value;
      const customer = this.customers().find(c => c.id === formValue.customerId);
      const quote: Quote = {
        ...formValue,
        id: this.quoteId || Math.random().toString(36).substr(2, 9),
        quoteNumber: this.isEdit ? this.quoteService.getQuoteById(this.quoteId!)?.quoteNumber : `QT-2026-${Math.floor(Math.random() * 900 + 100)}`,
        customerName: customer?.name || '',
        ...this.totals(),
        date: new Date(formValue.date),
        expiryDate: new Date(formValue.expiryDate)
      };

      if (this.isEdit) {
        this.quoteService.updateQuote(quote);
      } else {
        this.quoteService.addQuote(quote);
      }
      this.router.navigate(['/quotations']);
    }
  }
}

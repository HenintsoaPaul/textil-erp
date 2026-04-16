import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InventoryService } from '../../inventory/inventory.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product, Variant } from '../../core/models';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(InventoryService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  productForm!: FormGroup;
  isEdit = false;
  productId?: string;

  ngOnInit() {
    this.productId = this.route.snapshot.params['id'];
    this.isEdit = !!this.productId;

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      category: ['', Validators.required],
      lowStockThreshold: [5, [Validators.required, Validators.min(0)]],
      variants: this.fb.array([])
    });

    if (this.isEdit && this.productId) {
      const product = this.service.getProductById(this.productId);
      if (product) {
        this.productForm.patchValue({
          name: product.name,
          description: product.description,
          category: product.category,
          lowStockThreshold: product.lowStockThreshold
        });
        product.variants.forEach(v => this.addVariant(v));
      } else {
        this.router.navigate(['/inventory']);
      }
    } else {
      this.addVariant();
    }
  }

  get variantControls() {
    return this.productForm.get('variants') as FormArray;
  }

  addVariant(variant?: Variant) {
    const variantGroup = this.fb.group({
      id: [variant?.id || Math.random().toString(36).substr(2, 9)],
      size: [variant?.size || '', Validators.required],
      color: [variant?.color || '', Validators.required],
      sku: [variant?.sku || '', Validators.required],
      currentStock: [variant?.currentStock || 0, [Validators.required, Validators.min(0)]]
    });
    this.variantControls.push(variantGroup);
  }

  removeVariant(index: number) {
    if (this.variantControls.length > 1) {
      this.variantControls.removeAt(index);
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const product: Product = {
        ...this.productForm.value,
        id: this.productId || Math.random().toString(36).substr(2, 9)
      };

      if (this.isEdit) {
        this.service.updateProduct(product);
      } else {
        this.service.addProduct(product);
      }

      this.router.navigate(['/inventory']);
    }
  }
}

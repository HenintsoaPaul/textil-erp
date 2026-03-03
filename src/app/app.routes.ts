import { Routes } from '@angular/router';
import { ProductListComponent } from './inventory/product-list/product-list.component';
import { ProductFormComponent } from './inventory/product-form/product-form.component';
import { StockHistoryComponent } from './inventory/stock-history/stock-history.component';
import { StockUpdateComponent } from './inventory/stock-update/stock-update.component';

export const routes: Routes = [
    { path: '', redirectTo: 'inventory', pathMatch: 'full' },
    { path: 'inventory', component: ProductListComponent },
    { path: 'inventory/new', component: ProductFormComponent },
    { path: 'inventory/edit/:id', component: ProductFormComponent },
    { path: 'inventory/history', component: StockHistoryComponent },
    { path: 'inventory/update', component: StockUpdateComponent },
];

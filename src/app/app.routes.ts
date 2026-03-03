import { Routes } from '@angular/router';
import { ProductListComponent } from './features/product/product-list/product-list.component';
import { ProductFormComponent } from './features/product/product-form/product-form.component';
import { StockHistoryComponent } from './features/inventory/stock-history/stock-history.component';
import { StockUpdateComponent } from './features/inventory/stock-update/stock-update.component';
import { QuoteListComponent } from './features/quotation/quote-list/quote-list.component';
import { QuoteFormComponent } from './features/quotation/quote-form/quote-form.component';

export const routes: Routes = [
    { path: '', redirectTo: 'inventory', pathMatch: 'full' },
    { path: 'inventory', component: ProductListComponent },
    { path: 'inventory/new', component: ProductFormComponent },
    { path: 'inventory/edit/:id', component: ProductFormComponent },
    { path: 'inventory/history', component: StockHistoryComponent },
    { path: 'inventory/update', component: StockUpdateComponent },
    { path: 'quotations', component: QuoteListComponent },
    { path: 'quotations/new', component: QuoteFormComponent },
    { path: 'quotations/edit/:id', component: QuoteFormComponent },
];

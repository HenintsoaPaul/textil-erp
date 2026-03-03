import { Routes } from '@angular/router';
import { ProductListComponent } from './features/product/product-list/product-list.component';
import { ProductFormComponent } from './features/product/product-form/product-form.component';
import { StockHistoryComponent } from './features/inventory/stock-history/stock-history.component';
import { StockUpdateComponent } from './features/inventory/stock-update/stock-update.component';
import { QuoteListComponent } from './features/quotation/quote-list/quote-list.component';
import { QuoteFormComponent } from './features/quotation/quote-form/quote-form.component';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
    {
        path: 'inventory',
        children: [
            { path: '', component: ProductListComponent },
            { path: 'new', component: ProductFormComponent },
            { path: 'edit/:id', component: ProductFormComponent },
            { path: 'history', component: StockHistoryComponent },
            { path: 'update', component: StockUpdateComponent },
        ],
    },
    {
        path: 'quotations',
        children: [
            { path: '', component: QuoteListComponent },
            { path: 'new', component: QuoteFormComponent },
            { path: 'edit/:id', component: QuoteFormComponent },
        ],
    },
    { path: 'home', component: HomeComponent },
    { path: '', component: HomeComponent },
];

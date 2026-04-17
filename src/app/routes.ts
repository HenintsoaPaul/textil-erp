import { Routes } from '@angular/router';
import { ProductListComponent } from './features/product/product-list/product-list.component';
import { ProductFormComponent } from './features/product/product-form/product-form.component';
import { StockHistoryComponent } from './features/inventory/stock-history/stock-history.component';
import { StockUpdateComponent } from './features/inventory/stock-update/stock-update.component';
import { QuoteListComponent } from './features/quotation/quote-list/quote-list.component';
import { QuoteFormComponent } from './features/quotation/quote-form/quote-form.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

export const routes: Routes = [
    // AUTH
    {
        path: 'auth',
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
        ],
    },
    // ADMIN
    {
        path: 'admin',
        // canActivate: [authGuard],
        loadComponent: () => import('./features/core/layout/admin-layout.component').then(m => m.AdminLayoutComponent),
        children: [
            // HOME
            {
                path: '',
                loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
            },
            // PRODUCTS
            {
                path: 'products',
                children: [
                    { path: '', component: ProductListComponent },
                    { path: 'new', component: ProductFormComponent },
                    { path: 'edit/:id', component: ProductFormComponent },
                ],
            },
            // INVENTORY
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
            // QUOTATIONS
            {
                path: 'quotations',
                children: [
                    { path: '', component: QuoteListComponent },
                    { path: 'new', component: QuoteFormComponent },
                    { path: 'edit/:id', component: QuoteFormComponent },
                ],
            },
        ]
    },
    // NOT FOUND
    { path: '**', loadComponent: () => import('./shared/not-found/not-found.component').then(m => m.NotFoundComponent) },
];

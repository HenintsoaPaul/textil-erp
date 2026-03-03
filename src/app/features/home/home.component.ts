import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="p-8 space-y-8 animate-in fade-in duration-500">
      <div class="flex flex-col gap-2">
        <h1 class="text-4xl font-black text-gray-900 tracking-tight">Welcome back, <span class="text-indigo-600">Jane</span>!</h1>
        <p class="text-gray-500 font-medium">Here's what's happening in Textil ERP today.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Quick Stats -->
        <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-4 group hover:shadow-xl hover:shadow-indigo-100/20 transition-all duration-300">
          <div class="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <div>
            <div class="text-3xl font-black text-gray-900">24</div>
            <div class="text-sm font-bold text-gray-400 uppercase tracking-widest">Active Quotes</div>
          </div>
          <button routerLink="/quotations" class="mt-2 text-indigo-600 font-bold text-sm flex items-center gap-1 hover:translate-x-1 transition-transform">
            View all <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </button>
        </div>

        <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-4 group hover:shadow-xl hover:shadow-rose-100/20 transition-all duration-300">
          <div class="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <div>
            <div class="text-3xl font-black text-gray-900">12</div>
            <div class="text-sm font-bold text-gray-400 uppercase tracking-widest text-rose-400">Low Stock items</div>
          </div>
          <button routerLink="/inventory" class="mt-2 text-rose-600 font-bold text-sm flex items-center gap-1 hover:translate-x-1 transition-transform">
            Check inventory <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </button>
        </div>

        <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-4 group hover:shadow-xl hover:shadow-emerald-100/20 transition-all duration-300">
          <div class="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75m0 1.5v.75m0 1.5v.75m0 1.5V15m1.5 1.5h1.5m1.5 0h1.5m1.5 0h1.5m1.5 0H15m-1.5-1.5V15m0-1.5V12m0-1.5V9m0-1.5V6m0-1.5V3m-1.5 1.5h-1.5m-1.5 0h-1.5m-1.5 0H6m-1.5 1.5v1.5m12 0v1.5m-1.5 1.5v1.5m-9 0v1.5m0 1.5v1.5m9 0v1.5m-1.5 1.5v1.5" />
            </svg>
          </div>
          <div>
            <div class="text-3xl font-black text-gray-900">$12,450</div>
            <div class="text-sm font-bold text-gray-400 uppercase tracking-widest">Expected Revenue</div>
          </div>
          <div class="mt-2 text-emerald-600 font-bold text-sm">Target: $15,000</div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="space-y-4">
        <h2 class="text-xl font-black text-gray-900">Quick Actions</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button routerLink="/quotations/new" class="p-6 bg-indigo-600 text-white rounded-3xl font-bold flex flex-col items-center justify-center gap-3 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            New Quote
          </button>
          
          <button routerLink="/inventory/new" class="p-6 bg-white border border-gray-100 rounded-3xl font-bold flex flex-col items-center justify-center gap-3 hover:bg-gray-50 transition-colors shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8 text-indigo-600"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>
            Add Product
          </button>

          <button routerLink="/inventory/update" class="p-6 bg-white border border-gray-100 rounded-3xl font-bold flex flex-col items-center justify-center gap-3 hover:bg-gray-50 transition-colors shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8 text-indigo-600"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>
            Adjust Stock
          </button>

          <div class="p-6 bg-gray-50/50 border border-dashed border-gray-200 rounded-3xl font-bold flex flex-col items-center justify-center gap-3 text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            More Coming...
          </div>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent { }

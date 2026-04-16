import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HomeHeaderComponent } from './components/home-header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, HomeHeaderComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  stats = [
    {
      label: 'Active Quotes',
      value: '24',
      trend: '+12%',
      trendUp: true,
      icon: 'quotes',
      color: 'bg-indigo-50 text-indigo-600',
      link: '/quotations'
    },
    {
      label: 'Low Stock Items',
      value: '12',
      trend: '-5%',
      trendUp: false,
      icon: 'inventory',
      color: 'bg-rose-50 text-rose-600',
      link: '/inventory'
    },
    {
      label: 'Expected Revenue',
      value: '$12,450',
      trend: '+8%',
      trendUp: true,
      icon: 'revenue',
      color: 'bg-emerald-50 text-emerald-600',
      link: null
    },
    {
      label: 'Production Efficiency',
      value: '94%',
      trend: '+2.4%',
      trendUp: true,
      icon: 'production',
      color: 'bg-amber-50 text-amber-600',
      link: null
    }
  ];

  recentOrders = [
    { id: 'ORD-001', customer: 'Elite Fabrics', status: 'In Production', amount: '$4,200', date: '2024-03-15' },
    { id: 'ORD-002', customer: 'Global Textiles', status: 'Pending', amount: '$1,850', date: '2024-03-14' },
    { id: 'ORD-003', customer: 'Moda Casa', status: 'Shipped', amount: '$3,100', date: '2024-03-12' },
    { id: 'ORD-004', customer: 'Soft Cotton Co.', status: 'In Production', amount: '$950', date: '2024-03-11' },
    { id: 'ORD-005', customer: 'Velvet Dreams', status: 'Cancelled', amount: '$1,200', date: '2024-03-10' },
  ];

  productionLines = [
    { name: 'Weaving Line A', progress: 75, color: 'bg-indigo-600' },
    { name: 'Dyeing Unit 1', progress: 45, color: 'bg-indigo-600' },
    { name: 'Finishing Section', progress: 90, color: 'bg-emerald-500' },
    { name: 'Packaging B', progress: 20, color: 'bg-amber-500' },
  ];

  getStatusColor(status: string): string {
    switch (status) {
      case 'In Production': return 'bg-blue-100 text-blue-700';
      case 'Pending': return 'bg-amber-100 text-amber-700';
      case 'Shipped': return 'bg-emerald-100 text-emerald-700';
      case 'Cancelled': return 'bg-rose-100 text-rose-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  }
}

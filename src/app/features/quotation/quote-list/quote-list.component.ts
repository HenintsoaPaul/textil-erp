import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotationService } from '../quotation.service';
import { Quote, QuoteStatus } from '../models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quote-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './quote-list.component.html'
})
export class QuoteListComponent {
  private service = inject(QuotationService);
  quotes = this.service.getQuotes();

  getStatusClass(status: QuoteStatus): string {
    const base = "ring-1 ";
    switch (status) {
      case 'Draft': return base + "bg-gray-50 text-gray-600 ring-gray-200";
      case 'Sent': return base + "bg-blue-50 text-blue-700 ring-blue-100";
      case 'Approved': return base + "bg-emerald-50 text-emerald-700 ring-emerald-100";
      case 'Rejected': return base + "bg-rose-50 text-rose-700 ring-rose-100";
      default: return base + "bg-gray-50 text-gray-600 ring-gray-200";
    }
  }

  convert(id: string) {
    this.service.convertToOrder(id);
  }

  exportPDF(id: string) {
    alert('PDF Exporting initiated for quote: ' + id);
  }
}

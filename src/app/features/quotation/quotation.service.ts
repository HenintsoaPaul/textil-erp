import { Injectable, signal, computed } from '@angular/core';
import { Customer, Quote, QuoteItem, QuoteStatus } from './models';

@Injectable({
    providedIn: 'root'
})
export class QuotationService {
    private customers = signal<Customer[]>([
        { id: 'c1', name: 'John Smith', phone: '555-0101', email: 'john@example.com', company: 'Smith Textiles' },
        { id: 'c2', name: 'Alice Jones', phone: '555-0202', email: 'alice@fashion.com', company: 'Alice Fashion' },
        { id: 'c3', name: 'Bob Brown', phone: '555-0303', email: 'bob@fabrics.net', company: 'Brown Fabrics' }
    ]);

    private quotes = signal<Quote[]>([
        {
            id: 'q1',
            quoteNumber: 'QT-2026-001',
            customerId: 'c1',
            customerName: 'John Smith',
            items: [
                { id: 'qi1', productId: '1', variantId: '1-1', productName: 'Cotton T-Shirt', variantName: 'S / White', quantity: 10, unitPrice: 20, totalPrice: 200 }
            ],
            subtotal: 200,
            discountPercentage: 10,
            discountAmount: 20,
            total: 180,
            status: 'Sent',
            date: new Date(),
            expiryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
        }
    ]);

    getCustomers() {
        return this.customers;
    }

    getQuotes() {
        return this.quotes;
    }

    getQuoteById(id: string) {
        return this.quotes().find(q => q.id === id);
    }

    addQuote(quote: Quote) {
        this.quotes.update(prev => [quote, ...prev]);
    }

    updateQuote(quote: Quote) {
        this.quotes.update(prev => prev.map(q => q.id === quote.id ? quote : q));
    }

    updateQuoteStatus(id: string, status: QuoteStatus) {
        this.quotes.update(prev => prev.map(q => q.id === id ? { ...q, status } : q));
    }

    convertToOrder(id: string) {
        console.log('Converting Quote to Order:', id);
        this.updateQuoteStatus(id, 'Approved');
        // In a real app, this would create an entry in the Orders module
    }

    calculateTotals(items: QuoteItem[], discountPercentage: number) {
        const subtotal = items.reduce((acc, item) => acc + item.totalPrice, 0);
        const discountAmount = (subtotal * discountPercentage) / 100;
        const total = subtotal - discountAmount;
        return { subtotal, discountAmount, total };
    }
}

export interface Customer {
    id: string;
    name: string;
    phone: string;
    email: string;
    company: string;
}

export type QuoteStatus = 'Draft' | 'Sent' | 'Approved' | 'Rejected';

export interface QuoteItem {
    id: string;
    productId: string;
    variantId: string;
    productName: string;
    variantName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

export interface Quote {
    id: string;
    quoteNumber: string;
    customerId: string;
    customerName: string;
    items: QuoteItem[];
    subtotal: number;
    discountPercentage: number;
    discountAmount: number;
    total: number;
    status: QuoteStatus;
    date: Date;
    expiryDate: Date;
    notes?: string;
}

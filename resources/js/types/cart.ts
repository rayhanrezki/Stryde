export interface CartItem {
    id: string;
    name: string;
    category: string;
    description: string;
    price: number;
    image: string;
    size: string;
    quantity: number;
}

export interface OrderSummary {
    itemCount: number;
    subtotal: number;
    delivery: number;
    salesTax: number;
    total: number;
}

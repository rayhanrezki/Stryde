export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    is_admin: boolean;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};

export interface OrderItem {
    product_name: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: number;
    order_id: string;
    date: string;
    status: string;
    amount: number;
    items: OrderItem[];
}

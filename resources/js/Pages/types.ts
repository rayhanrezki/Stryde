export interface Rating {
    id: number;
    product_id: number;
    user_id: number;
    rating: number;
    review: string | null;
    created_at: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    created_at: string;
}

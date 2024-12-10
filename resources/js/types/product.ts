export interface Product {
    id: number;
    Title: string;
    Description: string;
    Price: number;
    Slug: string;
    Image: string;
    created_at: string;
    updated_at: string;
    sizeStock?: {
        size_stock: Array<{
            size: string;
            stock: number;
        }>;
    };
}

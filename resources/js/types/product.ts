export interface Product {
    id: number;
    Title: string;
    Description: string;
    Price: number;
    Image: string;
    sizeStock: {
        size_stock: Record<string, number>;
    };
}

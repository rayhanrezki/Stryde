export interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    slug: string;
    created_at: string;
    sizes: { id: number; size: string; stock: number }[];
    categories: { id: number; name: string }[];
    images: { id: number; image_path: string }[];
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    created_at: string;
    updated_at: string;
    images: ProductImage[];
    sizes: ProductSize[];
    categories: Category[];
}

export interface ProductImage {
    id: number;
    product_id: number;
    image_path: string;
}

export interface ProductSize {
    id: number;
    product_id: number;
    size: string;
    stock: number;
}

export interface Category {
    id: number;
    name: string;
    slug?: string;
}

export interface Size {
    size: string;
    stock: number;
}

export interface ProductFormData {
    name: string;
    description: string;
    price: string;
    images: File[];
    sizes: Size[];
    categories: number[];
    existingImages: Array<{ id: number; image_path: string }>;
}

export interface ProductImage {
    id: number;
    image_path: string;
}

export interface ProductSize {
    id: number;
    size: string;
    stock: number;
}

export interface Product {
    categories: Category[];
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    images: ProductImage[];
    sizes: ProductSize[];
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

interface Props extends PageProps {
    cart: {
        id: number;
        user_id: number;
        items: CartItem[];
    };
    recommendedProducts: Product[];
}

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

export interface CartItem {
    id: number;
    product_id: number;
    quantity: number;
    size: string;
}

export interface Cart {
    id: number;
    user_id: number;
    items: CartItem[]; // Array of CartItems
}

export interface Order {
    id: number;
    user_id: number;
    email: string;
    first_name: string;
    last_name: string;
    address: string;
    phone: string;
    product_id: number;
    quantity: number;
    total_amount: number;
    snap_token: string;
    status: string;
    order_date: string;
    created_at: string;
    updated_at: string;
}

interface Props extends PageProps {
    cart: Cart;
    recommendedProducts: Product[];
}

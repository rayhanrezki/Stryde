export interface Product {
    id: number;
    name: string;
    subtitle?: string;
    price: number;
    image: string;
    isNew?: boolean;
}

export interface FilterState {
    categories: string[];
    sizes: number[];
    colors: string[];
    types: string[];
}

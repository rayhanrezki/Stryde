import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import NewDrops from "../Components/NewDrops";
import Categories from "@/Components/Categories";
import Reviews from "@/Components/Reviews";
import { Head } from "@inertiajs/react";

interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
    created_at: string;
}

interface Props {
    latestProducts: Product[];
    // ... other props
}

export default function Main({ latestProducts, ...props }: Props) {
    return (
        <>
            <Head title="Home" />
            <div>
                <Navbar />
                <Hero />
                <NewDrops products={latestProducts} />
                <Categories />
                <Reviews />
            </div>
        </>
    );
}

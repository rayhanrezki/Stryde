import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import NewDrops from "../Components/NewDrops";
import Categories from "@/Components/Categories";
import Reviews from "@/Components/Reviews";
import { Head } from "@inertiajs/react";

interface Product {
    id: number;
    name: string;
    Price: string;
    image: string;
    created_at: string;
    Slug: string;
}

interface Props {
    latestProducts: Product[];
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

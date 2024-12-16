import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import NewDrops from "../Components/NewDrops";
import Categories from "@/Components/Categories";
import Reviews from "@/Components/Reviews";
import Footer from "@/Components/Footer";
import { Head } from "@inertiajs/react";
import { Product } from "@/types/product";


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
                <Footer />
            </div>
        </>
    );
}

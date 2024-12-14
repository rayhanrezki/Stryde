"use client";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import NewDrops from "../Components/NewDrops";
import Categories from "@/Components/Categories";
import Reviews from "@/Components/Reviews";
import { Head } from "@inertiajs/react";
import { Product } from "@/types/product";
import { PageProps } from "@/types"; // Menggunakan PageProps untuk data autentikasi

export default function Main({
    latestProducts,
    auth,
}: PageProps<{ latestProducts: Product[] }>) {
    return (
        <>
            <Head title="Home" />
            <div>
                {/* Kirim data user ke komponen Navbar */}
                <Navbar user={auth?.user} />
                <Hero />
                <NewDrops products={latestProducts} />
                <Categories />
                <Reviews />
            </div>
        </>
    );
}

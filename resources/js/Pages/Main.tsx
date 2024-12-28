"use client";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import NewDrops from "../Components/NewDrops";
import Categories from "@/Components/Categories";
import Reviews from "@/Components/Reviews";
import { Head } from "@inertiajs/react";
import { Product } from "@/types/product";
import { PageProps } from "@/types"; // Menggunakan PageProps untuk data autentikasi
import Footer from "@/Components/Footer";
import AboutUs from "@/Components/BannerProduct";
import BannerProduct from "@/Components/BannerProduct";

// Definisikan tipe CartItem dengan lebih jelas
interface CartItem {
    id: number;
    product_id: number;
    product_size_id: number;
    quantity: number;
    size: string;
    product: {
        id: number;
        name: string;
        description: string;
        price: string;
        sizes: { id: number; size: string; stock: number }[];
        categories: { id: number; name: string }[];
        images: { id: number; image_path: string }[];
    };
    product_size: {
        id: number;
        size: string;
        stock: number;
    };
}

// Perbarui Props agar cartItems adalah array CartItem
interface Props extends PageProps {
    latestProducts: Product[];
    cartItems: CartItem[]; // cartItems sekarang array
}

export default function Main({
    latestProducts,
    auth,
    cartItems, // cartItems yang diterima harus array
}: Props) {
    return (
        <>
            <Head title="Home" />
            <div>
                {/* Kirim data user dan cartItems ke komponen Navbar */}
                <Navbar user={auth?.user} cartItems={cartItems} />
                <Hero />
                <NewDrops products={latestProducts} />
                <Categories />
                <Reviews/>
                <BannerProduct />
                <Footer />
            </div>
        </>
    );
}

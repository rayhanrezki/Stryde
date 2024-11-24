import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import NewDrops from "../Components/NewDrops";
import Categories from "@/Components/Categories";
import Reviews from "@/Components/Reviews";
import { Head } from "@inertiajs/react";

function Main() {
    return (
        <>
            <Head title="Home" />
            <div>
                <Navbar />
                <Hero />
                <NewDrops />
                <Categories />
                <Reviews />
            </div>
        </>
    );
}

export default Main;

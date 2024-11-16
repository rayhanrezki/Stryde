import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import NewDrops from "../Components/NewDrops";
import Categories from "@/Components/Categories";
import Reviews from "@/Components/Reviews";

function Main() {
    return (
        <div>
            <Navbar />
            <Hero />
            <NewDrops />
            <Categories />
            <Reviews />
        </div>
    );
}

export default Main;

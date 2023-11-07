import Footer from "@/components/footer/Footer";
import FilteredDataShow from "@/components/home/FilteredDataShow";
import SearchBar from "@/components/home/SearchBar";
import NavBar from "@/components/navbar/NavBar";
import React from "react";

const page = () => {
    return (
        <div>
            <NavBar />
            <SearchBar />
            <FilteredDataShow />
            <Footer />
        </div>
    );
};

export default page;

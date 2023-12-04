"use client"
import Footer from "@/components/footer/AppFooter";
import FilteredDataShow from "@/components/home/FilteredDataShow";
import SearchBar from "@/components/home/SearchBar";
import NavBar from "@/components/navbar/NavBar";
import React from "react";
import { FloatButton } from 'antd';

const page = () => {
    return (
        <div>
            <NavBar />
            <SearchBar />
            <FilteredDataShow />
            <Footer />
            <FloatButton.BackTop visibilityHeight={0} />
        </div>
    );
};

export default page;

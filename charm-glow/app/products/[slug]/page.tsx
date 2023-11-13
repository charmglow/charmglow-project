"use client"
import { notFound } from 'next/navigation'
import NavBar from "@/components/navbar/NavBar";
import React from "react";
const ProductDetail = ({ params }: { params: { slug: string } }) => {
    if (true) {
        notFound()
    }
    return (
        <div>
            <NavBar />
            product id: {params.slug}
        </div>
    );
};

export default ProductDetail;

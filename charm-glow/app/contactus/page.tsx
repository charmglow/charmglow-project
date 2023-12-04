"use client"
import ContactForm from "@/components/contact/ContactForm";
import Footer from "@/components/footer/AppFooter";
import NavBar from "@/components/navbar/NavBar";
import React from "react";

const page = () => {
    return (<div>
        <NavBar />
        <ContactForm />
        <Footer />
    </div>);
};

export default page;

"use client"
import withAdminAuth from "@/components/admin/auth/withAdminAuth";
import CustomersTable from "@/components/admin/customers/CustomersTable";
import React from "react";

const CustomersPage = () => {
    return <div className="mt-5"><CustomersTable /></div>;
};

export default withAdminAuth(CustomersPage);

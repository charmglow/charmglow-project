"use client"
import withAdminAuth from "@/components/admin/auth/withAdminAuth";
import OrdersAdminTable from "@/components/admin/orders/OrdersAdminTable";
import React from "react";

const OrdersPage = () => {
    return <div>
        <OrdersAdminTable />
    </div>;
};

export default withAdminAuth(OrdersPage);

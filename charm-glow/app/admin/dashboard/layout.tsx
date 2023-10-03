import NavBar from "@/components/admin/auth/NavBar";
import React, { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
    return <NavBar>
        {children}
    </NavBar>;
};

export default DashboardLayout;

import NavBarAccount from "@/components/user/auth/NavBarAccount";
import React, { ReactNode } from "react";

const ProfileLayout = ({ children }: { children: ReactNode }) => {
    return <NavBarAccount>
        {children}
    </NavBarAccount>;
};

export default ProfileLayout;

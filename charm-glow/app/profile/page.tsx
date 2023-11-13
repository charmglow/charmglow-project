"use client"
import NavBarAccount from "@/components/user/auth/NavBarAccount";
import { useAppSelector } from "@/store/hooks";
import React from "react";

const ProfilePage = () => {
    const { user } = useAppSelector(state => state.auth)
    return (
        <div>
            ]      <div className="flex flex-col items-center justify-center">
                User Information
                <div>MongoDB ID:  {user?._id} </div>
                <div>Name: {user?.name}</div>
                <div>Email: {user?.email}</div>

            </div>

        </div>);
};

export default ProfilePage;
"use client"
import NavBar from "@/components/navbar/NavBar";
import { useAppSelector } from "@/store/hooks";
import React from "react";

const ProfilePage = () => {
    const { user } = useAppSelector(state => state.auth)
    console.log("hjgdsfgsfgds: ", user)
    return (
        <div>
            <NavBar />
            <div className="flex flex-col items-center justify-center">
                User Information
                <div>MongoDB ID:  {user?._id} </div>
                <div>Name: {user?.name}</div>
                <div>Email: {user?.email}</div>

            </div>
        </div>);
};

export default ProfilePage;

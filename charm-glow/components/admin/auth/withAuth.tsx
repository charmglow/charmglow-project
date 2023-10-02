"use client"
import { useAppSelector } from "@/store/hooks";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

export default function withAuth(Component: any) {
    return function WithAuth(props: any) {
        const { user } = useAppSelector(state => state.auth);
        useEffect(() => {
            if (!user) {
                return redirect('/admin')
            } else {
                return redirect('/admin/dashboard')
            }
        })
        return <Component {...props} />
    }
}

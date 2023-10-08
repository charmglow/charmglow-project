"use client"
import { useAppSelector } from "@/store/hooks";
import { redirect } from "next/navigation";
import React, { useLayoutEffect } from "react";

export default function withAdminAuth(Component: any) {
    return function WithAdminAuth(props: any) {
        const { user } = useAppSelector(state => state.auth);
        useLayoutEffect(() => {
            if (!user) {
                return redirect('/admin')
            } else if (user?.isAdmin == false) {
                return redirect('/')
            }
        })
        return <Component {...props} />
    }
}

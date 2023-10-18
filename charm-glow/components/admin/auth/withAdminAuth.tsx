"use client"
import { useAppSelector } from "@/store/hooks";
import { redirect } from "next/navigation";
import React, { useLayoutEffect } from "react";

export default function withAdminAuth(Component: any) {
    return function WithAdminAuth(props: any) {
        const { admin } = useAppSelector(state => state.auth);
        useLayoutEffect(() => {
            if (!admin) {
                return redirect('/admin')
            }
        })
        return <Component {...props} />
    }
}
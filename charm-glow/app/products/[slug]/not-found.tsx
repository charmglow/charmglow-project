import Image from "next/image";
import React from "react";
import { Typography, Button } from 'antd'
import Link from "next/link";
const NotFoundPage = () => {
    return <div className="h-screen w-screen flex justify-center items-center flex-col">
        <Image src="/error-404.png" height={100} width={100} alt="not found image" />
        <div className="mt-4">
            Product Not Found
        </div>
        <Link href="/">
            <Button type="link">BACK HOME</Button>
        </Link>
    </div>;
};

export default NotFoundPage;

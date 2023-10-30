/* eslint-disable jsx-a11y/alt-text */
"use client"
import { fetchLatestProductsAsync } from "@/store/action/home/homeSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Card, Image, List } from "antd";
import React from "react";

const Products = () => {
    const dispatch = useAppDispatch();
    const { latestProducts } = useAppSelector(state => state.home)
    React.useEffect(() => {
        dispatch(fetchLatestProductsAsync())
    })
    return <div className="mt-5">
        <List
            grid={{ gutter: 0, column: 3 }}
            dataSource={latestProducts}
            renderItem={(item, index) => (
                <Card
                    hoverable
                    title={item?.title} className="m-2" key={index} cover={<Image height={300} className="object-scale-down" src={`${item.productImage[0]}`} />}
                ></Card>
            )}
        />
    </div>;
};

export default Products;

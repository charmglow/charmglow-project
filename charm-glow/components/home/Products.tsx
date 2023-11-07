/* eslint-disable jsx-a11y/alt-text */
"use client"
import { fetchLatestProductsAsync } from "@/store/action/home/homeSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Card, Divider, Flex, Image, List, Typography } from "antd";
import React from "react";

const Products = () => {
    const dispatch = useAppDispatch();
    const { latestProducts } = useAppSelector(state => state.home)
    React.useEffect(() => {
        dispatch(fetchLatestProductsAsync())
    }, [dispatch])
    return <div className="mt-5">
        <List
            grid={{ gutter: 0, column: 3 }}
            dataSource={latestProducts}
            renderItem={(item, index) => (
                <Card
                    hoverable
                    title={item?.title} className="m-2" key={index} cover={<Image height={300} className="object-scale-down" src={`${item.productImage[0]}`} />}
                >
                    <Card.Meta
                        title={
                            <Typography.Paragraph>
                                Price: ${item?.price}
                            </Typography.Paragraph>
                        }
                        description={
                            <>
                                <Typography.Text className="capitalize">
                                    Category: <strong>{item?.category}</strong>
                                </Typography.Text>
                                <Typography.Paragraph>
                                    {item?.description}
                                </Typography.Paragraph>
                            </>
                        }
                    />
                </Card>
            )}
        />
    </div>;
};

export default Products;

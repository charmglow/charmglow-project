/* eslint-disable jsx-a11y/alt-text */
"use client"
import { fetchLatestProductsAsync } from "@/store/action/home/homeSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Badge, Button, Card, Divider, Flex, Image, List, Typography } from "antd";
import React from "react";

const Products = () => {
    const dispatch = useAppDispatch();
    const { latestProducts, loading } = useAppSelector(state => state.home)
    React.useEffect(() => {
        dispatch(fetchLatestProductsAsync())
    }, [dispatch])
    return <div className="mt-5">
        <List
            loading={loading}
            grid={{
                gutter: 0, xs: 1,
                sm: 2,
                md: 3,
                lg: 3,
                xl: 3,
                xxl: 4,
            }}
            dataSource={latestProducts}
            renderItem={(item, index) => (
                <Badge.Ribbon text={`${item.discount}% OFF`} className={`p-1 mx-2 ${item?.discount == 0 && "hidden"}`}>
                    <Card
                        hoverable
                        title={item?.title} className="m-2" key={index}
                        cover={<Image height={300} className="object-scale-down" src={`${item.productImage[0]}`} />
                        }
                        actions={[
                            <Button key={item._id} type="link">view detail</Button>,
                            <Button key={item._id} type="primary" className='bg-[#876553]'>Add to Cart</Button>
                        ]}
                    >
                        <Card.Meta
                            title={
                                <Typography.Paragraph>
                                    Price: ${item?.finalPrice} {"  "}{
                                        item?.discount ? <Typography.Text delete type='danger'>
                                            ${item?.price}
                                        </Typography.Text>
                                            : null}
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
                </Badge.Ribbon>
            )}
        />
    </div>;
};

export default Products;

/* eslint-disable jsx-a11y/alt-text */
"use client"
import { addToCart } from "@/store/action/auth/authSlice";
import { fetchLatestProductsAsync } from "@/store/action/home/homeSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Badge, Button, Card, Divider, Flex, Image, List, Typography, message } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const Products = () => {
    const dispatch = useAppDispatch();
    const { push } = useRouter();
    const { latestProducts, loading } = useAppSelector(state => state.home)
    const handleAddToCart = (item: {
        _id: string,
        price: number,
        productImage: string[];
    }) => {
        message.success('Item added successfully')
        dispatch(addToCart(item))
    }
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
                            <Button key={item._id} type="link" onClick={() => push(`/products/${item._id}`)}>view detail</Button>,

                            <Button key={item._id} type="primary" className='bg-[#876553]' onClick={() => handleAddToCart({
                                _id: item._id,
                                price: item.finalPrice,
                                productImage: item.productImage
                            })}>Add to Cart</Button>
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

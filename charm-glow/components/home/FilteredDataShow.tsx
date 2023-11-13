"use client"
import React from 'react';
import { Badge, Button, Card, Image, List, Pagination, Typography, message } from 'antd';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart } from '@/store/action/auth/authSlice';


const FilteredDataShow = () => {
    const { filterProducts, loading } = useAppSelector(state => state.home);
    const dispatch = useAppDispatch();
    const handleAddToCart = (item: {
        _id: string,
        price: number,
        productImage: string[];
    }) => {
        message.success('Item added successfully')
        dispatch(addToCart(item))
    }
    return (
        <div>
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
                dataSource={filterProducts.products}

                renderItem={(item, index) => (
                    <Badge.Ribbon text={`${item.discount}% OFF`} className={`p-1 mx-2 ${item?.discount == 0 && "hidden"}`}>
                        <Card
                            hoverable
                            className='m-2'
                            title={item?.title} key={index} cover={<Image height={300} className="object-scale-down" src={`${item.productImage[0]}`} alt={item?.description} />}
                            actions={[
                                <Button key={item._id} type="link">view detail</Button>,
                                <Button key={item._id} type="primary" className='bg-[#876553]' onClick={() => handleAddToCart({
                                    _id: item._id,
                                    price: item.finalPrice,
                                    productImage: item.productImage
                                })}>Add to Cart</Button>
                            ]}
                        >
                            <Card.Meta
                                title={
                                    <Typography.Paragraph className='w-full'>
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
                                        <Typography.Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
                                            {item?.description}
                                        </Typography.Paragraph>
                                    </>
                                }
                            />
                        </Card>
                    </Badge.Ribbon>
                )}
            />
        </div>
    );
};

export default FilteredDataShow;

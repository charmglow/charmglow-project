"use client"
import React from 'react';
import type { PaginationProps } from 'antd';
import { Card, Image, List, Pagination, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '@/store/hooks';


const FilteredDataShow = () => {
    const { filterProducts, loading } = useAppSelector(state => state.home)
    return (
        <div>
            <List
                loading={loading}
                grid={{ gutter: 0, column: 3 }}
                dataSource={filterProducts.products}
                renderItem={(item, index) => (
                    <Card
                        hoverable
                        title={item?.title} className="m-2" key={index} cover={<Image height={300} className="object-scale-down" src={`${item.productImage[0]}`} alt={item?.description} />}
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
        </div>
    );
};

export default FilteredDataShow;

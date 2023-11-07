"use client"
import React from 'react';
import type { PaginationProps } from 'antd';
import { Card, Image, List, Pagination, Typography } from 'antd';
import { useAppSelector } from '@/store/hooks';


const FilteredDataShow = () => {
    const [current, setCurrent] = React.useState(3);
    const { latestProducts } = useAppSelector(state => state.home)
    const onChange: PaginationProps['onChange'] = (page) => {
        console.log(page);
        setCurrent(page);
    };
    return (
        <div>
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
            <div className='justify-center items-center flex my-4'>

                <Pagination current={current} onChange={onChange} total={50} />
            </div>
        </div>
    );
};

export default FilteredDataShow;

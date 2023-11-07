"use client"
import React from 'react';
import type { PaginationProps } from 'antd';
import { Card, Image, List, Pagination, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchFiterProductsAsync } from '@/store/action/home/homeSlice';


const FilteredDataShow = () => {
    const dispatch = useAppDispatch();
    const [current, setCurrent] = React.useState(3);
    const { filterProducts } = useAppSelector(state => state.home)
    const onChange: PaginationProps['onChange'] = (page) => {
        console.log(page);
        setCurrent(page);
    };
    React.useEffect(() => {
        dispatch(fetchFiterProductsAsync({
            category: '',
            minPrice: 0
        }))
    }, [dispatch])
    return (
        <div>
            <div className='w-[90vw] justify-between flex'>
                <Typography.Text>
                    Total products: <strong>{filterProducts.totalProducts}</strong>
                </Typography.Text>
                <Typography.Text>
                    Page: <strong>{filterProducts.currentPage} of {filterProducts.totalPages}</strong>
                </Typography.Text>
            </div>
            <List
                grid={{ gutter: 0, column: 3 }}
                dataSource={filterProducts.products}
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

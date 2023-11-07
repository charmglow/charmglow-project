"use client"
import React from 'react';
import type { PaginationProps } from 'antd';
import { Card, Image, List, Pagination, TreeSelect, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchFiterProductsAsync } from '@/store/action/home/homeSlice';
import { jewelryCategories } from '@/utils/utils';

const SearchBar = () => {
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
    return <div>
        <div >
            <span> Category</span>
            <TreeSelect
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={jewelryCategories}
                placeholder="Please select"
                treeDefaultExpandAll
            />
        </div>
        <div className='w-[95vw] justify-between flex items-center p-4 '>
            <Typography.Text>
                Total products: <strong>{filterProducts.totalProducts}</strong>
            </Typography.Text>
            <Pagination current={current} onChange={onChange} total={filterProducts.totalProducts} />
            <Typography.Text>
                Page: <strong>{filterProducts.currentPage} of {filterProducts.totalPages}</strong>
            </Typography.Text>
        </div>
    </div>;
};

export default SearchBar;

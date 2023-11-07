"use client"
import React from 'react';
import type { PaginationProps } from 'antd';
import { Button, Card, Image, List, Pagination, TreeSelect, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchFiterProductsAsync } from '@/store/action/home/homeSlice';
import { jewelryCategories } from '@/utils/utils';

const SearchBar = () => {
    const dispatch = useAppDispatch();
    const [current, setCurrent] = React.useState(1);
    const { filterProducts } = useAppSelector(state => state.home)
    const [value, setValue] = React.useState<string>('');
    const onChange: PaginationProps['onChange'] = (page) => {
        console.log(page);
        setCurrent(page);
    };
    const onChangeCategory = (newValue: string) => {
        console.log('====================================');
        console.log(newValue);
        console.log('====================================');
        setValue(newValue)
    }
    React.useEffect(() => {
        dispatch(fetchFiterProductsAsync({
            category: value,
            minPrice: 0,
            page: current
        }))
    }, [current, dispatch, value])
    return <div>
        <div >
            <span> Category</span>
            <TreeSelect
                style={{ width: '20%' }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={jewelryCategories}
                placeholder="Please select"
                treeDefaultExpandAll
                onChange={onChangeCategory}
            />
            <Button type='primary' className='bg-[#876553]'>RESET</Button>
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

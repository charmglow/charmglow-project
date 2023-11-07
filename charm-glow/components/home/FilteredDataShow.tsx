"use client"
import React from 'react';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';


const FilteredDataShow = () => {
    const [current, setCurrent] = React.useState(3);

    const onChange: PaginationProps['onChange'] = (page) => {
        console.log(page);
        setCurrent(page);
    };
    return (
        <div>
            <div className='justify-center items-center flex my-4'>

                <Pagination current={current} onChange={onChange} total={50} />
            </div>
        </div>
    );
};

export default FilteredDataShow;

/* eslint-disable jsx-a11y/alt-text */
"use client"
import { Card, Image, List } from "antd";
import React from "react";
const getAllProuducts = async () => {
    return fetch('https://dummyjson.com/products')
        .then(res => res.json())
}
const Products = () => {
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        getAllProuducts().then(res => setData(res.products))
    })
    return <div className="mt-5">
        <List
            grid={{ gutter: 0, column: 3 }}
            dataSource={data}
            renderItem={(item, index) => (
                <Card
                    hoverable
                    title={item?.title} className="m-2" key={index} cover={<Image height={300} className="object-scale-down" src={item?.thumbnail} />}
                ></Card>
            )}
        />
    </div>;
};

export default Products;

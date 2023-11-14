"use client"
import { notFound, useRouter } from 'next/navigation'
import NavBar from "@/components/navbar/NavBar";
import React from "react";
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Product } from '@/store/types';
import { fetchFiterProductsAsync, fetchProductByIdAsync } from '@/store/action/home/homeSlice';
import { Spin, Carousel, Image, Tabs, Typography, Descriptions, Button, message, Card, List, Badge } from 'antd';
import type { TabsProps } from 'antd';
import type { DescriptionsProps } from 'antd';
import { addToCart } from '@/store/action/auth/authSlice';
const ProductDetail = ({ params }: { params: { slug: string } }) => {
    const [data, setData] = React.useState<Product>();
    const [isNotfound, setIsNotFuond] = React.useState(false);
    const dispatch = useAppDispatch();
    const { filterProducts, loading } = useAppSelector(state => state.home);
    const { push } = useRouter();
    React.useEffect(() => {
        dispatch(fetchProductByIdAsync({
            id: params.slug
        })).unwrap().then((originalPromiseResult) => {
            setData(originalPromiseResult)
            dispatch(fetchFiterProductsAsync({
                category: originalPromiseResult?.category,
                minPrice: 0,
                page: 1
            }))
        }).catch((rejectedValueOrSerializedError) => {
            setIsNotFuond(true);
        });
    }, [dispatch, params.slug])
    const onChange = (key: string) => {
        console.log(key);
    };
    const items_desc: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Title',
            children: <strong>{data?.title}</strong>,
        },
        {
            key: '2',
            label: 'Price',
            children: <strong>${data?.finalPrice}</strong>,
        },
        {
            key: '3',
            label: 'Discount',
            children: <strong>{data?.discount}%</strong>,
        },
        {
            key: '4',
            label: 'Description',
            children: <Typography.Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
                {data?.description}
            </Typography.Paragraph>,
        },

        {
            key: '5',
            label: 'Category',
            children: <strong>{data?.category}</strong>,
        },
        {
            key: '6',
            children:
                <Button type="primary" className='bg-[#876553]' onClick={() => handleAddToCart()}>Add to Cart</Button>

        },
    ];

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Similar Products',
            children: <div>
                <List
                    className='m-0'
                    loading={loading}
                    grid={{
                        gutter: 0, xs: 1,
                        sm: 2,
                        md: 2,
                        lg: 3,
                        xl: 3,
                        xxl: 3,
                    }}
                    dataSource={filterProducts.products}

                    renderItem={(item: Product, index) => (
                        <Badge.Ribbon text={`${item.discount}% OFF`} className={`p-1 mx-2 ${item?.discount == 0 && "hidden"}`}>

                            <List.Item>

                                <Card
                                    hoverable
                                    className='m-2'
                                    title={item.title} key={index} cover={<Image height={300} className="object-scale-down" src={`${item.productImage[0]}`} alt={item?.description} />}
                                    actions={[
                                        <Button key={item._id} type="link" onClick={() => push(`/products/${item._id}`)}>view detail</Button>,
                                        <Button key={item._id} type="primary" className='bg-[#876553]' onClick={() => handleAddToCartSimilar({
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
                            </List.Item>
                        </Badge.Ribbon>
                    )}
                />
            </div>,
        },
        {
            key: '2',
            label: 'Latest Products',
            children: 'Content of Tab Pane 2',
        },
        {
            key: '3',
            label: 'Latest Sale',
            children: 'Content of Tab Pane 3',
        },
    ];
    const handleAddToCart = () => {
        message.success('Item added successfully')
        dispatch(addToCart({
            _id: data?._id,
            price: data?.finalPrice,
            productImage: data?.productImage
        }))
    }

    const handleAddToCartSimilar = (item: {

        _id: string,
        price: number,
        productImage: string[]

    }) => {

    }
    if (isNotfound) {
        notFound()
    }
    return (
        <div className='overflow-hidden'>
            <NavBar />
            {
                data ?
                    <div>
                        <div className='w-screen justify-center flex items-center border-b'>

                            <div style={{
                                width: '300px',
                                height: '300px',
                                marginTop: '10px'
                            }}>

                                <Carousel autoplay dotPosition='bottom' pauseOnHover={true} pauseOnDotsHover draggable >

                                    {data.productImage.map((image, index) =>
                                        <div key={index} style={{
                                            height: "300px",
                                            color: "#fff",
                                            lineHeight: "300px",
                                            textAlign: "center",
                                            background: "#364d79"
                                        }}>
                                            <Image src={image} alt="slide1" style={{
                                                width: '300px',
                                                height: '300px'
                                            }} />
                                        </div>)}
                                </Carousel>
                            </div>
                        </div>
                        <Descriptions title="Product Detail" layout="horizontal" items={items_desc} className='w-full p-4' />
                        <div className='w-screen'>
                            <Tabs defaultActiveKey="1" items={items} onChange={onChange} centered />
                        </div>
                    </div>
                    :
                    <div className='h-screen w-screen justify-center items-center flex'>

                        <Spin tip="Loading" size="large" >
                        </Spin>
                    </div>
            }
        </div>
    );
};

export default ProductDetail;

"use client"
import React from "react";
import { InputNumber, Table, Image, Popconfirm, message, Descriptions, Typography, Button } from 'antd';
import { changeCartItemQuantity, emptyCart, removeItemFromCart } from "@/store/action/auth/authSlice";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { axiosInstance } from "@/store/axios";
import { DeleteOutlined } from '@ant-design/icons'
const CheckoutDetail = () => {
    const { cart, user } = useAppSelector(state => state.auth)

    const dispatch = useAppDispatch();
    const handleChangeCartItemQuantity = (item: any) => {
        dispatch(changeCartItemQuantity(item));
    }
    const handleRemoveItemFromCart = (item: any) => {
        dispatch(removeItemFromCart({
            _id: item._id
        }));
        message.success('Item removed from cart successfully');
    }
    const handlePayNow = () => {
        let data = {
            cartItems: cart,
            userId: user?._id,
            name: user?.name
        };
        axiosInstance.post("/create-checkout-session", data).then((res) => {
            if (res.data.url) {
                dispatch(emptyCart())
                window.location.href = res.data.url;
            }
        }).catch(error => {
            console.log(error)
            message.error("stripe error")
        })
    }
    return <div className="px-4 py-10">
        <Typography.Title level={5}>
            Checkout Detail
        </Typography.Title>
        <Table
            pagination={false}
            columns={[
                {
                    title: 'Product',
                    dataIndex: "productImage",
                    render: (value, record) => {
                        return <Image src={value[0]} alt={record?.title} height={100} width={100} />
                    }
                },
                {
                    title: 'Price',
                    dataIndex: "price",
                    render: (value) => {
                        return <span>${value}</span>
                    }
                },
                {
                    title: 'Quantity',
                    dataIndex: "quantity",
                    render: (value, record) => {
                        return <InputNumber defaultValue={value} min={1} onChange={(value) => handleChangeCartItemQuantity({
                            _id: record._id,
                            quantity: value
                        })}></InputNumber>
                    }
                },
                {
                    title: 'Total',
                    dataIndex: "total",
                    render: (value) => {
                        return <span>${value.toFixed(2)}</span>
                    }
                },
                {
                    title: 'Action',
                    dataIndex: "action",
                    render: (value, record) => {
                        return (
                            <Popconfirm
                                title="Remove from cart"
                                description="Are you sure to remove this item?"
                                onConfirm={() => handleRemoveItemFromCart(record)}
                                okText="Yes"
                                cancelText="No"
                                okButtonProps={{
                                    style: {
                                        backgroundColor: 'red'
                                    }
                                }}

                            >
                                <DeleteOutlined style={{ fontSize: 20, color: 'red' }} />
                            </Popconfirm>

                        )
                    }
                }


            ]}
            dataSource={cart}
            rowKey="_id"
        />
        {
            cart.length > 0 &&
            <>
                <Descriptions
                    className="mt-2"
                    title="Summary"
                    bordered
                    column={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
                    items={[{
                        label: 'Subtotal',
                        children: `$${cart.reduce((prev, current) => {
                            return prev + current.total;
                        }, 0).toFixed(2)}`,
                    },
                    {
                        label: 'Shipping Cost',
                        children: '$15',
                    },
                    {
                        label: 'Total',
                        children: `$${(cart.reduce((prev, current) => {
                            return prev + current.total;
                        }, 0) + 15).toFixed(2)}`,
                    }]}

                />
                <div className="w-full items-center justify-end flex mt-4">
                    <Button type="primary" className='bg-[#876553]' onClick={() => handlePayNow()}>PAY NOW</Button>

                </div>
            </>
        }
    </div>;
};

export default CheckoutDetail;

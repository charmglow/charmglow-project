"use client"
import React from "react";
import { Badge, Drawer, InputNumber, Table, Image, Popconfirm, message, Descriptions, Button } from 'antd';
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { MdDeleteOutline } from 'react-icons/md'
import { changeCartItemQuantity, removeItemFromCart } from "@/store/action/auth/authSlice";
import { useRouter } from "next/navigation";
const AddToCart = () => {
    const [cartDrawerOpen, setCartDrawerOpen] = React.useState(false);
    const { cart } = useAppSelector(state => state.auth)
    const { user } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch();
    const handleChangeCartItemQuantity = (item: any) => {
        dispatch(changeCartItemQuantity(item));
    }
    const { push } = useRouter()
    const handleRemoveItemFromCart = (item: any) => {
        dispatch(removeItemFromCart({
            _id: item._id
        }));
        message.success('Item removed from cart successfully');
    }
    return (
        <div>
            <Badge count={cart.length} overflowCount={10} size='small' color='#876553'>
                <ShoppingCartOutlined onClick={() => setCartDrawerOpen(true)} style={{ fontSize: 25, padding: '0px 10px' }} className='cursor-pointer' />
            </Badge>
            <Drawer open={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} title="Your Cart" contentWrapperStyle={{ width: 600 }}>

                <Table
                    pagination={false}
                    columns={[
                        {
                            title: 'Product',
                            dataIndex: "productImage",
                            render: (value) => {
                                return <Image src={value[0]} alt={"Cart Item"} height={100} width={100} />
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

                                        <MdDeleteOutline style={{ fontSize: 20, color: 'red' }} />
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
                            {
                                user ?
                                    <Button type="primary" className='bg-[#876553]' onClick={() => push("/checkout")}>PROCEED TO CHECKOUT</Button>
                                    : <Button type="link" onClick={() => push("/login")}>LOGIN TO CHECKOUT</Button>
                            }
                        </div>
                    </>
                }
            </Drawer>
        </div>
    );
};

export default AddToCart;

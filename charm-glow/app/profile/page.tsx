"use client"
import withUserAuth from "@/components/user/auth/withUserAuth";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React from "react";
import { Avatar, message } from 'antd'
import { Descriptions, Button, Modal } from 'antd';
import type { DescriptionsProps } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Form, Input, Row, Col, Select } from 'antd';
import { FaMapMarkerAlt, FaCity, FaFlag, FaGlobe } from 'react-icons/fa';
import { updateShippingAddressAsync } from "@/store/action/auth/authSlice";
import Chart from "@/components/user/analytics/Chart";

const { Option } = Select;

const ProfilePage = () => {
    const { user } = useAppSelector(state => state.auth)
    const [open, setOpen] = React.useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };
    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Name',
            children: `${user?.name}`,
        },
        {
            key: '2',
            label: 'User ID',
            children: `${user?._id}`,
        },
        {
            key: '3',
            label: 'Email',
            children: `${user?.email}`,
        },
        {
            key: '4',
            label: 'Address',
            span: 2,
            children: <span className="uppercase">{user?.shippingAddress.street == "" ? "Not Updated" : `${user?.shippingAddress.street}, ${user?.shippingAddress.city}, ${user?.shippingAddress.state}, ${user?.shippingAddress.country}`}</span>,
        },
        {
            key: '5',
            children: (<Button type="primary" className="bg-[#876553]" onClick={showModal}>Edit</Button>),
        },
    ];
    const dispatch = useAppDispatch()
    const onFinish = async (values: any) => {
        console.log('Received values:', values);
        dispatch(updateShippingAddressAsync({
            shippingAddress: values
        })).unwrap().then((originalPromiseResult) => {
            message.success(originalPromiseResult?.message)
            setOpen(false);
        }).catch((rejectedValueOrSerializedError) => {

        });
    };

    return (
        <div>

            <div className="h-full mt-7">
                <div className="px-4">
                    <Avatar size={48} className="inline-block h-10 w-10 rounded-full ring-2 bg-[#876553]">U</Avatar>
                    <Descriptions layout="vertical" items={items} />
                </div>
                <Modal
                    title={`Update Profile`}
                    open={open}
                    onCancel={hideModal}
                    footer={null}
                    okButtonProps={{ disabled: true }}
                    cancelButtonProps={{ disabled: true }}
                    maskClosable={false}

                >
                    <Form
                        name="address-form"
                        onFinish={onFinish}
                        layout="vertical"
                        style={{ maxWidth: '500px', margin: 'auto' }}
                    >
                        <Row gutter={16}>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    name="street"
                                    label="Street"
                                    rules={[{ required: true, message: 'Please enter your street!' }]}
                                >
                                    <Input
                                        prefix={<FaMapMarkerAlt />}
                                        placeholder="Street"
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    name="city"
                                    label="City"
                                    rules={[{ required: true, message: 'Please enter your city!' }]}
                                >
                                    <Input prefix={<FaCity />} placeholder="City" size="large" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    name="state"
                                    label="State"
                                    rules={[{ required: true, message: 'Please enter your state!' }]}
                                >
                                    <Input prefix={<FaFlag />} placeholder="State" size="large" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    name="country"
                                    label="Country"
                                    rules={[{ required: true, message: 'Please enter your country!' }]}
                                >
                                    <Select
                                        suffixIcon={<FaGlobe />}
                                        placeholder="Select Country"
                                        size="large"
                                    >
                                        <Option value="usa">USA</Option>
                                        <Option value="canada">Canada</Option>
                                        {/* Add more countries as needed */}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item>
                            <button
                                type="submit"
                                className="bg-[#876553] text-white px-4 py-2 rounded"
                            >
                                UPDATE
                            </button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
            <Chart />
        </div>

    );
};

export default withUserAuth(ProfilePage);
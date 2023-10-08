/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { Form, Input, Button, Space, Col, Row, Card, ConfigProvider, Typography, Avatar, FormInstance, notification, message } from 'antd';
import theme from '@/theme/themeConfig';
import { AntDesignOutlined, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { useRef } from 'react';
import SubmitBtn from '../../admin/auth/SubmitBtn';
import React, { useEffect } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { loginAsync, registerAsync } from "@/store/action/auth/authSlice"
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const UserRegister = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useAppDispatch();
    const { loading, user, error } = useAppSelector(state => state.auth)
    const [form] = Form.useForm();
    const { push } = useRouter();


    const onFinish = async (values: {
        email: string,
        password: string,
        name: string
    }) => {
        console.log("values: ", values)
        try {
            await dispatch(registerAsync(values)).unwrap().then((originalPromiseResult) => {
                // handle result here

                messageApi.open({
                    key: "updatable",
                    type: 'success',
                    content: originalPromiseResult?.msgStatus,
                });

                push('/login');

            }).catch((rejectedValueOrSerializedError) => {
                //   handle error here
                messageApi.open({
                    key: "updatable",
                    type: 'error',
                    content: rejectedValueOrSerializedError,
                });
            });

            // user && push('admin/dashboard');
        } catch (error: any) {
            console.log(error);
        }
    };

    const formRef = useRef<FormInstance>(null);
    const { Title, Text } = Typography;
    const onReset = () => {
        formRef.current?.resetFields();
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    return (
        <ConfigProvider theme={theme}>
            {contextHolder}
            <Row style={{ display: 'flex', minHeight: '10vh', minWidth: '100vw', backgroundColor: '#876553', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Col xs={24} xl={8}>
                    <Title level={3} style={{ color: '#fff' }}>CHARM GLOW</Title>
                </Col>
            </Row>
            <Row style={{ display: 'flex', minHeight: '89.5vh', minWidth: '100vw', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'column' }} className='bg-gray-50'>
                <Col xs={24} xl={8}><Avatar
                    size={{ xs: 90, sm: 90, md: 90, lg: 90, xl: 90, xxl: 90 }}
                    icon={<AntDesignOutlined />}
                    src={"/charm-logo.png"}
                /></Col>
                <Col xs={24} xl={8}>
                    <Card title="USER SIGNUP" bordered={false} headStyle={{ backgroundColor: '#876553', color: '#fff', width: 300 }} size="default">
                        <Form form={form} name="validateOnly" layout="vertical" autoComplete="off" onFinish={onFinish}>
                            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter name' }, { min: 2, message: 'Enter valid name' }]}>
                                <Input prefix={<UserOutlined />} placeholder='Enter name' />
                            </Form.Item>
                            <Form.Item name="email" label="Email" rules={[
                                {
                                    required: true,
                                    message: 'Please enter your email!',
                                },
                                {
                                    type: 'email',
                                    message: 'Please enter a valid email address!',
                                },
                            ]}>
                                <Input prefix={<MailOutlined />} placeholder='Enter username or email' />
                            </Form.Item>
                            <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter password' }, { min: 8, message: 'Passowrd should be 8 characters longs' }]}>
                                <Input.Password prefix={<LockOutlined />} placeholder='Enter password' />
                            </Form.Item>
                            <Form.Item>
                                <Space>
                                    <SubmitBtn form={form} />
                                    <Button htmlType="reset">Reset</Button>
                                </Space>
                            </Form.Item>
                        </Form>
                        <div className='text-blue-600 cursor-pointer' onClick={() => push('/login')}>Already have an account? Login</div>
                    </Card>
                </Col>
            </Row>
        </ConfigProvider>
    );
};

export default UserRegister;

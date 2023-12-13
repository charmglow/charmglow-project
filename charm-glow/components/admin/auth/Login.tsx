/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { Form, Input, Button, Space, Col, Row, Card, ConfigProvider, Typography, Avatar } from 'antd';
import theme from '@/theme/themeConfig';
import { AntDesignOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import SubmitBtn from './SubmitBtn';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/hooks'
import { adminLoginAsync } from "@/store/action/auth/authSlice"
const Login = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const { push } = useRouter();
  const onFinish = async (values: {
    email: string,
    password: string,
  }) => {
    try {
      await dispatch(adminLoginAsync(values)).unwrap().then((originalPromiseResult) => {
        // handle result here
        console.log("originalPromiseResult", originalPromiseResult)
        if (originalPromiseResult) {
          push('admin/dashboard');

          alert(originalPromiseResult?.message)
        } else {
          alert("Invalid credientials")
        }
      }).catch((rejectedValueOrSerializedError) => {
        //   handle error here
        alert(rejectedValueOrSerializedError)
      });
    } catch (error: any) {
      console.log(error);
    }
  };
  const { Title } = Typography;
  return (
    <ConfigProvider theme={theme}>
      <Row style={{ display: 'flex', minHeight: '10vh', minWidth: '100vw', backgroundColor: '#876553', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Col xs={24} xl={8}>
          <Title level={3} style={{ color: '#fff' }}>CHARM GLOW</Title>
        </Col>
      </Row>
      <Row style={{ display: 'flex', minHeight: '89.5vh', minWidth: '100vw', backgroundColor: '#D1C7BB', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'column' }}>
        <Col xs={24} xl={8}><Avatar
          size={{ xs: 90, sm: 90, md: 90, lg: 90, xl: 90, xxl: 90 }}
          icon={<AntDesignOutlined />}
          src={"/charm-logo.png"}
        /></Col>
        <Col xs={24} xl={8}>
          <Card title="ADMIN LOGIN" bordered={false} headStyle={{ backgroundColor: '#876553', color: '#fff', width: 300 }} size="default">
            <Form form={form} name="validateOnly" layout="vertical" autoComplete="off" onFinish={onFinish}>
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
              <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter password' }]}>
                <Input.Password prefix={<LockOutlined />} placeholder='Enter password' />
              </Form.Item>
              <Form.Item>
                <Space>
                  <SubmitBtn form={form} />
                  <Button htmlType="reset">Reset</Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </ConfigProvider>
  );
};

export default Login;
'use client'
import { Form, Input, Button, Space, Col, Row, Card, ConfigProvider, Typography, Avatar, FormInstance } from 'antd';
import theme from '@/theme/themeConfig';
import { AntDesignOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useRef } from 'react';
import SubmitBtn from './SubmitBtn';
const Login = () => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log('Received values:', values);
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
      <Row style={{ display: 'flex', minHeight: '10vh', minWidth: '100vw', backgroundColor: '#876553', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Col xs={24} xl={8}>
          <Title level={3} style={{ color: '#fff' }}>CHARM GLOW</Title>
        </Col>
      </Row>
      <Row style={{ display: 'flex', minHeight: '89.5vh', minWidth: '100vw', backgroundColor: '#D1C7BB', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'column' }}>
        <Col xs={24} xl={8}><Avatar
          size={{ xs: 90, sm: 90, md: 90, lg: 90, xl: 90, xxl: 90 }}
          icon={<AntDesignOutlined />}
          src={"https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg"}
        /></Col>
        <Col xs={24} xl={8}>
          <Card title="ADMIN LOGIN" bordered={false} headStyle={{ backgroundColor: '#876553', color: '#fff', width: 300 }} size="default">
            <Form form={form} name="validateOnly" layout="vertical" autoComplete="off">
              <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter email' }]}>
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

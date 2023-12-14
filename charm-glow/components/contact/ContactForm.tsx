"use client"
import React from "react";
import { Form, Input, Button, Row, Col, Typography } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const ContactForm = () => {
    const [form] = Form.useForm();
    const onFinish = (values: any) => {
        console.log('Received values:', values);
    };

    const handleReset = () => {
        form.resetFields();
    };
    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }} className="mx-4">
            <Col xs={24} sm={20} md={16} lg={12} xl={10}>
                <Title level={2} style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    Contact Us
                </Title>
                <Paragraph style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    Feel free to reach out to us with any questions or concerns.
                </Paragraph>
                <Form name="contact-form" onFinish={onFinish}>
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Please enter your name!' }]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Name"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Please enter your email!' },
                            { type: 'email', message: 'Invalid email address!' },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="Email"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="message"
                        rules={[{ required: true, message: 'Please enter your message!' }]}
                    >
                        <Input.TextArea
                            placeholder="Message"
                            rows={4}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" className="bg-[#876553]">
                            Submit
                        </Button>
                        <Button htmlType="reset" onClick={handleReset} size="large" style={{ marginLeft: '8px' }}>
                            Reset
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default ContactForm;

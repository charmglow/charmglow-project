"use client"
import { Layout, Row, Col } from 'antd';
import { GithubOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Footer } = Layout;

const AppFooter = () => {
    return (
        <Footer className="bg-[#70513d] text-white">
            <Row justify="space-around" align="middle">
                <Col xs={24} sm={12} md={8} lg={6} className="text-center py-4">
                    <div>
                        <Link href="/">
                            <span className="text-lg font-bold text-white hover:text-blue-500">Charm Glow</span>
                        </Link>
                    </div>
                    <div>
                        <Link href="/contactus">
                            <span className="text-sm hover:text-blue-500">Contact Us</span>
                        </Link>
                    </div>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} className="text-center py-4">
                    <h2 className="text-lg font-bold text-blue-500">Links</h2>
                    <div>
                        <Link href="/">
                            <span className="text-sm hover:text-blue-500">Home</span>
                        </Link>
                    </div>
                    <div>
                        <Link href="/products">
                            <span className="text-sm hover:text-blue-500">Products</span>
                        </Link>
                    </div>
                    <div>
                        <Link href="/register">
                            <span className="text-sm hover:text-blue-500">Register</span>
                        </Link>
                    </div>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} className="text-center py-4">
                    <h2 className="text-lg font-bold text-blue-500">Connect</h2>
                    <div>
                        <a
                            href="https://github.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm hover:text-blue-500"
                        >
                            <GithubOutlined /> GitHub
                        </a>
                    </div>
                    <div>
                        <a
                            href="https://twitter.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm hover:text-blue-500"
                        >
                            <TwitterOutlined /> Twitter
                        </a>
                    </div>
                    <div>
                        <a
                            href="https://www.linkedin.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm hover:text-blue-500"
                        >
                            <LinkedinOutlined /> LinkedIn
                        </a>
                    </div>
                </Col>
            </Row>
            <div className="text-center py-2 text-sm">
                Charm Glow © {new Date().getFullYear()}
            </div>
        </Footer>
    );
};

export default AppFooter;

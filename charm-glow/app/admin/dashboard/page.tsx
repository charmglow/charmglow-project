'use client'
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    SettingOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, ConfigProvider, Avatar, Button, Dropdown, Space, Typography } from 'antd';
import { AntDesignOutlined, LogoutOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useState } from 'react';
import theme from '@/theme/themeConfig';
const { Header, Content, Footer, Sider } = Layout;
import Link from 'next/link';

const { Title, Text } = Typography;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Dashboard', '1', <PieChartOutlined />),
    getItem('Customers', '2', <DesktopOutlined />),
    getItem('Orders', 'sub1', <UserOutlined />),
    getItem('Products', '4', <DesktopOutlined />),
    getItem('Category', 'sub2', <TeamOutlined />, [getItem('Necklace', '6'), getItem('Rings', '8')]),
    getItem('Setting', '9', <FileOutlined />),
];

const itemsDropdown: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <Space style={{ padding: '5px 0px' }}>
                <UserOutlined />
                <div>
                    Account
                </div>
            </Space>
        ),
    },
    {
        key: '2',
        label: (
            <Space style={{ padding: '5px 0px' }}>
                <SettingOutlined />
                <div>
                    Setting
                </div>
            </Space>
        ),
    },
    {
        key: '3',
        label: (
            <Link href="/admin" prefetch={false} className='text-red-600'>
                <Space style={{ padding: '5px 0px' }}>
                    <LogoutOutlined color='red' />
                    <Text type="danger" style={{ paddingLeft: 10 }}>Logout</Text>
                </Space>
            </Link>
        ),
    },
];
const DashboardPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(true);
    return (
        <ConfigProvider theme={theme}>
            <Layout style={{ minHeight: '100vh', margin: 0 }}>
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{ backgroundClip: 'red' }} theme='light'>
                    <div className="demo-logo-vertical" />
                    <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={items} />
                </Sider>
                <Layout>
                    <Header style={{ padding: '0px 20px' }} >
                        <Space style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Title level={2} italic>Welcome Admin</Title>
                            <Dropdown menu={{ items: itemsDropdown }} placement="bottom" arrow>
                                <Avatar
                                    size={{ xs: 24, sm: 30, md: 35, lg: 48, xl: 48, xxl: 48 }}
                                    icon={<AntDesignOutlined />}
                                    src={"https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg"}
                                />
                            </Dropdown>

                        </Space>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};

export default DashboardPage;
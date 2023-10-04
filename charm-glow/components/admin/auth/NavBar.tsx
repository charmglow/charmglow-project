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
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { redirect, useRouter } from 'next/navigation'
import { logout } from '@/store/action/auth/authSlice';
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
    getItem('Dashboard', '/dashboard', <PieChartOutlined />),
    getItem('Customers', '/dashboard/customers', <DesktopOutlined />),
    getItem('Orders', '/dashboard/orders', <UserOutlined />),
    getItem('Products', '/dashboard/products', <DesktopOutlined />),
    getItem('Category', '/dashboard/category', <TeamOutlined />, [getItem('Necklace', '6'), getItem('Rings', '8')]),
    getItem('Setting', '/dashboard/setting', <FileOutlined />),
];


const NavBar = ({ children }: { children: React.ReactNode }) => {
    const [collapsed, setCollapsed] = useState(true);
    const { user } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const router = useRouter();
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
                <Link href="/admin" prefetch={false} className='text-red-600' onClick={() => dispatch(logout())}>
                    <Space style={{ padding: '5px 0px' }}>
                        <LogoutOutlined color='red' />
                        <Text type="danger" style={{ paddingLeft: 10 }}>Logout</Text>
                    </Space>
                </Link>
            ),
        },
    ];
    return (
        <ConfigProvider theme={theme}>
            <Layout style={{ minHeight: '100vh', margin: 0 }}>
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{ backgroundClip: 'red' }} theme='light'>
                    <div className="demo-logo-vertical" />
                    <Menu theme="light" defaultSelectedKeys={['/dashboard']} mode="inline" items={items} onClick={({ item, key, keyPath, domEvent }) => router.replace(`/admin${key}`)} />
                </Sider>
                <Layout>
                    <Header style={{ padding: '0px 20px' }} >
                        <Space style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Title level={2} italic>Welcome {user?.name} Admin</Title>
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
                        <div>{children}</div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>©2023 Created by Charm Glow</Footer>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};

export default NavBar;
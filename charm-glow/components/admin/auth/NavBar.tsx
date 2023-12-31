'use client'
import {
    PieChartOutlined,
    TeamOutlined,  // Ant Design icon for users
    ShoppingCartOutlined,  // Ant Design icon for shopping cart
    SettingOutlined, // Ant Design icon for settings
    AppstoreOutlined,  // Ant Design icon for box (assuming it represents products)
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, ConfigProvider, Avatar, Dropdown, Space, Typography } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useState } from 'react';
import theme from '@/theme/themeConfig';
const { Header, Content, Footer, Sider } = Layout;
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation'
import { adminLogout } from '@/store/action/auth/authSlice';

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
    getItem('Customers', '/dashboard/customers', <TeamOutlined />),
    getItem('Orders', '/dashboard/orders', <ShoppingCartOutlined />),
    getItem('Products', '/dashboard/products', <AppstoreOutlined className="text-3xl" />),
    getItem('Setting', '/dashboard/settings', <SettingOutlined />),
];


const NavBar = ({ children }: { children: React.ReactNode }) => {
    const [collapsed, setCollapsed] = useState(true);
    const { admin } = useAppSelector(state => state.auth);
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
                <Link href="/admin" prefetch={false} className='text-red-600' onClick={() => dispatch(adminLogout())}>
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
                            <Dropdown menu={{ items: itemsDropdown }} placement="bottom" arrow>
                                <Avatar
                                    size={{ xs: 24, sm: 30, md: 35, lg: 48, xl: 48, xxl: 48 }}
                                    icon={<UserOutlined />}
                                />
                            </Dropdown>

                        </Space>
                    </Header>
                    <Content style={{ margin: '10px 10px' }} className='bg-slate-50'>
                        <div>{children}</div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}></Footer>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};

export default NavBar;
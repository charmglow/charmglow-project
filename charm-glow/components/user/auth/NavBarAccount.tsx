'use client'
import {
    LogoutOutlined,
    UserOutlined,
    HomeOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';

import type { MenuProps } from 'antd';
import { Layout, Menu, ConfigProvider, Avatar, Dropdown, Space, Typography } from 'antd';
import { useState } from 'react';
import theme from '@/theme/themeConfig';
const { Header, Content, Footer, Sider } = Layout;
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link';
import { logout } from '@/store/action/auth/authSlice';
const { Title } = Typography;

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
    getItem('Profile', '/profile', <UserOutlined />),
    getItem('Orders', '/profile/orders', <ShoppingCartOutlined />),
    getItem('Home', '/', <HomeOutlined />),
    getItem('Logout', '/logout', <LogoutOutlined />)
];

const NavBarAccount = ({ children }: { children: React.ReactNode }) => {
    const [collapsed, setCollapsed] = useState(true);
    const { user } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const itemsDropdown: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Link href="/profile">
                    <Space style={{ padding: '5px 0px' }}>
                        <UserOutlined />
                        <div>
                            Account
                        </div>
                    </Space>
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link href="/login" prefetch={false} className='text-red-600' onClick={() => console.log("Logout")}>
                    <Space style={{ padding: '5px 0px' }}>
                        <LogoutOutlined color='red' />
                        <div>
                            Logout
                        </div>
                    </Space>
                </Link>
            ),
        },
    ];
    return (
        <ConfigProvider theme={theme}>
            <Layout style={{ minHeight: '100vh', margin: 0 }} className='bg-white'>
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{ backgroundClip: 'red' }} theme='light'>
                    <div className="demo-logo-vertical" />
                    <Menu theme="light" defaultSelectedKeys={[pathname]} mode="inline" items={items} onClick={({ key, }) => {
                        if (key == "/logout") {
                            dispatch(logout())
                            router.replace(`/`)
                        } else {
                            router.replace(`${key}`);
                        }
                    }} className='h-full' />
                </Sider>
                <Layout className='bg-white'>
                    <Header style={{ padding: '0px 20px' }} className='bg-slate-50'>
                        <Space style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Title level={2} italic>Welcome {user?.name}</Title>
                            <Dropdown menu={{ items: itemsDropdown }} placement="bottom" arrow >
                                <Avatar size={{ xs: 24, sm: 30, md: 35, lg: 48, xl: 48, xxl: 48 }}
                                    className="inline-block h-10 w-10 rounded-full ring-2 bg-[#876553] uppercase">{user?.name[0]}</Avatar>

                            </Dropdown>
                        </Space>
                    </Header>
                    <Content style={{ margin: '0 16px' }} className='bg-white'>
                        <div className='bg-white'>{children}</div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}></Footer>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};

export default NavBarAccount;
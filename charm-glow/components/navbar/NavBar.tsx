"use client"
import React from 'react';
import { Menu, ConfigProvider, Drawer, Space, Avatar, Divider, Badge, Dropdown } from 'antd';
import { AntDesignOutlined, AppstoreOutlined, MailOutlined, MenuOutlined, SearchOutlined, SettingOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/action/auth/authSlice';
import { usePathname, useRouter } from 'next/navigation';
import AddToCart from '../home/AddToCart';
const items: MenuProps['items'] = [

    {
        label: 'Home',
        key: '/',
    },
    {
        label: 'Products',
        key: '/products',
    },
    {
        label: 'Contact Us',
        key: '/contactus',
    },
];
const NavBar = () => {
    const pathname = usePathname();
    const [openMenu, setOpenMenu] = useState(false);
    const { push } = useRouter();
    const onClick: MenuProps['onClick'] = (e) => {
        push(e.key)
    };
    const { user } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch();
    const handleLogout = () => {
        dispatch(logout());
        push('/')
    }
    const profileItems: MenuProps['items'] = [
        {
            key: '/profile',
            label: (
                <div onClick={() => push('/profile')}>
                    Profile
                </div>
            ),
        },
        {
            key: '/',
            label: (
                <div onClick={handleLogout}>
                    Logout
                </div>
            ),
        },
    ];
    return (
        <div className="App shadow-sm py-2">
            <span className='deskmenu' style={{ border: 1, padding: 5 }}>
                <div style={{ width: '100%' }}>

                    <Avatar
                        size={{ xs: 40, sm: 40, md: 40, lg: 40, xl: 40, xxl: 40 }}
                        icon={<AntDesignOutlined />}
                        src={"/charm-logo.png"}
                        className='logo cursor-pointer'
                        onClick={() => push("/")}
                    />
                    <div className='drawermenu flex justify-between'>

                        <MenuOutlined onClick={() => setOpenMenu(true)} />
                        <Avatar
                            size={{ xs: 40, sm: 40, md: 40, lg: 40, xl: 40, xxl: 40 }}
                            icon={<AntDesignOutlined />}
                            src={"/charm-logo.png"}
                            onClick={() => push("/")}
                            className='cursor-pointer'
                        />
                    </div>
                </div>
                <Menu onClick={onClick} selectedKeys={[pathname]} mode="horizontal" items={items} style={{ borderWidth: 0, width: '100%' }} className='menuhide' />
                <Space style={{ width: '100%', justifyContent: 'end' }} className='pr-4'>

                    {
                        user ?
                            <Dropdown menu={{ items: profileItems }} placement="bottomRight" arrow>
                                <Avatar className='cursor-pointer uppercase'>{user?.name[0]}</Avatar>
                            </Dropdown>
                            : <div className='cursor-pointer text-blue-600' onClick={() => push('/login')}>LOGIN</div>
                    }
                    <AddToCart></AddToCart>
                </Space>
            </span>

            <Drawer open={openMenu} onClose={() => setOpenMenu(false)} closable={true}>
                <Menu onClick={onClick} selectedKeys={[pathname]} mode="inline" items={items} />
            </Drawer>
        </div>
    );
};

export default NavBar;

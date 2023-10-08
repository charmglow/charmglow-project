"use client"
import React from 'react';
import { Menu, ConfigProvider, Drawer, Space, Avatar, Divider, Badge, Dropdown } from 'antd';
import { AntDesignOutlined, AppstoreOutlined, MailOutlined, MenuOutlined, SearchOutlined, SettingOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/action/auth/authSlice';
const items: MenuProps['items'] = [

    {
        label: 'Home',
        key: 'mail',
    },
    {
        label: 'Products',
        key: 'app',
    },
    {
        label: 'Contact Us',
        key: 'SubMenu',
    },
];

const NavBar = () => {
    const [current, setCurrent] = useState('mail');
    const [openMenu, setOpenMenu] = useState(false);
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    const { push } = useRouter();
    const { user } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch();
    const handleLogout = () => {
        dispatch(logout());
        push('/')
    }
    const profileItems: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <div onClick={() => push('/profile')}>
                    Profile
                </div>
            ),
        },
        {
            key: '2',
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
                <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{ borderWidth: 0, width: '100%' }} className='menuhide' />
                <Space style={{ width: '100%', justifyContent: 'end' }} className='pr-4'>

                    {
                        user ?
                            <Dropdown menu={{ items: profileItems }} placement="bottomRight" arrow>
                                <Avatar className='cursor-pointer'>U</Avatar>
                            </Dropdown>
                            : <div className='cursor-pointer text-blue-600' onClick={() => push('/login')}>LOGIN</div>
                    }
                    <Badge count={1} overflowCount={10} size='small' color='#876553'>
                        <ShoppingCartOutlined style={{ fontSize: 25, padding: '0px 10px' }} className='cursor-pointer' />
                    </Badge>
                </Space>
            </span>

            <Drawer open={openMenu} onClose={() => setOpenMenu(false)} closable={true}>
                <Menu onClick={onClick} selectedKeys={[current]} mode="inline" items={items} />
            </Drawer>
        </div>
    );
};

export default NavBar;

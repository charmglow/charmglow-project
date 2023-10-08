'use client'
import React from 'react';
import { Menu, Drawer, Space, Avatar, Divider } from 'antd';
import { AntDesignOutlined, MenuOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useState } from 'react';
import './globals.css';
import NavBar from '@/components/navbar/NavBar';
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

const HomePage = () => {
  const [current, setCurrent] = useState('mail');
  const [openMenu, setOpenMenu] = useState(false);
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (

    <div className="App">
      <NavBar />
      <h1>Home Page</h1>
    </div>
  );
}

export default HomePage;



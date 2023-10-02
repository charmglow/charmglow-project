'use client'
import React from 'react';
import { Menu, ConfigProvider, Drawer, Space, Avatar, Divider } from 'antd';
import { AntDesignOutlined, AppstoreOutlined, MailOutlined, MenuOutlined, SearchOutlined, SettingOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useState } from 'react';
import theme from '../theme/themeConfig';
import './globals.css';
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
    <ConfigProvider theme={theme}>
      <div className="App">
        <span className='deskmenu'>
          <Avatar
            style={{ marginTop: 10 }}
            size={{ xs: 40, sm: 40, md: 40, lg: 40, xl: 40, xxl: 40 }}
            icon={<AntDesignOutlined />}
            src={"https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg"}
          />
          <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{ width: '20vw' }} />
          <Space>
            <SearchOutlined style={{ fontSize: 20, padding: '0px 10px' }} />
            <UserOutlined style={{ fontSize: 20 }} />
            <ShoppingCartOutlined style={{ fontSize: 20, padding: '0px 10px' }} />
          </Space>
        </span>
        <div style={{ width: '100vw', padding: '0px 20px' }} className='drawermenu'>

          <MenuOutlined onClick={() => setOpenMenu(true)} />
        </div>
        <Drawer open={openMenu} onClose={() => setOpenMenu(false)} closable={true}>
          <Menu onClick={onClick} selectedKeys={[current]} mode="inline" items={items} />
        </Drawer>
      </div>
    </ConfigProvider>
  );
}

export default HomePage;



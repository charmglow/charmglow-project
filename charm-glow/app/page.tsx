'use client'
import React from 'react';
import './globals.css';
import NavBar from '@/components/navbar/NavBar';
import Slider from '@/components/home/Slider';
import Products from '@/components/home/Products';
import Footer from '@/components/footer/Footer';
import { Badge, Layout, Card, Flex, Image, List, Pagination, Typography } from 'antd';

const HomePage = () => {
  return (

    <div className="App">
      <NavBar />
      <Slider />
      <div className=' bg-gray-50'>
        <Flex justify='center' align='center' vertical className='py-3'>
          <Typography.Title level={3} className='mx-2 my-3' >
            Latest Products
          </Typography.Title>
          <Typography.Paragraph className='mx-2 my-3 w-[60%]'>
            <center>
              Discover unparalleled innovation with our Latest Products collection. Elevate your experience with cutting-edge technology, trendsetting designs, and unmatched quality. Explore now for the epitome of modern excellence.
            </center>
          </Typography.Paragraph>
        </Flex>
        <Products />
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;



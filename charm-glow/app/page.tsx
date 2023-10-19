'use client'
import React from 'react';
import './globals.css';
import NavBar from '@/components/navbar/NavBar';
import Slider from '@/components/home/Slider';
import Products from '@/components/home/Products';


const HomePage = () => {
  return (

    <div className="App">
      <NavBar />
      <Slider />
      <Products />
    </div>
  );
}

export default HomePage;



'use client'
import React from 'react';
import './globals.css';
import NavBar from '@/components/navbar/NavBar';
import Slider from '@/components/home/Slider';


const HomePage = () => {
  return (

    <div className="App">
      <NavBar />
      <Slider />
      <h1>Home Page</h1>
    </div>
  );
}

export default HomePage;



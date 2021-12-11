/** @format */

import React, { useState, useEffect } from 'react';

// Components
import NewProducts from '../components/home/NewProducts';
import BestSellers from '../components/home/BestSellers';

// CSS
import './home.scss';

const Home = () => {
  return (
    <div className='home'>
      <div className='home__container'>
        <div className='home__banner'></div>
        <div className='home__newProduct'>
          <h1>New Products</h1>
        </div>
        <NewProducts />
        <div className='home__newProduct'>
          <h1>Most Popular Products</h1>
        </div>
        <BestSellers />
      </div>
    </div>
  );
};

export default Home;

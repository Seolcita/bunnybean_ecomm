/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';

// Components
import CategoryList from '../components/categories/CategoryList';
import SubCategoryList from '../components/subCategories/SubCategoryList';

// CSS & Images
import './home.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import carousel1 from '../images/carousel1.png';
import carousel2 from '../images/carousel2.png';
import carousel3 from '../images/carousel3.png';

const Home = () => {
  return (
    <div className='home'>
      <div className='home__container'>
        <div className='home__banner'>
          <div className='carousel'>
            <Carousel
              showArrows={true}
              autoPlay
              infiniteLoop
              stopOnHover
              width={1000}
              showThumbs={false}
            >
              <div className='carousel__container'>
                <Link to='/category/camera'>
                  <img src={carousel1} className='carousel__img' />
                </Link>
              </div>
              <div className='carousel__container'>
                <Link to='/category/appliance'>
                  <img src={carousel2} className='carousel__img' />
                </Link>
              </div>
              <div className='carousel__container'>
                <Link to='/subcategory/laptop'>
                  <img src={carousel3} className='carousel__img' />
                </Link>
              </div>
            </Carousel>
          </div>
        </div>

        <CategoryList />

        <hr className='home__hr' />
        <h3 className='home__title'>Sub Categories</h3>
        <SubCategoryList />
      </div>
    </div>
  );
};

export default Home;

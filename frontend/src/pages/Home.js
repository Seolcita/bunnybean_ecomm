/** @format */

import React from 'react';
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
          <div className='productCard__carousel'>
            <Carousel
              showArrows={true}
              autoPlay
              infiniteLoop
              stopOnHover
              width={1000}
              showThumbs={false}
            >
              <div>
                <img src={carousel1} />
              </div>
              <div>
                <img src={carousel2} />
              </div>
              <div>
                <img src={carousel3} />
              </div>
            </Carousel>
          </div>
        </div>

        <CategoryList />
        <SubCategoryList />
      </div>
    </div>
  );
};

export default Home;

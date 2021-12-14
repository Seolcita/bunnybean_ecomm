/** @format */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';

// Components
import ProductInfo from './ProductInfo';

// CSS & MUI Icons
import './productCard.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ShoppingBasket, Favorite } from '@mui/icons-material';
import DefaultImg from '../../images/productDefault.png';

function ProductCard(props) {
  const { product } = props;
  const { title, description, price, category, subs, slug, images } = product;
  const [show, setShow] = useState(true);
  const priceDecimal = Number(price).toFixed(2);

  return (
    <div className='productCard'>
      <div className='productCard__left'>
        <div className='productCard__carousel'>
          {images && images.length ? (
            <Carousel showArrows={true} autoPlay infiniteLoop width={715}>
              {images && images.map(i => <img src={i.url} key={i.public_id} />)}
            </Carousel>
          ) : (
            <img src={DefaultImg} />
          )}
        </div>
      </div>
      <div className='productCard__right'>
        <h1>{title}</h1>
        <div>$ {priceDecimal}</div>
        <div className='productInfo__desc'>DESC: {description}</div>
        <button className='productInfo__show' onClick={() => setShow(!show)}>
          {show ? 'Show Less' : 'Show More'}
        </button>
        <div className='productCard__info'>
          <ProductInfo product={product} show={show} setShow={setShow} />
        </div>
        <div className='productCard__btns'>
          <button className='productCard__btn cart'>
            <ShoppingBasket className='productCard__icon' />
            Add to Cart
          </button>
          <button className='productCard__btn wish'>
            <Link to='/'>
              <Favorite className='productCard__icon self' />
              Add To Wish List
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

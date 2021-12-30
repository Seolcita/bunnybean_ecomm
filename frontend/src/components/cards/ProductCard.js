/** @format */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

// Components
import ProductInfo from './ProductInfo';

// CSS & MUI Icons
import './productCard.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {
  ShoppingBasket,
  Favorite,
  KeyboardArrowDown,
} from '@mui/icons-material';
import DefaultImg from '../../images/productDefault.png';

function ProductCard(props) {
  const { product } = props;
  const { title, description, price, category, subs, slug, images } = product;
  const [show, setShow] = useState(false);
  const priceDecimal = Number(price).toFixed(2);
  const marginBottom = show ? 8 : -11; // CSS Purpose

  const { user, cart } = useSelector(state => ({ ...state }));
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // Create Cart Array
    let cart = [];

    if (typeof window !== 'undefined') {
      // *** LOCAL STORAGE ***
      // 1. Get cart items from LS
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }

      // 2. Add item to 'cart' array
      cart.push({ ...product, count: 1 });

      // 3. Remove duplicates (if any)
      let unique = _.uniqWith(cart, _.isEqual);
      console.log('unique', unique);

      // Save the cart to LS
      localStorage.setItem('cart', JSON.stringify(unique));

      // *** REDUX ***
      // Add item in Redux
      dispatch({
        type: 'ADD_TO_CART',
        payload: unique,
      });

      // Set side drawer visible
      dispatch({
        type: 'SET_VISIBLE',
        payload: true,
      });
    }
  };

  return (
    <div className='productCard' style={{ margin: `0 0 ${marginBottom}rem` }}>
      <div className='productCard__left'>
        <div className='productCard__carousel'>
          {images && images.length ? (
            <Carousel showArrows={true} autoPlay infiniteLoop width={500}>
              {images && images.map(i => <img src={i.url} key={i.public_id} />)}
            </Carousel>
          ) : (
            <img src={DefaultImg} />
          )}
        </div>
      </div>
      <div className='productCard__right'>
        <h1>{title}</h1>
        <h3>$ {priceDecimal}</h3>
        <p className='productInfo__desc'>{description}</p>
        <a className='productInfo__show' onClick={() => setShow(!show)}>
          {show ? 'Close Detail Info ▲' : 'Show More Info ▼'}
        </a>
        <div className='productCard__info'>
          <ProductInfo product={product} show={show} setShow={setShow} />
        </div>
        <div className='productCard__btns'>
          <button
            className='productCard__btn cart'
            onClick={() => handleAddToCart()}
          >
            <ShoppingBasket className='productCard__icon' />
            Add to Cart
          </button>
          {/* <button className='productCard__btn wish'>
            <Link to='/'>
              <Favorite className='productCard__icon self' />
              Add To Wish List
            </Link>
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

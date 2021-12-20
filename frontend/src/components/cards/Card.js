/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';

// CSS
import './card.scss';

function Card(props) {
  const { product } = props;
  const { _id, images, title, price, slug } = product;

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
      dispatch({
        type: 'ADD_TO_CART',
        payload: unique,
      });
    }
  };

  //console.log('IMAGE', images);
  return (
    <div className='card' key={_id}>
      <div className='card__header'>
        <Link to={`/product/${slug}`}>
          <div
            className='card__header--img'
            style={{ backgroundImage: `url(${images[0].url})` }}
          ></div>
        </Link>
      </div>
      <div className='card__body'>
        <div className='card__info'>
          <h4 className='card__title'>{title}</h4>
          <h5 className='card__price'>${price.toFixed(2)}</h5>
        </div>
        <div className='card__btns'>
          <button className='card__btn' onClick={() => handleAddToCart()}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;

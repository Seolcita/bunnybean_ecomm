/** @format */

import React from 'react';
import { Link } from 'react-router-dom';

// CSS
import './card.scss';

function Card(props) {
  const { _id, images, title, price, slug } = props.product;

  console.log('IMAGE', images);
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
          <button className='card__btn'>Add to cart</button>
        </div>
      </div>
    </div>
  );
}

export default Card;

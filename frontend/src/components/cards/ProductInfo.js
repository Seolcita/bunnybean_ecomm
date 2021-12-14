/** @format */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// CSS
import './productInfo.scss';

function ProductInfo(props) {
  const { product, child, show, setShow } = props;
  const { price, description, category, subs, color, brand, quantity, sold } =
    product;

  const display = show ? 'none' : 'block';

  return (
    <div className='productInfo' style={{ display: `${display}` }}>
      {/* {JSON.stringify(product)} */}

      <div className='productInfo__detail'>
        {category && (
          <div className='productInfo__list'>
            <div className='productInfo__title'>Category</div>
            <Link
              to={`/category/${category.slug}`}
              className='productInfo__info'
            >
              {category.name}
            </Link>
          </div>
        )}
        {subs && (
          <div className='productInfo__list'>
            <div className='productInfo__title'>Sub Category</div>
            <div className='productInfo__info'>
              <Link to={`/subcategory/${subs.slug}`}>{subs[0].name}</Link>
            </div>
          </div>
        )}
        {brand && (
          <div className='productInfo__list'>
            <div className='productInfo__title'>Brand</div>
            <div className='productInfo__info'>{brand}</div>
          </div>
        )}
        {color && (
          <div className='productInfo__list'>
            <div className='productInfo__title'>Color</div>
            <div className='productInfo__info'>{color}</div>
          </div>
        )}
        {quantity && (
          <div className='productInfo__list'>
            <div className='productInfo__title'>Quantity</div>
            <div className='productInfo__info'>{quantity}</div>
          </div>
        )}
        {sold && (
          <div className='productInfo__list'>
            <div className='productInfo__title'>Sold</div>
            <div className='productInfo__info'>{sold}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductInfo;

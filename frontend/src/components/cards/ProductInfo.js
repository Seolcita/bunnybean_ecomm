/** @format */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// CSS
import './productInfo.scss';

function ProductInfo(props) {
  const { product, child, show, setShow } = props;
  const { category, subs, color, brand, quantity, sold, width, height, depth } =
    product;

  const display = show ? 'block' : 'none';

  return (
    <div className='productInfo' style={{ display: `${display}` }}>
      {/* {JSON.stringify(product)} */}

      <div className='productInfo__detail'>
        <div className='productInfo__list'>
          <div className='productInfo__title'>Category</div>
          {category && (
            <Link
              to={`/category/${category.slug}`}
              className='productInfo__info'
            >
              {category.name}
            </Link>
          )}
        </div>

        <div className='productInfo__list'>
          <div className='productInfo__title'>Sub Category</div>
          <div className='productInfo__info'>
            {subs && (
              <Link to={`/subcategory/${subs.slug}`}>{subs[0].name}</Link>
            )}
          </div>
        </div>

        <div className='productInfo__list'>
          <div className='productInfo__title'>Brand</div>
          {brand && <div className='productInfo__info'>{brand}</div>}
        </div>
        <div className='productInfo__list'>
          <div className='productInfo__title'>Color</div>
          {color && <div className='productInfo__info'>{color}</div>}
        </div>
        <div className='productInfo__list'>
          <div className='productInfo__title'>Dimensions(W x H x D)</div>
          {width && height && depth && (
            <div className='productInfo__info'>
              {width}″ x {height}″ x {depth}″
            </div>
          )}
        </div>

        <div className='productInfo__list'>
          <div className='productInfo__title'>Quantity</div>
          {quantity && <div className='productInfo__info'>{quantity}</div>}
        </div>
        <div className='productInfo__list'>
          <div className='productInfo__title'>Sold</div>
          {sold && <div className='productInfo__info'>{sold}</div>}
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;

/** @format */

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Connections - Functions
import { getProductsByCount } from '../connections/product';

// Components
import Card from '../components/cards/Card';

// CSS
import './shop.scss';

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='shop'>
      <div className='shop__container'>
        <div className='shop__left'>left</div>
        <div className='shop__right'>
          {products.length < 1 && <h1>No Product Found</h1>}
          {/* <h1>Shop</h1> */}
          {/* {JSON.stringify(products)} */}
          {products.map(prod => (
            <Card product={prod} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shop;
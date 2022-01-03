/** @format */

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
// import { Pagination } from 'antd';

// Connections - Functions
import {
  getProductsBySortOrderLimit,
  getProductsCount,
} from '../../connections/product';

// Components
import Card from '../../components/cards/Card.js';
import LoadingCard from '../../components/cards/LoadingCard';

// CSS
import '../../pages/category/categoryPage.scss';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);

  const count = 100;
  const sort = 'createdAt';
  const order = 'desc';
  const limit = 6;

  useEffect(() => {
    loadAllProducts();
  }, []);

  useEffect(() => {
    getProductsCount().then(res => setProductsCount(res.data));
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsBySortOrderLimit(sort, order, limit)
      .then(res => {
        console.log('how many', res.data);
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        toast.error('Retrieving Products Error');
      });
  };

  return (
    <div className='categoryPage'>
      <h1 className='categoryPage__title'>New Arrivals</h1>
      {loading ? (
        <>
          <LoadingCard count={3} />
          <LoadingCard count={3} />
          <LoadingCard count={3} />
        </>
      ) : (
        <div className='categoryPage__container'>
          {products.map(prod => (
            <Card product={prod} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewArrivals;

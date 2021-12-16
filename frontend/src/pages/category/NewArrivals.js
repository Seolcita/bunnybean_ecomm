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

// CSS
import '../../pages/category/categoryPage.scss';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [productsCount, setProductsCount] = useState(0);

  const count = 100;
  const sort = 'createdAt';
  const order = 'desc';
  const limit = 6;

  useEffect(() => {
    loadAllProducts();
  }, [page]);

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
      <div className='categoryPage__container'>
        {products.map(prod => (
          <Card product={prod} />
        ))}
        {/* <Pagination
        defaultCurrent={page}
        total={(productsCount / 3) * 10}
        onChange={value => setPage(value)}
        className='home__pagination'
      /> */}
      </div>
    </div>
  );
};

export default NewArrivals;

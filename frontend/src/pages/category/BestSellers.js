/** @format */

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

// Connections - Functions
import { getProductsBySortOrderLimit } from '../../connections/product';

// Components
import Card from '../../components/cards/Card.js';
import LoadingCard from '../../components/cards/LoadingCard';

// CSS
import '../../pages/category/categoryPage.scss';

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const count = 100;
  const sort = 'createdAt';
  const order = 'desc';
  const limit = 12;
  const sold = 'sold';

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsBySortOrderLimit(sold, order, limit)
      .then(res => {
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
      <h1 className='categoryPage__title'>Top Selling Products</h1>
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

export default BestSellers;

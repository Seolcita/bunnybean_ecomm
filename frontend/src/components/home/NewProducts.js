/** @format */

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

// Connections - Functions
import { getProductsBySortOrderLimit } from '../../connections/product';

// Components
import Card from '../../components/Card.js';

// CSS
import '../../pages/home.scss';

const NewProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const count = 100;
  const sort = 'createdAt';
  const order = 'desc';
  const limit = 3;

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsBySortOrderLimit(sort, order, limit)
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
    <>
      {products.map(prod => (
        <Card product={prod} />
      ))}
    </>
  );
};

export default NewProducts;

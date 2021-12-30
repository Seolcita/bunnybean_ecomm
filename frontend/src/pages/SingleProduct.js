/** @format */

import React, { useState, useEffect } from 'react';
import { getSingleProduct } from '../connections/product';

// Components
import ProductCard from '../components/cards/ProductCard';

// CSS
import './singleProduct.scss';

function SingleProduct(props) {
  const { slug } = props.match.params;

  const [product, setProduct] = useState({});

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  const loadSingleProduct = () => {
    getSingleProduct(slug).then(res => setProduct(res.data));
  };

  return (
    <div className='singleProduct'>
      <div className='singleProduct__container'>
        <div className='singleProduct__main'>
          <ProductCard product={product} />
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;

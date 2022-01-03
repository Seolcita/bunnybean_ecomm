/** @format */

import React, { useState, useEffect } from 'react';

// Components
import Card from '../../components/cards/Card';
import LoadingCard from '../../components/cards/LoadingCard';

// Connections - Functions
import { getSubCategory } from '../../connections/subCategory';

// CSS
import '../category/categoryPage.scss';

function SubProducts(props) {
  const { slug } = props.match.params;
  const [subCategory, setSubCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubCategory(slug).then(res => {
      //console.log(res.data);
      setSubCategory(res.data.subCategory);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  return (
    <div className='categoryPage cover'>
      <h1 className='categoryPage__title'>
        {products.length} Products in "{subCategory.name}" Sub-Category
      </h1>
      {loading ? (
        <>
          <LoadingCard count={3} />
          <LoadingCard count={3} />
        </>
      ) : (
        <div className='categoryPage__container admin'>
          {products.map(prod => (
            <Card product={prod} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SubProducts;

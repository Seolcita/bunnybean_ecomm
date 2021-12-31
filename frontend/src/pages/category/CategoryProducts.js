/** @format */

import React, { useState, useEffect } from 'react';

// Components
import Card from '../../components/cards/Card';

// Connections - Functions
import { getCategory } from '../../connections/category';

// CSS
import './categoryPage.scss';

function CategoryProducts(props) {
  const { slug } = props.match.params;
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then(res => {
      //console.log(res.data);
      setCategory(res.data.category);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  return (
    <div className='categoryPage cover'>
      <h1 className='categoryPage__title'>
        {products.length} Products in "{category.name}" Category
      </h1>
      <div className='categoryPage__container'>
        {products.map(prod => (
          <Card product={prod} />
        ))}
      </div>
    </div>
  );
}

export default CategoryProducts;

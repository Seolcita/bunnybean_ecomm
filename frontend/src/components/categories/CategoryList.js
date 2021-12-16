/** @format */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../connections/category';

// CSS
import './categoryList.scss';

const CategoryList = () => {
  const [categories, setCategories] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then(category => {
      setCategories(category.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className='categoryList'>
      {/* {JSON.stringify(categories)} */}
      <div className='categoryList__section'>
        <div className='categoryList__header'>
          <Link to={`/category/allproducts`}>
            <div className={`categoryList__item allproducts`}>
              <div className='categoryList__text'>
                <h1>All</h1>
                <h1>Products</h1>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className='categoryList__section'>
        <div className='categoryList__header'>
          <Link to={`/category/newarrivals`}>
            <div className={`categoryList__item newArrivals`}>
              <div className='categoryList__text'>
                <h1>New</h1>
                <h1>Arrivals</h1>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className='categoryList__section'>
        <div className='categoryList__header'>
          <Link to={`/category/bestsellers`}>
            <div className={`categoryList__item bestSellers`}>
              <div className='categoryList__text'>
                <h1>Top Selling</h1>
                <h1>Products</h1>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {categories?.map(category => (
        <div className='categoryList__section--category' key={category._id}>
          <div className='categoryList__header--category'>
            <Link to={`/category/${category.slug}`}>
              <div className={`categoryList__item ${category.slug}`}></div>
              <div className='categoryList__title'>{category.name}</div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;

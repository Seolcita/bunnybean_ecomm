/** @format */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSubCategories } from '../../connections/subCategory';

// CSS
import './subCategoryList.scss';

const SubCategoryList = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubCategories().then(res => {
      console.log(res.data);
      setSubCategories(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className='subCategoryList'>
      {/* {JSON.stringify(subCategories)} */}

      {subCategories?.map(sub => (
        <div className='subCategoryList__section' key={sub._id}>
          <div className='subCategoryList__header'>
            <Link to={`/subcategory/${sub.slug}`}>
              <div className={`subCategoryList__item ${sub.slug}`}></div>
              <div className='categoryList__title'>{sub.name}</div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubCategoryList;

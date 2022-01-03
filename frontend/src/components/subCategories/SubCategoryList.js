/** @format */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Connections - Functions
import { getSubCategories } from '../../connections/subCategory';

// Components
import LoadingCard from '../cards/LoadingCard';

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
      {loading ? (
        <>
          <LoadingCard count={5} />
          <LoadingCard count={5} />
        </>
      ) : (
        <>
          {subCategories?.map(sub => (
            <div className='subCategoryList__section' key={sub._id}>
              <div className='subCategoryList__header'>
                <Link to={`/subcategory/${sub.slug}`}>
                  <div className={`subCategoryList__item ${sub.slug}`}>
                    <h3 className='categoryList__title'>{sub.name}</h3>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default SubCategoryList;

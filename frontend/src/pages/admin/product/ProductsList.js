/** @format */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

// Connections - Functions
import { getProductsByCount } from '../../../connections/product';

// Components
import AdminSidebar from '../../sidebar/AdminSidebar';
import LocalSearch from '../../../components/forms/LocalSearch';

// CSS & MUI Icons
import './productsList.scss';
import {
  DeleteForever,
  ModeEditOutline,
  TonalitySharp,
} from '@mui/icons-material';

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const count = 100;

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(count)
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        toast.error('Retrieving Products Error');
      });
  };

  const searched = keyword => product =>
    product.title.toLowerCase().includes(keyword);

  return (
    <div className='productsList'>
      <div className='productsList__sidebar'>
        <AdminSidebar />
      </div>
      <div className='productsList__detail'>
        <h3 className='dashboard__title--main'>Products List</h3>
        <div className='productsList__wrap'>
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
          <div className='productsList__listContainer'>
            {/* {JSON.stringify(products)} */}
            {products.filter(searched(keyword)).map((prod, idx) => (
              <div className='productsList__list' key={prod._id}>
                <span className='productsList__idx'>{idx + 1}.</span>
                <small className='productsList__name'>{prod.title}</small>
                {/* <small className='productsList__name'>
                  {prod.category.name}
                </small> */}
                <Link to={`/admin/productsList/${prod.slug}`}>
                  <button className='productsList__btn'>
                    <ModeEditOutline className='productsList__btn--edit' />
                  </button>
                </Link>
                <button
                  className='productsList__btn'
                  // onClick={() => deleteProduct(prod.slug, prod.name)}
                >
                  <DeleteForever className='productsList__btn--delete' />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsList;

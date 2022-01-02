/** @format */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

// Connections - Functions
import {
  getProductsByCount,
  removeProduct,
} from '../../../connections/product';

// Components
import AdminSidebar from '../../sidebar/AdminSidebar';
import LocalSearch from '../../../components/forms/LocalSearch';

// CSS & MUI Icons & Images
import './productsList.scss';
import {
  DeleteForever,
  ModeEditOutline,
  TonalitySharp,
  Menu,
} from '@mui/icons-material';
import ProductDefaultImage from '../../../images/productDefault.png';

function ProductsList() {
  const { user } = useSelector(state => ({ ...state }));

  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const count = 100;

  // CSS Responsive Purpose
  const [mobile, setMobile] = useState('0rem');
  const [filterToggle, setFilterToggle] = useState(false);

  const handleFilterToggle = () => {
    console.log('CLICKED TOGGLE');
    setFilterToggle(!filterToggle);
    console.log('TOGGLE', filterToggle);

    if (filterToggle) {
      setMobile('0rem');
      console.log('current toggle', filterToggle);
    } else if (!filterToggle) {
      setMobile('-24rem');
      console.log('current toggle', filterToggle);
    }
  };

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

  const deleteProduct = (slug, title) => {
    const answer = window.confirm(
      `Do you really want to delete product, '${title}'?`
    );

    if (answer) {
      //console.log('Delete?', slug, user.token);
      removeProduct(slug, user.token)
        .then(res => {
          loadAllProducts();
          toast.success(`${title} is deleted`);
        })
        .catch(err => {
          console.log('Delete Product Error', err);
          toast.error('Delete Product Error');
        });
    }
  };

  const searched = keyword => product =>
    product.title.toLowerCase().includes(keyword);

  return (
    <div className='productsList'>
      <div className='productsList__sidebar' style={{ marginLeft: mobile }}>
        <label id='ToggleSidebar'>
          <input
            type='checkbox'
            id='ToggleSidebar--input'
            for='ToggleSidebar'
          />
          <Menu id='ToggleSidebar--icon' onClick={() => handleFilterToggle()} />
        </label>
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
                <img
                  src={
                    prod?.images.length
                      ? prod.images[0].url
                      : ProductDefaultImage
                  }
                  className='productsList__img'
                />
                <small className='productsList__name'>{prod.title}</small>
                {/* <span className='productsList__name'>
                  {prod?.category ? prod.category.name : null}
                </span> */}
                <Link to={`/admin/product/${prod.slug}`}>
                  <button className='productsList__btn'>
                    <ModeEditOutline className='productsList__btn--edit' />
                  </button>
                </Link>
                <button
                  className='productsList__btn'
                  onClick={() => deleteProduct(prod.slug, prod.title)}
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

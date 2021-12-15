/** @format */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

// Connection - Functions
import { createProduct } from '../../../connections/product';
import {
  getCategories,
  getSubsBelongToParent,
} from '../../../connections/category';

// Components
import AdminSidebar from '../../sidebar/AdminSidebar';
import ProductCreateForm from '../../../components/forms/ProductCreateForm';
import FileUpload from '../../../components/forms/FileUpload';

// CSS & MUI Icons
import './product.scss';

// Set initial value for 'value' in useState
const initialState = {
  title: '',
  description: '',
  price: '',
  categories: [],
  category: '',
  subCategories: [],
  quantity: '',
  images: [],
  colors: ['White', 'Grey', 'Silver', 'Black'],
  brands: [
    'Apple',
    'Samsung',
    'Microsoft',
    'Lenovo',
    'ASUS',
    'GE',
    'LG',
    'Nikon',
    'Canon',
  ],
  color: '',
  brand: '',
  width: '',
  height: '',
  depth: '',
};

function Product() {
  const { user } = useSelector(state => ({ ...state }));

  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then(c => setValues({ ...values, categories: c.data }));

  const handleSubmit = e => {
    e.preventDefault();
    createProduct(values, user.token)
      .then(res => {
        console.log(res);
        window.alert(`"${res.data.title}" is created`);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
        // toast.error(err.response.data.err);
        // if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  const handleCategoryChange = e => {
    e.preventDefault();
    //console.log('CLICKED CATEGORY', e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });
    getSubsBelongToParent(e.target.value).then(res => {
      //console.log('SUB OPTIONS ON CATEGORY CLICK', res);
      setSubOptions(res.data);
    });
    setShowSub(true);
  };

  return (
    <div className='product'>
      <div className='product__sidebar'>
        <AdminSidebar />
      </div>
      <div className='product__detail'>
        {/* <h3 className='dashboard__title--main'>Add Product</h3> */}
        <div className='product__wrap'>
          <FileUpload
            values={values}
            setValues={setValues}
            setLoading={setLoading}
          />

          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            showSub={showSub}
          />
        </div>
      </div>
    </div>
  );
}

export default Product;

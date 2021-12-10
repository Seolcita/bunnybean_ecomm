/** @format */

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

// Connection - Functions
import { getSingleProduct } from '../../../connections/product';
import {
  getCategories,
  getSubsBelongToParent,
} from '../../../connections/category';

// Components
import AdminSidebar from '../../sidebar/AdminSidebar';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';
import ReplayIcon from '@mui/icons-material/Replay';

// CSS & MUI Icons
import './product.scss';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const initialState = {
  title: '',
  description: '',
  price: '',
  category: '',
  subCategories: [],
  quantity: '',
  images: [],
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
  color: '',
  brand: '',
};

function ProductUpdate() {
  let { slug } = useParams();
  const { user } = useSelector(state => ({ ...state }));

  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [subCategory, setSubCategory] = useState('');

  const {
    title,
    description,
    price,
    category,
    subCategories,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  useEffect(() => {
    loadSingleProduct();
    loadCategories();
  }, []);

  const loadSingleProduct = () => {
    getSingleProduct(slug)
      .then(res => {
        // console.log('SINGLE PROD &&&', res.data.subs[0].name);
        // Set product values
        setValues({ ...values, ...res.data });

        // Set sub-category belong to parent category
        getSubsBelongToParent(res.data.category._id)
          .then(res => setSubOptions(res.data))
          .catch(err => console.log(err));

        // Set sub-category name to display the name in select input
        setSubCategory(res.data.subs[0]._id);
      })
      .catch(err => console.log('Get Single Product Error: ***', err));
  };

  const loadCategories = () =>
    getCategories().then(res => setCategories(res.data));

  const handleSubmit = e => {
    e.preventDefault();
  };

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  const handleCatagoryChange = e => {
    e.preventDefault();
    //console.log('CLICKED CATEGORY', e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });
    getSubsBelongToParent(e.target.value).then(res => {
      //console.log('SUB OPTIONS ON CATGORY CLICK', res);
      setSubOptions(res.data);
    });
  };

  return (
    <div className='product'>
      <div className='product__sidebar'>
        <AdminSidebar />
      </div>
      <div className='product__detail'>
        <h3 className='dashboard__title--main'>
          Product Update
          <ReplayIcon
            className='product__icon'
            onClick={() => loadSingleProduct()}
          />
        </h3>
        {JSON.stringify(values)}
        <div className='product__wrap'>
          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            categories={categories}
            subCategory={subCategory}
            setSubCategory={setSubCategory}
            handleCatagoryChange={handleCatagoryChange}
            subOptions={subOptions}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductUpdate;

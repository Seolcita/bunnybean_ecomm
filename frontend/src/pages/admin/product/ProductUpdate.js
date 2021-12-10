/** @format */

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

// Connection - Functions
import { getSingleProduct, updateProduct } from '../../../connections/product';
import {
  getCategories,
  getSubsBelongToParent,
} from '../../../connections/category';

// Components
import AdminSidebar from '../../sidebar/AdminSidebar';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';
import FileUpload from '../../../components/forms/FileUpload';

// CSS & MUI Icons
import './product.scss';
import ReplayIcon from '@mui/icons-material/Replay';
import { WindowRounded } from '@mui/icons-material';

const initialState = {
  title: '',
  description: '',
  price: '',
  category: '',
  subs: [],
  quantity: '',
  images: [],
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
  color: '',
  brand: '',
};

function ProductUpdate(props) {
  const { history } = props;
  let { slug } = useParams();
  const { user } = useSelector(state => ({ ...state }));

  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [subCategory, setSubCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    title,
    description,
    price,
    category,
    subs,
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
        console.log('SINGLE PROD &&&', res.data.subs[0]._id);
        // Set product values
        setValues({ ...values, ...res.data });

        // Set sub-category belong to parent category
        getSubsBelongToParent(res.data.category._id)
          .then(res => setSubOptions(res.data))
          .catch(err => console.log(err));

        // Set sub-category id to display the name in select input
        setSubCategory(res.data.subs[0]._id);
      })
      .catch(err => console.log('Get Single Product Error: ***', err));
  };

  const loadCategories = () =>
    getCategories().then(res => setCategories(res.data));

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  const handleCategoryChange = e => {
    e.preventDefault();

    setValues({ ...values, subs: [], category: e.target.value });

    getSubsBelongToParent(e.target.value).then(res => {
      setSubOptions(res.data);
    });
  };

  const handleUpdateSubCategory = e => {
    setValues({ ...values, subs: e.target.value });
    setSubCategory(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);

    console.log('subcategory', subCategory);
    console.log('values.subs', values.subs);

    values.category = category ? category : values.category;
    values.subs = subCategory;

    updateProduct(slug, values, user.token)
      .then(res => {
        console.log('UPDATED PRODUCT DATA ***', res);
        setLoading(false);

        toast.success(`"${res.data.title}" is updated`);
        history.push('/admin/products');
      })
      .catch(err => {
        toast.error('Update product failed', err);
        setLoading(false);
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
        {/* {JSON.stringify(values)} */}
        <div className='product__wrap'>
          <FileUpload
            values={values}
            setValues={setValues}
            setLoading={setLoading}
          />
          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            categories={categories}
            subCategory={subCategory}
            handleUpdateSubCategory={handleUpdateSubCategory}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductUpdate;

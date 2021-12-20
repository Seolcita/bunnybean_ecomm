/** @format */

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Slider, Checkbox, Radio } from 'antd';

// Connections - Functions
import {
  getProductsByCount,
  fetchProductsByFilter,
} from '../connections/product';

import { getCategories } from '../connections/category';
import { getSubCategories } from '../connections/subCategory';

// Components
import Card from '../components/cards/Card';

// CSS & MUI Icons
import './shop.scss';
import {
  AttachMoney,
  LibraryAddCheck,
  RadioButtonChecked,
  FilterList,
} from '@mui/icons-material';

const { SubMenu, ItemGroup } = Menu;

function Shop() {
  let { search } = useSelector(state => ({ ...state }));
  let dispatch = useDispatch();
  const { text } = search;

  const [loading, setLoading] = useState([]);
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false); // To prevent many requests to backend
  const [categories, setCategories] = useState([]); // To display Category's checkbox options in filter section
  const [categoryIds, setCategoryIds] = useState([]); // To send the 'categoryIds' state value to backend
  const [subCategories, setSubCategories] = useState([]); // To display Sub-Category's options in filter section
  const [subCategory, setSubCategory] = useState(''); // To send the 'subCategory's state value to backend
  const [brands, setBrands] = useState([
    'Apple',
    'Samsung',
    'Microsoft',
    'Lenovo',
    'ASUS',
    'LG',
    'GE',
    'Nikon',
    'Canon',
  ]); // To display Brands' options in filter section
  const [brand, setBrand] = useState('');

  useEffect(() => {
    loadAllProducts();
    loadAllCategories();
    loadAllSubCategories();
  }, []);

  const loadAllCategories = () => {
    getCategories().then(res => setCategories(res.data));
  };

  const loadAllSubCategories = () => {
    getSubCategories().then(res => setSubCategories(res.data));
  };

  // Search/Filter the product with argument
  const fetchProducts = arg => {
    fetchProductsByFilter(arg).then(res => setProducts(res.data));
  };

  // 1. Load all products by default
  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  };

  // 2. Search by >> Keyword
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if (!text) {
        loadAllProducts();
      }
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  // 3. Filter by >> Price
  useEffect(() => {
    console.log('ok to request');
    fetchProducts({ price });
  }, [ok]);

  const handleSlider = value => {
    // Reset Search & Filters
    dispatch({ type: 'SEARCH_QUERY', payload: { text: '' } });
    setCategoryIds([]);
    setSubCategory('');

    // Set price to get data from backend
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // 4. Filter by >> Category
  const showCategories = () =>
    categories.map(category => (
      <div key={category._id}>
        <Checkbox
          onChange={e => handleCheck(e)}
          className='shop__submenu--checkbox'
          value={category._id}
          name='category'
          checked={categoryIds.includes(category._id)}
        >
          {category.name}
        </Checkbox>
        <br />
      </div>
    ));

  const handleCheck = e => {
    // Reset Search & Filters
    dispatch({ type: 'SEARCH_QUERY', payload: { text: '' } });
    setPrice([0, 0]);
    setSubCategory('');

    //console.log(e.target.value);
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;

    // If it is found(true), it returns index
    // If it is not found(false), it returns -1
    let foundInTheState = inTheState.indexOf(justChecked);

    if (foundInTheState === -1) {
      // If it is not found add the item to 'inTheState'
      inTheState.push(justChecked);
    } else {
      // If found pull out one item from the index
      inTheState.splice(foundInTheState, 1);
    }

    // Set Categories to get data from backend
    setCategoryIds(inTheState);
    console.log(inTheState);
    fetchProducts({ category: inTheState });
  };

  // 5. Filter By >> Sub-Category
  const showSubCategories = () =>
    subCategories.map(sub => (
      <button
        onClick={() => handleSubCategories(sub)}
        className='shop__submenu--subCategory'
        value={sub._id}
        name='subCategory'
        key={sub._id}
      >
        {sub.name}
      </button>
    ));

  const handleSubCategories = sub => {
    // Reset Search & Filters
    dispatch({ type: 'SEARCH_QUERY', payload: { text: '' } });
    setPrice([0, 0]);
    setCategoryIds([]);

    // Set Sub-Category to get data from backend
    setSubCategory(sub);
    fetchProducts({ sub });
  };

  // 6. Filter By >> Brand
  const showBrands = () =>
    brands.map(b => (
      <Radio
        key={b}
        value={b}
        name={b}
        checked={b === brand}
        onChange={handleBrand}
        className='shop__submenu--brands'
      >
        {b}
      </Radio>
    ));

  const handleBrand = e => {
    // Reset Search & Filters
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setSubCategory('');

    // Set brand to get data from backend
    setBrand(e.target.value);
    fetchProducts({ brand: e.target.value });
  };

  return (
    <div className='shop'>
      {/* {JSON.stringify(subCategory)} */}
      <div className='shop__container'>
        <div className='shop__left'>
          {/* <h4 className='shop__title left'>
            {' '}
            <FilterList className='shop__submenu--icon' /> 
            Filters
          </h4> */}
          <Menu defaultOpenKeys={['1', '2', '3', '4']} mode='inline'>
            {/* PRICE */}
            <SubMenu
              key='1'
              title={
                <span>
                  <h6 className='shop__submenu--title'>
                    <AttachMoney className='shop__submenu--icon' />
                    Price
                  </h6>
                </span>
              }
            >
              <div className='shop__submenu--item'>
                <Slider
                  tipFormatter={value => `$${value}`}
                  range
                  value={price}
                  onChange={val => handleSlider(val)}
                  max='5000'
                />
              </div>
            </SubMenu>

            {/* Category */}
            <SubMenu
              key='2'
              title={
                <span>
                  <h6 className='shop__submenu--title'>
                    <LibraryAddCheck className='shop__submenu--icon' />
                    Categories
                  </h6>
                </span>
              }
            >
              <div className='shop__submenu--item'>{showCategories()}</div>
            </SubMenu>

            {/* Sub-Category */}
            <SubMenu
              key='3'
              title={
                <span>
                  <h6 className='shop__submenu--title'>
                    <LibraryAddCheck className='shop__submenu--icon' />
                    Sub Categories
                  </h6>
                </span>
              }
            >
              <div className='shop__submenu--item'>{showSubCategories()}</div>
            </SubMenu>

            {/* Brand */}
            <SubMenu
              key='4'
              title={
                <span>
                  <h6 className='shop__submenu--title'>
                    <RadioButtonChecked className='shop__submenu--icon' />
                    Brands
                  </h6>
                </span>
              }
            >
              <div className='shop__submenu--item'>{showBrands()}</div>
            </SubMenu>
          </Menu>
        </div>
        <div className='shop__right'>
          <h4 className='shop__title right'> Products</h4>
          <div className='shop__products'>
            {products.length < 1 && <h1>No Product Found</h1>}
            {/* {JSON.stringify(products)} */}
            {products.map(prod => (
              <Card product={prod} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;

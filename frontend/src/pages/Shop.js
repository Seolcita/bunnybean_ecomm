/** @format */

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Slider, Checkbox } from 'antd';

// Connections - Functions
import {
  getProductsByCount,
  fetchProductsByFilter,
} from '../connections/product';

import { getCategories } from '../connections/category';

// Components
import Card from '../components/cards/Card';

// CSS & MUI Icons
import './shop.scss';
import { AttachMoney, LibraryAddCheck } from '@mui/icons-material';

const { SubMenu, ItemGroup } = Menu;

function Shop() {
  let { search } = useSelector(state => ({ ...state }));
  let dispatch = useDispatch();
  const { text } = search;

  const [loading, setLoading] = useState([]);
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false); // To prevent many requests to backend
  const [categories, setCategories] = useState([]); // To display Category's checkbox options
  const [categoryIds, setCategoryIds] = useState([]); // To send the state's value to backend

  useEffect(() => {
    loadAllProducts();
    loadAllCategories();
  }, []);

  const loadAllCategories = () => {
    getCategories().then(res => setCategories(res.data));
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

    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // 4. Filter by >> Category
  // 4-1. show categories in a list of checkbox
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

  // Handle Checked Categories
  const handleCheck = e => {
    // Reset Search & Filters
    dispatch({ type: 'SEARCH_QUERY', payload: { text: '' } });
    setPrice([0, 0]);

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

    setCategoryIds(inTheState);
    console.log(inTheState);
    fetchProducts({ category: inTheState });
  };

  return (
    <div className='shop'>
      <div className='shop__container'>
        <div className='shop__left'>
          <h4 className='shop__title left'> Search / Filter</h4>
          <Menu defaultOpenKey={['1', '2']} mode='inline'>
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

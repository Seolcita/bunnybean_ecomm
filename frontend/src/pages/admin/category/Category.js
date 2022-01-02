/** @format */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

// Connection - Functions
import {
  createCategory,
  getCategories,
  removeCategory,
} from '../../../connections/category';

// Components
import AdminSidebar from '../../sidebar/AdminSidebar';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';

// CSS
import './category.scss';
import { DeleteForever, ModeEditOutline, Menu } from '@mui/icons-material';

function Category() {
  const { user } = useSelector(state => ({ ...state }));

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState('');

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
    loadCategories();
  }, []);
  //console.log(categories);

  const loadCategories = () =>
    getCategories().then(res => setCategories(res.data));
  // getCategories().then(res => console.log(res.data));

  const displayCategories = () => (
    <div className='category__section'>
      <h3 className='dashboard__title--sub'>Manage Categories</h3>
      <LocalSearch keyword={keyword} setKeyword={setKeyword} />
      <div className='category__listContainer'>
        {categories.filter(searched(keyword)).map(category => (
          <div className='category__list' key={category.id}>
            <small className='category__name'>{category.name}</small>
            <Link to={`/admin/category/${category.slug}`}>
              <button className='category__btn'>
                <ModeEditOutline className='category__btn--edit' />
              </button>
            </Link>
            <button
              className='category__btn'
              onClick={() => deleteCategory(category.slug, category.name)}
            >
              <DeleteForever className='category__btn--delete' />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const deleteCategory = async (slug, name) => {
    if (window.confirm(`Do you really want to delete '${name}' category?`)) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then(res => {
          setLoading(false);
          loadCategories();
          toast.success(`${res.data.name} is deleted`);
        })
        .catch(err => {
          if (err.response.status === 400) {
            console.log('DELETE CATEGORY ERROR', err);
            toast.error(err.response.data);
          }
        });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    createCategory({ name }, user.token)
      .then(res => {
        setLoading(false);
        setName('');
        loadCategories();
        toast.success(`${res.data.name} is created.`);
      })
      .catch(err => {
        console.log('Creating Category Error', err);
        // toast.error(`Creating category ${name} is failed.`);
        if (err.response.status === 400) toast.error(err.response.data);
        setLoading(false);
      });
  };

  const searched = keyword => c => c.name.toLowerCase().includes(keyword);

  return (
    <div className='category'>
      <div className='category__sidebar' style={{ marginLeft: mobile }}>
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
      <div className='category__detail'>
        <div className='category__wrap'>
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            title='Create a Category'
          />
          <div className='spacer'></div>

          {displayCategories()}
          {/* {JSON.stringify(categories)} */}
        </div>
      </div>
    </div>
  );
}

export default Category;

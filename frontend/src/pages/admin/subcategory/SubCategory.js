/** @format */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

// Connection - Functions
import { getCategories } from '../../../connections/category';
import {
  createSubCategory,
  getSubCategories,
  removeSubCategory,
} from '../../../connections/subCategory';

// Components
import AdminSidebar from '../../sidebar/AdminSidebar';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';

// CSS
import '../category/category.scss';
import { DeleteForever, ModeEditOutline } from '@mui/icons-material';

function SubCategory() {
  const { user } = useSelector(state => ({ ...state }));

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]); // For select options (All categories info from db)
  const [category, setCategory] = useState(''); // To create a sub category
  const [subCategories, setSubCategories] = useState([]); // All sub-categories info from db
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    loadCategories();
    loadSubCategories();
  }, []);
  //console.log(categories);

  const loadCategories = () =>
    getCategories().then(res => setCategories(res.data));
  // getCategories().then(res => console.log(res.data));

  const loadSubCategories = () =>
    getSubCategories().then(res => setSubCategories(res.data));

  const searched = keyword => c => c.name.toLowerCase().includes(keyword);

  const displaySubCategories = () => (
    <div className='category__section'>
      <h3 className='dashboard__title--sub'>Manage Sub-Categories</h3>
      {/* {JSON.stringify(subCategories)} */}
      <LocalSearch keyword={keyword} setKeyword={setKeyword} />
      <div className='category__listContainer'>
        {subCategories.filter(searched(keyword)).map(sub => (
          <div className='category__list' key={sub.id}>
            <small className='category__name'>{sub.name}</small>
            <Link to={`/admin/subcategory/${sub.slug}`}>
              <button className='category__btn'>
                <ModeEditOutline className='category__btn--edit' />
              </button>
            </Link>
            <button
              className='category__btn'
              onClick={() => deleteSubCategory(sub.slug, sub.name)}
            >
              <DeleteForever className='category__btn--delete' />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const deleteSubCategory = async (slug, name) => {
    if (
      window.confirm(`Do you really want to delete '${name}' sub-category?`)
    ) {
      setLoading(true);
      removeSubCategory(slug, user.token)
        .then(res => {
          setLoading(false);
          loadSubCategories();
          toast.success(`${res.data.name} is deleted`);
        })
        .catch(err => {
          if (err.response.status === 400) {
            console.log('DELETE SUB CATEGORY ERROR', err);
            toast.error(err.response.data);
          }
        });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    createSubCategory({ name, parent: category }, user.token)
      .then(res => {
        setLoading(false);
        setName('');
        loadSubCategories();
        toast.success(`${res.data.name} is created.`);
      })
      .catch(err => {
        console.log('Creating Category Error', err);
        // toast.error(`Creating category ${name} is failed.`);
        if (err.response.status === 400) toast.error(err.response.data);
        setLoading(false);
      });
  };

  return (
    <div className='category'>
      <div className='category__sidebar'>
        <AdminSidebar />
      </div>
      <div className='category__detail'>
        <div className='category__wrap'>
          <h3 className='dashboard__title--sub'>Create a Sub-Category</h3>
          <div className='category__select'>
            <select
              className='category__select--container'
              name='select'
              onChange={e => setCategory(e.target.value)}
            >
              <option className='category__select--option'>
                Select a Parent Category
              </option>
              {categories?.length > 0 &&
                categories.map(category => (
                  <option value={category._id} key={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            title=''
            sub
          />
          <div className='spacer'></div>
          {displaySubCategories()}
        </div>
      </div>
    </div>
  );
}

export default SubCategory;

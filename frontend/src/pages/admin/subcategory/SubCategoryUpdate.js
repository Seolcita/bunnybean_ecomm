/** @format */

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../connections/category';

import {
  getSubCategory,
  updateSubCategory,
} from '../../../connections/subCategory';

// Components
import AdminSidebar from '../../sidebar/AdminSidebar';
import CategoryForm from '../../../components/forms/CategoryForm';

// CSS
import '../category/category.scss';
import { Menu } from '@mui/icons-material';

function SubCategoryUpdate(props) {
  const { history, match } = props;
  const { user } = useSelector(state => ({ ...state }));

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]); // For select options (All categories info from db)
  const [parent, setParent] = useState('');

  const slug = match.params.slug;

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
    loadSubCategory();
  }, []);

  const loadCategories = () =>
    getCategories().then(res => setCategories(res.data));

  const loadSubCategory = () =>
    getSubCategory(slug).then(res => {
      setName(res.data.name);
      setParent(res.data.parent);
    });

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    console.log('name & parent', name, parent);
    updateSubCategory(slug, { name, parent }, user.token)
      .then(res => {
        setLoading(false);
        setName('');
        toast.success(`${res.data.name} is updated.`);
        history.push('/admin/subcategory');
      })
      .catch(err => {
        console.log('Updating Category Error', err);
        // toast.error(`Creating category ${name} is failed.`);
        if (err.response.status === 400) toast.error(err.response.data);
        setLoading(false);
      });
  };

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
          <h1>Update Sub-Category</h1>
          <div className='category__select'>
            <select
              className='category__select--container'
              name='select'
              onChange={e => setParent(e.target.value)}
            >
              <option className='category__select--option'>
                Select a Parent Category
              </option>
              {categories?.length > 0 &&
                categories.map(category => (
                  <option
                    value={category._id}
                    key={category._id}
                    selected={category._id === parent}
                  >
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <CategoryForm
            name={name}
            setName={setName}
            handleSubmit={handleSubmit}
            title=''
          />
        </div>
      </div>
    </div>
  );
}

export default SubCategoryUpdate;

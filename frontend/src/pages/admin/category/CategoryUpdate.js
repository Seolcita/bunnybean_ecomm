/** @format */

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategory, updateCategory } from '../../../connections/category';

// Components
import AdminSidebar from '../../sidebar/AdminSidebar';
import CategoryForm from '../../../components/forms/CategoryForm';

// CSS
import './category.scss';
import { Menu } from '@mui/icons-material';

function CategoryUpdate(props) {
  const { history, match } = props;
  const { user } = useSelector(state => ({ ...state }));

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

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
    loadCategory();
  }, []);
  //console.log(categories);

  const loadCategory = () =>
    getCategory(slug).then(res => setName(res.data.name));

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    updateCategory(slug, { name }, user.token)
      .then(res => {
        setLoading(false);
        setName('');
        toast.success(`${res.data.name} is updated.`);
        history.push('/admin/category');
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
          <CategoryForm
            name={name}
            setName={setName}
            handleSubmit={handleSubmit}
            title='Edit a Category'
          />
        </div>
      </div>
    </div>
  );
}

export default CategoryUpdate;

/** @format */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategory, updateCategory } from '../../../connections/category';

// Components
import AdminSidebar from '../../sidebar/AdminSidebar';
import CategoryForm from '../../../components/forms/CategoryForm';

// CSS
import './category.scss';

function CategoryUpdate(props) {
  const { history, match } = props;
  const { user } = useSelector(state => ({ ...state }));

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const slug = match.params.slug;

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
      <div className='category__sidebar'>
        <AdminSidebar />
      </div>
      <div className='category__detail'>
        <div className='category__wrap'>
          <CategoryForm
            name={name}
            setName={setName}
            handleSubmit={handleSubmit}
            edit
          />
        </div>
      </div>
    </div>
  );
}

export default CategoryUpdate;

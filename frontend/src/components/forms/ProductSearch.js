/** @format */

import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// CSS & MUI Icons
import './productSearch.scss';
import { Search } from '@mui/icons-material';

const ProductSearch = () => {
  //Redux
  const dispatch = useDispatch();
  const { search } = useSelector(state => ({ ...state }));
  const { text } = search;

  const history = useHistory();

  const handleChange = e => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };

  return (
    <div className='productSearch'>
      <form className='productSearch__form' onSubmit={handleSubmit}>
        <div className='productSearch__wrap'>
          <input
            type='search'
            value={text}
            className='search__input'
            placeholder='Search'
            onChange={handleChange}
          />

          <button className='productSearch__btn' onClick={handleSubmit}>
            <Search className='productSearch__btn--icon' />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductSearch;

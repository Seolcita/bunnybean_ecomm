/** @format */

import React from 'react';

// CSS
import './localSearch.scss';

function LocalSearch(props) {
  const { keyword, setKeyword } = props;

  const handleSearchChange = e => {
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <div className='localSearch'>
      <input
        type='search'
        placeholder='Enter search keyword '
        value={keyword}
        onChange={e => handleSearchChange(e)}
        id='localSearch__input'
      />
    </div>
  );
}

export default LocalSearch;

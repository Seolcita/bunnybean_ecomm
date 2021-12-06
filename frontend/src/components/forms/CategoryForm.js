/** @format */

import React from 'react';

function CategoryForm(props) {
  const { handleSubmit, name, setName, title, sub } = props;

  return (
    <div className='category__section'>
      <h3 className='dashboard__title--sub'>{title}</h3>
      <form className='category__form' onSubmit={handleSubmit}>
        <input
          onChange={e => setName(e.target.value)}
          value={name}
          placeholder={
            sub ? "Enter sub-category's name" : "Enter category's name"
          }
          autoFocus
          className='category__form--input'
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default CategoryForm;

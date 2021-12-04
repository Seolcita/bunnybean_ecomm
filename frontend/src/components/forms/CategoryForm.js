/** @format */

import React from 'react';

function CategoryForm(props) {
  const { handleSubmit, name, setName, edit } = props;

  return (
    <div className='category__section'>
      <h3 className='dashboard__title--sub'>
        {edit ? 'Edit a Category Name' : 'Create a Category'}
      </h3>
      <form className='category__form' onSubmit={handleSubmit}>
        <input
          onChange={e => setName(e.target.value)}
          value={name}
          placeholder="Enter category's name"
          autoFocus
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default CategoryForm;

/** @format */

import React from 'react';

// CSS
import '../../pages/admin/product/product.scss';

const ProductCreateForm = props => {
  const {
    handleSubmit,
    handleChange,
    setValues,
    values,
    handleCategoryChange,
    subOptions,
    showSub,
  } = props;

  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
    width,
    height,
    depth,
  } = values;

  return (
    <form onSubmit={handleSubmit} className='product__container'>
      <div className='product__form'>
        <label>Title</label>
        <input
          type='text'
          name='title'
          className='product__input'
          value={title}
          onChange={handleChange}
        />
      </div>

      <div className='product__form'>
        <label>Description</label>
        <input
          type='text'
          name='description'
          className='product__input'
          value={description}
          onChange={handleChange}
        />
      </div>

      <div className='product__form'>
        <label>Price</label>
        <input
          type='number'
          name='price'
          className='product__input'
          value={price}
          onChange={handleChange}
        />
      </div>

      <div className='product__form'>
        <label>Quantity</label>
        <input
          type='number'
          name='quantity'
          className='product__input'
          value={quantity}
          onChange={handleChange}
        />
      </div>
      <div className='product__form'>
        <label>Width</label>
        <input
          type='number'
          name='width'
          className='product__input'
          value={width}
          onChange={handleChange}
        />
      </div>
      <div className='product__form'>
        <label>Height</label>
        <input
          type='number'
          name='height'
          className='product__input'
          value={height}
          onChange={handleChange}
        />
      </div>
      <div className='product__form'>
        <label>Depth</label>
        <input
          type='number'
          name='depth'
          className='product__input'
          value={depth}
          onChange={handleChange}
        />
      </div>

      <div className='product__form'>
        <label>Color</label>
        <select
          name='color'
          className='product__select'
          onChange={handleChange}
        >
          <option>Please select</option>
          {colors.map(c => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className='product__form'>
        <label>Brand</label>
        <select
          name='brand'
          className='product__select'
          onChange={handleChange}
        >
          <option>Please select</option>
          {brands.map(b => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className='product__form'>
        <label>Category</label>
        <select
          name='category'
          className='product__select'
          onChange={handleCategoryChange}
        >
          <option>Please select</option>
          {categories.length > 0 &&
            categories.map(c => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      {showSub && (
        <div className='product__form'>
          <label>Sub Categories</label>
          <select
            placeholder='Please select'
            name='subs'
            onChange={handleChange}
            className='product__select'
          >
            <option>Please select</option>
            {subOptions.length &&
              subOptions.map(s => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
          </select>
        </div>
      )}
      <br />

      <button className='product__btn'>Save</button>
    </form>
  );
};

export default ProductCreateForm;

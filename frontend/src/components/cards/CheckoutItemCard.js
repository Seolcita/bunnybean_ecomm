/** @format */

import React from 'react';
import ModalImage from 'react-modal-image';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

// CSS & MUI Icons & Images
import { DeleteForever } from '@mui/icons-material';
import defaultImage from '../../images/productDefault.png';

function CheckoutItemCard(props) {
  const { item } = props;
  const dispatch = useDispatch();
  const priceDecimal = Number(item.price).toFixed(2);
  const colors = ['White', 'Grey', 'Silver', 'Black'];

  const handleColorChange = e => {
    //console.log('Changed Color', e.target.value);

    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      cart.map((originalItem, i) => {
        if (originalItem._id === item._id) {
          cart[i].color = e.target.value;
          //console.log(cart[i].color);
        }
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      });
    }
  };

  const handleCountChange = e => {
    //console.log('Changed Count', e.target.value);

    let count = e.target.value < 1 ? 1 : e.target.value;
    if (count > item.quantity) {
      toast.error(`Max available quantity: ${item.quantity}`);
      return;
    }

    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      cart.map((originalItem, i) => {
        if (originalItem._id === item._id) {
          cart[i].count = count;
        }
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      });
    }
  };

  const handleRemove = e => {
    //console.log('remove', item._id);

    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      cart.map((originalItem, i) => {
        if (originalItem._id === item._id) {
          cart.splice(i, 1);
        }
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      });
    }
  };

  return (
    <tbody className='cart__table--tbody'>
      <tr className='cart__table--tr'>
        <td className='cart__table--td'>
          <div>
            {item.images.length ? (
              <ModalImage
                small={item.images[0].url}
                large={item.images[0].url}
              />
            ) : (
              <ModalImage small={defaultImage} large={defaultImage} />
            )}
          </div>
        </td>
        <td className='cart__table--td'>{item.title}</td>
        <td className='cart__table--td'>{priceDecimal}</td>
        <td className='cart__table--td'>{item.brand}</td>
        <td className='cart__table--td'>
          <select
            onChange={e => handleColorChange(e)}
            name='color'
            className='cart__table--select'
          >
            {item.color ? (
              <option value={item.color}>{item.color}</option>
            ) : (
              <option>Select</option>
            )}
            {colors
              .filter(c => c !== item.color)
              .map(c => (
                <option>{c}</option>
              ))}
          </select>
        </td>
        <td className='cart__table--td count'>
          <input
            type='number'
            className='cart__table--input'
            value={item.count}
            onChange={e => handleCountChange(e)}
          />
        </td>
        <td className='cart__table--td removeIcon'>
          <DeleteForever
            className='cart__icon'
            onClick={e => handleRemove(e)}
          />
        </td>
      </tr>
    </tbody>
  );
}

export default CheckoutItemCard;

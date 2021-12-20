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
  const priceDecimal = Number(item.price).toFixed(2);

  return (
    <tbody className='cart__table--tbody'>
      <tr lassName='cart__table--tr'>
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
        <td className='cart__table--td'>{item.color}</td>
        <td className='cart__table--td count'>{item.count}</td>
        <td className='cart__table--td removeIcon'>
          <DeleteForever className='cart__icon' />
        </td>
      </tr>
    </tbody>
  );
}

export default CheckoutItemCard;

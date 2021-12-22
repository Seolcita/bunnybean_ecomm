/** @format */

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Connection - Functions
import { getUserCart } from '../connections/user';

// CSS
import './checkout.scss';

function Checkout() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => ({ ...state }));

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [totalWithTax, setTotalWithTax] = useState(0);

  useEffect(() => {
    getUserCart(user.token).then(res => {
      console.log('USER CART FROM BACKEND ----', res.data);
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
      setTax(res.data.tax);
      setTotalWithTax(res.data.totalWithTax);
    });
  }, []);

  return (
    <div className='checkout'>
      <div className='checkout__container'>
        <div className='checkout__left'>ADDRESS</div>
        <div className='checkout__right'>
          <div className='checkout__summary'>
            <h3 className='checkout__title'>Order Summary</h3>
            <h4>
              {products.length > 1
                ? `${products.length} Items`
                : `${products.length} Item`}
            </h4>
            <h4>Total: ${total.toFixed(2)}</h4>
            <h4>Tax: ${tax.toFixed(2)}</h4>
            <h4>Sub Total: ${totalWithTax.toFixed(2)}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

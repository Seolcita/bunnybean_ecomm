/** @format */

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

// Connection - Functions
import { getUserCart, saveAddress } from '../connections/user';

// Components
import Address from '../components/forms/Address';

// CSS & MUI Icons
import './checkout.scss';
import { TonalitySharp } from '@mui/icons-material';

function Checkout() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => ({ ...state }));

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [totalWithTax, setTotalWithTax] = useState(0);
  const [address, setAddress] = useState('');
  const [addressSaved, setAddressSaved] = useState(false);

  useEffect(() => {
    getUserCart(user.token).then(res => {
      console.log('USER CART FROM BACKEND ----', res.data);
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
      setTax(res.data.tax);
      setTotalWithTax(res.data.totalWithTax);
    });
  }, []);

  const saveAddressToDb = () => {
    saveAddress(user.token, address).then(res => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success('Address saved');
      }
    });
  };

  return (
    <div className='checkout'>
      <div className='checkout__container'>
        <div className='checkout__left'>
          <h3 className='checkout__title'>Shipping Address</h3>
          <Address address={address} setAddress={setAddress} />
          <button
            className='checkout__btn--address'
            disabled={addressSaved}
            onClick={() => saveAddressToDb()}
          >
            Save Address
          </button>
        </div>
        <div className='checkout__right'>
          <div className='checkout__summary'>
            <h3 className='checkout__title'>Order Summary</h3>
            <div className='checkout__info'>
              <h4>
                {products.length > 1
                  ? `${products.length} Items`
                  : `${products.length} Item`}
              </h4>
              <h4>Total: ${total.toFixed(2)}</h4>
              <h4>Tax: ${tax.toFixed(2)}</h4>
              <hr className='checkout__hr' />
              <h4 className='checkout__info--total'>
                <b>Sub Total: ${totalWithTax.toFixed(2)}</b>
              </h4>
            </div>
            <button
              disabled={
                !addressSaved || address === '' || products.length === 0
              }
              className='checkout__btn--order'
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

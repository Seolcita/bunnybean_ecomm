/** @format */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Connections - Functions
import { createOrder, emptyUserCart } from '../connections/user';

// Stripe
import { createPaymentIntent } from '../connections/stripe';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function StripeCheckout(props) {
  const { history } = props;
  const dispatch = useDispatch();
  const { user } = useSelector(state => ({ ...state }));
  const stripe = useStripe();
  const elements = useElements();

  // For Stripe Status
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');

  // Setting total price for payment
  const [totalWithTax, setTotalWithTax] = useState(0);

  useEffect(() => {
    createPaymentIntent(user.token).then(res => {
      console.log('create payment intent', res.data);
      setClientSecret(res.data.clientSecret);
      setTotalWithTax(res.data.totalWithTax);
    });
  }, []);

  const cartStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      // After successful payment
      // console.log(JSON.stringify('Payment Success____', payload, null, 4));
      createOrder(payload, user.token).then(res => {
        if (res.data.ok) {
          // empty cart from local storage
          if (typeof window !== 'undefined') localStorage.removeItem('cart');

          // empty cart from redux
          dispatch({
            type: 'ADD_TO_CART',
            payload: [],
          });

          // empty cart from database
          emptyUserCart(user.token);
        }
      });
    }
    console.log(JSON.stringify(payload, null, 4));
    setError(null);
    setProcessing(false);
    setSucceeded(true);
  };

  const handleChange = async e => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : '');
  };

  return (
    <div>
      <form
        id='payment-form'
        className='stripe-form'
        onSubmit={e => handleSubmit(e)}
      >
        <CardElement
          id='card-element'
          options={cartStyle}
          onChange={e => handleChange(e)}
        />
        <button
          className='stripe-button'
          disabled={processing || disabled || succeeded}
        >
          <span id='button-text'>
            {processing ? <div className='spinner' id='spinner'></div> : 'Pay'}
          </span>
        </button>
        <br />
        {error && (
          <div className='card-error' role='alert'>
            {error}
          </div>
        )}
        <br />
        <p className={succeeded ? 'result-message' : 'result-message hidden'}>
          Payment Successful.
          <Link to='/user/history'>See it in your purchase history.</Link>
        </p>
      </form>
    </div>
  );
}

export default StripeCheckout;

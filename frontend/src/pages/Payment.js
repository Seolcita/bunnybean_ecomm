/** @format */

import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Components
import StripeCheckout from '../components/StripeCheckout';

// CSS
import './stripe.css';
import './payment.scss';

const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

function Payment() {
  return (
    <div className='payment'>
      <h1>PAYMENT</h1>
      <h4>Complete your purchase</h4>
      <Elements stripe={promise}>
        <div className='payment__pay'>
          <StripeCheckout />
        </div>
      </Elements>
    </div>
  );
}

export default Payment;

/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Components
import CheckoutItemCard from '../components/cards/CheckoutItemCard';

// CSS
import './cart.scss';

function Cart(props) {
  const { history } = props;
  const { cart, user } = useSelector(state => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      const total = currentValue + nextValue.count * nextValue.price;
      return total;
    }, 0);
  };

  // const saveOrderToDb = () => {
  //   console.log("cart", JSON.stringify(cart, null, 4));
  //   userCart(cart, user.token)
  //     .then(res => {
  //       console.log('CART POST RES', res);
  //       if (res.data.ok) history.push('/checkout');
  //     })
  //     .catch(err => console.log('cart save err', err));
  // };

  const showCartItems = () => (
    <table className='cart__table'>
      <thead className='cart__table--header'>
        <tr>
          <th className='cart__table--th'>Image</th>
          <th className='cart__table--th'>Title</th>
          <th className='cart__table--th'>Price</th>
          <th className='cart__table--th'>Brand</th>
          <th className='cart__table--th'>Color</th>
          <th className='cart__table--th'>Count</th>
          <th className='cart__table--th'>Remove</th>
        </tr>
      </thead>

      {cart.map(item => (
        <CheckoutItemCard key={item._id} item={item} />
      ))}
    </table>
  );

  return (
    <div className='cart'>
      <div className='cart__container'>
        <div className='cart__left'>
          {!cart.length ? (
            <h4>
              No products in cart. <Link to='/shop'>Continue Shopping</Link>
            </h4>
          ) : (
            showCartItems()
          )}
        </div>
        <div className='cart__right'>
          <h4>Order Summary</h4>
          <hr className='cart__hr' />
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = ${(c.price * c.count).toFixed(2)}
              </p>
            </div>
          ))}
          <hr className='cart__hr' />
          Total: <b>${getTotal().toFixed(2)}</b>
          <hr className='cart__hr' />
          {user ? (
            <button
              // onClick={saveOrderToDb}
              className='cart__btn--checkout'
              disabled={!cart.length}
            >
              Proceed to Checkout
            </button>
          ) : (
            <button className='cart__btn--login'>
              <Link
                to={{
                  pathname: '/login',
                  state: { from: 'cart' },
                }}
              >
                Login to Checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;

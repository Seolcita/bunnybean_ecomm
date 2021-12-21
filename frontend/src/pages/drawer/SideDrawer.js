/** @format */

import React from 'react';
import { Drawer, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// CSS
import './sideDrawer.scss';
import defaultImage from '../../images/productDefault.png';

function SideDrawer() {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector(state => ({ ...state }));

  const handleRemove = (e, id) => {
    //console.log('remove', id);

    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      cart.map((originalItem, i) => {
        if (originalItem._id === id) {
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
    <div className='drawer'>
      <Drawer
        className='drawer__container'
        title={`Cart / ${cart.length} Product`}
        placement='right'
        closable={true}
        onClose={() => {
          dispatch({
            type: 'SET_VISIBLE',
            payload: false,
          });
        }}
        visible={drawer}
      >
        {cart.map(item => (
          <div key={item._id}>
            {item.images[0] ? (
              <div className='drawer__item'>
                <img src={item.images[0].url} className='drawer__img' />
                <div className='drawer__detail'>
                  <h4 className='drawer__title'>{item.title}</h4>
                  <h5 className='drawer__h5'>${item.price.toFixed(2)}</h5>
                  <button
                    className='drawer__btn--del'
                    onClick={e => handleRemove(e, item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div className='drawer__item'>
                <img src={defaultImage} className='drawer__img' />
                <div className='drawer__detail'>
                  <h4 className='drawer__title'>{item.title}</h4>
                  <h5 className='drawer__h5'>${item.price.toFixed(2)}</h5>
                  <button
                    className='drawer__btn--del'
                    onClick={e => handleRemove(e, item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        <Link to='/cart'>
          <button
            className='drawer__btn--toCart'
            onClick={() => dispatch({ type: 'SET_VISIBLE', payload: false })}
          >
            Go to Cart
          </button>
        </Link>
      </Drawer>
    </div>
  );
}

export default SideDrawer;

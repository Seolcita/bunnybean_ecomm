/** @format */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import ModalImage from 'react-modal-image';

// Connection - Functions
import { getOrders, changeStatus } from '../../../connections/admin';

// Components
import AdminSidebar from '../../sidebar/AdminSidebar';

// CSS
import './orders.scss';
import '../../user/orderHistory.scss';
import defaultImage from '../../../images/productDefault.png';

function Orders() {
  const { user } = useSelector(state => ({ ...state }));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    getOrders(user.token).then(res => {
      console.log(res.data);
      setOrders(res.data);
    });
  };

  const showEachOrders = () =>
    orders.map((order, i) => (
      <div key={i} className='history__each'>
        <div className='history__each--orderInfo'>
          <div className='history__each--orderInfo--left'>
            <h3 className='history__h3'>
              Order Date:
              {new Date(order.createdAt).toLocaleString()}
            </h3>
            <h3 className='history__h3'>Order# {order._id}</h3>
          </div>
          <div className='history__each--orderInfo--right'>
            <div className='history__each--orderInfo--total'>
              <h3 className='history__h3'>
                <b>Total</b>
              </h3>
              <small>
                ${(order.paymentIntent.amount / 100).toLocaleString('en-US')}
              </small>
            </div>
            <div className='history__orderStatus'>
              <h3 className='history__h3'>
                <b>Order Status</b>
              </h3>
              <small>{order.orderStatus}</small>
            </div>
          </div>
        </div>

        <div className='history__each--prodInfo'>{showOrderInTable(order)}</div>
      </div>
    ));

  const showOrderInTable = order => (
    <table className='history__table'>
      <thead>
        <tr>
          <th className='history__table--th'>Image</th>
          <th className='history__table--th'>Product</th>
          <th className='history__table--th'>Price</th>
          <th className='history__table--th'>Brand</th>
          <th className='history__table--th'>Color</th>
          <th className='history__table--th'>Count</th>
          <th className='history__table--th'>Total</th>
        </tr>
      </thead>

      <tbody>
        {order.products.map((p, i) => (
          <tr key={order.i}>
            <td className='history__table--td'>
              {p.product?.images[0].url ? (
                <ModalImage
                  small={p.product.images[0].url}
                  large={p.product.images[0].url}
                  className='history__table--img'
                />
              ) : (
                <ModalImage small={defaultImage} large={defaultImage} />
              )}
            </td>
            <td className='history__table--td'>
              {p.product ? p.product.title : 'No Product'}
            </td>
            <td className='history__table--td'>
              {p.product ? `$${p.product.price.toFixed(2)}` : 'No price'}
            </td>
            <td className='history__table--td'>
              {p.product ? p.product.brand : 'No brand'}
            </td>
            <td className='history__table--td'>
              {p.product ? p.color : 'No color'}
            </td>
            <td className='history__table--td'>
              {p.product ? p.count : 'No count'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className='orders'>
      <div className='orders__sidebar'>
        <AdminSidebar />
      </div>
      <div className='orders__detail'>
        <div className='orders__wrap'>
          ORDERS
          {showEachOrders()}
        </div>
      </div>
    </div>
  );
}

export default Orders;

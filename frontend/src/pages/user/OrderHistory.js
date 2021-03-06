/** @format */

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import ModalImage from 'react-modal-image';
import { PDFDownloadLink } from '@react-pdf/renderer';

// Connections - Functions
import { getUserOrders } from '../../connections/user';

// Components
import UserSidebar from '../sidebar/UserSidebar';
import Invoice from '../../components/orders/Invoice';

//CSS & MUI Icons & Images
import './orderHistory.scss';
import { Menu } from '@mui/icons-material';
import defaultImage from '../../images/productDefault.png';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector(state => ({ ...state }));

  // CSS Responsive Purpose
  const [mobile, setMobile] = useState('0rem');
  const [filterToggle, setFilterToggle] = useState(false);

  const handleFilterToggle = () => {
    console.log('CLICKED TOGGLE');
    setFilterToggle(!filterToggle);
    console.log('TOGGLE', filterToggle);

    if (filterToggle) {
      setMobile('0rem');
      console.log('current toggle', filterToggle);
    } else if (!filterToggle) {
      setMobile('-24rem');
      console.log('current toggle', filterToggle);
    }
  };

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () =>
    getUserOrders(user.token).then(res => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

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
            <div className='history__orderStatus'>
              <h3 className='history__h3'>
                <b>Order Status</b>
              </h3>
              <small>{order.orderStatus}</small>
            </div>
            <div className='history__subTotal'>
              <h3 className='history__h3'>
                <b>Sub Total</b>
              </h3>
              <small>
                ${(order.paymentIntent.amount / 100).toLocaleString('en-US')}
              </small>
            </div>
            {showDownloadLink(order)}
          </div>
        </div>
        <div className='history__each--prodInfo'>{showOrderInTable(order)}</div>
      </div>
    ));

  const showDownloadLink = order => (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      fileName='invoice.pdf'
      className='invoice'
    >
      <div className='history__each--pdf'>
        <b>Download Invoice</b>
      </div>
    </PDFDownloadLink>
  );

  const showOrderInTable = order => (
    <table className='history__table'>
      <thead>
        <tr>
          <th className='history__table--th'>Image</th>
          <th className='history__table--th'>Product</th>
          <th className='history__table--th'>Brand</th>
          <th className='history__table--th'>Color</th>
          <th className='history__table--th'>Count</th>
          <th className='history__table--th'>Price</th>
          <th className='history__table--th'>Tax</th>
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
              {p.product ? p.product.brand : 'No brand'}
            </td>
            <td className='history__table--td'>
              {p.product ? p.color : 'No color'}
            </td>
            <td className='history__table--td'>
              {p.product ? p.count : 'No count'}
            </td>
            <td className='history__table--td'>
              {p.product ? `$${p.product.price.toFixed(2)}` : 'No price'}
            </td>
            <td className='history__table--td'>
              ${(p.product.price * 0.05).toFixed(2)}
            </td>
            <td className='history__table--td'>
              ${(p.product.price * 0.05 + p.product.price).toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className='history'>
      <div className='history__sidebar' style={{ marginLeft: mobile }}>
        <label id='ToggleSidebar'>
          <input
            type='checkbox'
            id='ToggleSidebar--input'
            for='ToggleSidebar'
          />
          <Menu id='ToggleSidebar--icon' onClick={() => handleFilterToggle()} />
        </label>
        <UserSidebar />
      </div>
      <div className='history__detail'>
        <div className='history__detail--container'>
          {orders.length > 0 ? (
            <h3 className='history__detail--title'>Your Orders</h3>
          ) : (
            <h3 className='history__detail--title'>No Purchase Orders</h3>
          )}
          {showEachOrders()}
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;

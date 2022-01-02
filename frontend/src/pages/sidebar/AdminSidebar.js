/** @format */

import React from 'react';
import { Link } from 'react-router-dom';

// CSS & MUI icons
import './sidebar.scss';
import {
  Label,
  ViewList,
  AddBox,
  ReceiptLong,
  ManageAccounts,
  LocalActivity,
  LabelImportant,
  Menu,
} from '@mui/icons-material';

function AdminSidebar() {
  return (
    <div className='sidebar'>
      <Link to='/admin/product/create' className='sidebar__link'>
        <div className='sidebar__option sidebar__option--top'>
          <AddBox className='sidebar__icon' />
          Add Product
        </div>
      </Link>
      <Link to='/admin/products'>
        <div className='sidebar__option'>
          <ViewList className='sidebar__icon' />
          Products list
        </div>
      </Link>
      <Link to='/admin/category'>
        <div className='sidebar__option '>
          <Label className='sidebar__icon' />
          Category
        </div>
      </Link>
      <Link to='/admin/subcategory'>
        <div className='sidebar__option '>
          <LabelImportant className='sidebar__icon' />
          Sub Category
        </div>
      </Link>
      {/* <Link to='/admin/coupon'>
        <div className='sidebar__option '>
          <LocalActivity className='sidebar__icon' />
          Coupon
        </div>
      </Link> */}
      <Link to='/admin/orders'>
        <div className='sidebar__option'>
          <ReceiptLong className='sidebar__icon' />
          Orders
        </div>
      </Link>
      <Link to='/admin/dashboard'>
        <div className='sidebar__option '>
          <ManageAccounts className='sidebar__icon' />
          Admin Account
        </div>
      </Link>
    </div>
  );
}

export default AdminSidebar;

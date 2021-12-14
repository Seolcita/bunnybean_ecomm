/** @format */

import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { auth } from './firebase';
import { useDispatch } from 'react-redux'; //react hook
import { currentUser } from './connections/auth';

// Pages
import Navbar from './pages/nav/Navbar';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RegisterComplete from './pages/auth/RegisterComplete';
import ForgotPassword from './pages/auth/ForgotPassword';
import OrderHistory from './pages/user/OrderHistory';
import UserRoute from './components/routes/UserRoute';
import Account from './pages/user/Account';
import Wishlist from './pages/user/Wishlist';
import AdminRoute from './components/routes/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import Category from './pages/admin/category/Category';
import CategoryUpdate from './pages/admin/category/CategoryUpdate';
import SubCategory from './pages/admin/subcategory/SubCategory';
import SubCategoryUpdate from './pages/admin/subcategory/SubCategoryUpdate';
import Product from './pages/admin/product/Product';
import ProductsList from './pages/admin/product/ProductsList';
import ProductUpdate from './pages/admin/product/ProductUpdate';
import SingleProduct from './pages/SingleProduct';

// CSS
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const dispatch = useDispatch();

  // To check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      console.log('USER >>>>>>>', user);
      // If there is user, update the info into redux store/state
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
          .then(res => {
            console.log('CREATE OR UPDATE USER RES ---', res);
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch(err => console.log(err));
      }
    });
    // Cleanup - to prevent memory leak
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <ToastContainer />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/register/complete' component={RegisterComplete} />
        <Route exact path='/forgot/password' component={ForgotPassword} />
        <Route exact path='/product/:slug' component={SingleProduct} />
        <UserRoute exact path='/user/history' component={OrderHistory} />
        <UserRoute exact path='/user/account' component={Account} />
        <UserRoute exact path='/user/wishlist' component={Wishlist} />
        <AdminRoute exact path='/admin/dashboard' component={AdminDashboard} />
        <AdminRoute exact path='/admin/category' component={Category} />
        <AdminRoute
          exact
          path='/admin/category/:slug'
          component={CategoryUpdate}
        />
        <AdminRoute exact path='/admin/subcategory' component={SubCategory} />
        <AdminRoute
          exact
          path='/admin/subcategory/:slug'
          component={SubCategoryUpdate}
        />
        <AdminRoute exact path='/admin/product/create' component={Product} />
        <AdminRoute exact path='/admin/products' component={ProductsList} />
        <AdminRoute
          exact
          path='/admin/product/:slug'
          component={ProductUpdate}
        />
      </Switch>
    </>
  );
};

export default App;

/** @format */

import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { auth } from './firebase';
import { useDispatch } from 'react-redux'; //react hook
import { currentUser } from './connections/auth';

// CSS
import 'react-toastify/dist/ReactToastify.css';

// Pages
// import Navbar from './pages/nav/Navbar';
// import SideDrawer from './pages/drawer/SideDrawer';
// import Home from './pages/Home';
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';
// import RegisterComplete from './pages/auth/RegisterComplete';
// import ForgotPassword from './pages/auth/ForgotPassword';
// import OrderHistory from './pages/user/OrderHistory';
// import UserRoute from './components/routes/UserRoute';
// import Account from './pages/user/Account';
// import Wishlist from './pages/user/Wishlist';
// import AdminRoute from './components/routes/AdminRoute';
// import AdminDashboard from './pages/admin/AdminDashboard';
// import Category from './pages/admin/category/Category';
// import CategoryUpdate from './pages/admin/category/CategoryUpdate';
// import SubCategory from './pages/admin/subcategory/SubCategory';
// import SubCategoryUpdate from './pages/admin/subcategory/SubCategoryUpdate';
// import Product from './pages/admin/product/Product';
// import ProductsList from './pages/admin/product/ProductsList';
// import ProductUpdate from './pages/admin/product/ProductUpdate';
// import SingleProduct from './pages/SingleProduct';
// import NewArrivals from './pages/category/NewArrivals';
// import BestSellers from './pages/category/BestSellers';
// import CategoryProducts from './pages/category/CategoryProducts';
// import SubProducts from './pages/subCategory/SubProducts';
// import Shop from './pages/Shop';
// import Cart from './pages/Cart';
// import Checkout from './pages/Checkout';
// import Payment from './pages/Payment';
// import Orders from './pages/admin/order/Orders';

// CODE SPLIT - Load on demand using lazy (except 'SideDrawer')
import SideDrawer from './pages/drawer/SideDrawer';
const Navbar = lazy(() => import('./pages/nav/Navbar'));
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const RegisterComplete = lazy(() => import('./pages/auth/RegisterComplete'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const OrderHistory = lazy(() => import('./pages/user/OrderHistory'));
const UserRoute = lazy(() => import('./components/routes/UserRoute'));
const Account = lazy(() => import('./pages/user/Account'));
const Wishlist = lazy(() => import('./pages/user/Wishlist'));
const AdminRoute = lazy(() => import('./components/routes/AdminRoute'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const Category = lazy(() => import('./pages/admin/category/Category'));
const CategoryUpdate = lazy(() =>
  import('./pages/admin/category/CategoryUpdate')
);
const SubCategory = lazy(() => import('./pages/admin/subcategory/SubCategory'));
const SubCategoryUpdate = lazy(() =>
  import('./pages/admin/subcategory/SubCategoryUpdate')
);
const Product = lazy(() => import('./pages/admin/product/Product'));
const ProductsList = lazy(() => import('./pages/admin/product/ProductsList'));
const ProductUpdate = lazy(() => import('./pages/admin/product/ProductUpdate'));
const SingleProduct = lazy(() => import('./pages/SingleProduct'));
const NewArrivals = lazy(() => import('./pages/category/NewArrivals'));
const BestSellers = lazy(() => import('./pages/category/BestSellers'));
const CategoryProducts = lazy(() =>
  import('./pages/category/CategoryProducts')
);
const SubProducts = lazy(() => import('./pages/subCategory/SubProducts'));
const Shop = lazy(() => import('./pages/Shop'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Payment = lazy(() => import('./pages/Payment'));
const Orders = lazy(() => import('./pages/admin/order/Orders'));

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
    <Suspense fallback='Loading'>
      <Navbar />
      <SideDrawer />
      <ToastContainer />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/register/complete' component={RegisterComplete} />
        <Route exact path='/forgot/password' component={ForgotPassword} />
        <Route exact path='/category/newarrivals' component={NewArrivals} />
        <Route exact path='/category/bestsellers' component={BestSellers} />
        <Route exact path='/subcategory/:slug' component={SubProducts} />
        <Route exact path='/category/:slug' component={CategoryProducts} />
        <Route exact path='/product/:slug' component={SingleProduct} />
        <Route exact path='/shop' component={Shop} />
        <Route exact path='/cart' component={Cart} />

        <UserRoute exact path='/user/history' component={OrderHistory} />
        <UserRoute exact path='/user/account' component={Account} />
        <UserRoute exact path='/user/wishlist' component={Wishlist} />
        <UserRoute exact path='/checkout' component={Checkout} />
        <UserRoute exact path='/payment' component={Payment} />

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
        <AdminRoute exact path='/admin/orders' component={Orders} />
      </Switch>
    </Suspense>
  );
};

export default App;

import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Dashboard from './components/pages/Dashboard';
import DashboardLayout from './layouts/DashboardLayout';
import Banners from './components/pages/Banners';
import Products from './components/pages/Products';
import AddBanner from './components/pages/AddBanner';
import ProtectedRoute from './components/common/ProtectedRoute';
import EditBanner from './components/pages/EditBanner';
import AddProduct from './components/pages/AddProduct';
import EditProduct from './components/pages/EditProduct';
import ForgetPassword from './components/pages/ForgetPassword';

export default function AppRoutes() {
  return (
    <Routes>
          <Route path='/login' element={<ProtectedRoute shouldLoggedIn={false} component={Login}/>} />
          <Route path='/signup' element={<ProtectedRoute shouldLoggedIn={false} component={Signup}/>} />
          <Route path='/forget-password' element={<ProtectedRoute shouldLoggedIn={false} component={ForgetPassword}/>} />
          <Route path='/' element={<ProtectedRoute shouldLoggedIn={true} component={DashboardLayout}/>}>
            <Route index element={<Navigate to='/dashboard' />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/banners' element={<Banners />} />
            <Route path='/products' element={<Products />} />
            <Route path='/add-banner' element={<AddBanner />} />
            <Route path='/edit-banner' element={<EditBanner />} />
            <Route path='/add-product' element={<AddProduct />} />
            <Route path='/edit-product' element={<EditProduct />} />
          </Route>
    </Routes>
  );
}
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Dashboard from "./components/pages/Dashboard";
import DashboardLayout from "./layout/DashboardLayout";
import Banners from "./components/pages/Banners";
import Products from "./components/pages/Products";
import AddBanner from "./components/pages/AddBanner";
import ProtectedRoute from "./components/common/ProtectedRoute";

export default function AppRoutes() {

  return(
  <Routes>
          <Route path='/login' element={<ProtectedRoute shouldLoggedIn={false} component={Login}/>} />
          <Route path='/signup' element={<ProtectedRoute shouldLoggedIn={false} component={Signup}/>} />
          <Route path='/' element={<ProtectedRoute shouldLoggedIn={true} component={DashboardLayout}/>}>
            <Route index element={<Navigate to='/dashboard' />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/banners' element={<Banners />} />
            <Route path='/products' element={<Products />} />
            <Route path='/add-banner' element={<AddBanner />} />
          </Route>
    </Routes>
  );
}

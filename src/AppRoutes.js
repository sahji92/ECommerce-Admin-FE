import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";
import { getCookie } from "./utils/getCookie";
import DashboardLayout from "./layout/DashboardLayout";
import Banners from "./components/pages/Banners";
import Products from "./components/pages/Products";
import AddBanner from "./components/pages/AddBanner";

export default function AppRoutes() {
  return getCookie("token") ? (
    <Routes>
      <Route path="/login" element={<Navigate to="/dashboard" />} />
      <Route path="/signup" element={<Navigate to="/dashboard" />} />
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/banners" element={<Banners />} />
        <Route path='/add-banner' element={<AddBanner/>}/>
        <Route path="/products" element={<Products />} />
      </Route>
    </Routes>
  ) : (
    <Routes>
      <Route path="/login" element={<Navigate to="/dashboard" />} />
      <Route path="/signup" element={<Navigate to="/dashboard" />} />
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/login" />} />
        <Route path="/dashboard" element={<Login />} />
        <Route path="/banners" element={<Login />} />
        <Route path='/add-banner' element={<Login/>}/>
        <Route path="/products" element={<Login />} />
      </Route>
    </Routes>
  );
}

// frontend/src/components/AdminRoute.js
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminRoute = () => {
  const { state } = useContext(AuthContext);
  const { userInfo } = state;

  // Check karo ki user logged in hai aur admin bhi hai
  return userInfo && userInfo.isAdmin ? (
    <Outlet /> // Agar admin hai, toh child routes (jaise ProductListScreen) dikhao
  ) : (
    <Navigate to="/login" replace /> // Varna login page par bhej do
  );
};

export default AdminRoute;
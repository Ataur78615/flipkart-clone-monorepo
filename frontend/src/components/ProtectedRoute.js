import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = () => {
    const { state } = useContext(AuthContext);
    const { userInfo } = state;

    // agar user logged in hai, toh use <Outlet /> (yaani jo bhi child route hai) par jaane do
    // Varna use <Navigate /> se /login page par  bhej do
    return userInfo ? <Outlet /> : <Navigate to="/login" replace />;

};

export default ProtectedRoute;
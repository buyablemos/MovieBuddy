import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = !!localStorage.getItem('token') || !!sessionStorage.getItem('token');
    return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;

import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export const PrivateWrapper= () => {
    const auth = useAuth();
    
    return auth?.isLoggedIn ? <Outlet /> : <Navigate to="/404" />;
  };

  export const PublicWrapper= () => {
    const auth = useAuth();    
    return auth?.isLoggedIn ? <Navigate to="/" /> : <Outlet /> ;
  };
import React from 'react'
import { UseAuth } from '../context/authContext';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { user, loading } = UseAuth();

 if (loading) {
  return (
    <div className='flex items-center justify-center h-screen'>
      <p className='text-2xl font-medium text-slate-600'>Loading...</p>
    </div>
  )
}
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
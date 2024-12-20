import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';

const ProtectedRoute = ({children}) => {

  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    // Navigate to the login page if not authenticated
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // You can return a loading indicator while authentication is being checked
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Optional: Can replace with a spinner or loading component
  }

  return isAuthenticated ? <Layout>{children}</Layout> :  null;         
};

export default ProtectedRoute;

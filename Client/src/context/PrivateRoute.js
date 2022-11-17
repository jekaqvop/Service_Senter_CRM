import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({children }) => {
  const { auth } = useContext(AuthContext);
  const { loading } = auth;
  if (loading) {
    return (    
          <p>Loading...</p>   
    );
  }
   return auth.data ? children : <Navigate to="/Login" />;
};

export default PrivateRoute;

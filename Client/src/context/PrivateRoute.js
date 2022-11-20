import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import axios from '../api/axios';

const Auth_URL = "/api/Auth/User";

const checkAuth = async () =>  {

  try {
    const response = await axios.get(
      Auth_URL,				
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );  
    
  return true;
  } catch (err) {
    console.log("error");
    return false;
  }
  
}



const  PrivateRoute = ({children }) => {
  const { auth } = useContext(AuthContext);
  const { loading } = auth;
  const[isAuth, steIsAuth] = useState(false);

  //useEffect(()=> {
  //  setisAuth(checkAuth());
  //  console.log("useeff");   
  //// eslint-disable-next-line react-hooks/exhaustive-deps
  //}, []);
  useEffect( () => {
    (
      async () =>  {

        try {
          const response = await axios.get(
            Auth_URL,				
            {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true,
            }
          );  
          
          steIsAuth(response?.data?.success);
          
        //console.log(isAuth + " responce");
        } catch (err) {
          //console.log("error");
          steIsAuth(false);
        }
        
      }
    )(); }, [])

  if (loading || !isAuth) { // исправить этот момент 
    setTimeout(
      () => {
        steIsAuth(true);
      },
      1 * 1000
    );
       return (    
          <p>Loading...</p>   
    );
  }  
  //console.log(isAuth + " return");
   return (auth.data && isAuth) ? children : <Navigate to="/Login" />;
};

export default PrivateRoute;

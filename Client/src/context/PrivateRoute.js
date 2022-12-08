import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import axios from '../api/axios';

const Auth_URL = "/api/Auth/User";

//const checkAuth = async () =>  {
//
//  try {
//    const response = await axios.get(
//      Auth_URL,				
//      {
//        headers: { 'Content-Type': 'application/json' },
//        withCredentials: true,
//      }
//    );  
//    
//  return true;
//  } catch (err) {
//    console.log("error");
//    return false;
//  }
//  
//}



const  PrivateRoute = ({children }) => {
  const { auth } = useContext(AuthContext);
  const { loading } = auth;
  const[isAuth, setIsAuth] = useState();
  const[statusCode, setStatusCode] = useState(400);
  const[loading2, setLoading2] = useState(true);

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
          
          
          setStatusCode(response?.status);
          setIsAuth(response?.data?.success);
        //console.log(isAuth + " responce");
        } catch (err) {
          //console.log("error");
          setStatusCode(err?.response?.status);
          setIsAuth(false);
        }
        
      }
    )(); }, [])

    useEffect(()=>{     
      if(isAuth === false || isAuth === true){
        setLoading2(false);
      }        
    }, [statusCode, isAuth]);


  if (loading ) { 
       return (    
        <div id='BackgroundBody'>
          <p>Loading...</p>   
        </div>         
    );
  }  
  else if(loading2){
        return (    
          <div id='BackgroundBody'>
            <p>Loading...</p>   
          </div>          
    );
  }
  //(statusCode < 400 || statusCode >= 500) 
   return (auth.data && isAuth && statusCode !== 401) ? children : <Navigate to="/Login" />;
};

export default PrivateRoute;

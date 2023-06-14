import React from "react";
import "./CSS/Error.css";
 import { Link, useNavigate } from "react-router-dom";
const ErrorPage = () => {
 
  let navigate = useNavigate(); 
      const routeChange = (url) =>{ 
          
          navigate(url);
      }

  return (
        <>

        <div className="background">
        <i className='bx bx-receipt'></i>
        <div className="content">
            <Link to="/" >
              Перейти к главной странице
            </Link>
        </div>
        </div>
    
        </>
  );
};

export default ErrorPage;

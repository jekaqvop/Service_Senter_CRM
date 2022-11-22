import React, {useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import axios from '../api/axios';

const LOGOUT_URL = "/api/Auth/logout";

const LOGOUTFUN = async () => {

  try {
    const response = await axios.get(
      LOGOUT_URL,				
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

const Panel = () => {
  const { setAuthData, auth } = useContext(AuthContext);
  const onLogOut = () => {
    setAuthData(null);
    LOGOUTFUN();
  } //clearing the context
  return (
    <>

    <div
      style={{ height: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <div style={{ width: 300 }}>
        <h1 className="text-center"> {`Hello, ${auth.data}`} </h1>
        <button
          variant="primary"
          type="button"
          className="w-100 mt-3"
          onClick={onLogOut}
        >
          Log out
        </button>
      </div>
    </div>
  </>
  );
};

export default Panel;

import React, {useContext} from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";


const Panel = () => {
  const { setAuthData, auth } = useContext(AuthContext);
  const onLogOut = () => {
    setAuthData(null);
  } //clearing the context
  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <div style={{ width: 300 }}>
        <h1 className="text-center"> {`Hello, ${auth.data}`} </h1>
        <Button
          variant="primary"
          type="button"
          className="w-100 mt-3"
          onClick={onLogOut}
        >
          Log out
        </Button>
      </div>
    </div>
  );
};

export default Panel;

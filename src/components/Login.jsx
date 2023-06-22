import React from "react";
import LoginForm from "./LoginForm";
import Registration from "./Registration";
import Button from 'react-bootstrap/Button';

const Login = ({ isLoggedIn, setIsLoggedIn, setToken }) => {
  return (
    <div id="login-page">
      {!isLoggedIn ?
        <>
          <LoginForm setIsLoggedIn={setIsLoggedIn} setToken={setToken} />
          <Registration setIsLoggedIn={setIsLoggedIn} setToken={setToken} />
        </>
        :
        <>
          <h1>You are Logged In</h1>
          <Button variant="secondary" onClick={() => {
            setIsLoggedIn(false);
            setToken('');
            localStorage.removeItem("token");
          }}>Logout</Button>
        </>
      }

    </div>
  )
}

export default Login;

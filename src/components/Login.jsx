import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import Registration from "./Registration";

const Login = ({ isLoggedIn, setIsLoggedIn, token, setToken }) => {
  return (
    <div>
      {!isLoggedIn ?
        <>
          <LoginForm setIsLoggedIn={setIsLoggedIn} setToken={setToken} />
          <Registration setIsLoggedIn={setIsLoggedIn} setToken={setToken} />
        </>
        : <h1>You are Logged In</h1>}
    </div>
  )
}

export default Login;

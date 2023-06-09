import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import Registration from "./Registration";

const Login = ({ isLoggedIn, setIsLoggedIn, token, setToken }) => {
  return (
    <div>
      <h1>
        Login/LogOut
      </h1>
      <LoginForm setIsLoggedIn={setIsLoggedIn} setToken={setToken} />
      <Registration setIsLoggedIn={setIsLoggedIn} setToken={setToken} />
    </div>
  )
}

export default Login;

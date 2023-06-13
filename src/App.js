import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Posts from "./components/Posts";
import Profile from "./components/Profile";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    console.log(token);
  }, [token]);

  return (
    <BrowserRouter>
      <div className="App">
        <h1>Stranger's Things</h1>
        <div>
          <ul>
            <li>
              <Link to="/Home">Home</Link>
            </li>
            <li>
              <Link to="/Posts">Posts</Link>
            </li>
            <li>
              <Link to="/Profile">Profile</Link>
            </li>
            <li>
              <Link to="/Login">Login</Link>
            </li>
          </ul>
        </div>
        <div>
          <Route path="/Home">
            <Home />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/Posts">
            <Posts isLoggedIn={isLoggedIn} token={token} />
          </Route>
          <Route path="/Login">
            <Login
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              token={token}
              setToken={setToken}
            />
          </Route>
          <Route path="/Profile">
            <Profile isLoggedIn={isLoggedIn} token={token} />
          </Route>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

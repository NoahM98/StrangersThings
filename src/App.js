import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
// import PostCards from "./components/PostCards";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState('');
    useEffect(() => {
        console.log(isLoggedIn)
    }, [isLoggedIn])
    useEffect(() => {
        console.log(token)
    }, [token])
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
                    <Route path="/Login">
                        <Login
                            isLoggedIn={isLoggedIn}
                            setIsLoggedIn={setIsLoggedIn}
                            token={token}
                            setToken={setToken} />
                    </Route>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

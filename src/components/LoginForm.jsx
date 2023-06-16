import React, { useState, useEffect } from "react";
import { loginUser } from "../api/ajax-helpers";

const LoginForm = ({ setIsLoggedIn, setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    return (
        <form onSubmit={async (event) => {
            event.preventDefault();
            if (username.length >= 6 && password.length >= 6 &&
                !(username.indexOf(' ') >= 0) && !(password.indexOf(' ') >= 0)) {
                console.log("Valid Form")
                const result = await loginUser(username, password);
                if (result.data !== null) {
                    alert(result.data.message);
                    setIsLoggedIn(true);
                    setToken(result.data.token);
                    localStorage.setItem("token", result.data.token);
                } else {
                    alert(result.error.message);
                }
            } else {
                console.log("Invalid Form")
            }

        }}>
            <h2>Login</h2>
            <fieldset>
                <div>
                    <label htmlFor="user-name">
                        Username:
                    </label>
                    <input
                        id="user-name"
                        type="text"
                        placeholder="Enter Username"
                        required
                        value={username}
                        onChange={(event) => {
                            setUsername(event.target.value);

                        }}

                    />
                </div>
                <div>
                    <label htmlFor="pass-word">
                        Password:
                    </label>
                    <input
                        id="pass-word"
                        type="password"
                        placeholder="Enter Password"
                        required
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);

                        }}

                    />
                </div>
                <button type='submit'>Submit</button>
            </fieldset>
        </form>
    )
}

export default LoginForm;

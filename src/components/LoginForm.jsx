import React, { useState, useEffect } from "react";
import { loginUser } from "../api/ajax-helpers";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const LoginForm = ({ setIsLoggedIn, setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    return (
        <Form className="form mt-5 p-3 border border-3 border-danger rounded" onSubmit={async (event) => {
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

            <Form.Group className="m-2">
                <Form.Label htmlFor="user-name">
                    Username:
                </Form.Label>
                <Form.Control
                    id="user-name"
                    type="text"
                    placeholder="Enter Username"
                    required
                    value={username}
                    onChange={(event) => {
                        setUsername(event.target.value);

                    }}
                />
            </Form.Group>
            <Form.Group className="m-2">
                <Form.Label htmlFor="pass-word">
                    Password:
                </Form.Label>
                <Form.Control
                    id="pass-word"
                    type="password"
                    placeholder="Enter Password"
                    required
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value);

                    }}

                />
            </Form.Group>
            <Button className="m-2" variant="secondary" type='submit'>Submit</Button>
        </Form>
    )
}

export default LoginForm;

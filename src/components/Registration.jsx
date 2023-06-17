import React, { useState, useEffect } from "react";
import { registerUser } from "../api/ajax-helpers";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Registration = ({ setIsLoggedIn, setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [response, setResponse] = useState('');

  useEffect(() => {
    console.log(response)
  }, [response]);

  return (
    <Form className="form m-5 p-3 border border-3 border-danger rounded" onSubmit={async (event) => {
      event.preventDefault();
      if (username.length >= 6 && password.length >= 6 && password === confirmPassword &&
        !(username.indexOf(' ') >= 0) && !(password.indexOf(' ') >= 0)) {
        console.log("Valid Form")
        const result = await registerUser(username, password);
        setResponse(result);
        if (result.data.message) {
          alert(result.data.message);
        } else if (result.error.message) {
          alert(result.error.message);
        }
      } else {
        console.log("Invalid Form")
      }

    }}>
      <h2>Registration</h2>
      <Form.Group className="m-2">
        <Form.Label htmlFor="userName">
          Username:
        </Form.Label>
        <Form.Control
          id="userName"
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
        <Form.Label htmlFor="passWord">
          Password:
        </Form.Label>
        <Form.Control
          id="passWord"
          type="password"
          placeholder="Enter Password"
          required
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);

          }}

        />
      </Form.Group>
      <Form.Group className="m-2">
        <Form.Label htmlFor="confirm-passWord">
          Confirm Password:
        </Form.Label>
        <Form.Control
          id="confirm-passWord"
          type="password"
          placeholder="Confirm Password"
          required
          value={confirmPassword}
          onChange={(event) => {
            setConfirmPassword(event.target.value);

          }}

        />
      </Form.Group>
      <Button className="m-2" variant="secondary" type='submit'>Submit</Button>
    </Form>


  )

}


export default Registration;

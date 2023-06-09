import React, { useState, useEffect } from "react";
import { registerUser } from "../api/ajax-helpers";

const Registration = ({ setIsLoggedIn, setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [response, setResponse] = useState('');

  useEffect(() => {
    console.log(response)
  }, [response]);

  return (
    <form onSubmit={async (event) => {
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
      <h2> Registration Form </h2>
      <fieldset>
        <div>
          <label htmlFor="userName">
            Username:
          </label>
          <input
            id="userName"
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
          <label htmlFor="passWord">
            Password:
          </label>
          <input
            id="passWord"
            type="password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);

            }}

          />
        </div>
        <div>
          <label htmlFor="confirm-passWord">
            Confirm Password:
          </label>
          <input
            id="confirm-passWord"
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);

            }}

          />
        </div>
        <button type='submit'>Submit</button>
      </fieldset>
    </form>


  )

}


export default Registration;

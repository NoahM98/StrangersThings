import React, {useState, useEffect} from "react";
import { registerUser } from "../api/ajax-helpers";

const Registration=()=> {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  useEffect(()=> {
    console.log(username)
  }, [username]);
  useEffect(()=> {
    console.log(password)
  }, [password]);
  useEffect(()=> {
    console.log(confirmPassword)
  }, [confirmPassword]);
return(
  <form onSubmit={(event)=>{
    event.preventDefault();
    if (username.length >= 6 && password.length >= 6 && password === confirmPassword) {
      console.log("Valid Form")
    } else{
      console.log("Invalid Form")
    }

  }}>
  <h2> Registration Form </h2>
  <fieldset>
    <label htmlFor="userName">
      Username:
    </label>
    <input
    id="userName"
    type="text"
    placeholder="Enter Username"
    value={username}
    onChange={(event)=> {
      setUsername(event.target.value);

    }}

    />
  </fieldset>
  <fieldset>
    <label htmlFor="passWord">
      Password:
    </label>
    <input
    id="passWord"
    type="password"
    placeholder="Enter Password"
    value={password}
    onChange={(event)=> {
      setPassword(event.target.value);

    }}

    />
  </fieldset>
  <fieldset>
    <label htmlFor="confirm-passWord">
      Password:
    </label>
    <input
    id="confirm-passWord"
    type="password"
    placeholder="Confirm Password"
    value={confirmPassword}
    onChange={(event)=> {
      setConfirmPassword(event.target.value);

    }}

    />
  </fieldset>
  <button type='submit'>Submit</button>
  </form>


)

}


export default Registration;
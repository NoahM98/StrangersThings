import React, { useState, useEffect } from "react";
import { myData } from "../api/ajax-helpers";
import AuthorPosts from "./AuthorPosts";


const Profile = ({ isLoggedIn, token }) => {
    const [myPosts, setMyPosts ] = useState([]);
   
    return (
        <div>
            <h1>Profile Page</h1>
        {isLoggedIn ?
        <AuthorPosts token={token} myPosts={myPosts} setMyPosts={setMyPosts} /> :
        <h2>Please Log In</h2>}
        </div>
    )
}
export default Profile;

import React, { useState, useEffect } from "react";
import { myData } from "../api/ajax-helpers";
import Author from "./Author";


const Profile = ({ isLoggedIn, token }) => {

    return (
        <div id="profile-page">
            <h1>Profile Page</h1>
            {isLoggedIn ?
                <Author token={token} /> :
                <h2>Please Log In</h2>}
        </div>
    )
}
export default Profile;

import React, { useState, useEffect } from "react";
import { myData } from "../api/ajax-helpers";
import Author from "./Author";


const Profile = ({ isLoggedIn, token }) => {

    return (
        <div id="profile-page">
            {isLoggedIn ?
                <Author token={token} /> :
                <>
                    <h1>Profile</h1>
                    <h2>Please login</h2>
                </>}
        </div>
    )
}
export default Profile;

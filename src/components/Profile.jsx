import React from "react";
import Author from "./Author";


const Profile = ({ isLoggedIn, token, userPosts, setUserPosts, myPosts, setMyPosts, myMessages, username }) => {

    return (
        <div id="profile-page">
            {isLoggedIn ?
                <Author
                    token={token}
                    userPosts={userPosts}
                    setUserPosts={setUserPosts}
                    myPosts={myPosts}
                    setMyPosts={setMyPosts}
                    myMessages={myMessages}
                    username={username} /> :
                <>
                    <h1>Profile</h1>
                    <h2>Please login</h2>
                </>}
        </div>
    )
}
export default Profile;

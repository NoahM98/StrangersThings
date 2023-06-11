import React, { useState } from "react";
import PostCards from "./PostCards";
import CreatePost from "./CreatePost";

const Posts = ({ isLoggedIn, token }) => {
  const [userPosts, setUserPosts] = useState([]);
  return (
    <div>
      <h1>Posts</h1>
      {isLoggedIn ?
        <CreatePost userPosts={userPosts} setUserPosts={setUserPosts} token={token} /> : null}
      <PostCards userPosts={userPosts} setUserPosts={setUserPosts} />
    </div>
  )
}

export default Posts;

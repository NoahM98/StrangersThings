import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import CreatePost from "./CreatePost";
import { fetchPosts, authorizedFetchPosts } from "../api/ajax-helpers";

const Posts = ({ isLoggedIn, token }) => {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      const postsPromise = authorizedFetchPosts(token);
      Promise.all([postsPromise])
        .then(res => setUserPosts(res[0].data.posts));
    } else {
      const postsPromise = fetchPosts();
      Promise.all([postsPromise])
        .then(res => setUserPosts(res[0].data.posts));
    }
  }, [])

  useEffect(() => {
    console.log(userPosts)
  }, [userPosts]);

  return (
    <div>
      <h1>Posts</h1>
      {isLoggedIn ?
        <CreatePost userPosts={userPosts} setUserPosts={setUserPosts} token={token} /> : null}
      {userPosts.map((el) => {
        return (
          <PostCard key={el._id} userPosts={userPosts} setUserPosts={setUserPosts} isLoggedIn={isLoggedIn} token={token} el={el} />
        )
      })}
    </div>
  )
}

export default Posts;

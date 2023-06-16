import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import CreatePost from "./CreatePost";
import { fetchPosts, authorizedFetchPosts } from "../api/ajax-helpers";

const Posts = ({ isLoggedIn, token }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  
  function postMatches(post, text) {
    if (post.title.includes(text) || post.description.includes(text) || post.price.includes(text) || post.location.includes(text)) {
      return true;
  
    } else {
      return false;
    }
  }
  
  const filteredPosts = userPosts.filter(post => postMatches(post, searchTerm));
  

  const postsToDisplay = searchTerm.length ? filteredPosts : userPosts;
  

  useEffect(() => {
    console.log(userPosts)
  }, [userPosts]);

  return (
    <div>
      <h1>Posts</h1>
      <form>
        <label htmlFor="search">
          Search Posts:
        </label>
        <input id="search" type="text" value={searchTerm} 
        onChange={(event) => {
          setSearchTerm(event.target.value);

        }}/>
      </form>
      {isLoggedIn ?
        <CreatePost userPosts={userPosts} setUserPosts={setUserPosts} token={token} /> : null}
      {postsToDisplay.map((el) => {
        return (
          <PostCard key={el._id} userPosts={userPosts} setUserPosts={setUserPosts} isLoggedIn={isLoggedIn} token={token} el={el} />
        )
      })}
    </div>
  )
}

export default Posts;

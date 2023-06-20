import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import CreatePost from "./CreatePost";
import { fetchPosts, authorizedFetchPosts } from "../api/ajax-helpers";
import Form from 'react-bootstrap/Form';

const Posts = ({ isLoggedIn, token }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    console.log(`LoggedIn: ${isLoggedIn}`)
    if (isLoggedIn) {
      const postsPromise = authorizedFetchPosts(token);
      Promise.all([postsPromise])
        .then(res => setUserPosts(res[0].data.posts));
    } else {
      const postsPromise = fetchPosts();
      Promise.all([postsPromise])
        .then(res => setUserPosts(res[0].data.posts));
    }
  }, [isLoggedIn])


  function postMatches(post, text) {
    if (post.title.includes(text) || post.description.includes(text) || post.price.includes(text) ||
      post.location.includes(text) || post.author.username.includes(text)) {
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
    <div id="post-page">
      <h1>Posts</h1>
      {isLoggedIn ?
        <CreatePost userPosts={userPosts} setUserPosts={setUserPosts} token={token} /> : null}
      <Form id="search-bar" className="mb-3">
        <Form.Group>
          <Form.Label htmlFor="search">
            Search Posts:
          </Form.Label>
          <Form.Control id="search" type="text"
            value={searchTerm} placeholder="search"
            onChange={(event) => {
              setSearchTerm(event.target.value);

            }} />
        </Form.Group>
      </Form>
      <div className="posts">
        {postsToDisplay.map((el) => {
          return (
            <PostCard key={el._id} userPosts={userPosts} setUserPosts={setUserPosts} isLoggedIn={isLoggedIn} token={token} el={el} />
          )
        })}
      </div>
    </div>
  )
}

export default Posts;

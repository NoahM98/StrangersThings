import React, { useState, useEffect } from "react";
import { myData } from "../api/ajax-helpers";
import { deletePost } from "../api/ajax-helpers";

const AuthorPosts = ({ token, myPosts, setMyPosts }) => {
  const [postId, setPostId] = useState('');

  useEffect(() => {
    const postsPromise = myData(token);
    Promise.all([postsPromise])
      .then((res) => {
        const filteredPosts = res[0].data.posts.filter((el) => {
          return el.active;
        })
        setMyPosts(filteredPosts);
      })
  }, [])

  const handleDelete = async (token, id) => {
    const result = await deletePost(token, id);
    if (result.success === true) {
      alert('You have successfully deleted your post.');
      const newPosts = myPosts.filter((el) => {
        return (
          el._id !== postId
        )
      })
      setMyPosts(newPosts);
    } else {
      alert('Not able to delete post.');
    }

  }
  return (
    <div>
      <h2>My Posts</h2>
      {myPosts.length ?
        myPosts.map((el, ind) => {
          return (
            <div key={ind + el}>
              <h2>{el.title}</h2>
              <h3>{el.author.username}</h3>
              <p>Price: {el.price}</p>
              <p>Description: {el.description}</p>
              <p>Location: {el.location}</p>
              <p>Will Deliver: {el.willDeliver ? "yes" : "no"}</p>
              <button>Update</button>
              <button onClick={() => {
                setPostId(el._id);
                handleDelete(token, el._id);
              }}>Delete</button>
            </div>
          )
        }) : null}
    </div>
  )
}

export default AuthorPosts;

import React, { useState, useEffect } from "react";
import { myData } from "../api/ajax-helpers";
import { deletePost } from "../api/ajax-helpers";

const AuthorPosts = ({ token, myPosts, setMyPosts }) => {
  const [postId, setPostId] = useState('');
  const [myMessages, setMyMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const postsPromise = myData(token);
    Promise.all([postsPromise])
      .then((res) => {
        const filteredPosts = res[0].data.posts.filter((el) => {
          return el.active;
        })
        setMyPosts(filteredPosts);
        const filteredMessages = res[0].data.messages.filter((el) => {
          return el.fromUser._id === res[0].data._id;
        })
        setMyMessages(filteredMessages);
        setUsername(res[0].data.username);
        setUserId(res[0].data._id);
      })
  }, [])
  useEffect(() => {
    console.log(myMessages);
  }, [myMessages])

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
                {el.messages.map((element) => {
                  return (
                    <div key={element._id}>
                      <h4>From: {element.fromUser.username}</h4>
                      <p>{element.content}</p>
                    </div>
                  )
                })}
                {/* <button>Update</button> */}
                <button onClick={() => {
                  setPostId(el._id);
                  handleDelete(token, el._id);
                }}>Delete</button>
              </div>
            )
          }) : null}
      </div>
      <div>
        <h2>My Messages</h2>
        {myMessages.map((el, ind) => {
          return (
            <div key={ind + el._id}>
              <h3>To: {el.post.author.username}</h3>
              <h4>For: {el.post.title}</h4>
              <p>{el.content}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AuthorPosts;

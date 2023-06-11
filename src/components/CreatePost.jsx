import React, { useState, useEffect } from "react";
import { makePost } from "../api/ajax-helpers";

const CreatePost = ({ userPosts, setUserPosts, token }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [willDeliver, setWillDeliver] = useState(false);
  useEffect(() => {
    console.log(willDeliver);
  }, [willDeliver]);
  return (
    <form onSubmit={async (event) => {
      event.preventDefault()
      const newPromise = await makePost(token, title, description, price, location, willDeliver);
      Promise.all([newPromise])
        .then((result) => {
          console.log(result[0]);
          setUserPosts([result[0].data.post, ...userPosts]);
        })
      // console.log(result.data.post);
      // if (result.success === true) {
      //   console.log("Valid Post");
      //   await setUserPosts([result.data.post, ...userPosts]);
      // } else {
      //   console.log("Invalid Post");
      // }
    }}>
      <h2>Create Post</h2>
      <fieldset>
        <div>
          <label htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            required
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            required
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="price">
            Price
          </label>
          <input
            id="price"
            type="text"
            required
            value={price}
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="location">
            Location
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(event) => {
              setLocation(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="willDeliver">
            Will Deliver
          </label>
          <input
            id="willDeliver"
            type="checkbox"
            onChange={(event) => {
              setWillDeliver(!willDeliver);
            }}
          />
        </div>
        <button type="submit">Create Post</button>
      </fieldset>
    </form>
  )
}

export default CreatePost;

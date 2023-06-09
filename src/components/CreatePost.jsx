import React, { useState } from "react";

const CreatePost = ({ userPosts, setUserPosts }) => {
  return (
    <form>
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
          />
        </div>
        <div>
          <label htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            required
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
          />
        </div>
        <div>
          <label htmlFor="location">
            Location
          </label>
          <input
            id="location"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="willDeliver">
            Will Deliver
          </label>
          <input
            id="willDeliver"
            type="checkbox"
          />
        </div>
      </fieldset>
    </form>
  )
}

export default CreatePost;

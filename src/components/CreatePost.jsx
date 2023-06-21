import React, { useState } from "react";
import { makePost } from "../api/ajax-helpers";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const CreatePost = ({ userPosts, setUserPosts, token, myPosts, setMyPosts }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [willDeliver, setWillDeliver] = useState(false);

  const handleSubmit = async () => {
    const result = await makePost(token, title, description, price, location, willDeliver);
    if (result.success === true) {
      alert("You successfully created a post!");
      setUserPosts([result.data.post, ...userPosts]);
      setMyPosts([...myPosts, result.data.post])
      setTitle('');
      setDescription('');
      setPrice('');
      setLocation('');
      setWillDeliver(false);
    } else {
      alert("Failed to create post");
    }
  }

  return (
    <Form className="form m-4 p-3 border border-3 border-danger rounded text-bg-light"
      onSubmit={(event) => {
        event.preventDefault()
        handleSubmit();
      }}>
      <h2>Create Post</h2>
      <Form.Group>
        <Form.Label htmlFor="title">
          Title
        </Form.Label>
        <Form.Control
          id="title"
          type="text"
          required
          value={title}
          placeholder="title"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="description">
          Description
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          id="description"
          required
          value={description}
          placeholder="description"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="price">
          Price
        </Form.Label>
        <Form.Control
          id="price"
          type="text"
          required
          value={price}
          placeholder="price"
          onChange={(event) => {
            setPrice(event.target.value);
          }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="location">
          Location
        </Form.Label>
        <Form.Control
          id="location"
          type="text"
          value={location}
          placeholder="location"
          onChange={(event) => {
            setLocation(event.target.value);
          }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="willDeliver">
          Will Deliver
        </Form.Label>
        <Form.Check
          id="willDeliver"
          type="checkbox"
          onChange={() => {
            setWillDeliver(!willDeliver);
          }}
        />
      </Form.Group>
      <Button className="m-2" variant="secondary" type="submit">Create Post</Button>
    </Form>
  )
}

export default CreatePost;

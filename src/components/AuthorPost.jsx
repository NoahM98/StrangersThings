import React, { useState, useEffect } from "react";
import { deletePost } from "../api/ajax-helpers";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const AuthorPost = ({ el, postId, setPostId, token, myPosts, setMyPosts }) => {

  useEffect(() => {
    const newPosts = myPosts.filter((el) => {
      return el._id !== postId;
    })
    setMyPosts(newPosts);
  }, [postId])

  const handleDelete = async (token, id) => {
    const result = await deletePost(token, id);
    if (result.success === true) {
      alert('You have successfully deleted your post.');
      setPostId(id);
    } else {
      alert('Not able to delete post.');
    }
    setPostId('');
  }

  return (
    <Card bg="light" className="mb-2" border="danger">
      <Card.Body>
        <Card.Title>{el.title}</Card.Title>
        <Card.Subtitle>{el.author.username}</Card.Subtitle>
        <Card.Text>Price: {el.price}</Card.Text>
        <Card.Text>Description: {el.description}</Card.Text>
        <Card.Text>Location: {el.location}</Card.Text>
        <Card.Text>Will Deliver: {el.willDeliver ? "yes" : "no"}</Card.Text>
        {el.messages.length ? <Card.Text>Messages:</Card.Text> : null}
        {el.messages.map((element) => {
          return (
            <Card key={element._id} className="mb-2">
              <Card.Body>
                <Card.Title>From: {element.fromUser.username}</Card.Title>
                <Card.Text>{element.content}</Card.Text>
              </Card.Body>
            </Card>
          )
        })}
        {/* <button>Update</button> */}
        <Button variant="secondary" onClick={() => {
          handleDelete(token, el._id);
        }}>Delete</Button>
      </Card.Body>
    </Card>
  )
}

export default AuthorPost;

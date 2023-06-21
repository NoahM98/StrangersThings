import React, { useState, useEffect } from "react";
import { deletePost } from "../api/ajax-helpers";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import UpdatePost from "./UpdatePost";

const AuthorPost = ({ el, token, myPosts, setMyPosts, userPosts, setUserPosts }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDelete = async (token, id) => {
    const result = await deletePost(token, id);
    if (result.success === true) {
      alert('You have successfully deleted your post.');
      const newMyPosts = myPosts.filter((element) => {
        return element._id !== el._id;
      })
      setMyPosts(newMyPosts);
      const newUserPosts = userPosts.filter((element) => {
        return element._id !== el._id;
      })
      setUserPosts(newUserPosts);
      // setPostId(id);
    } else {
      alert('Not able to delete post.');
    }
    // setPostId('');
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
        <Button className="m-1" variant="secondary" onClick={() => {
          handleDelete(token, el._id);
        }}>Delete</Button>
        <Button className="m-1" variant="secondary" onClick={() => {
          setIsUpdating(!isUpdating);
        }} >Update</Button>
        {isUpdating ?
          <UpdatePost
            token={token}
            el={el}
            myPosts={myPosts}
            setMyPosts={setMyPosts}
            setIsUpdating={setIsUpdating}
            userPosts={userPosts}
            setUserPosts={setUserPosts} /> : null}
      </Card.Body>
    </Card>
  )
}

export default AuthorPost;

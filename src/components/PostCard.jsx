import React, { useState, useEffect } from "react";
import { postMessage } from "../api/ajax-helpers";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';


const PostCard = ({ userPosts, setUserPosts, isLoggedIn, token, el }) => {
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        setMessageList(el.messages);
    }, [userPosts]);

    return (
        <Card>
            <Card.Body>
                <Card.Title>{el.title}</Card.Title>
                <Card.Subtitle>{el.author.username}</Card.Subtitle>
                <Card.Text>Price: {el.price}</Card.Text>
                <Card.Text>Description: {el.description}</Card.Text>
                <Card.Text>Location: {el.location}</Card.Text>
                <Card.Text>Will Deliver: {el.willDeliver ? "yes" : "no"}</Card.Text>

                {messageList.length ?
                    <Card.Text>Messages:</Card.Text> : null
                }
                {messageList.map((element, ind) => {
                    return (
                        <Card key={element._id + ind}>
                            <Card.Body>
                                <Card.Title>From: {element.fromUser.username}</Card.Title>
                                <Card.Text>{element.content}</Card.Text>
                            </Card.Body>
                        </Card>
                    )
                })}
                {el.isAuthor ?
                    null : isLoggedIn ?
                        <Form onSubmit={async (event) => {
                            event.preventDefault();
                            if (message) {
                                const response = await postMessage(el._id, token, message);
                                console.log(response)
                                if (response.success) {
                                    // await setMessageList ([response.data.messages, ...messageList]);
                                    alert(`You've sent a message to ${el.author.username}`)
                                } else {
                                    alert('Failed send message');
                                }
                                setMessage('');
                            }
                        }}>
                            <Form.Group>
                                <Form.Label htmlFor="send-message">Send Message</Form.Label>
                                <Form.Control
                                    as="textarea" rows={2}
                                    required
                                    value={message}
                                    onChange={(event) => {
                                        setMessage(event.target.value);
                                    }}
                                />
                                <Button variant="secondary" type='submit' >Send</Button>
                            </Form.Group>
                        </Form> : null}
            </Card.Body>
        </Card>
    )
}

export default PostCard;

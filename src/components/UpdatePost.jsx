import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { updatePost } from "../api/ajax-helpers";

const UpdatePost = ({ token, el, myPosts, setMyPosts, setIsUpdating, userPosts, setUserPosts }) => {
    const [title, setTitle] = useState(el.title);
    const [description, setDescription] = useState(el.description);
    const [price, setPrice] = useState(el.price);
    const [location, setLocation] = useState(el.location);
    const [willDeliver, setWillDeliver] = useState(false);

    const handleSubmit = async () => {
        const response = await updatePost(token, el._id, title, description, price, location, willDeliver);
        if (response.success === true) {
            alert("Successfully updated your post");
            response.data.post.messages = el.messages;
            const newMyPosts = myPosts.map((element) => {
                if (element._id === el._id) {
                    return response.data.post;
                } else {
                    return element;
                }
            })
            setMyPosts(newMyPosts);
            const newUserPosts = userPosts.map((element) => {
                if (element._id === el._id) {
                    return response.data.post;
                } else {
                    return element;
                }
            })
            setUserPosts(newUserPosts);
            setIsUpdating(false);
        } else if (response.success === false) {
            alert("Failed to updated post");
        }
    }

    return (
        <Form className="m-4 p-3 border border-3 border-danger rounded text-bg-light"
            onSubmit={(event) => {
                event.preventDefault();
                handleSubmit();
            }}>
            <h4>Update Post</h4>
            <Form.Group>
                <Form.Label htmlFor="title">Title</Form.Label>
                <Form.Control
                    id="title"
                    type="text"
                    required
                    value={title}
                    placeholder="title"
                    onChange={(event) => {
                        setTitle(event.target.value);
                    }} />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="description">Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    id="description"
                    required
                    value={description}
                    placeholder="description"
                    onChange={(event) => {
                        setDescription(event.target.value);
                    }} />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="price">Price</Form.Label>
                <Form.Control
                    id="price"
                    type="text"
                    required
                    value={price}
                    placeholder="price"
                    onChange={(event) => {
                        setPrice(event.target.value);
                    }} />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="location">Location</Form.Label>
                <Form.Control
                    id="location"
                    type="text"
                    value={location}
                    placeholder="location"
                    onChange={(event) => {
                        setLocation(event.target.value);
                    }} />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="willDeliver">Will Deliver</Form.Label>
                <Form.Check
                    id="willDeliver"
                    type="checkbox"
                    onChange={() => {
                        setWillDeliver(!willDeliver);
                    }} />
            </Form.Group>
            <Button className="m-2" variant="secondary" type="submit">Submit Update</Button>
        </Form>
    )
}

export default UpdatePost;

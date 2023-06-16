import React, { useState, useEffect } from "react";
import { postMessage } from "../api/ajax-helpers";

const PostCard = ({ userPosts, setUserPosts, isLoggedIn, token, el }) => {
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        setMessageList(el.messages);
    }, [userPosts]);

    return (
        <div>
            <h2>{el.title}</h2>
            <h3>{el.author.username}</h3>
            <p>Price: {el.price}</p>
            <p>Description: {el.description}</p>
            <p>Location: {el.location}</p>
            <p>Will Deliver: {el.willDeliver ? "yes" : "no"}</p>
            {messageList.map((element, ind) => {
                return (
                    <div key={element._id + ind}>
                        <h4>From: {element.fromUser.username}</h4>
                        <p>{element.content}</p>
                    </div>
                )
            })}
            {el.isAuthor ?
                null : isLoggedIn ?
                    <form onSubmit={async (event) => {
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
                        <textarea
                            required
                            value={message}
                            onChange={(event) => {
                                setMessage(event.target.value);
                            }}
                        />
                        <button type='submit' >Send Message</button>
                    </form> : null}
        </div>
    )
}

export default PostCard;

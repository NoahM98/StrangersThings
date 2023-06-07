import React, { useState, useEffect } from "react";
import { fetchPosts } from "../api/ajax-helpers";

const PostCards = () => {
    const [userPosts, setUserPosts] = useState(null);

    useEffect(() => {
        const postsPromise = fetchPosts();
        Promise.all([postsPromise])
            .then(data => setUserPosts(data[0]));
    }, [])

    useEffect(() => {
        console.log(userPosts)
    }, [userPosts]);

    return (
        <>
            {userPosts ?
                userPosts.data.posts.map((el, ind) => {
                    return (
                        <div key={ind + el}>
                            <h2>{el.title}</h2>
                            <h3>{el.author.username}</h3>
                            <p>{el.price}</p>
                            <p>{el.description}</p>
                        </div>
                    )
                }) : null}
        </>
    )
}

export default PostCards;

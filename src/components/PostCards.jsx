import React, { useState, useEffect } from "react";
import { fetchPosts } from "../api/ajax-helpers";

const PostCards = ({ userPosts, setUserPosts }) => {

    useEffect(() => {
        const postsPromise = fetchPosts();
        Promise.all([postsPromise])
            .then(res => setUserPosts(res[0].data.posts));
    }, [])

    useEffect(() => {
        console.log(userPosts)
    }, [userPosts]);

    return (
        <>
            {
                userPosts.map((el, ind) => {
                    return (
                        <div key={ind + el}>
                            <h2>{el.title}</h2>
                            <h3>{el.author.username}</h3>
                            <p>{el.price}</p>
                            <p>{el.description}</p>
                        </div>
                    )
                })
            }
        </>
    )
}

export default PostCards;

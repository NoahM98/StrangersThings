import React, { useState, useEffect } from "react";

const COHORT_NAME = '2303-ftb-et-web-pt'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`

const PostCards = () => {
    const [userPosts, setUserPosts] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/posts`)

                const result = await response.json();
                console.log(result);
                setUserPosts(result);
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
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

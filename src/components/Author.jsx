import React, { useEffect } from "react";
import AuthorPost from "./AuthorPost";
import Card from 'react-bootstrap/Card';

const Author = ({ token, userPosts, setUserPosts, myPosts, setMyPosts, myMessages, username }) => {

  useEffect(() => {
    console.log(myPosts)
  }, [myPosts])

  useEffect(() => {
    console.log(myMessages);
  }, [myMessages])

  return (
    <div className="posts">
      <h1>{username}</h1>
      <div>
        <h2>My Posts:</h2>
        {myPosts.length ?
          myPosts.map((el, ind) => {
            return (
              <AuthorPost
                key={el._id + ind}
                el={el}
                token={token}
                myPosts={myPosts}
                setMyPosts={setMyPosts}
                userPosts={userPosts}
                setUserPosts={setUserPosts} />
            )
          }) : null}
      </div>
      <div>
        <h2>My Messages:</h2>
        {myMessages.map((el, ind) => {
          return (
            <Card bg="light" className="mb-2" border="danger" key={ind + el._id}>
              <Card.Header>For: {el.post.title}</Card.Header>
              <Card.Body>
                <Card.Title>To: {el.post.author.username}</Card.Title>
                {/* <Card.Subtitle>For: {el.post.title}</Card.Subtitle> */}
                <Card.Text>{el.content}</Card.Text>
              </Card.Body>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default Author;

import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Posts from "./components/Posts";
import Profile from "./components/Profile";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { authorizedFetchPosts, fetchPosts, myData } from "./api/ajax-helpers";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [myMessages, setMyMessages] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
      const userPostsPromise = authorizedFetchPosts(storedToken);
      const myPostsPromise = myData(storedToken);
      Promise.all([userPostsPromise, myPostsPromise])
        .then((response) => {
          console.log(response);
          setUserPosts(response[0].data.posts);
          setUsername(response[1].data.username);
          const filteredPosts = response[1].data.posts.filter((el) => {
            return el.active;
          })
          setMyPosts(filteredPosts);
          const filteredMessages = response[1].data.messages.filter((el) => {
            return el.fromUser._id === response[1].data._id;
          })
          setMyMessages(filteredMessages);
        });
    } else {
      const postsPromise = fetchPosts();
      Promise.all([postsPromise])
        .then(res => setUserPosts(res[0].data.posts));
    }
  }, [token]);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar sticky="top" bg="danger" variant="dark" expand="lg">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Stranger's Things</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Nav className="mr-auto">
                <LinkContainer to="/Home">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/Posts">
                  <Nav.Link>Posts</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/Profile">
                  <Nav.Link>Profile</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/Login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div>
          <Route path="/Home">
            <Home />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/Posts">
            <Posts
              isLoggedIn={isLoggedIn}
              token={token}
              userPosts={userPosts}
              setUserPosts={setUserPosts}
              myPosts={myPosts}
              setMyPosts={setMyPosts}
              username={username} />
          </Route>
          <Route path="/Login">
            <Login
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              setToken={setToken} />
          </Route>
          <Route path="/Profile">
            <Profile
              isLoggedIn={isLoggedIn}
              token={token}
              userPosts={userPosts}
              setUserPosts={setUserPosts}
              myPosts={myPosts}
              setMyPosts={setMyPosts}
              myMessages={myMessages}
              username={username} />
          </Route>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

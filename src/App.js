import React from "react"
import { BrowserRouter } from "react-router-dom";
import PostCards from "./components/PostCards";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <h1>Stranger's Things (local)</h1>
                <PostCards />
            </div>
        </BrowserRouter>
    );
}

export default App;

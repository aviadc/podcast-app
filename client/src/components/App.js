import React from "react";
import "../index.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Home";
import HomePodcastsList from "./HomePodcastsList";
import Login from "./Login";
import About from "./About";
import Profile from "./Profile";
import Register from "./Register";



const App = ()=>{



  return (
    <div>
      <BrowserRouter>
        <Routes>   
          <Route path="/" element={<Home />} />
          <Route path="/podcasts" element={<HomePodcastsList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
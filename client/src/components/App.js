import React from "react";
import "../index.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import HomePodcastsList from "./HomePodcastsList";
import Login from "./pages/Login";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import AddCollection from "./pages/AddCollection";
import Collection from "./pages/Collection";



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
          <Route path="/addCollection" element={<AddCollection />} />
          <Route path="/Collection" element={<Collection />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
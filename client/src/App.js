import React from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home/index";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import Register from "./components/pages/Register";
import AddCollection from "./components/pages/AddCollection";
import Collection from "./components/pages/Collection";
import AddPodcasts from "./components/pages/AddPodcasts";
import Navbar from "./components/Navbar";
import PodcastCollectionsList from "./components/pages/PodcastsCollectionsList";
import videoBg from "./assets/videos/video_bg.mp4"

const App = () => {

  return (
    <div className="app-page">
      <video className='video-bg' autoPlay muted loop>
        <source src={videoBg} type='video/mp4' />
      </video>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/podcasts" element={<PodcastCollectionsList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addCollection" element={<AddCollection />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/addPodcasts" element={<AddPodcasts />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
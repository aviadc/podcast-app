import React from "react";
import "../index.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home/index";
// import HomePodcastsList from "./pages/HomePodcastsList";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import AddCollection from "./pages/AddCollection";
import Collection from "./pages/Collection";
import AddPodcasts from "./pages/AddPodcasts";
import Navbar from "./Navbar";
import PodcastCollectionsList from "./pages/PodcastsCollectionsList";

const App = ()=>{

  return (
    <div>
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
import React from 'react';
import MainNavbar from '../navabrs/MainNavbar';
import '../css/home.css'

function Home() {
  return (
      <div className='home-page'>
        <MainNavbar />
        <div className='home-container'>
          <div className='home-inner'>
            <h3>welcome to podco</h3>
            <h3>in podco you can create your own podcast channel for free!</h3>
            <h3>you can listen to all podcasts in website </h3>
          </div>
        </div>
      </div>
  ) 
}

export default Home;

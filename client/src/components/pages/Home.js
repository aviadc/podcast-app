import React from 'react';
import MainNavbar from '../navabrs/MainNavbar';
import '../css/home.css'

function Home() {
  return (
      <div className='home-page'>
        <MainNavbar />
        <div className='home-container'>
          <div className='home-inner'>
            <h3 className='home-welcome'>welcome to podco</h3>
            <h3 className='home-sub-welcom'>in podco you can create your </h3>
            <h3 className='home-sub-welcom'>own podcast channel for free!</h3>
          </div>
        </div>
      </div>
  ) 
}

export default Home;

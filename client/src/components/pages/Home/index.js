import React from 'react'
import StyledContainer from '../../styledComponents/StyledContainer'
import './style.scss'

const Home = () => {
  return (
    <>
      <div className='page-background'></div>
      <div className='home-container'>
        <div className='home-inner'>
          <div className='home-inner-wrapper'>
            <h3>welcome to podco!</h3>
            <h3>in podco you can create</h3>
            <h3>your own podcast</h3>
            <h3>channel for free!</h3>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
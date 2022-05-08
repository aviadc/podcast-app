import React from 'react'
import StyledContainer from '../../styledComponents/StyledContainer'
import './style.scss'

const Home = () => {
  return (
    <>
      <div className='page-background'></div>
      <StyledContainer>
        <div className='home-inner'>
          <div className='home-inner-wrapper'>
            <h3 className=''>welcome to podco</h3>
            <h3 className=''>the ultimate podcast website</h3>
            <h3 className=''>in podco you can create your </h3>
            <h3 className=''>own podcast channel for free!</h3>
            <h3 className=''>spread the word!</h3>
          </div>
        </div>
      </StyledContainer >
    </>
  )
}

export default Home
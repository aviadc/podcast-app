import React  from 'react'
import podcastApi from '../../Api';
// import StyledContainer from '../../styledComponents/StyledContainer'
import './style.scss'

const Home = () => {
   const handleGet = async ()=>{
    const data = await podcastApi.get('/test');
    console.log(data);
   }
   const handlePost = async ()=>{
    const data = await podcastApi.post('/test');
    console.log(data);
   }
  return (
    <>
      <div className='page-background-1'></div>
      <div className='home-container'>
      <button onClick={handleGet}>get</button>
      <button onClick={handlePost}>post</button>
        <div className='home-inner'>
          <div className='home-inner-wrapper'>
            <h3>welcome to Podco!</h3>
            <h3>in Podco you can create</h3>
            <h3>your own podcast</h3>
            <h3>channel for free!</h3>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
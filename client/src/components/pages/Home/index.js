import React , {useEffect} from 'react'
import podcastApi from '../../Api';
// import StyledContainer from '../../styledComponents/StyledContainer'
import './style.scss'

const Home = () => {
   const handleClick = async ()=>{
    const {data} = await podcastApi.get('/test');
    console.log(data);
   }
  return (
    <>
      <div className='page-background-1'></div>
      <div className='home-container'>
      <button onClick={handleClick}>click</button>
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
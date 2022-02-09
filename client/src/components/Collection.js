import React, { useEffect } from 'react';
import { useNavigate,useLocation } from "react-router-dom";
import PodcastItem from './PodcastItem';
function Collection() {

  const navigate = useNavigate();
  const {state} = useLocation();

  useEffect(()=>{
    console.log(state,'state');
  })

  const goBackToProfilePage = ()=>{
    navigate('/profile');
  }

  const displayPodcastList = ()=>{
    return state.podcasts.map((podcast)=>{
      return <div>
        <PodcastItem audioLink={podcast.audioLink} 
        title={podcast.title}
        imgUrl={state.imgUrl}
         />
      </div>
    })
  }


  return (
    <div className='collection-page'>
      <div className='collection-container'>
        <dvi> <img src={state? state.imgUrl : null} alt='collection image' width='300px' height='300px' />  </dvi>
        <div className='collection-podcast-list'>''</div>
        <button onClick={goBackToProfilePage} >back to profile</button>
      </div>
    </div>
  ) 
}

export default Collection;

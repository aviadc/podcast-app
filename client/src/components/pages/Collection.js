import React, { useEffect, useState } from 'react';
import { useNavigate,useLocation } from "react-router-dom";
import PodcastItem from '../PodcastItem';
import '../css/collection.css'
import podcastApi from '../Api';



function Collection() {

  // const [collectionDetails,setCollectionDetails] = useState({});

  const navigate = useNavigate();
  const {state} = useLocation();

  useEffect(()=>{
    console.log(state,'state');
  })

  const goBackToProfilePage = ()=>{
    navigate('/profile');
  }

  const handlePodcastDelete = async(collectionId,podcastId)=>{
    try{
      console.log('hey podcast delete');
      const data = await podcastApi.delete(`/${collectionId}/${podcastId}/podcast`,{collectionId:collectionId});
      // console.log(data,'after delete');
      // localStorage.removeItem('collectionsList');
    }catch(e){
      console.log(e)
    }
  }

  const displayPodcastList = ()=>{
    return state.podcasts.map((podcast)=>{
      return <div key={Math.random()}>
        <PodcastItem
          audioLink={podcast.audioLink} 
          title={podcast.title}
          imgUrl={state.imgUrl}
         />
          <div><button onClick={()=>handlePodcastDelete(state.collectionId,podcast._id)}>delete</button></div>
      </div>
    })
  }

  const handleAddPodcasts = ()=>{
    navigate('/addPodcasts',{state: state});
  }

 



  return (
    <div className='collection-container'>
        <div className='collection-navbar'>
          <button onClick={handleAddPodcasts} >add podcasts</button>
          <button onClick={goBackToProfilePage} >back to profile</button>
        </div>
      <div className='collection-inner'>
        <div> <img src={state? state.imgUrl : null} alt='collection image' width='300px' height='300px' />  </div>
        <div className='collection-podcast-list'>{state? displayPodcastList() : null}</div>
      </div>
    </div>
  ) 
}

export default Collection;

import React, {useEffect} from 'react';
import { useNavigate,useLocation } from "react-router-dom";
import PodcastItemAll from '../PodcastItemAll';
import '../css/collectionAll.css'



function CollectionAll() {

  // const [collectionDetails,setCollectionDetails] = useState({});

  const navigate = useNavigate();
  const {state} = useLocation();

  useEffect(()=>{
    console.log(state,'state');
  })

  const goBackToPodcasts = ()=>{
    navigate('/podcasts');
  }

  const displayPodcastList = ()=>{
    return state.podcasts.map((podcast)=>{
      return <div key={Math.random()}>
        <PodcastItemAll
          audioLink={podcast.audioLink} 
          title={podcast.title}
          imgUrl={state.imgUrl}
         />
      </div>
    })
  }

  

  return (
    <div className='collection-all-container'>
        <div className='collection-all-navbar'>
          <button onClick={goBackToPodcasts} >back to podcasts</button>
        </div>
      <div className='collection-all-inner'>
        <div> <img src={state? state.imgUrl : null} alt='collection-all' width='300px' height='300px' />  </div>
        <div className='collection-all-podcast-list'>{state? displayPodcastList() : null}</div>
      </div>
    </div>
  ) 
}

export default CollectionAll;

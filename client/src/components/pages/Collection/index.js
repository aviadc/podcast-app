import React, { useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import PodcastItem from '../../PodcastItem';
import Button from '../../styledComponents/Button';
import "./style.scss"

const Collection = () => {

  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    console.log(state, 'state collection');
  }, [state])

  const goBackToProfilePage = () => {
    navigate('/profile');
  }

  const handleAddPodcasts = () => {
    navigate('/addPodcasts', { state: state });
  }

  return (
    <div className='collection-container'>
      {state?.profile && <div className='collection-navbar'>
        <Button onClick={handleAddPodcasts} >add podcasts</Button>
        <Button onClick={goBackToProfilePage} >back to profile</Button>
        <h3>collection size: {state.collectionSize}</h3>
      </div>
      }
      <div className='collection-inner'>
        <div className='collection-img'> <img src={state?.imgUrl} alt='collection' width='200px' height='200px' />  </div>
        <div className='collection-podcast-list'>{state &&
          state.podcasts.map((podcast) => {
            return (
              <div key={podcast._id}>
                <PodcastItem
                  key={podcast._id}
                  audioLink={podcast.audioLink}
                  title={podcast.title}
                  imgUrl={state.imgUrl}
                  id={podcast._id}
                  profile={state.profile} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

}

export default Collection
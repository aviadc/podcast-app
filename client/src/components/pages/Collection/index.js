import React, { useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import PodcastItem from '../../PodcastItem';
import Button from '../../styledComponents/Button';
import "./style.scss"

const Collection = () => {

  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {

  }, [state])

  const goBackToProfilePage = () => {
    navigate('/profile');
  }

  const handleAddPodcasts = () => {
    navigate('/addPodcasts', { state: state });
  }

  return (
    <>
      <div className='page-background-2'></div>
      <div className='collection-container'>
        {state?.profile && <div className='collection-navbar'>
          <Button onClick={handleAddPodcasts} fontSize="1rem">add podcasts</Button>
          <Button onClick={goBackToProfilePage} fontSize="1rem">back to profile</Button>
          <h3>collection size: {(state.collectionSize / 1000000).toFixed(2)} mb   (25mb max)</h3>
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
                    collectionSize={state.collectionSize}
                    profile={state.profile} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Collection
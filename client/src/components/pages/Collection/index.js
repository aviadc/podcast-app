import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import PodcastItem from '../../PodcastItem';
// import podcastApi from '../../Api';
import "./style.scss"

const Collection = () => {

  // const [visibilty, setVisibilty] = useState("hidden");

  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    console.log(state, 'state collection');
  })

  const goBackToProfilePage = () => {
    navigate('/profile');
  }


  // const showDeleteWindow = () => {
  //   setVisibilty("visible");
  // }


  // const handleVisibilty = () => {
  //   setVisibilty("hidden");
  // }


  // const handlePodcastDelete = async (collectionId, podcastId) => {
  //   console.log('inside podcast delete');
  //   try {
  //     await podcastApi.delete(`/${collectionId}/${podcastId}/podcast`, { collectionId: collectionId });
  //     console.log('after api call');
  //     const newpodcastsList = state.podcasts.filter((podcast) => {
  //       return podcast._id.toString() !== podcastId.toString();
  //     })
  //     console.log(newpodcastsList, 'newpodcast list');
  //     handleVisibilty();
  //     state.podcasts = [...newpodcastsList];
  //     console.log(state, 'state');
  //     navigate('/collection', { state: state }); //update the state for the podcasts list
  //     localStorage.removeItem('collectionsList');
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  // const displayPodcastList = () => {
  //   return state.podcasts.map((podcast) => {
  //     return <div key={Math.random()}>
  //       <PodcastItem
  //         audioLink={podcast.audioLink}
  //         title={podcast.title}
  //         imgUrl={state.imgUrl}
  //         id={podcast.id}
  //         profile={true}
  //       />
        {/* <div className='collection-delete-btn'><button onClick={showDeleteWindow}>delete</button></div>
        <div className='delete-window' style={{ visibility: visibilty }}>
          <h2> ARE YOU SURE?</h2>
          <div>
            <button onClick={() => handlePodcastDelete(state.collectionId, podcast._id)} >YES</button><button onClick={handleVisibilty}>NO</button>
          </div>
        </div> */}
  //     </div>
  //   })
  // }

  const handleAddPodcasts = () => {
    navigate('/addPodcasts', { state: state });
  }





  return (
    <div className='collection-container'>
      <div className='collection-navbar'>
        <button onClick={handleAddPodcasts} >add podcasts</button>
        <button onClick={goBackToProfilePage} >back to profile</button>
      </div>
      <div className='collection-inner'>
        <div> <img src={state ? state.imgUrl : null} alt='collection' width='300px' height='300px' />  </div>
        <div className='collection-podcast-list'>{state &&
          state.podcasts.map((podcast) => {
            return <>
              <div>
                <PodcastItem
                  key={podcast._id}
                  audioLink={podcast.audioLink}
                  title={podcast.title}
                  imgUrl={state.imgUrl}
                  id={podcast._id}
                  profile={state.profile} />
              </div>
            </>
          })}
        </div>
      </div>
    </div>
  )

}

export default Collection
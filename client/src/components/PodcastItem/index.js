import React , {useState, useEffect} from 'react';
import AudioPlayer from '../AudioPlayer';
import { useNavigate, useLocation } from "react-router-dom";
import podcastApi from '../Api';
import "./style.scss"



const PodcastItem = (props) => {
  const [visibilty, setVisibilty] = useState("hidden");

  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    // console.log(state, 'state podcast item');
    console.log(props, 'props podcast item');
  })

  const showDeleteWindow = () => {
    setVisibilty("visible");
  }


  const handleVisibilty = () => {
    setVisibilty("hidden");
  }


  const handlePodcastDelete = async (collectionId, podcastId) => {
    console.log('inside podcast delete');
    try {
      await podcastApi.delete(`/${collectionId}/${podcastId}/podcast`, { collectionId: collectionId });
      console.log('after api call');
      const newpodcastsList = state.podcasts.filter((podcast) => {
        return podcast._id.toString() !== podcastId.toString();
      })
      console.log(newpodcastsList, 'newpodcast list');
      handleVisibilty();
      state.podcasts = [...newpodcastsList];
      console.log(state, 'state');
      navigate('/collection', { state: state }); //update the state for the podcasts list
      localStorage.removeItem('collectionsList');
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <>
      <div className='podcast-item-container'>
        <div className='podcast-item-up'>
          <div className='podcast-item-up-img'>
            <img src={props.imgUrl} alt='podcast-item' width='50px' height='50px' />
          </div>
          <div className='podcast-item-up-title'>{props.title}</div>
        </div>
        <div className='podcast-item-down'>
          <AudioPlayer audioLink={props.audioLink} />
        </div>
      </div>
      {props.profile &&
        <>
          <div className='collection-delete-btn'><button onClick={showDeleteWindow}>delete</button></div>
          <div className='delete-window' style={{ visibility: visibilty }}>
            <h2> ARE YOU SURE?</h2>
            <div>
              <button onClick={() => handlePodcastDelete(state.collectionId, props.id)} >YES</button><button onClick={handleVisibilty}>NO</button>
            </div>
          </div>
        </>
      }
    </>
  )

}

export default PodcastItem;

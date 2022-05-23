import React, { useState } from 'react';
import AudioPlayer from '../AudioPlayer';
import { useNavigate, useLocation } from "react-router-dom";
import podcastApi from '../Api';
import Button from '../styledComponents/Button';
import "./style.scss"



const PodcastItem = (props) => {
  const [visibilty, setVisibilty] = useState("hidden");

  const navigate = useNavigate();
  const { state } = useLocation();


  const showDeleteWindow = () => {
    setVisibilty("visible");
  }


  const handleVisibilty = () => {
    setVisibilty("hidden");
  }


  const handlePodcastDelete = async (collectionId, podcastId) => {
    try {
      const {data} = await podcastApi.delete(`/${collectionId}/${podcastId}/podcast`, { collectionId: collectionId });
      console.log("deleted podcasts data",data);
      const newpodcastsList = state.podcasts.filter((podcast) => {
        return podcast._id.toString() !== podcastId.toString();
      })
      state.podcasts = [...newpodcastsList];
      state.collectionSize = state.collectionSize - data.deletedPodcastSize //return to page "collection" the updated size
      handleVisibilty();
      navigate('/collection', { state: state }); //update the state for the podcasts list
      localStorage.removeItem('collectionsList');
    } catch (err) {
      console.log(err.message)
    }
  }
  return (
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
      {props.profile &&
        <>
          <div className='collection-delete-btn'><Button onClick={showDeleteWindow} fontSize="1rem">delete</Button></div>
          <div className='delete-window' style={{ visibility: visibilty }}>
            <h2> ARE YOU SURE?</h2>
            <div>
              <Button onClick={() => handlePodcastDelete(state.collectionId, props.id)} >YES</Button><Button onClick={handleVisibilty}>NO</Button>
            </div>
          </div>
        </>
      }
    </div>
  )

}

export default PodcastItem;

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import podcastApi from '../Api';
import Button from '../styledComponents/Button';
import "./style.scss"


function PodcastCollectionItem(props) {

  const [visibilty, setVisibilty] = useState("hidden");

  const navigate = useNavigate();


  const handleGoToCollection = () => {
    console.log(props, "props")
    navigate('/collection', {
      state: {
        imgUrl: props.imgUrl,
        title: props.title,
        podcasts: props.podcasts,
        collectionId: props._id,
        profile: props.profile
      }
    });
  }

  const showDeleteWindow = () => {
    console.log(props, "props")
    setVisibilty("visible");
  }


  const handleVisibilty = () => {
    setVisibilty("hidden");
  }

  const handleCollectionDelete = async (id) => {
    try {
      console.log('hey');
      const data = await podcastApi.delete(`/${id}/collection`);
      console.log(data, 'after delete');
      handleVisibilty();
      props.getUserDetails();
      localStorage.removeItem('collectionsList');
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='collection-card-container'>
      <div className='collection-card' onClick={handleGoToCollection} >
        <div className='collection-card-img'>
          <img src={props.imgUrl} alt='collection-img' />
        </div>
        <h2 className='collection-card-title'>{props.title}</h2>
      </div>
      {props.profile &&
        <>
          <div className='collection-delete-btn'><Button onClick={showDeleteWindow}>delete</Button></div>
          <div className='delete-window' style={{ visibility: visibilty }}>
            <h2> ARE YOU SURE?</h2>
            <div>
              <Button onClick={() => handleCollectionDelete(props.collectionId)} >YES</Button><Button onClick={handleVisibilty}>NO</Button>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default PodcastCollectionItem;

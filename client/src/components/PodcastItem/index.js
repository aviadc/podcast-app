import React from 'react';
import AudioPlayer from '../AudioPlayer';



const PodcastItem = (props)=> {
  return(
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
  )
  
}

export default PodcastItem;

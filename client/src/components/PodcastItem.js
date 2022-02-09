import React from 'react';
import AudioPlayer from './AudioPlayer';

function PodcastItem(props) {
  return(
    <div>
      <div className='podcast-item-up'>
        <div className='podcast-item-up-img'>
          <img src={props.imgUrl} alt='collection-image' width='50px' height='50px' />
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

import React from 'react';
import AudioPlayer from './AudioPlayer';

function PodcastItem(props) {
  return(
    <div>
      <div className='podcast-item-up'>
        <div className='podcast-item-up-img'>{}</div>
        <div className='podcast-item-up-title'>{}</div>
      </div>
      <div className='podcast-item-down'>
        <AudioPlayer audioLink='' />
      </div>
    </div>
  )
  
}

export default PodcastItem;

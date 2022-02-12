import React from 'react';
import AudioPlayer from './AudioPlayer';
import './css/podcastItemAll.css'

function PodcastItemAll(props) {
 
  return(
    <div className='podcast-item-all-container'>
      <div className='podcast-item-all-up'>
        <div className='podcast-item-up-img'>
          <img src={props.imgUrl} alt='podcast-item' width='50px' height='50px' />
        </div>
        <div className='podcast-item-up-title'>{props.title}</div>
      </div>
      <div className='podcast-item-all-audio'>
        <AudioPlayer audioLink={props.audioLink} />
      </div>
      {/* <div className='podcast-item-all-bottom'>
        <button>show comments</button>
        <div className='podcast-item-all-comments-container'>
          <div className='podcast-item-all-add-comments'>
            
          </div>
          <div className='podcast-item-all-comments-list'>

          </div>
        </div>
          
        
        <div>

        </div>
      </div> */}
    </div>
  )
  
}

export default PodcastItemAll;

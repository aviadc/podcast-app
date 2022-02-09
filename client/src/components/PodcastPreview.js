import React from 'react';


function PodcastPreview(props) {
  return (
    <div>
      <div>
       <img src={props.image} width='100px' height='100px' />
      </div>
      <h2>{props.title}</h2>
    </div>
  ) 
}

export default PodcastPreview;

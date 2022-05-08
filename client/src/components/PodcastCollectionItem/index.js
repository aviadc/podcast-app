import React from 'react';
import { useNavigate } from "react-router-dom";
import "./style.scss"


function PodcastCollectionItem(props) {

  const navigate = useNavigate();

  const handleClick = ()=>{
    navigate('/collection',{state:props});
  }
  
  return (
    <>
    <div className='collection-card' onClick={handleClick} >
      <div className='collection-card-img'>
        <img src={props.imgUrl} alt='collection-img' />
      </div>
      <h2 className='collection-card-title'>{props.title}</h2>
    </div>
    
    </>
  ) 
}

export default PodcastCollectionItem;

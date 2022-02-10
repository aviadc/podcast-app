import React from 'react';
import { useNavigate } from "react-router-dom";
import './css/collectionAllPreview.css'


function CollectionAllPreview(props) {

  const navigate = useNavigate();

  const handleClick = ()=>{
    navigate('/collectionAll',{state:props});
  }
  
  return (
    <div className='collection-preview' onClick={handleClick} >
      <div className='collection-preview-img'>
        <img src={props.imgUrl} width='100%' height='100%' />
      </div>
      <h2 className='collection-preview-title'>{props.title}</h2>
    </div>
  ) 
}

export default CollectionAllPreview;

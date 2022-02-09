import React from 'react';
import { useNavigate } from "react-router-dom";
import './css/collectionPreview.css'


function CollectionPreview(props) {

  const navigate = useNavigate();

  const handleClick = ()=>{
    navigate('/Collection',{state:props});
  }
  
  return (
    <div className='collection-preview' onClick={handleClick} >
      <div>
       <img src={props.imgUrl} width='100px' height='100px' />
      </div>
      <h2>{props.title}</h2>
    </div>
  ) 
}

export default CollectionPreview;

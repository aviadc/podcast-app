import React from 'react';
import { useNavigate } from "react-router-dom";
function Collection() {

  const navigate = useNavigate();

  const goBackToProfilePage = ()=>{
    navigate('/profile');
  }


  return (
    <div className='collection-page'>
      <div className='collection-container'>
        <h1>this is collection</h1> 
        <button onClick={goBackToProfilePage} >back to profile</button>
      </div>
    </div>
  ) 
}

export default Collection;

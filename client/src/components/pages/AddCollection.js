import React ,{useState} from 'react';
import { useNavigate,useLocation } from "react-router-dom";
import podcastApi from '../Api';
import Spinner from '../Spinner';
import '../css/addCollection.css'


function AddCollection() {

  const [imageFile,setImageFile] = useState(null);
  const [audioFiles,setAudioFiles] = useState(null);
  const [collectionTitle,setCollectionTitle] = useState('');
  const [messageToUser,setMessageToUser] = useState(null);
  const [isLoading,setIsLoading] = useState(false);

  
  const navigate = useNavigate();
  const {state} = useLocation();
  


  const handleBackToProfile = ()=>{
    navigate('/profile');
  }

  const uploadImage = async (collectionId)=>{
    const data = new FormData();
    data.append('image',imageFile);
    try{
     await podcastApi.post(`${collectionId}/upload/image`,data);
    
    }catch(e){
      console.log(e)
    }
  }

  const uploadAudio = async (collectionId)=>{
    const data = new FormData();
    audioFiles.forEach((audio)=>{
      data.append('audio',audio);
    })
    try{
      podcastApi.post(`${collectionId}/upload/audio`,data);
    }catch(e){
      console.log(e)
    }
  }

  const uploadTitle = async ()=>{
    try{
      const {data} = await podcastApi.post(`${state._id}/upload/title`,{title:collectionTitle});
      return data;
    }catch(e){
      return null
    }
  }

  const fileImageChange = (e)=>{
    const file = e.target.files[0];
    setImageFile(file);
  }

  const fileAudioChange = (e)=>{
    const file =Object.values(e.target.files);
    setAudioFiles(file);
  }

  const titleChange = (e)=>{
    setCollectionTitle(e.target.value);
  }
  
  const uploadCollection = async ()=>{
    if(!validDetails()){
      setMessageToUser('missing details');
      return
    }
    try{
      setIsLoading(true);
      setMessageToUser('');
      const data = await uploadTitle();
      if(!data){
        throw new Error('title error');
      }
      await uploadImage(data._id);
      await uploadAudio(data._id)
      setIsLoading(false);
      localStorage.removeItem('collectionsList');
      setMessageToUser('upload successfully ');
    }catch(e){
      setIsLoading(false);
      console.log(e.message)
      setMessageToUser(e.message);
    }

  }

  const validDetails = ()=>{
    return imageFile&&audioFiles&&collectionTitle;
  }



  return (
    <div className='add-collection-container'>
      <div className='add-collection-inner'>
        <h2>add a collection</h2>
          <div className='add-collection-inner-input-div'>
          ADD IMAGE <input type="file" onChange={fileImageChange}/>
          </div>
          <div className='add-collection-inner-input-div'>
          ADD AUDIO <input type="file" multiple onChange={fileAudioChange} accept='audio/*'/>
          </div>
          <div className='add-collection-inner-input-div'>
            collection name: <input type='text' onChange={titleChange} />
          </div>
          <div>
            <button onClick={uploadCollection}>ADD COLLECTION</button>
          </div>
          <div>
            {isLoading? <Spinner/> : null }
          </div>
          <div>{messageToUser}</div>
          <div>
            <button onClick={handleBackToProfile}>back to profile</button>
          </div>
      </div>
    </div>
  ) 
}

export default AddCollection;

import React ,{useState} from 'react';
import { useNavigate,useLocation } from "react-router-dom";
import podcastApi from './Api';
import Spinner from './Spinner';


function AddCollection() {

  const [imageFile,setImageFile] = useState(null);
  const [audioFiles,setAudioFiles] = useState(null);
  const [collectionTitle,setCollectionTitle] = useState('');
  const [messageToUser,setMessageToUser] = useState(null);
  const [isLoading,setIsLoading] = useState(false);

  
  const navigate = useNavigate();
  const {state} = useLocation();
  // console.log(dataFromProfile);


  const handleBackToProfile = ()=>{
    navigate('/profile');
  }

  const uploadImage = async (collectionId)=>{
    const data = new FormData();
    data.append('image',imageFile);
    try{
     const imgData = await podcastApi.post(`${collectionId}/upload/image`,data);
    //  console.log(imgData.data)
    }catch(e){
      console.log(e)
    }
  }

  const uploadAudio = async (collectionId)=>{
    // console.log(audioFiles);
    const data = new FormData();
    audioFiles.forEach((audio)=>{
      data.append('audio',audio);
    })
    try{
     const audioData = await podcastApi.post(`${collectionId}/upload/audio`,data);
    //  console.log(audioData.data);
    //  setAudiolink(audioData.data.Location);
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
      // console.log(data);
      if(!data){
        throw new Error('title error');
      }
      const imgData = await uploadImage(data._id);
      const audioData = await uploadAudio(data._id)
      setIsLoading(false);
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
    <div>
     <h1> welcome to add collection</h1>
      <div>
       IMAGE <input type="file" onChange={fileImageChange}/>
        {/* <button onClick={uploadImage}>submit</button> */}
      </div>
      <div>
       AUDIO <input type="file" multiple onChange={fileAudioChange} accept='audio/*'/>
        {/* <button onClick={uploadAudio}>submit</button> */}
      </div>
      <div>
        collection name <input type='text' onChange={titleChange} />
        <div>
          <button onClick={uploadCollection}>ADD COLLECTION</button>
        </div>
      </div>
      <div className='add-collection-spiner'>{isLoading? <Spinner/> : null }</div>
      <div>{messageToUser}</div>
      
    <button onClick={handleBackToProfile}>back to profile</button>
    </div>
  ) 
}

export default AddCollection;

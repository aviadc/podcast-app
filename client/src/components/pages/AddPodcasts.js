
import React ,{useState} from 'react';
import { useNavigate,useLocation } from "react-router-dom";
import podcastApi from '../Api';
import Spinner from '../Spinner';
import '../css/addCollection.css'

function AddPodcasts() {
  
  const [audioFiles,setAudioFiles] = useState(null);
  const [messageToUser,setMessageToUser] = useState(null);
  const [isLoading,setIsLoading] = useState(false);

  
  const navigate = useNavigate();
  const {state} = useLocation();
  
  const handleBackToCollection = ()=>{
    navigate('/collection',{state:state});
  }




  const fileAudioChange = (e)=>{
    const file =Object.values(e.target.files);
    setAudioFiles(file);
  }

  const uploadAudio = async ()=>{
    if(!validDetails()){
      setMessageToUser("you didn't choose files");
      return
    }
    try{
      setIsLoading(true);
      setMessageToUser('');
      const data = new FormData();
      audioFiles.forEach((audio)=>{
        data.append('audio',audio);
      })
      const audioData = await podcastApi.post(`${state.collectionId}/upload/audio`,data);
      console.log(audioData,'audiodata');
      state.podcasts = [...audioData.data.podcasts]; 
      localStorage.removeItem('collectionsList');
      setIsLoading(false);
      setMessageToUser('upload successfully ');
    }catch(e){
      setIsLoading(false);
      console.log(e.message)
      setMessageToUser(e.message);
    }

  }

  const validDetails = ()=>{
    return audioFiles;
  }



  return (
    <div className='add-collection-container'>
      <div className='add-collection-inner'>
        <h2>add podcasts</h2>
          <div className='add-collection-inner-input-div'>
          Add Audio <input type="file" multiple onChange={fileAudioChange} accept='audio/*'/>
          </div>
          <div>
            <button onClick={uploadAudio}>submit</button>
          </div>
          <div>
            {isLoading? <Spinner/> : null }
          </div>
          <div>{messageToUser}</div>
          <div>
            <button onClick={handleBackToCollection}>back to your collection</button>
          </div>
      </div>
    </div>
  ) 
}


export default AddPodcasts
import React ,{useState} from 'react';
import { useNavigate,useLocation } from "react-router-dom";
import podcastApi from './Api';

function AddCollection() {

  const [imageFile,setImageFile] = useState(null);
  const [audioFiles,setAudioFiles] = useState(null);
  const [collectionTitle,setCollectionTitle] = useState('');

  
  const navigate = useNavigate();
  const {state} = useLocation();
  // console.log(dataFromProfile);


  const handleBackToProfile = ()=>{
    navigate('/profile');
  }

  const uploadImage = async ()=>{
    const data = new FormData();
    data.append('image',imageFile);
    try{
     const imgData = await podcastApi.post('upload/image',data);
     console.log(imgData.data)
    }catch(e){
      console.log(e)
    }
  }

  const uploadAudio = async ()=>{
    // console.log(audioFiles);
    const data = new FormData();
    audioFiles.forEach((audio)=>{
      data.append('audio',audio);
    })
    try{
     const audioData = await podcastApi.post('upload/audio',data);
     console.log(audioData.data);
    //  setAudiolink(audioData.data.Location);
    }catch(e){
      console.log(e)
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



  return (
    <div>
     <h1> welcome to add collection</h1>
      <div>
       IMAGE <input type="file" onChange={fileImageChange}/>
        <button onClick={uploadImage}>submit</button>
      </div>
      <div>
       AUDIO <input type="file" multiple onChange={fileAudioChange} accept='audio/*'/>
        <button onClick={uploadAudio}>submit</button>
      </div>
      <div>
        collection name <input type='text' onChange={titleChange} />
        <button>ADD</button>
      </div>
      {/* <AudioPlayer audioLink={audioLink} /> */}
      <br /> <br /> <br /> <br />
      
    <button onClick={handleBackToProfile}>back to profile</button>
    </div>
  ) 
}

export default AddCollection;

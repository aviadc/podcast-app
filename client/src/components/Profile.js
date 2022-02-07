import React,{useEffect,useState} from 'react';
import { useNavigate } from "react-router-dom";
import jwt from 'jsonwebtoken';
import podcastApi from './Api';
import MainNavbar from './navabrs/MainNavbar';
import AudioPlayer from './AudioPlayer';



function Profile() {
  const [name,setName] = useState('');
  const[loggedIn,setLoggedIn] = useState(false);
  const [imageFile,setImageFile] = useState(null);
  const [audioFile,setAudioFile] = useState(null);
  const [audioLink,setAudiolink] = useState('');



  const navigate = useNavigate();

  const getUserDetails = async()=>{
    console.log("in the get user detail",Math.random())
    try{
      const {data} = await podcastApi.get('/profile',{
        headers: {
          'auth-token': localStorage.getItem('token')
        }
      });
      setName(data.name);
      setLoggedIn(true);
    }catch(e){
      console.log(e);
    }
  }
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){
      const user = jwt.decode(token);
      if(!user){
        localStorage.removeItem('token');
        navigate('/login');
      }else{
        console.log(loggedIn);
        if(!loggedIn){
          getUserDetails();
        }
      }
    }else{
      navigate('/login');
    }
  }
  ,[navigate,loggedIn]);

  const logout = ()=>{
    localStorage.clear();
    navigate('/');
  }
  
  // const handleFileChange = (e)=>{
  //   const files = e.target.files
  //   if(files[0].size>2000000){
  //     console.log("the file is too large");
  //   }else{
  //     let reader = new FileReader();
  //     reader.readAsDataURL(files[0]);
  //     reader.onload = (e)=>{
  //       console.log(e.target.result);
  //     }
  //   }
  // }

  const fileImageChange = (e)=>{
    const file = e.target.files[0];
    setImageFile(file);
  }

  const fileAudioChange = (e)=>{
    const file = e.target.files[0];
    setAudioFile(file);
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
    const data = new FormData();
    data.append('audio',audioFile);
    try{
     const audioData = await podcastApi.post('upload/audio',data);
     console.log(audioData.data.Location);
     setAudiolink(audioData.data.Location);
    }catch(e){
      console.log(e)
    }
  }

  return(
    <div>
      <MainNavbar />
      <h1>Profile</h1>
      <h2>{`WELCOME ${name}`}</h2>
      <div>
       IMAGE <input type="file" onChange={fileImageChange}/>
        <button onClick={uploadImage}>submit</button>
        <br /> <br /> <br /> <br />
      </div>
      <div>
       AUDIO <input type="file" onChange={fileAudioChange}/>
        <button onClick={uploadAudio}>submit</button>
        <br /> <br /> <br /> <br />
      </div>
      <AudioPlayer audioLink={audioLink} />
      <br /> <br /> <br /> <br />
      <button onClick={logout}>log out</button>
    </div>
  ) 
}

export default Profile;

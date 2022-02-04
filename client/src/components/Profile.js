import React,{useEffect,useState} from 'react';
import { useNavigate } from "react-router-dom";
import jwt from 'jsonwebtoken';
import podcastApi from './Api';
import MainNavbar from './navabrs/MainNavbar';
import AudioPlayer from './AudioPlayer';



function Profile() {
  const [name,setName] = useState('');
  const[loggedIn,setLoggedIn] = useState(false);
  const [file,setFile] = useState(null);



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
  
  const handleFileChange = (e)=>{
    const files = e.target.files
    if(files[0].size>2000000){
      console.log("the file is too large");
    }else{
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (e)=>{
        console.log(e.target.result);
      }
    }
  }
  return(
    <div>
      <MainNavbar />
      <h1>Profile</h1>
      <h2>{`WELCOME ${name}`}</h2>
      <div>
        <input type="file" onChange={handleFileChange}/>
        <button onClick={setName}>submit</button>
        <br /> <br /> <br /> <br />
      </div>
      <AudioPlayer />
      <br /> <br /> <br /> <br />
      <button onClick={logout}>log out</button>
    </div>
  ) 
}

export default Profile;

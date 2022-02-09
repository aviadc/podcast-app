import React,{useEffect,useState} from 'react';
import { useNavigate } from "react-router-dom";
import jwt from 'jsonwebtoken';
import podcastApi from './Api';
import MainNavbar from './navabrs/MainNavbar';
import CollectionPreview from './CollectionPreview';





function Profile() {
  const [profileData,setProfileData] = useState(null);
  const [loggedIn,setLoggedIn] = useState(false);
  const [collectionsList,setCollectionsList] = useState([]);


  const navigate = useNavigate();

  const getUserDetails = async()=>{
    console.log("in the get user detail",Math.random())
    try{
      const {data} = await podcastApi.get('/profile',{
        headers: {
          'auth-token': localStorage.getItem('token')
        }
      });
      setProfileData(data)
      const dataArr = await podcastApi.get(`/${data._id}/podcasts`);
      setCollectionsList(dataArr.data);
      setLoggedIn(true);
      
    }catch(e){
      console.log(e);
    }
  }


  
  
  useEffect(()=>{
    async function innerUseEffect(){
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
    innerUseEffect();
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

  
  
  const displayCollections =()=>{
    return collectionsList.map((collection)=>{
      return <div key={Math.random()}>
        <CollectionPreview imgUrl={collection.imgUrl} title={collection.title} />
      </div>
    })
    }

    
  

  const addCollectionHandlre = ()=>{
    console.log(profileData);
    navigate('/addCollection',{state:profileData});
  }
  const welcome = ()=>{
    return 'dudu';
  }

  return(
    <div>
      <MainNavbar />
      <h1>Profile</h1>
      <h2> WELCOME {profileData? profileData.name : null}</h2>
     
        <div>
          <button onClick={addCollectionHandlre}>add collection</button>
        </div>
        <div>
          collections: {collectionsList.length>0? displayCollections() : null}
        </div>
      <button onClick={logout}>log out</button>
    </div>
  ) 
}

export default Profile;

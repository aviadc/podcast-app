import React,{useEffect,useState} from 'react';
import MainNavbar from '../navabrs/MainNavbar';
import { useNavigate } from "react-router-dom";
import podcastApi from '../Api';
import CollectionPreview from '../CollectionPreview';
import '../css/profile.css'


function HomePodcastsList() {

  const [profileData,setProfileData] = useState(null);
  const [loggedIn,setLoggedIn] = useState(false);
  const [collectionsList,setCollectionsList] = useState([]);

  useEffect(()=>{
    async function innerUseEffect(){
      // const list = localStorage.getItem('collectionsList');
      // if(!list){
      //   const user = jwt.decode(token);
      //   if(!user){
      //     localStorage.removeItem('token');
      //     navigate('/login');
      //   }else{
      //     console.log(loggedIn);
      //     if(!loggedIn){
      //       getUserDetails();
      //     }
      //   }
      // }else{
      //   navigate('/login');
      // }
      try{
        const dataArr = await podcastApi.get('/podcasts');
        console.log(dataArr,'dataArr');
      }catch(e){
        console.log(e.message);
      }
    }
    innerUseEffect();
    })


  const displayCollections =()=>{
    return collectionsList.map((collection)=>{
      return <div key={Math.random()}>
        <CollectionPreview imgUrl={collection.imgUrl} title={collection.title} podcasts={collection.podcasts} collectionId={collection._id} />
      </div>
    })
    }

  return (
      <div>
        <MainNavbar />
        <h1>podcast list</h1>
      </div>
  ) 
}

export default HomePodcastsList;

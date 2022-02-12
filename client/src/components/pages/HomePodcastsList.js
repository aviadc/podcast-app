import React,{useEffect,useState} from 'react';
import MainNavbar from '../navabrs/MainNavbar';
// import { useNavigate } from "react-router-dom";
import podcastApi from '../Api';
import CollectionAllPreview from '../CollectionAllPreview';
import '../css/homePodcastsList.css'


function HomePodcastsList() {

  const [collectionsList,setCollectionsList] = useState([]);

  useEffect(()=>{
    async function innerUseEffect(){
      const list = localStorage.getItem('collectionsList');
      if(!list){
        try{
          const {data} = await podcastApi.get('/podcasts');
          console.log(data,'dataArr');
          localStorage.setItem('collectionsList',JSON.stringify(data));
          setCollectionsList(data);
        }catch(e){
          console.log(e.message);
        }
      }else{
        console.log(JSON.parse((localStorage.getItem('collectionsList'))),'json local');
        setCollectionsList(JSON.parse((localStorage.getItem('collectionsList'))));
      } 
    }
    innerUseEffect();
    },[])


  const displayCollections =()=>{
    console.log(collectionsList,'in the display');
    return collectionsList.map((collection)=>{
      return <div key={Math.random()}>
        <CollectionAllPreview imgUrl={collection.imgUrl} title={collection.title} podcasts={collection.podcasts} collectionId={collection._id} />
      </div>
    })
    }

  return (
      <div>
        <MainNavbar />
        <div className='home-podcasts-list-container'>
          <div className='home-podcasts-list-inner'> 
            <div className='home-podcasts-list'>
            {collectionsList.length>0? displayCollections() : null}
            </div>
          </div>
        </div>
      </div>
  ) 
}

export default HomePodcastsList;

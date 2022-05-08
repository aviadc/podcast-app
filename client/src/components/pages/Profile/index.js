import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import jwt from 'jsonwebtoken';
import podcastApi from '../../Api';
import PodcastCollectionItem from "../../PodcastCollectionItem"
import StyledContainer from "../../styledComponents/StyledContainer"
import Button from '../../styledComponents/Button'
import "./style.scss"

const Profile = () => {

  const [profileData, setProfileData] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [collectionsList, setCollectionsList] = useState([]);
  const [visibilty, setVisibilty] = useState("hidden");


  const navigate = useNavigate();

  const getUserDetails = async () => {
    console.log("in the get user detail", Math.random())
    try {
      const { data } = await podcastApi.get('/profile', {
        headers: {
          'auth-token': localStorage.getItem('token')
        }
      });
      setProfileData(data)
      const dataArr = await podcastApi.get(`/${data._id}/podcasts`);
      console.log(dataArr, 'dataArr');
      setCollectionsList(dataArr.data);
      setLoggedIn(true);

    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    async function innerUseEffect() {
      const token = localStorage.getItem('token');
      if (token) {
        const user = jwt.decode(token);
        if (!user) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          console.log(loggedIn);
          if (!loggedIn) {
            getUserDetails();
          }
        }
      } else {
        navigate('/login');
      }

    }
    innerUseEffect();
  }
    , [navigate, loggedIn]);

  const logout = () => {
    localStorage.clear();
    navigate('/');
  }


  const showDeleteWindow = () => {
    setVisibilty("visible");
  }


  const handleVisibilty = () => {
    setVisibilty("hidden");
  }

  // const handleCollectionDelete = async (id) => {
  //   try {
  //     console.log('hey');
  //     const data = await podcastApi.delete(`/${id}/collection`);
  //     console.log(data, 'after delete');
  //     handleVisibilty();
  //     getUserDetails();
  //     localStorage.removeItem('collectionsList');
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }



  // const displayCollections = () => {
  //   return collectionsList.map((collection) => {
  //     return <div key={Math.random()}>
  //       <PodcastCollectionItem imgUrl={collection.imgUrl} title={collection.title} podcasts={collection.podcasts} collectionId={collection._id} />
  //       <div className='collection-preview-delete-btn'><button onClick={showDeleteWindow}>delete</button></div>
  //       <div className='delete-window' style={{ visibility: visibilty }}>
  //         <h2> ARE YOU SURE </h2>
  //         <div>
  //           <button onClick={() => handleCollectionDelete(collection._id)} >YES</button><button onClick={handleVisibilty}>NO</button>
  //         </div>
  //       </div>
  //     </div>
  //   })
  // }




  const addCollectionHandlre = () => {
    console.log(profileData);
    navigate('/addCollection', { state: profileData });
  }


  return (
    <div className='profile-page'>
      <div className='profile-container'>
        <div className='profile-inner-top'>
          <h2 className='profile-inner-top-welcome'> WELCOME {profileData ? profileData.name : null}</h2>
          <div>
            <Button onClick={addCollectionHandlre} fontSize="1.6rem" padding="5px">add collection</Button>
          </div>
          <div>
            <Button onClick={logout}>log out</Button>
          </div>
        </div>
        <div className='profile-collections-list-container'>
          <div className='profile-collections-list'>
            {collectionsList.length && collectionsList.map((collection) => {
              return <PodcastCollectionItem
                imgUrl={collection.imgUrl}
                title={collection.title}
                podcasts={collection.podcasts}
                collectionId={collection._id} 
                profile={true}/>
            })
            }
          </div>
        </div>
      </div >
    </div >
  )
}

export default Profile
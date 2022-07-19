import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import jwt from 'jsonwebtoken';
import podcastApi from '../../../Api';
import PodcastCollectionItem from "../../PodcastCollectionItem"
import "./profile.scss"

const Profile = () => {

  const [profileData, setProfileData] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [collectionsList, setCollectionsList] = useState([]);
  

  const navigate = useNavigate();

  const getUserDetails = async () => {
    try {
      const { data } = await podcastApi.get('/profile', {
        headers: {
          'auth-token': localStorage.getItem('token')
        }
      });
      setProfileData(data)
      const dataArr = await podcastApi.get(`/${data._id}/podcasts`);
      setCollectionsList(dataArr.data);
      setLoggedIn(true);

    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    console.log("in profile");
    async function innerUseEffect() {
      const token = localStorage.getItem('token');
      if (token) {
        const user = jwt.decode(token);
        if (!user) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
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



  const handleAddCollection = () => {
    navigate('/addCollection', { state: profileData });
  }


  return (
    <>
      <div className='profile-container'>
        <div className='profile-inner-top'>
          <h2 className='profile-inner-top-welcome'> WELCOME {profileData ? profileData.name : null}</h2>
          <div>
            <button onClick={handleAddCollection} fontSize="1rem" >add collection</button>
          </div>
          <div>
            <button onClick={logout} fontSize="1rem">log out</button>
          </div>
        </div>
        <div className='profile-collections-list'>
          {!!collectionsList.length && collectionsList.map((collection) => {
            return (
              <PodcastCollectionItem
                key={collection._id}
                imgUrl={collection.imgUrl}
                title={collection.title}
                podcasts={collection.podcasts}
                collectionId={collection._id}
                profile={true}
                collectionSize={collection.size}
                getUserDetails={getUserDetails} 
                />
            )
          })
          }
        </div>
      </div>
    </>
  )
}

export default Profile
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import jwt from 'jsonwebtoken';
import podcastApi from '../../Api';
import PodcastCollectionItem from "../../PodcastCollectionItem"
import Button from '../../styledComponents/Button'
import "./style.scss"

const Profile = () => {

  const [profileData, setProfileData] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [collectionsList, setCollectionsList] = useState([]);
  

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



  const handleAddCollection = () => {
    console.log(profileData);
    navigate('/addCollection', { state: profileData });
  }


  return (
    <>
      <div className='profile-page'> </div>
      <div className='profile-container'>
        <div className='profile-inner-top'>
          <h2 className='profile-inner-top-welcome'> WELCOME {profileData ? profileData.name : null}</h2>
          <div>
            <Button onClick={handleAddCollection} fontSize="1rem" >add collection</Button>
          </div>
          <div>
            <Button onClick={logout} fontSize="1rem">log out</Button>
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
import React, { useEffect, useState } from 'react';
import podcastApi from '../../../Api';
import PodcastCollectionItem from '../../PodcastCollectionItem';
import "./podcastsCollection.scss"


const PodcastCollectionsList = () => {

  const [collectionsList, setCollectionsList] = useState([]);

  useEffect(() => {
    async function innerUseEffect() {
      const list = localStorage.getItem('collectionsList');
      if (!list) {
        try {
          const { data } = await podcastApi.get('/podcasts');
          localStorage.setItem('collectionsList', JSON.stringify(data));
          setCollectionsList(data);
        } catch (err) {
          console.log(err.message);
        }
      } else {
        setCollectionsList(JSON.parse((localStorage.getItem('collectionsList'))));
      }
    }
    innerUseEffect();
  }, [])


  return (
     <div className='collection-list-page'>
        <div className='collection-list-container'>
          {!!collectionsList.length && collectionsList.map((collection) => {
            return (
              <PodcastCollectionItem
                key={collection._id}
                imgUrl={collection.imgUrl}
                title={collection.title}
                podcasts={collection.podcasts}
                collectionId={collection._id}
                profile={false}
              />
            )
          })}
        </div>
     </div>
      
    
  )
}


export default PodcastCollectionsList
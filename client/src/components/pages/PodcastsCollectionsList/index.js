import React, { useEffect, useState } from 'react';
import podcastApi from '../../Api';
import PodcastCollectionItem from '../../PodcastCollectionItem';
import StyledContainer from '../../styledComponents/StyledContainer';
import "./style.scss"


const PodcastCollectionsList = () => {

  const [collectionsList, setCollectionsList] = useState([]);

  useEffect(() => {
    async function innerUseEffect() {
      const list = localStorage.getItem('collectionsList');
      if (!list) {
        try {
          const { data } = await podcastApi.get('/podcasts');
          console.log(data, 'dataArr');
          localStorage.setItem('collectionsList', JSON.stringify(data));
          setCollectionsList(data);
        } catch (e) {
          console.log(e.message);
        }
      } else {
        console.log(JSON.parse((localStorage.getItem('collectionsList'))), 'json local');
        setCollectionsList(JSON.parse((localStorage.getItem('collectionsList'))));
      }
    }
    innerUseEffect();
  }, [])


  return (
    <>
      <div className='page-background'></div>
      <StyledContainer>
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
      </StyledContainer>
    </>
  )
}


export default PodcastCollectionsList
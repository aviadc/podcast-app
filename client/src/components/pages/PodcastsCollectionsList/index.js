import React, { useEffect, useState } from 'react';
import podcastApi from '../../Api';
import PodcastCollectionItem from '../../PodcastCollectionItem';
import StyledContainer from '../../styledComponents/StyledContainer';
import "./style.scss"


const PodcastCollectionsList = () => {

  const [collectionsList, setCollectionsList] = useState([]);

  useEffect(() => {
    async function innerUseEffect() {
      console.log("im in podcasts page in use effect");
      const list = localStorage.getItem('collectionsList');
      console.log("list row 16", list);
      if (!list) {
        try {
          const { data } = await podcastApi.get('/podcasts');
          console.log("data row 20", data);
          localStorage.setItem('collectionsList', JSON.stringify(data));
          setCollectionsList(data);
        } catch (err) {
          console.log(err.message);
        }
      } else {
        setCollectionsList(JSON.parse((localStorage.getItem('collectionsList'))));
      }
      console.log("list row 29", list);
      console.log("collection list row 30",collectionsList);
    }
    innerUseEffect();
  }, [])


  return (
    <>
      <div className='page-background-1'></div>
      <StyledContainer>
        <div className='collection-list-container'>
          {console.log("collection list in block",collectionsList)}
          {/* {!!collectionsList.length && collectionsList.map((collection) => {
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
          })} */}
        </div>
      </StyledContainer>
    </>
  )
}


export default PodcastCollectionsList
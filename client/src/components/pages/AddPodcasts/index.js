import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import podcastApi from '../../../Api';
import Spinner from '../../Spinner';
import "./addPodcasts.scss"


const AddPodcasts = () => {

  const [audioFiles, setAudioFiles] = useState(null);
  const [messageToUser, setMessageToUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { state } = useLocation();

  let filesSize = 0;

  const handleBackToCollection = () => {
    navigate('/collection', { state: state });
  }

  const uploadAudio = async () => {
    if (!validDetails()) {
      return
    }
    setIsLoading(true);
    setMessageToUser('');
    const audioFilesData = new FormData();
    audioFiles.forEach((audio) => {
      audioFilesData.append('audio', audio);
    })
    try {
      const {data} = await podcastApi.post(`${state.collectionId}/upload/audio`, audioFilesData);
      state.podcasts = [...data.collection.podcasts];
      state.collectionSize =  state.collectionSize + data.filesSize //return to page "collection" the updated size
      localStorage.removeItem('collectionsList');
      setIsLoading(false);
      setMessageToUser('upload successfully ');
    } catch (err) {
      setIsLoading(false);
      console.log(err.message)
      setMessageToUser(err.message);
    }

  }

  const validDetails = () => {
    if (!audioFiles) {
      setMessageToUser('missing details');
      return null;
    }
    for (let i = 0; i < audioFiles.length; i++) {
      filesSize += audioFiles[i].size;
      if (audioFiles[i].type.slice(0, 5) !== "audio") {
        setMessageToUser('error audio type!');
        return null;
      }
    }
    if (filesSize > 25000000 - state.collectionSize) {
      setMessageToUser('you have reached the maximum size of 25mb');
      return null;
    }
    return true
  }



  return (
    <>
      <div className='add-podcasts-container'>
        <div className='add-podcasts-inner'>
          <h2>add podcasts</h2>
          <div>
            Add Audio <input type="file" multiple onChange={(e) => setAudioFiles(Object.values(e.target.files))} accept='audio/*' />
          </div>
          <div>
            <button onClick={uploadAudio} fontSize="1.6rem">submit</button>
          </div>
          <div>
            {isLoading ? <Spinner /> : null}
          </div>
          <div className='message-to-user'>{messageToUser}</div>
          <div>
            <button onClick={handleBackToCollection} fontSize="1.6rem">back to your collection</button>
          </div>
        </div>
      </div>
    </>
  )

}

export default AddPodcasts
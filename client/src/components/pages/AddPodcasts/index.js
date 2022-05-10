import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import podcastApi from '../../Api';
import Spinner from '../../Spinner';
import Button from "../../styledComponents/Button"
import "./style.scss"


const AddPodcasts = () => {

  const [audioFiles, setAudioFiles] = useState(null);
  const [messageToUser, setMessageToUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const navigate = useNavigate();
  const { state } = useLocation();

  const handleBackToCollection = () => {
    navigate('/collection', { state: state });
  }

  const fileAudioChange = (e) => {
    const file = Object.values(e.target.files);
    setAudioFiles(file);
  }

  const uploadAudio = async () => {
    if (!validDetails()) {
      setMessageToUser("you didn't choose files");
      return
    }
    try {
      setIsLoading(true);
      setMessageToUser('');
      const data = new FormData();
      audioFiles.forEach((audio) => {
        data.append('audio', audio);
      })
      const audioData = await podcastApi.post(`${state.collectionId}/upload/audio`, data);
      console.log(audioData, 'audiodata');
      state.podcasts = [...audioData.data.podcasts];
      localStorage.removeItem('collectionsList');
      setIsLoading(false);
      setMessageToUser('upload successfully ');
    } catch (e) {
      setIsLoading(false);
      console.log(e.message)
      setMessageToUser(e.message);
    }

  }

  const validDetails = () => {
    return audioFiles;
  }



  return (
    <div className='add-podcasts-container'>
      <div className='add-podcasts-inner'>
        <h2>add podcasts</h2>
        <div>
          Add Audio <input type="file" multiple onChange={fileAudioChange} accept='audio/*' />
        </div>
        <div>
          <Button onClick={uploadAudio}>submit</Button>
        </div>
        <div>
          {isLoading ? <Spinner /> : null}
        </div>
        <div>{messageToUser}</div>
        <div>
          <Button onClick={handleBackToCollection}>back to your collection</Button>
        </div>
      </div>
    </div>
  )

}

export default AddPodcasts
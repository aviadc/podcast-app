import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import podcastApi from '../../Api';
import Spinner from '../../Spinner';
import Button from '../../styledComponents/Button';
import "./style.scss"

const AddCollection = () => {

  const [imageFile, setImageFile] = useState(null);
  const [audioFiles, setAudioFiles] = useState(null);
  const [collectionTitle, setCollectionTitle] = useState('');
  const [messageToUser, setMessageToUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let filesSize = 0;

  const navigate = useNavigate();
  const { state } = useLocation();

  const handleBackToProfile = () => {
    navigate('/profile');
  }

  const uploadImage = async (collectionId) => {
    const data = new FormData();
    data.append('image', imageFile);
    try {
      console.log("image", data);
      await podcastApi.post(`${collectionId}/upload/image`, data);
    } catch (err) {
      console.log(err)
    }
  }

  const uploadAudio = async (collectionId) => {
    const audioFilesData = new FormData();
    audioFiles.forEach((audio) => {
      audioFilesData.append('audio', audio);
    })
    try {
      console.log("audio", audioFilesData);
      console.log("filesSize", filesSize);
      await podcastApi.post(`${collectionId}/upload/audio`, audioFilesData);
    } catch (err) {
      console.log(err)
    }
  }

  const uploadTitle = async () => {
    try {
      const { data } = await podcastApi.post(`${state._id}/upload/title`, { title: collectionTitle, filesSize: filesSize });
      return data;
    } catch (err) {
      return null
    }
  }

  const uploadCollection = async () => {
    console.log(audioFiles);
    if (!validDetails()) {
      return
    }
    try {
      setIsLoading(true);
      setMessageToUser('');
      const data = await uploadTitle();
      if (!data) {
        throw new Error('title error! try another title');
      }
      const imgData = await uploadImage(data._id);
      const audioData = await uploadAudio(data._id);
      console.log("imageclientdata", imgData);
      console.log("audioclientdata", audioData);
      setIsLoading(false);
      localStorage.removeItem('collectionsList');
      setMessageToUser('upload successfully ');
    } catch (err) {
      setIsLoading(false);
      console.log(err.message)
      setMessageToUser(err.message);
    }
    console.log(filesSize, "filesize after upload every thing");
  }

  const validDetails = () => {
    if (!(imageFile && audioFiles && collectionTitle)) {
      setMessageToUser('missing details');
      return null;
    }
    // let filesSize = 0;
    if (imageFile.type.slice(0, 5) !== "image") {
      setMessageToUser('error image type!');
      return null;
    }
    filesSize += imageFile.size;
    for (let i = 0; i < audioFiles.length; i++) {
      filesSize += audioFiles[i].size;
      if (audioFiles[i].type.slice(0, 5) !== "audio") {
        setMessageToUser('error audio type!');
        return null;
      }
    }
    if (filesSize > 25000000 - state.collectionSize) {
      setMessageToUser('you have been over the collection size limit');
      return null;
    }
    // console.log("tempFileSize",typeof tempFilesSize);
    // setFilesSize(prev=>prev+tempFilesSize);
    return true
  }



  return (
    <>
      <div className='page-background-1'></div>
      <div className='add-collection-container'>
        <div className='add-collection-inner'>
          <h2>add a collection</h2>
          <div>
            ADD IMAGE <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
          </div>
          <div>
            ADD AUDIO <input type="file" multiple onChange={(e) => setAudioFiles(Object.values(e.target.files))} accept='audio/*' />
          </div>
          <div>
            collection name: <input type='text' onChange={(e) => setCollectionTitle(e.target.value)} />
          </div>
          <div>
            <Button onClick={uploadCollection} fontSize="1.6rem">ADD COLLECTION</Button>
          </div>
          <div>
            {isLoading ? <Spinner /> : null}
          </div>
          <div style={{color: "red"}}>{messageToUser}</div>
          <div>
            <Button onClick={handleBackToProfile} padding="10px" fontSize="1.6rem">back to profile</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddCollection
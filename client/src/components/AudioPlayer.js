import React ,{useState,useRef,useEffect} from 'react';
import "./css/AudioPlayer.css"
import {AiOutlineArrowLeft} from "react-icons/ai"
import {AiOutlineArrowRight} from "react-icons/ai"
import {FaPlay} from "react-icons/fa"
import {FaPause} from "react-icons/fa"


function AudioPlayer() {
  // state
  const [isPlaying,setIsPlaying] = useState(false);
  const [duration,setDuration] = useState(0);
  const [currentTime,setCurrentTime] = useState(0);

  //ref
  const audioPlayer = useRef(); //ref to the audio tag

  useEffect(()=>{
    setDuration(audioPlayer.current.duration);
  },[audioPlayer?.current?.loadedmetadata,audioPlayer?.current?.readyState]);//check if the audio has been loaded


  const togglePlayPause = (e)=>{  //define the play/pasue button
    const prevValue = isPlaying //because useState is async and we want the current state
   setIsPlaying(!prevValue);
   if(!prevValue){
     audioPlayer.current.play();
   }else{
     audioPlayer.current.pause();
   }
  }

  const calculateTime = (sec)=>{
    const minutes = Math.floor(sec / 60);
    const returnMinutes = minutes < 10? `0${ minutes}` : `{${ minutes}}`
    const seconds = Math.floor(sec % 60);
    const returnSeconds = seconds < 10? `0${seconds}` : `${seconds}`
    return `${returnMinutes}:${returnSeconds}`;
  }


  return (
    <div className='audio-player-container'>
      <audio ref={audioPlayer} src=' https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' preload='metadata'></audio>
      <button className='forward-backward'>30 <AiOutlineArrowLeft /></button>
      <button onClick={togglePlayPause} className='play-pause' >{isPlaying ? <FaPause /> : <FaPlay className='play' />}</button>
      <button className='forward-backward'><AiOutlineArrowRight /> 30</button>

      {/* current time */}
      <div className='current-time'>{calculateTime(currentTime )}</div>

      {/* progress bar */}
      <input type='range' className='progress-bar' defaultValue='0' />

      {/*{(duration&&!isNaN(duration))&&calculateTime(duration)} */}

      {/* duration */}
      <div className='duration'>{!isNaN(duration)&&calculateTime(duration)}</div> {/*check if duration has been loaded and duration is number*/}
    </div>
  )
}

export default AudioPlayer;

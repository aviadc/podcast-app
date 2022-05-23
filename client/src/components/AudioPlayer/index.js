import React, { useState, useRef, useEffect } from 'react';
import "./style.scss"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { AiOutlineArrowRight } from "react-icons/ai"
import { FaPlay } from "react-icons/fa"
import { FaPause } from "react-icons/fa"


const AudioPlayer = (props) => {
  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  //ref
  const audioPlayer = useRef(); //ref to the audio tag
  let progressBar = useRef(); //ref to our progress bar
  const animationRef = useRef() //ref to animation

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration)
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);//check if the audio has been loaded


  const togglePlayPause = (e) => {  //define the play/pasue button
    const prevValue = isPlaying //because useState is async and we want the current state
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying)
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current)
    }
  }

  const whilePlaying = () => {
    if (audioPlayer.current===null) {
      return
    }
    progressBar.current.value = audioPlayer.current.currentTime;
    progressBar.current.style.setProperty('--width-before-slider', `${progressBar.current.value / duration * 100}%`)
    setCurrentTime(progressBar.current.value);
    animationRef.current = requestAnimationFrame(whilePlaying)
  }

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    setCurrentTime(progressBar.current.value)
    progressBar.current.style.setProperty('--width-before-slider', `${progressBar.current.value / duration * 100}%`)
  }

  const calculateTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const returnMinutes = minutes < 10 ? `0${minutes}` : `{${minutes}}`
    const seconds = Math.floor(sec % 60);
    const returnSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
    return `${returnMinutes}:${returnSeconds}`;
  }

  const backThirty = () => { //button back 30 sec
    progressBar.current.value = Number(progressBar.current.value) - 30;
    changeRange()
  }

  const forwardThirty = () => { //button back 30 sec
    progressBar.current.value = Number(progressBar.current.value) + 30;
    changeRange()
  }

  //' https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'

  return (
    <div className='audio-player-container'>
      <audio ref={audioPlayer} src={props.audioLink} preload='metadata'></audio>
      <button className='forward-backward' onClick={backThirty}>30 <AiOutlineArrowLeft /></button>
      <button onClick={togglePlayPause} className='play-pause' >{isPlaying ? <FaPause /> : <FaPlay className='play' />}</button>
      <button className='forward-backward' onClick={forwardThirty}><AiOutlineArrowRight /> 30</button>

      {/* current time */}
      <div className='current-time'>{calculateTime(currentTime)}</div>

      {/* progress bar */}
      <input type='range' className='progress-bar' defaultValue='0' ref={progressBar} onChange={changeRange} />

      {/*{(duration&&!isNaN(duration))&&calculateTime(duration)} */}

      {/* duration */}
      <div className='duration'>{!isNaN(duration) && calculateTime(duration)}</div> {/*check if duration has been loaded and duration is number*/}
    </div>
  )
}

export default AudioPlayer;

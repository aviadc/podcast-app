import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import podcastApi from '../../../Api';
import validator from 'validator';
import "./register.scss"


const Register = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
 
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if(!validDetails()){
      return
    }
    const user = {
      name, email, password
    }
    try {
      await podcastApi.post('/register', user);
      navigate('/login');
    } catch (err) {
      console.log(err.message);
    }
  }

  const validDetails = ()=>{
    setNameError('')
    setPasswordError('')
    setEmailError('');
    if(!name){
      setNameError('name error!')
      return null
    }
    if(!validator.isEmail(email)){
      setEmailError('email error!');
      return null
    }
    if(password.length<6){
      setPasswordError('password error!')
      return null;
    }
    return true;
  }



  return (
    <>
      <div className='register-container'>
        <div className='register-inner'>
          <div>
            <h2>Register</h2>
          </div>
          <form className='form'>
            <div>
              <input placeholder='name' onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <div className='message-to-user'>{nameError}</div>
              <input placeholder='email' onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='message-to-user'>{emailError}</div>
            <div>
              <input type={'password'} placeholder='password: 6 characters min' onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='message-to-user'>{passwordError}</div>
            <div>
              <button onClick={submit} fontSize="1.6rem">submit</button>
            </div>
          </form>
          <div>
            back to <Link to={'/login'}>Log in</Link>
          </div>
        </div>
      </div>

    </>
  )
}

export default Register
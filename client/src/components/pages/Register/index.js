import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import podcastApi from '../../Api';
import Button from '../../styledComponents/Button';
import "./style.scss"


const Register = () => {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const user = {
      name, email, password
    }
    console.log('user', user);
    try {
      const data = await podcastApi.post('/register', user);
      console.log('data', data);
      navigate('/login');
    } catch (e) {
      console.log(e.message);
    }
  }



  return (
    <>
      <div className='register-page'>  </div>
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
              <div>{nameError}</div>
              <input placeholder='email' onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>{emailError}</div>
            <div>
              <input type={'password'} placeholder='password: 6 characters min' onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>{passwordError}</div>
            <div>
              <Button onClick={submit} fontSize="1.6rem">submit</Button>
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
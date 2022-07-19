import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import podcastApi from '../../../Api';
import Button from "../../styledComponents/Button"
import "./style.scss"


const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [messageToTheUser, setMessageToTheUser] = useState('');

  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    const user = {
      email, password
    }
    try {
      const { data } = await podcastApi.post('/login', user);
      localStorage.setItem('token', data);
      navigate('/profile');
    } catch (err) {
      setMessageToTheUser('wrong credentials')
      console.log(err.message);
    }
  }
  return (
    <>
    {console.log("in login")}
      <div className='page-background-1'> </div>
      <div className='login-container'>
        <div className='login-inner'>
          <div>
            <h2>Login</h2>
          </div>
          <form className='form'>
            <div>
              <input placeholder='email' onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <input type={'password'} placeholder='password' onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='message-to-user'>{messageToTheUser}</div>
            <div>
              <Button onClick={handleLogin} fontSize="1.6rem">login</Button>
            </div>
          </form>
          <div className='not-have-a-user'>not have a user? please <Link to={'/register'}>Register</Link> </div>
        </div>
      </div>
    </>
  )
}

export default Login
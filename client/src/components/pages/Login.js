import React ,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainNavbar from '../navabrs/MainNavbar';
import podcastApi from '../Api';
import '../css/login.css'


function Login() {
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [messageToTheUser,setMessageToTheUser] = useState('');

  const navigate = useNavigate();
  

  const login= async(e)=>{
    e.preventDefault();
    // console.log(e);
    const user = {
     email,password
    }
    console.log('user',user);
    try{
      const {data} = await podcastApi.post('/login',user);
      console.log('data',data);
      localStorage.setItem('token',data);
      navigate('/profile');
    }catch(e){
      setMessageToTheUser('wrong credentials')
      console.log(e.message);
    }
  }
  return (
    <div className='login-page'>
      <MainNavbar />
        <div className='login-container'>
          <div className='login-inner'>
            <h2>Login</h2>
            <form className='form'>
              <div>
                <input placeholder='email' onChange={(e)=>setEmail(e.target.value)}/>
              </div>
              <div>
                <input type={'password'} placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
              </div>
              <div className='message-to-the-user'>{messageToTheUser}</div>
              <div>
              <button onClick={login}>login</button>
              </div>
            </form>
            <div className='font'>not have a user? please <Link to={'/register'}>Register</Link> </div>
          </div>
      </div>
    </div>
  )
}

export default Login;

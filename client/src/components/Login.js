import React ,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainNavbar from './navabrs/MainNavbar';
import podcastApi from './Api';


function Login() {
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();

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
      console.log(e.message);
    }
  }
  return (
    <div>
      <MainNavbar />
        <div className='login-container'>
        <h2>Login</h2>
        <form className='form'>
          <div>
            <input placeholder='email' onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div>
            <input type={'password'} placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <div>
          <button onClick={login}>login</button>
          </div>
        </form>
        <div className='font'>not have a user? please <Link to={'/register'}>Register</Link> </div>
      </div>
    </div>
  )
}

export default Login;

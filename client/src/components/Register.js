import React ,{useState} from 'react';
import { Link , useNavigate } from "react-router-dom";
import "../index.css";
import podcastApi from './Api';
import MainNavbar from './navabrs/MainNavbar';

function Register() {
  const [name,setName] = useState();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();

  const navigate = useNavigate();

  const submit= async(e)=>{
    e.preventDefault();
    // console.log(e);
    const user = {
      name,email,password
    }
    console.log('user',user);
    try{
      const data = await podcastApi.post('/register',user);
      console.log('data',data);
      navigate('/login');
    }catch(e){
      console.log(e.message);
    }
  }



  return <div className='login-container'>
     <MainNavbar />
    <h2>Register</h2>
    <form className='form'>
      <div>
        <input placeholder='name' onChange={(e)=>setName(e.target.value)}/>
      </div>
      <div>
        <input placeholder='email' onChange={(e)=>setEmail(e.target.value)}/>
      </div>
      <div>
        <input type={'password'} placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
      </div>
      <div>
       <button onClick={submit}>submit</button>
      </div>
    </form>
    <div className='font'>
      back to <Link to={'/login'}>Log in</Link>
    </div>
  </div>;
}

export default Register;

import React ,{useState} from 'react';
import { Link , useNavigate } from "react-router-dom";
import podcastApi from '../Api';
import MainNavbar from '../navabrs/MainNavbar';
import '../css/register.css'

function Register() {
  const [name,setName] = useState();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [nameError,setNameError] = useState('');
  const [emailError,setEmailError] = useState('');
  const [passwordError,setPasswordError] = useState('');

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



  return <div className='register-page'>
     <MainNavbar />
     <div className='register-container'>
       <div className='register-inner'>
        <h2>Register</h2>
        <form className='form'>
          <div>
            <input placeholder='name' onChange={(e)=>setName(e.target.value)}/>
          </div>
          <div>
            <div>{nameError}</div>
            <input placeholder='email' onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div>{emailError}</div>
          <div>
            <input type={'password'} placeholder='password: 6 characters min' onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <div>{passwordError}</div>
          <div>
          <button onClick={submit}>submit</button>
          </div>
        </form>
        <div>
          back to <Link to={'/login'}>Log in</Link>
        </div>
       </div>
     </div>
  </div>;
}

export default Register;

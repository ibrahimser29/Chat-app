import React, {useState} from 'react'
import { SendLoginRequest } from '../api/auth/auth';
import { Link } from 'react-router-dom';
import api from '../api/api';
function Login() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [clientErrors, setClientErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};
    if (email == '') {
      newErrors.email = ["Email is required"];
    }
    if (password == '') {
      newErrors.password = ["Password is required"];
    }else if (password.length < 8){
      newErrors.password = ["Password must be more than 8 characters"];
    }
    console.log(newErrors)
    setClientErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  const handleLogin = (event) => {
    event.preventDefault();
    if(!validateForm()) return;
    let cardentials = {email:email,password:password};
    SendLoginRequest(cardentials).then(resp => {
          localStorage.setItem('user', JSON.stringify(resp.data.data.user))
          localStorage.setItem('token',resp.data.data.token)
          api.defaults.headers.common = {'Authorization': `bearer ${resp.data.data.token}`}
          window.location.href = '/chats';//to refresh while navigating instead of react navigate
    })
    .catch(error => {
      if(error.response.status == 422){
       setErrors(error.response.data.errors);
       console.log(error.response.data.errors)
      }else{
        setErrors({response:error.response.data.message});
      }
    });
  }
  return (
    <section className="vh-100">
  <div className="container py-5 h-100">
    <div className="row d-flex align-items-center justify-content-center h-100">
      <div className="col-md-8 col-lg-7 col-xl-6">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          className="img-fluid" alt="Phone image"/>
      </div>
      <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
        <form>
        {Object.values(errors).length > 0 && Object.values(errors).map((error,i)=>{
          return <p className='alert-danger'>{error}</p>
        })}
          <div className="form-outline mb-4">
           <label className="form-label">Email address</label>
            <input type="email"  className="form-control form-control-lg" onChange={(e)=> setEmail(e.target.value)} />
            {clientErrors.email && <p className='text-danger'>{clientErrors.email[0]}</p>}
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" >Password</label>
            <input type="password"  className="form-control form-control-lg" onChange={(e)=> setPassword(e.target.value)} />
            {clientErrors.password && <p className='text-danger'>{clientErrors.password[0]}</p>}
          </div>

      
          <button onClick={(event)=>handleLogin(event)} className="btn btn-primary btn-lg btn-block">Sign in</button>
          <div className='text-center pt-3'>New here? <Link to='/register'>Create Account</Link></div>
        </form>
      </div>
    </div>
  </div>
</section>
  )
}

export default Login
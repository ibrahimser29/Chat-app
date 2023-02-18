import React, {useState} from 'react'
import { SendRegisterRequest } from '../api/auth/auth';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
function Register() {
    const navigate = useNavigate();
  const [user,setUser] = useState({});
  const [errors, setErrors] = useState({});
  const [clientErrors, setClientErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};
    if(Object.keys(user).length == 0){
        alert('all fileds are required');
        return;
    }
    if (user.name == '' || user.name == undefined) {
        newErrors.name = ["Name is required"];
      }
    if (user.email == '' || user.email == undefined) {
      newErrors.email = ["Email is required"];
    }
    if (user.image == undefined) {
        newErrors.image = ["Image is required"];
      }
    if (user.password == '' || user.password == undefined) {
      newErrors.password = ["Password is required"];
    }else if (user.password.length < 8){
      newErrors.password = ["Password must be more than 8 characters"];
    }
    else if (user.password_confirmation !== user.password){
        newErrors.password = ["Passwords didn't match"];
      }
    setClientErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  const handleRegister = (event) => {
    event.preventDefault();
    if(!validateForm()) return;
    SendRegisterRequest(user).then(resp => {
      if(resp.data.errors == false) {
          localStorage.setItem('user', JSON.stringify(resp.data.data.user))
          localStorage.setItem('token',resp.data.data.token)
          //navigate('/chats')
      }
    })
    .catch(error => {
      if(error.response.status == 422){
       setErrors(error.response.data.errors);
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
        <form encType="multipart/form-data">
        {Object.values(errors).length > 0 && <div className='alert alert-danger'>{
            Object.values(errors).map((error,i)=>{
                return <p>{error}</p>
              })
            }</div>}
        <div className="form-outline mb-4">
           <label className="form-label">Name</label>
            <input type="text"  className="form-control form-control-lg" onChange={(e)=> setUser({...user,name:e.target.value})} />
            {clientErrors.name && <p className='text-danger'>{clientErrors.name[0]}</p>}
          </div>
          <div className="form-outline mb-4">
           <label className="form-label">Email address</label>
            <input type="email"  className="form-control form-control-lg" onChange={(e)=> setUser({...user,email:e.target.value})} />
            {clientErrors.email && <p className='text-danger'>{clientErrors.email[0]}</p>}
          </div>
          <div className="form-outline mb-4">
           <label className="form-label">image</label>
            <input type="file"  className="form-control form-control-lg" onChange={(e)=> setUser({...user,image:e.target.files[0]})} />
            {clientErrors.image && <p className='text-danger'>{clientErrors.image[0]}</p>}
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" >Password</label>
            <input type="password"  className="form-control form-control-lg" onChange={(e)=> setUser({...user,password:e.target.value})} />
            {clientErrors.password && <p className='text-danger'>{clientErrors.password[0]}</p>}
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" >Confirm Password</label>
            <input type="password"  className="form-control form-control-lg" onChange={(e)=> setUser({...user,password_confirmation:e.target.value})} />
            {clientErrors.password_confirmation && <p className='text-danger'>{clientErrors.password_confirmation[0]}</p>}
          </div>

      
          <button onClick={(event)=>handleRegister(event)} className="btn btn-primary btn-lg btn-block">Create Account</button>
          <div className='text-center pt-3'>Already have an account? <Link to='/register'>Sign In</Link></div>
        </form>
      </div>
    </div>
  </div>
</section>
  )
}

export default Register
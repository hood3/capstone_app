import React, { useState } from 'react';
import {Link,Redirect} from 'react-router-dom';
import loginImg from "../assets/login.svg";
import "../myStyles/style.scss";
import axios from 'axios';
import {authenticate, isAuth} from './helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Login = () => {
  const [values,setValues] = useState ({  
   email:'',
   password:'',
   buttonText:'SignIn'
 });

 const {email,password,buttonText} = values; // Destructured to save typing

 const handleChange = name => event => {   
   setValues({ ...values, [name]: event.target.value });
};

const clickSubmit = event => { //Events from button being clicked
 event.preventDefault(); //Keep page from reloading
 setValues({ ...values, buttonText: 'Signing-In' }); // change button value while submitting
 axios({  //Sending to server
     method: 'POST',
     url: `${process.env.REACT_APP_API}/signin`,  //Server url
     data: { email, password }  //Data sent
 })
     .then(response => { //Response 
         console.log('SIGNIN SUCCESS', response); //Console log response
         // Save the response(user, token) in local storage and token in cookie
         authenticate(response, () => {
           setValues({ ...values, name: '', email: '', password: '', buttonText: 'Signed-In' }); //Clearing values after sending
           toast.success(`Hello ${response.data.user.name}, Welcome back!`); //Show response on UI          
     });
  })   
     .catch(error => {          
         setValues({ ...values, buttonText: 'SignIn' }); 
         toast.error(error.response.data.error);
     });
};

const signinForm = () => (
 <form>     
     <div className="form-group">
         <label className="text-black-150 font-weight-bold">Email</label>
         <input onChange={handleChange('email')} value={email} type="email" className="form-control" />
     </div>
     <div className="form-group">
         <label className="text-black-150 font-weight-bold">Password</label>
         <input onChange={handleChange('password')} value={password} type="password" className="form-control" />
     </div>
     <div>
         <button className="btn btn-primary" onClick={clickSubmit}>
             {buttonText}
         </button>
     </div>
 </form>
);
  
    return (
      <div className="base-container">
         <ToastContainer />
         {isAuth() ? <Redirect to="/GetSentences" />: null}
        <div className="header">Hood English App <br/>Existing user's may skip registering, and go straight to sign in.
        <br/>SignIn</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt="logpic"/>
          </div>
          {signinForm()}
          <br/>
          <Link to="/auth/password/forgot" className="btn btn-danger">Forgot Password</Link>            
          </div>
        </div>      
    );
  }

export default Login;
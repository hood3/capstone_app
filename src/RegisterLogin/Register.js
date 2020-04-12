import React, { useState } from 'react';
import loginImg from "../assets/login.svg";
import "../myStyles/style.scss";
import axios from "axios";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Register = () => {
   const [values,setValues] = useState ({
    name:'',
    email:'',
    password:'',
    buttonText:'Register'
  });

  const {name,email,password,buttonText} = values; // Destructured to save typing

  const handleChange = name => event => {   
    setValues({ ...values, [name]: event.target.value });
};

const clickSubmit = event => { //Events from button being clicked
  event.preventDefault(); //Keep page from reloading
  setValues({ ...values, buttonText: 'Registering' }); // change button value while submitting
  axios({  //Sending to server
      method: 'POST',
      url: `${process.env.REACT_APP_API}/signup`,  //Server url
      data: { name, email, password }  //Data sent
  })
      .then(response => { //Response 
          console.log('SIGNUP SUCCESS', response); //Console log response
          setValues({ ...values, name: '', email: '', password: '', buttonText: 'Registered' }); //Clearing values after sending
          toast.success(response.data.message); //Show response on UI
      })
      .catch(error => { //Catch any errors
          console.log('SIGNUP ERROR', error.response.data);//Console log any error msg from server
          setValues({ ...values, buttonText: 'Register' }); //If errors clear button text - original text
          toast.error(error.response.data.error);
      });
};

const signupForm = () => (
  <form>
      <div className="form-group">
          <label className="text-black-150 font-weight-bold">Name</label>
          <input onChange={handleChange('name')} value={name} type="text" className="form-control" />
      </div>
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
        <div className="header">Hood English App <br/>New user's must register with a valid email, 
                            before signing in.<br/>Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt="logpic" />
          </div>   
          {signupForm()}      
        </div>
      </div>
    );
}
 

export default Register;
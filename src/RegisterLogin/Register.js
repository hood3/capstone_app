import React, { useState } from 'react';//For react state hook
import loginImg from "../assets/login.svg";//Google image
import "../myStyles/style.scss";
import axios from "axios";
import {ToastContainer,toast} from 'react-toastify';//For elegant alerts
import 'react-toastify/dist/ReactToastify.min.css';

const Register = () => {
   const [values,setValues] = useState ({//State object values with method setValues
    name:'',
    email:'',
    password:'',
    buttonText:'Register'//Button text will change during events
  });

  const {name,email,password,buttonText} = values; // Destructured to save typing

  const handleChange = name => event => {   //Function to grab input values on change
    setValues({ ...values, [name]: event.target.value });//and set the state with values
};

const clickSubmit = event => { //Events from button being clicked
  event.preventDefault(); //Keep page from reloading
  setValues({ ...values, buttonText: 'Registering' }); // Change button value while submitting
  axios({  //Sending to server
      method: 'POST',
      url: `${process.env.REACT_APP_API}/signup`,  //Server url
      data: { name, email, password }  //Data sent
  })
      .then(response => { //Response 
          console.log('SIGNUP SUCCESS', response); //Console log response
          setValues({ ...values, name: '', email: '', password: '', buttonText: 'Registered' }); //Clearing values after sending
          toast.success(response.data.message); //Show response on UI as alert
      })
      .catch(error => { //Catch any errors
          console.log('SIGNUP ERROR', error.response.data);//Console log any error msg from server
          setValues({ ...values, buttonText: 'Register' }); //If errors clear button text - original text
          toast.error(error.response.data.error);
      });
};

const signupForm = () => (//Method containing the Registration form
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
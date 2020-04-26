import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import Layout from '../Layout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Reset = ({ match }) => {
    // Props.match from react router dom
    const [values, setValues] = useState({//Sets all state values 
        name: '',
        token: '',
        newPassword: '',
        buttonText: 'Reset password'
    });

    //After component mounts grab the token 
    useEffect(() => {
        let token = match.params.token;//Grab the token from the route parameters
        let { name } = jwt.decode(token); //Decode the token for users name        
        if (token) {//Once token decoded set all values
            setValues({ ...values, name, token });
        }
    }, [match.params.token, values]);//Use effect will run whenever values change

    const { name, token, newPassword, buttonText } = values;//Destructuring values

    const handleChange = event => {//Function to grab input values on change
        setValues({ ...values, newPassword: event.target.value });//Set newpassword value
    };

    const clickSubmit = event => {
        event.preventDefault();//Prevent page from reloading
        setValues({ ...values, buttonText: 'Submitting' });//Set state values
        axios({//Update users password to new password
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/reset-password`,
            data: { newPassword, resetPasswordLink: token }//Saves new token
        })
            .then(response => {//Success response
                console.log('RESET PASSWORD SUCCESS', response);
                toast.success(response.data.message);
                setValues({ ...values, buttonText: 'Done' });
            })
            .catch(error => {//Any error response
                console.log('RESET PASSWORD ERROR', error.response.data);
                toast.error(error.response.data.error);
                setValues({ ...values, buttonText: 'Reset password' });
            });
    };

    const passwordResetForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    onChange={handleChange}
                    value={newPassword}
                    type="password"
                    className="form-control"
                    placeholder="Type new password"
                    required
                />
            </div>
            <div>
                <button className="btn btn-primary" onClick={clickSubmit}>
                    {buttonText}
                </button>
            </div>
        </form>
    );

    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                <h1 className="p-5 text-center">Hey {name}, Type your new password</h1>
                {passwordResetForm()}
            </div>
        </Layout>
    );
};

export default Reset;
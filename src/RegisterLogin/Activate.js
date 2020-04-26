import React, { useState, useEffect } from 'react';
import Layout from '../Layout';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Activate = ({match}) => {//Props match gives the route parameter
    const [values, setValues] = useState({//Sets the state of values
        name: '',
        token: '',
        show: true
    });

    useEffect(() => { //In place of didmount, runs any time the state changes        
        let token = match.params.token;//Sets the token variable with what is obtained from the route cookie
        let { name } = jwt.decode(token);//Decode the token to grab the user name
        console.log(token);
        if (token) {//If i have a token, update the state of all values
            setValues({ ...values, name, token });
        }
    }, [match.params.token, values]);

    const { name, token } = values;

    const clickSubmit = event => {
        event.preventDefault();//Prevents the page from reloading
        axios({//Saves the token for the user in my database
            method: 'POST',
            url: `${process.env.REACT_APP_API}/account-activation`,
            data: { token }
        })
            .then(response => {//Success message and reset values
                console.log('ACCOUNT ACTIVATION', response);
                setValues({ ...values, show: false });
                toast.success(response.data.message);
            })
            .catch(error => {//Catch any errors and display to user
                console.log('ACCOUNT ACTIVATION ERROR', error.response.data.error);
                toast.error(error.response.data.error);
            });
    };

    const activationLink = () => (
        <div className="text-center">
            <h1 className="p-5">Hello {name}, Ready to activate your account?</h1>
            <button className="btn btn-outline-primary" onClick={clickSubmit}>
                Activate Account
            </button>
        </div>
    );

    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                {activationLink()}
            </div>
        </Layout>
    );
};

export default Activate;
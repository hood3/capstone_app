import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import Activate from './RegisterLogin/Activate';
import GetSentences from './WordsQuiz/GetSentences';
import Quiz from './WordsQuiz/Quiz';
import PrivateRoute from './RegisterLogin/PrivateRoute';
import Forgot from './RegisterLogin/Forgot';
import Reset from './RegisterLogin/Reset';

//My routes component to correspond to specific paths all wrapped inside browserrouter
const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App} />    
                <Route path="/GetSentences" exact component={GetSentences} />                                             
                <Route path="/auth/activate/:token" exact component={Activate} />   
                <PrivateRoute path="/Quiz" exact component={Quiz} />  
                <Route path="/auth/password/forgot" exact component={Forgot} />      
                <Route path="/auth/password/reset/:token" exact component={Reset} />                          
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
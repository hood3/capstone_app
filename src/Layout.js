import React, { Fragment } from 'react';
import './myStyles/App.css';
import logo from './assets/logo.svg';
import logo1 from './assets/logo.svg';
import { Link,withRouter } from 'react-router-dom';
import { isAuth,signout } from './RegisterLogin/helpers';

const Layout = ({ children,match,history }) => {  
    const isActive = path => {
        if (match.path === path) {
            return { color: '#ff0000' };
        } else {
            return { color: '#000' };
        }
    };

    const nav = () => (
        <ul className="nav nav-tabs bg-primary justify-content-end" >
            {!isAuth() && (
                <Fragment>
                    <li className="nav-item">
                        <Link to="/" className="nav-link" style={isActive('/')}>
                            Register/SignIn                           
                        </Link>
                    </li>
                </Fragment>
            )}
            {isAuth() && isAuth().role === 'subscriber' && (
                <li className="nav-item">
                    <Link className="nav-link" style={isActive('/Quiz')} to="/Quiz">
                        {isAuth().name}
                    </Link>
                </li>
            )}
            {isAuth() && (
                <Fragment>
                    <li className="nav-item">
                        <Link to="/GetSentences" className="nav-link" style={isActive('/GetSentences')}>
                            Study
                        </Link>
                    </li>
                </Fragment>
            )}           
            {isAuth() && (
                <li className="nav-item">
                    <span className="nav-link" style={{curser:'pointer',color:'#000'}} onClick={() => {
                        signout(() => {
                            history.push('/')
                        })
                    }}>SignOut</span>                    
                </li>             
            )}
        </ul>
    );

    return(
        <div>
             <div className="capApp">  
            <header className="capApp-header">
                <img src={logo} className="capApp-logo" alt="logo" />
                <img src={logo1} className="capApp-logo1" alt="logo1" />
                <h1 className="capApp-title">Hood English App</h1>
                </header>
                </div>
            <Fragment>
                {nav()}
                <div className="container">{children}</div>
            </Fragment>           
        </div>
        );
};  

export default withRouter(Layout);
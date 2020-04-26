import cookie from 'js-cookie';

// Set cookie on signin
export const setCookie = (key, value) => {//key is the name of token and value is the value
    if (window !== 'undefined') {//Make sure the window object is available
        cookie.set(key, value, {//Set method to pass key and value into the cookie
            expires: 1  //Expires in one day
        });
    }
};

// Remove from cookie
export const removeCookie = key => {//Can remove the cookie by name
    if (window !== 'undefined') {//Make sure the window object is available
        cookie.remove(key, {//Remove cookie
            expires: 1
        });
    }
};

// Get from cookie such as stored token
// will be useful when I need to make request to server with token
export const getCookie = key => {
    if (window !== 'undefined') {//Make sure the window object is available
        return cookie.get(key);//Return cookie by name for backend
    }
};

// Set user information into localstorage
export const setLocalStorage = (key, value) => {//Name and value
    if (window !== 'undefined') {//Make sure the window object is available
        localStorage.setItem(key, JSON.stringify(value));//Set value in local storage as json file
    }
};

// Remove from localstorage
export const removeLocalStorage = key => {//Remove item by name
    if (window !== 'undefined') {//Make sure the window object is available
        localStorage.removeItem(key);
    }
};

// Authenticate user by passing data to cookie and localstorage during signin
export const authenticate = (response, next) => {//Response from successful user signup
    console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE', response);
    setCookie('token', response.data.token);//After response returned, invoke setCookie method
    setLocalStorage('user', response.data.user);//After response returned, invoke setStorage method
    next();//Callback function, accessible in signin(like middleware), for redirect, or alerts
    //or whatever I need to do
};

// Access user info from localstorage
export const isAuth = () => {
    if (window !== 'undefined') {//Make sure the window object is available
        const cookieChecked = getCookie('token');//Get the cookie from the browser
        if (cookieChecked) {// If I have the cookie get item user from localstorage
            if (localStorage.getItem('user')) {//The key is user
                return JSON.parse(localStorage.getItem('user')); //Need javaScript object
            } else {
                return false;
            }
        }
    }
};

export const signout = next => {//Remove all cookie and localstorage values on signout
    removeCookie('token');//Remove token
    removeLocalStorage('user');//Remove user
    next();//next callback so I can redirect  
};

export const updateUser = (response, next) => {
    console.log('UPDATE USER IN LOCALSTORAGE HELPERS', response);
    if (typeof window !== 'undefined') {
        let auth = JSON.parse(localStorage.getItem('user'));
        auth = response.data;
        localStorage.setItem('user', JSON.stringify(auth));
    }

    next();
};
import * as actionTypes from './actionTypes';
import axios from '../../config/axios';

export const authStart = () => {

    return {
        type: actionTypes.AUTH_START
    };

};
export const authSuccess = (token, userId) => {

    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };

};
export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    };
};
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};
const setAuthTimeout = (expiresIn) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expiresIn * 1000);
    };
};
export const auth = (email, password, isSignup) => {
    return (dispatch, getState) => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        // console.log(authData)
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBuiMJVQZECEk26OaSZbuY8FQxVHCuvtf8';
        if (!isSignup)
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBuiMJVQZECEk26OaSZbuY8FQxVHCuvtf8';
        axios.post(url, authData)
            .then(res => {
                console.log(res);
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                console.log(expirationDate);
                // console.log(new Date())
                // const time=new Date().getTime()
                // console.log(time)
                // console.log(res.data.expiresIn * 1000)
                // console.log(new Date(time+res.data.expiresIn * 1000))
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', res.data.localId);
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(setAuthTimeout(res.data.expiresIn));
            })
            .catch(err => {
                // console.log(err);
                dispatch(authFailed(err.response.data.error));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        axios.get('/continueIfAuthenticated').then(res => {
            console.log(res);
            dispatch({ type: 'Hello' });
        });
        // const token = localStorage.getItem('token');
        // if (!token) {
        //     // console.log('token not found')
        //     return dispatch(logout());
        // }
        // else {
        //     const expirationDate = new Date(localStorage.getItem('expirationDate'));
        //     if (expirationDate > new Date()) {
        //         // console.log('came here')
        //         const userId = localStorage.getItem('userId');
        //         dispatch(authSuccess(token, userId));
        //         // console.log(expirationDate)
        //         // console.log(new Date())
        //         // console.log('time ki masti',(expirationDate.getTime() - new Date().getTime())/1000)
        //         dispatch(setAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        //     }
        //     else {
        //         // console.log('came here too somehow')
        //         dispatch(logout());
        //     }
        // }
    };
};
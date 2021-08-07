import * as actionTypes from './actionTypes';
import axios from '../../config/axios';
import firebase from '../../config/firebaseInit';
export const signup = (userType, name, email, password, isGoogleLogin) => {
    console.log(userType, name, email, password,);
    return dispatch => {
        console.log('Starting the signin process');
        if (email !== '' && password !== '') {
            console.log();
            firebase.auth().createUserWithEmailAndPassword(email, password).then(
                (userCredential) => {
                    console.log(userCredential);
                    console.log(name);
                    firebase.auth().currentUser.getIdToken(true).then(token => {
                        axios.post('/signup', {
                            role: userType,
                            name: name
                        }, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        }).then(res => {
                            console.log('signup successfull');
                            console.log(res.data);
                            firebase.auth().signOut().then(response => {
                                if (userType === 'user')
                                    dispatch(authSuccess(res.data.user, null, 'user'));
                                if (userType === 'restaurant')
                                    dispatch(authSuccess(null, res.data.restaurant, 'restaurant'));

                            });
                        }).catch(error => {
                            console.log(error);
                        });
                    }).catch(err => {
                        console.log('Token not found', err);
                    });

                })
                .catch(error => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === 'auth/email-already-in-use') {
                        alert('Email Already in use');
                    } else
                        if (errorCode === 'auth/weak-password') {
                            alert('The password is too weak.');
                        } else {
                            alert(errorMessage);
                        }
                    dispatch(authFailed(errorMessage));
                    console.log(error);
                });
        }
    };
};
export const login = (userType, email, password, isGoogleLogin) => {
    console.log(userType, email, password,);
    return dispatch => {
        console.log('Starting the signin process');
        dispatch(authStart());
        if (email !== '' && password !== '') {
            console.log();
            firebase.auth().signInWithEmailAndPassword(email, password).then(
                (userCredential) => {
                    console.log(userCredential);
                    firebase.auth().currentUser.getIdToken(true).then(token => {
                        axios.post('/login', {
                            role: userType
                        }, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        }).then(res => {
                            console.log('login successfull');
                            console.log(res.data);
                            firebase.auth().signOut().then(response => {
                                if (userType === 'user')
                                    dispatch(authSuccess(res.data.user, null, 'user'));
                                if (userType === 'restaurant')
                                    dispatch(authSuccess(null, res.data.restaurant, 'restaurant'));
                            });
                        }).catch(error => {
                            console.log(error);
                        });
                    }).catch(err => {
                        console.log('Token not found', err);
                    });

                })
                .catch(error => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === 'auth/wrong-password') {
                        alert('Wrong Password');
                    } else
                        if (errorCode === 'auth/invalid-email') {
                            alert('Invalid Email');
                        } else
                            if (errorCode === 'auth/user-not-found') {
                                alert('User Not Found');
                            } else {
                                alert(errorMessage);
                            }
                    dispatch(authFailed(errorMessage));
                    console.log(error);
                });
        }
    };
};
// export const continueWithGoogle = () => {
//     var provider = new firebase.auth.FacebookAuthProvider();
//     console.log(userType, email, password,);
//     return dispatch => {
//         console.log('Starting the signin process');
//         dispatch(authStart());
//         if (email !== '' && password !== '') {
//             console.log();
//             firebase.auth().signInWithEmailAndPassword(email, password).then(
//                 (userCredential) => {
//                     console.log(userCredential);
//                     firebase.auth().currentUser.getIdToken(true).then(token => {
//                         axios.post('/login', {
//                             role: userType
//                         }, {
//                             headers: {
//                                 'Authorization': `Bearer ${token}`
//                             }
//                         }).then(res => {
//                             console.log('login successfull');
//                             console.log(res.data);
//                             firebase.auth().signOut().then(response => {
//                                 if (userType === 'user')
//                                     dispatch(authSuccess(res.data.user, null, 'user'));
//                                 if (userType === 'restaurant')
//                                     dispatch(authSuccess(null, res.data.restaurant, 'restaurant'));
//                             });
//                         }).catch(error => {
//                             console.log(error);
//                         });
//                     }).catch(err => {
//                         console.log('Token not found', err);
//                     });

//                 })
//                 .catch(error => {
//                     var errorCode = error.code;
//                     var errorMessage = error.message;
//                     if (errorCode === 'auth/wrong-password') {
//                         alert('Wrong Password');
//                     } else
//                         if (errorCode === 'auth/invalid-email') {
//                             alert('Invalid Email');
//                         } else
//                             if (errorCode === 'auth/user-not-found') {
//                                 alert('User Not Found');
//                             } else {
//                                 alert(errorMessage);
//                             }
//                     dispatch(authFailed(errorMessage));
//                     console.log(error);
//                 });
//         }
//     };
// };
export const authStart = () => {

    return {
        type: actionTypes.AUTH_START
    };

};
export const authSuccess = (user, restaurant, role) => {
    let state = {
        role,
        isAuthenticated: true
    };
    if (state.role === 'user')
        state.user = user;
    else
        if (state.role === 'restaurant')
            state.restaurant = restaurant;
    return {
        type: actionTypes.AUTH_SUCCESS,
        ...state
    };

};
export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    };
};
export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
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
        console.log('just before fetching');
        axios.get('/continueIfAuthenticated').then(res => {
            console.log(res);
            console.log('authenticated');
            if (res.data.user) {
                dispatch(authSuccess(res.data.user, null, 'user'));
            } else
                if (res.data.restaurant) {
                    dispatch(authSuccess(null, res.data.restaurant, 'user'));
                }
        }).catch(error => {
            if (error.response.status === 401) {
                console.log('not authenticated');
                dispatch(logout());
            }
        });

    };
};
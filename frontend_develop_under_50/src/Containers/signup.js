import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/index';
import firebase from '../config/firebaseInit';

const Signup = (props) => {
    useEffect(() => {
        if (!props.isAuthenticated) {
            props.onSetAuthRedirectPath();
        }
    });
    const [userType, setUserType] = useState("Not Selected");
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const emailChangedHandler = (event) => {
        setEmail(event.target.value);
    };
    const nameChangedHandler = (event) => {
        setName(event.target.value);
    };
    const userTypeChangedHandler = (event) => {
        setUserType(event.target.value);
    };
    const passwordChangedHandler = (event) => {
        setPassword(event.target.value);
    };
    const singupHandler = (event) => {
        event.preventDefault();
        if (userType !== 'user' && userType !== 'restaurant') {
            alert('Please select user type');
            return;
        }
        if (name === '') {
            alert('Please enter name');
            return;
        }
        if (email !== '' && password !== '') {
            props.onSignup(userType, name, email, password, false);
        }
    };
    const googleSignInHandler = async (event) => {
        event.preventDefault();
        if (userType !== 'user' && userType !== 'restaurant') {
            alert('Please select user type');
            return;
        }
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        const result = await firebase.auth().signInWithPopup(googleAuthProvider);
        result.user.getIdToken().then(idToken => {
            props.onCustomLogin(userType, idToken);
        }).catch(error => {
            console.log(error);
        });

    };
    return (
        <div>
            <form>
                <h3>Register</h3>
                <div className="form-group">
                    <select value={userType} onChange={userTypeChangedHandler} className="custom-select custom-select-lg mb-3">
                        <option value="Not Selected">Restaurant or User</option>
                        <option value="user">User</option>
                        <option value="restaurant">Restaurant</option>
                    </select></div>
                <div className="form-group">
                    <label>Name</label>
                    <input value={name} onChange={nameChangedHandler} type="text" className="form-control" placeholder="Name" />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input value={email} onChange={emailChangedHandler} type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input value={password} onChange={passwordChangedHandler} type="password" className="form-control" placeholder="Enter password" />
                </div>
                <div className="form-group">
                    <button onClick={singupHandler} type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <button onClick={googleSignInHandler} className="btn btn-lg btn-google btn-block text-uppercase btn-outline" >
                            <img alt="Google" src="https://img.icons8.com/color/16/000000/google-logo.png" /> Continue with Google
                        </button>
                    </div>
                </div>
                <p className="forgot-password text-right"> Already registered <a href="/signin">log in?</a>
                </p>
            </form>
        </div >
    );
};
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.isAuthenticated,
        authRedirectPath: state.auth.authRedirectPath,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onSetAuthRedirectPath: () => { dispatch(actions.setAuthRedirectPath('/')); },
        onSignup: (userType, name, email, password, isGoogleLogin) => { dispatch(actions.signup(userType, name, email, password, isGoogleLogin)); },
        onCustomLogin: (userType, idToken) => {
            dispatch(actions.customLogin(userType, idToken));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
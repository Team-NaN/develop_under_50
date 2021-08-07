import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/index';
const Login = props => {
    useEffect(() => {
        if (!props.isAuthenticated) {
            props.onSetAuthRedirectPath();
        }
    });
    const [userType, setUserType] = useState("Not Selected");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userTypeChangedHandler = (event) => {
        setUserType(event.target.value);
    };
    const emailChangedHandler = (event) => {
        setEmail(event.target.value);
    };
    const passwordChangedHandler = (event) => {
        setPassword(event.target.value);
    };
    const loginHandler = (event) => {
        event.preventDefault();
        if (userType !== 'user' && userType !== 'restaurant') {
            alert('Please select user type');
            return;
        }
        if (email !== '' && password !== '') {
            props.onLogin(userType, email, password);
        }
    };
    return (
        <form>
            <h3>Log in</h3>
            <div className="form-group">
                <select value={userType} onChange={userTypeChangedHandler} className="custom-select custom-select-lg mb-3">
                    <option value="Not Selected">Restaurant or User</option>
                    <option value="user">User</option>
                    <option value="restaurant">Restaurant</option>
                </select></div>
            <div className="form-group">
                <label>Email</label>
                <input onChange={emailChangedHandler} value={email} type="email" className="form-control" placeholder="Enter email" />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input onChange={passwordChangedHandler} value={password} type="password" className="form-control" placeholder="Enter password" />
            </div>
            <button onClick={loginHandler} type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
        </form>
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
        onLogin: (email, password, isGoogleLogin) => { dispatch(actions.login(email, password, isGoogleLogin)); }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
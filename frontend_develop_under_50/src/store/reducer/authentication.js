import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../utils/updateObject';
const initialState = {
    user: null,
    isAuthenticated: false,
    error: null,
    loading: false,
    authRedirectPath: '/'
};
const authStart = (state, action) => {
    return updateObject(state, { loading: true, error: null });
};
const authSuccess = (state, action) => {
    console.log('inside auth success');
    console.log(action);
    return updateObject(state, {
        loading: false,
        error: null,
        ...action
    });
};
const authFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};
const authLogout = (state, action) => {
    // console.log(updateObject)
    return updateObject(state, { isAuthenticated: false, user: null });
};
const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path });
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAILED: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        case 'Hello': return {
            ...state,
            isAuthenticated: true
        };
        default:
            return state;
    }
};

export default reducer;
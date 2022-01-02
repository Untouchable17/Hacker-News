import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOAD_SUCCESS,
    USER_LOAD_FAIL
} from '../actions/Types';


const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null
};


export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access);

            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            }
        
        case USER_LOAD_SUCCESS:
            return {
                ...state,
                user: payload
            }

        case USER_LOAD_FAIL:
            return {
                ...state,
                user: null
            }

        case LOGIN_FAIL:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');

            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null
            }
        default:
            return state
    }
}

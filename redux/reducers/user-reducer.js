import {
    LOADING_DATA,
    SET_ERROR,
    BANK_DETAILS,
    SET_UNAUTHENTICATED,
    SET_USER,
    CLEAR_ERRORS,
    CLEAR_MESSAGE, SET_MESSAGE, SET_OTP, PIN_LOADING,
    SET_USER_PROJECTS,
    BUY_UNIT,
    SAVE_PROJECTS,
    SUMO_AUTH
} from '../types'

const initialState = {
    sumoAuth: false,
    loading: false,
    pinLoading: false,
    error: null,
    message:null,
    authenticated: false,
    bankDetails: {},
    userProjects:{},
    savedProjects:{},
    otpMessage: null,
    userData: {}
}

const userReducer = (state = initialState, action) =>{
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
            case PIN_LOADING:
            return {
                ...state,
                pinLoading: true
            }
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                ...state,
                userData: action.payload,
                authenticated: true,
                loading: false,
            }
        case SET_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
                pinLoading: false,
            }
            case SET_MESSAGE:
            return {
                ...state,
                message: action.payload,
                loading: false,
            }
        case BANK_DETAILS:
            return {
                ...state,
                bankDetails: action.payload,
                loading: false,
            }
        case SET_OTP:
            return {
                ...state,
                otpMessage: action.payload,
                pinLoading: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                pinLoading: false,
                error: null
            }
            case CLEAR_MESSAGE:
            return {
                ...state,
                loading: false,
                message: null,
                otpMessage: null,
            }
        case SET_USER_PROJECTS:
            return{
                ...state,
                loading: false,
                userProjects: action.payload
            }
        case SUMO_AUTH:
            return {
                ...state,
                sumoAuth: !state.sumoAuth
            }

        default:
            return state;
    }
}

export default userReducer

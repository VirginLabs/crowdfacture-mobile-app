import {
    TOGGLE_AUTH,
    TOGGLE_NOTIFICATION,
    TOGGLE_MODAL,

    TOGGLE_ADD_CASH_PAGE, SIDE_NOTIFICATION, TOGGLE_MENU,
    RESET_UI, LOADING_NOTIFICATION, SET_NOTIFICATION,
    SET_PROJECT, SET_PROJECTS, LOADING_PROJECT,
    SET_VERIFIED, LOADING, SET_VERIFY_MSG,
    SET_PASS_MESSAGE, CLEAR_PASS_MESSAGE, SET_REFERRED_USER,
    SET_INVESTMENTS, SET_RETURNS, SET_DEPOSITS

} from "../types";

const initialState = {
    project: [],
    passMessage: null,
    message: null,
    allProjects: {},
    authState: false,
    notificationState: false,
    notifications: null,
    notificationLoading: false,
    sideNotificationState: false,
    addCashPageState: false,
    loadingProject: false,
    modalState: false,
    menuState: false,
    verified: false,
    loading: false,
    referredUser: {},
    investments: {},
    deposits: {},
    returns: {},

}

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_PROJECT:
            return {
                ...state,
                loadingProject: true
            }
        case LOADING:
            return {
                ...state,
                loading: true
            }
        case RESET_UI:
            return initialState
        case LOADING_NOTIFICATION:
            return {
                ...state,
                notificationLoading: true,

            }
        case SET_NOTIFICATION:
            return {
                ...state,
                notificationLoading: false,
                notifications: action.payload
            }
        case TOGGLE_AUTH:
            return {
                ...state,
                authState: !state.authState
            }
        case TOGGLE_NOTIFICATION:
            return {
                ...state,
                notificationState: !state.notificationState
            }
        case TOGGLE_MODAL:
            return {
                ...state,
                modalState: !state.modalState
            }
        case SIDE_NOTIFICATION:
            return {
                ...state,
                sideNotificationState: !state.sideNotificationState
            }
        case TOGGLE_ADD_CASH_PAGE:
            return {
                ...state,
                addCashPageState: !state.addCashPageState
            }
        case TOGGLE_MENU:
            return {
                ...state,
                menuState: !state.menuState
            }
        case SET_PROJECT:
            return {
                ...state,
                loadingProject: false,
                project: action.payload
            }
        case SET_PROJECTS:
            return {
                ...state,
                loadingProject: false,
                allProjects: action.payload
            }
        case SET_VERIFIED:
            return {
                ...state,
                verified: action.payload
            }
        case SET_VERIFY_MSG:
            return {
                ...state,
                loading: false,
                message: action.payload
            }

        case SET_PASS_MESSAGE:
            return {
                ...state,
                loading: false,
                passMessage: action.payload
            }
        case CLEAR_PASS_MESSAGE:
            return {
                ...state,
                loading: false,
                passMessage: null
            }
        case SET_REFERRED_USER:
            return {
                ...state,
                loading: false,
                referredUser: action.payload
            }
        case SET_INVESTMENTS:
            return {
                ...state,
                loading: false,
                investments: action.payload
            }
        case SET_RETURNS:
            return {
                ...state,
                loading: false,
                returns: action.payload
            }

        case SET_DEPOSITS:
            return {
                ...state,
                loading: false,
                deposits: action.payload
            }

        default:
            return state;
    }


}

export default dataReducer

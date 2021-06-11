import {
    TOGGLE_AUTH,
    TOGGLE_MENU,
    TOGGLE_NOTIFICATION,
    TOGGLE_SECURITY,
    TOGGLE_FAV_PAGE,
    SIDE_NOTIFICATION,
    TOGGLE_MODAL,
    TOGGLE_BANK_PAGE,
    TOGGLE_ADD_CASH_PAGE,
    LOADING,
    SET_NOTIFICATION,
    LOADING_NOTIFICATION,
    SET_ERROR,
    LOADING_PROJECT,
    SET_PROJECT,
    SET_PROJECTS,
    SET_VERIFY_MSG,
    SET_VERIFIED,
    SET_PASS_MESSAGE,
    CLEAR_PASS_MESSAGE,
    SET_REFERRED_USER,
     SET_INVESTMENTS, SET_DEPOSITS, SET_RETURNS
} from "../types";

import React from "react";
import API_KEY from '../../constants/PRIVATE'


export const toggleAddBankScreen = () => (dispatch) => {
    dispatch({
        type: TOGGLE_BANK_PAGE
    })
}

export const toggleAddCashScreen = () => (dispatch) => {
    dispatch({
        type: TOGGLE_ADD_CASH_PAGE
    })
}


export const toggleAuth = () => (dispatch) => {
    dispatch({
        type: TOGGLE_AUTH
    })
}
export const toggleMenu = () => (dispatch) => {
    dispatch({
        type: TOGGLE_MENU
    })
}

export const toggleNotification = () => (dispatch) => {
    dispatch({
        type: TOGGLE_NOTIFICATION
    })
}

export const toggleSideNotification = () => (dispatch) => {
    dispatch({
        type: SIDE_NOTIFICATION
    })
}

export const toggleSecurity = () => (dispatch) => {
    dispatch({
        type: TOGGLE_SECURITY
    })
}

export const toggleFavs = () => (dispatch) => {
    dispatch({
        type: TOGGLE_FAV_PAGE
    })

}

export const toggleModal = () => (dispatch) => {
    dispatch({
        type: TOGGLE_MODAL
    })

}


export const getNotifications = (userId) => (dispatch) => {


    dispatch({
        type: LOADING_NOTIFICATION
    })
    const Options = {
        method: 'POST',
        body: userId,
        redirect: 'follow'
    };


    const promise = Promise.race([
        fetch(`https://crowdfacture.net/api/v0/php/shownotifications.php?apiKey=${API_KEY}`, Options)
            .then(response => response.json()),

    ]);

    promise.then(result => {
        if (result.status === '200') {
            dispatch({
                type: SET_NOTIFICATION,
                payload: result.data
            })
        } else {
            dispatch({
                type: SET_ERROR,
                payload: result.message
            })
        }

    })

    promise.catch(error => console.log(error));


}

//get a particular project
export const getProject = (projectId) => (dispatch) => {
    dispatch({
        type: LOADING_PROJECT
    })

    const getProjectOptions = {
        body: projectId,
        method: "POST"
    }

    const getProjectPromise = Promise.race([
        fetch(`https://crowdfacture.net/api/v0/php/getproject.php?apiKey=${API_KEY}`, getProjectOptions)
            .then(response => response.json()),
    ])

    getProjectPromise.then((res) => {
        if (res.status === '200') {
            dispatch({
                type: SET_PROJECT,
                payload: res.project
            })

        } else {
            console.log(res)
        }
    })

    getProjectPromise.catch((err) => console.log(err))
}


//get all projects
export const getAllProject = () => (dispatch) => {
    dispatch({
        type: LOADING_PROJECT
    })


    const getAllProjectPromise = Promise.race([
        fetch(`https://crowdfacture.net/api/v0/php/allprojects.php?apiKey=${API_KEY}`)
            .then(response => response.json()),
    ])

    getAllProjectPromise.then((res) => {
        if (res.status === '200') {
            dispatch({
                type: SET_PROJECTS,
                payload: res.data
            })

        } else {
            console.log(res.message)
        }
    })

    getAllProjectPromise.catch((err) => console.log(err))
}


export const verifyUserAction = (details) => (dispatch) => {
    dispatch({
        type: LOADING
    })

    const data = {
        body: details,
        method: 'POST',

    }


    const verifyPromise = Promise.race([
        fetch(`https://crowdfacture.net/api/v0/php/verifyuser.php?apiKey=${API_KEY}`, data)
            .then(response => response.json()),
    ]);

    verifyPromise.then((res) => {
        if (res.status === "200") {

            if (res.verified === false) {
                dispatch({
                    type: SET_VERIFIED,
                    payload: false
                })

                dispatch({
                    type: SET_VERIFY_MSG,
                    payload: "Verification not successful, Please try again"
                })

            } else {
                dispatch({
                    type: SET_VERIFY_MSG,
                    payload: `Verification successful, You can login`
                })
                dispatch({
                    type: SET_VERIFIED,
                    payload: true
                })

                setTimeout(() => {
                   // Router.push('/auth')
                }, 3000)
            }
        } else {
            dispatch({
                type: SET_ERROR,
                payload: res.message
            })

        }
    })

    verifyPromise.catch(err => console.log(err))


}


export const passwordResetReq = (email) => (dispatch) => {
    dispatch({
        type: LOADING
    })


    const requestOptions = {
        method: 'POST',
        body: email,
        redirect: 'follow'
    };

    fetch(`https://crowdfacture.net/api/v0/php/forgot-password.php?apiKey=${API_KEY}`, requestOptions)
        .then(response => response.json())
        .then((result) => {
            if (result.status === '200') {
                dispatch({
                    type: SET_PASS_MESSAGE,
                    payload: "Please check email for reset link"
                })
            } else {
                dispatch({
                    type: SET_PASS_MESSAGE,
                    payload: result.message
                })
            }
        })


        .catch(error => console.log('error', error));

}


export const getReferredUsers = (userId) => (dispatch) => {
    dispatch({
        type: LOADING
    })


    const requestOptions = {
        method: 'POST',
        body: userId,
        redirect: 'follow'
    };

    fetch(`https://crowdfacture.net/api/v0/php/referredusers.php?apiKey=${API_KEY}`, requestOptions)
        .then(response => response.json())
        .then(result => {

            if (result.status === '200') {
                dispatch({
                    type: SET_REFERRED_USER,
                    payload: result.refers
                })
            } else {
                dispatch({
                    type: SET_ERROR,
                    payload: "Error, couldn't fetch please try again"
                })
            }


        }).catch(error => console.log('error', error));
}


export const getInvestments = (userId) => (dispatch) => {
    dispatch({
        type: LOADING,
    })


    const requestOptions = {
        method: 'POST',
        body: userId,
        redirect: 'follow'
    };

    fetch(`https://crowdfacture.net/api/v0/php/transactions.php?apiKey=${API_KEY}`, requestOptions)
        .then(response => response.json())
        .then(result => {

            if (result.status === '200') {
                dispatch({
                    type: SET_INVESTMENTS,
                    payload: result.singularInvestments
                })

            }else{
                dispatch({
                    type: SET_ERROR,
                    payload: "Error, couldn't fetch please try again"
                })
            }

        })
        .catch(error => console.log('error', error));
}

export const getDeposits = (userId) => (dispatch) => {
    dispatch({
        type: LOADING,
    })


    const requestOptions = {
        method: 'POST',
        body: userId,
        redirect: 'follow'
    };

    fetch(`https://crowdfacture.net/api/v0/php/transactions.php?apiKey=${API_KEY}`, requestOptions)
        .then(response => response.json())
        .then(result => {

            if (result.status === '200') {
                dispatch({
                    type: SET_DEPOSITS,
                    payload: result.deposits
                })
            }else{
                dispatch({
                    type: SET_ERROR,
                    payload: "Error, couldn't fetch please try again"
                })
            }

        })
        .catch(error => console.log('error', error));
}


export const getWithdrawals = (userId) => (dispatch) => {
    dispatch({
        type: LOADING,
    })


    const requestOptions = {
        method: 'POST',
        body: userId,
        redirect: 'follow'
    };

    fetch(`https://crowdfacture.net/api/v0/php/transactions.php?apiKey=${API_KEY}`, requestOptions)
        .then(response => response.json())
        .then(result => {

            if (result.status === '200') {
                dispatch({
                    type: SET_RETURNS,
                    payload: result.withdrawals
                })
            }else{
                dispatch({
                    type: SET_ERROR,
                    payload: "Error, couldn't fetch please try again"
                })
            }

        })
        .catch(error => console.log('error', error));
}

export const clearPassMessage = () => (dispatch) => {
    dispatch({type: CLEAR_PASS_MESSAGE});
};
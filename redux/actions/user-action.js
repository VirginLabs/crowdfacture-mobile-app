import axios from "axios";

import {
    LOADING_DATA,
    CLEAR_ERRORS,
    SET_ERROR,
    SET_USER,
    SET_UNAUTHENTICATED,
    RESET_UI,
    BANK_DETAILS,
    CLEAR_MESSAGE, SET_MESSAGE,
    SUMO_AUTH, SET_OTP, PIN_LOADING, SET_NOTIFICATION, LOADING_FUNDING, SET_USER_PROJECTS
} from "../types";


/*export const signUpUser = (userData) => (dispatch) => {
    dispatch({
        type: LOADING_DATA,
    })
    axios.post('/register.php',  userData)
        .then((res) => {
            dispatch({
                type: SIGNUP_USER,
                payload: res.data
            })
            console.log(res.data)
        }).catch((err) => {

        console.log(err)
    })


}*/


async function fetchWithTimeout(resource, options) {
    const {timeout = 8000} = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    /*const response = await fetch(resource, {
        ...options,
        signal: controller.signal
    });*/


    const promise = await Promise.race([
        fetch(resource, {
            ...options,
            signal: controller.signal
        })
            .then(response => response.json()),

    ]);

    clearTimeout(id);

    return promise;
}

async function loadFunc() {
    try {
        const response = await fetchWithTimeout('https://crowdfacture.net/api/v0/php/allprojects.php', {
            timeout: 6000
        });
        const games = await response.json();
        return games;
    } catch (error) {
        // Timeouts if the request takes
        // longer than 6 seconds
        console.log(error.name === 'AbortError');
    }
}


export const getUser = (phoneNumber) => (dispatch) => {
    dispatch({
        type: LOADING_DATA,
    })

    const formdata = new FormData();
    formdata.append("phoneNumber", phoneNumber);

    const requestOptions = {
        method: 'POST',
        body: formdata,
    };


    const promise = Promise.race([
        fetch('https://crowdfacture.net/api/v0/php/user.php', requestOptions)
            .then(response => response.json()),

    ]);

    promise.then(result => {
        if (result.status === '200') {
            dispatch({
                type: SET_USER,
                payload: result
            })
            return true;
        } else {
            dispatch({
                type: SET_ERROR,
                payload: result.message
            })
            return false
            //console.log(result)
        }
    })
    promise.catch(error => console.log(error));
}


//sign up new user
export const signUpUser = (userData,history) => (dispatch) => {
    dispatch({
        type: LOADING_DATA,
    })


    const requestOptions = {
        method: 'POST',
        body: userData,
        redirect: 'follow'
    };

    const promise = Promise.race([
        fetch('https://crowdfacture.net/api/v0/php/register.php', requestOptions)
            .then(response => response.json()),
    ]);

    promise.then(result => {
            if (result.status === '200') {

                if (result.member.Active === '0') {
                    dispatch({

                        type: SET_MESSAGE,
                        payload: "Verification link sent, check spam if not found"
                    })
                } else {
                    setAuthorizationHeader(result.member.Token, result.message.LastName);
                    /* dispatch({
                         type: SET_USER,
                         payload: result.member
                     })*/
                    dispatch(getUser(result.member.Phone))

                    setTimeout(() => {
                        history.push('/dashboard')
                    }, 1500)

                }
                //window.location.href = '/dashboard'
            } else {
                dispatch({

                    type: SET_ERROR,
                    payload: result.message
                })

            }
        }
    )
    promise.catch(error => console.log(error));


    /*  dispatch({
          type: SIGNUP_USER,
          payload: resData
      })*/


}


//Login user
export const loginUser = (user,history) => (dispatch) => {
    dispatch({
        type: LOADING_DATA,
    })
    const Options = {
        method: 'POST',
        body: user,
        redirect: 'follow'
    };

    const loginPromise = Promise.race([
        fetch('https://crowdfacture.net/api/v0/php/login.php', Options)
            .then(response => response.json()),
    ]);
    loginPromise.then(result => {
            if (result.status === '200') {
                if (result.member.Active === '0') {
                    dispatch({

                        type: SET_ERROR,
                        payload: "Please verify your email"
                    })
                } else {
                    setAuthorizationHeader(result.member.Token, result.member.LastName);
                    /* dispatch({
                           type: SET_USER,
                           payload: result.member
                       })*/

                    dispatch(getUser(result.member.Phone))

                    setTimeout(() => {
                        history.push('/dashboard')
                    }, 1500)


                }

            } else {
                dispatch({

                    type: SET_ERROR,
                    payload: result.message
                })


            }
        }
    )
    loginPromise.catch(error => console.log(error));


    /*  dispatch({
          type: SIGNUP_USER,
          payload: resData
      })*/


}


//sumotrust auth
export const sumotrustLogin = (userDetails) => (dispatch) => {
    dispatch({
        type: LOADING_DATA
    })

    const requestOptions = {
        method: 'POST',
        body: userDetails,
        redirect: 'follow'
    };

    const sumotrustPromise = Promise.race([
        fetch('https://crowdfacture.net/api/v0/php/sumotrustlogin.php', requestOptions)
            .then(response => response.json()),
    ]);

    sumotrustPromise.then(result => {

            if (result.status === '200') {
                if (result.member.Active === '0') {
                    dispatch({

                        type: SET_ERROR,
                        payload: "Please verify your email"
                    })
                } else {
                    setAuthorizationHeader(result.member.Token, result.message.LastName);

                    dispatch(getUser(result.member.Phone))

                    setTimeout(() => {
                        //Router.push('/dashboard')
                    }, 2000)
                }
                //window.location.href = '/dashboard'
            } else {
                dispatch({
                    type: SET_ERROR,
                    payload: result.message
                })


            }
        }
    )
    sumotrustPromise.catch(error => console.log(error));


}

export const sumotrustAuth = (userDetails) => (dispatch) => {
    dispatch({
        type: LOADING_DATA,
    })

    const requestOptions = {
        method: 'POST',
        body: userDetails,
        redirect: 'follow'
    };


    const sumoPromise = Promise.race([
        fetch('https://crowdfacture.net/api/v0/php/sumotrustregister.php', requestOptions)
            .then(response => response.json()),
    ]);

    sumoPromise.then((res) => {
        if (res.status === '200') {

            setAuthorizationHeader(res.member.Token, res.message.LastName);

            dispatch(getUser(res.member.Phone))

            setTimeout(() => {
               // Router.push('/dashboard')
            }, 2000)

        } else {
            dispatch({

                type: SET_ERROR,
                payload: res.message
            })

        }

    })

    sumoPromise.catch((err) => console.log(err))


}


//user adds their bank account details
export const addBank = (bankDetails, Phone) => (dispatch) => {
    dispatch({
        type: LOADING_DATA,
    })
    const Options = {
        method: 'POST',
        body: bankDetails,
        redirect: 'follow'
    };

    const addBankPromise = Promise.race([
        fetch('https://crowdfacture.net/api/v0/php/addbank.php', Options)
            .then(response => response.json()),
    ]);


    addBankPromise.then((result) => {
        if (result.status === '200') {
            dispatch(getUser(Phone))
            dispatch({
                type: BANK_DETAILS,
                payload: result.banks
            })

            dispatch({
                type: SET_MESSAGE,
                payload: result.message
            })

        } else {
            dispatch({
                type: SET_ERROR,
                payload: result.message
            })

        }
    })

    addBankPromise.catch(error => console.log(error));


}


//fund using sumotrust

export const fundUsingSumotrust = (details) => (dispatch) => {
    dispatch({
        type: LOADING_DATA,
    })


    const fundingOptions = {
        body: details,
        method: 'POST',

    }
    const fundingPromise = Promise.race([
        fetch('https://crowdfacture.net/api/v0/php/fundviasumotrust.php', fundingOptions)
            .then((response) => response.json())
    ]);

    fundingPromise.then((res) => {
        if (res.status === '200') {
            dispatch({
                type: SET_MESSAGE,
                payload: res.message
            })
            dispatch(getUser(res.member.Phone))
        } else {
            dispatch({
                type: SET_ERROR,
                payload: res.message
            })
        }


    })

    fundingPromise.catch(err => console.log(err))
}


//user update their password
export const updatePassword = (passwordData) => (dispatch) => {


    dispatch({
        type: LOADING_DATA,
    })
    const Options = {
        method: 'POST',
        body: passwordData,
        redirect: 'follow'
    };

    const updatePasswordPromise = Promise.race([
        fetch('https://crowdfacture.net/api/v0/php/updatepassword.php', Options)
            .then(response => response.json()),
    ]);

    updatePasswordPromise.then((result) => {
        if (result.status === '200') {
            dispatch({
                type: SET_MESSAGE,
                payload: result.message
            })

        } else {
            dispatch({
                type: SET_ERROR,
                payload: result.message
            })

        }
    })

    updatePasswordPromise.catch((err) => {
        console.log(err)
    })


}


//user updates their withdrawal pin
export const updateWithdrawalPin = (pinDetails) => (dispatch) => {

    dispatch({
        type: LOADING_DATA
    })

    const options = {
        method: 'POST',
        body: pinDetails,

    }

    const withdrawalPinPromise = Promise.race([
        fetch('https://crowdfacture.net/api/v0/php/withdrawalpin.php', options)
            .then(response => response.json()),
    ]);

    withdrawalPinPromise.then((res) => {
        if (res.status === '200') {

            dispatch(getUser(res.member.Phone))
            dispatch({
                type: SET_MESSAGE,
                payload: res.message
            })
        } else {
            dispatch({
                type: SET_ERROR,
                payload: res.message
            })
        }
    })

    withdrawalPinPromise.catch((err) => {
        console.log(err)
    })

}


//user comfirms OTP
export const sendOtp = (otp) => (dispatch) => {
    dispatch({
        type: PIN_LOADING
    })

    const otpOptions = {
        body: otp,
        method: "POST"
    }

    const otpPromise = Promise.race([
        fetch('https://crowdfacture.net/api/v0/php/pinotp.php', otpOptions)
            .then(response => response.json()),
    ])

    otpPromise.then((res) => {

        if (res.status === '200') {
            dispatch({
                type: SET_OTP,
                payload: res.message
            })
        } else {
            dispatch({
                type: SET_ERROR,
                payload: res.message
            })
        }

    })

    otpPromise.catch((err) => {
        console.log(err)
    })


}


//user uploads their image

export const updateUserImage = (userImage) => (dispatch) => {
    dispatch({type: LOADING_DATA})

    const Options = {
        method: "POST",
        body: userImage
    }


    const profileImagePromise = Promise.race([
        fetch('https://crowdfacture.net/api/v0/php/uploadprofileimage.php', Options)
            .then(response => response.json()),
    ])

    profileImagePromise.then((res) => {
        if (res.status === '200') {

            dispatch(getUser(res.member.Phone))

            dispatch({
                type: SET_MESSAGE,
                payload: res.message
            })


        } else {
            dispatch({
                type: SET_ERROR,
                payload: res.message
            })


        }
    })


}


//user favourites a particular project
export const saveProject = (data) => (dispatch) => {
    dispatch({
        type: LOADING_DATA
    })

    const saveProjectOptions = {
        method: "POST",
        body: data
    }

    const saveProjectPromise = Promise.race([
        fetch('https://crowdfacture.net/api/v0/php/saveproject.php', saveProjectOptions)
            .then(res => res.json())
    ])

    saveProjectPromise.then((res) => {

    })

    saveProjectPromise.catch(err => console.log(err))
}


//user un save a particular project
export const unSaveProject = (data) => (dispatch) => {
    dispatch({
        type: LOADING_DATA
    })

    const Options = {
        method: "POST",
        body: data
    }

    const unSaveProjectPromise = Promise.race([
        fetch('https://crowdfacture.net/api/v0/php/removeproject.php', Options)
            .then(res => res.json())
    ])

    unSaveProjectPromise.then((res) => {

    })

    unSaveProjectPromise.catch(err => console.log(err))
}


//get user projects

export const getUserProjects = (userId) => (dispatch) => {
    dispatch({
        type: LOADING_DATA
    })

    const Options = {
        method: "POST",
        body: userId
    }

  /*  const getUserProjectPromise = Promise.race([
        fetch('https://crowdfacture.net/api/v0/php/getuserproject.php', Options).then(res => res.json())
    ])*/

    const getUserProjectPromise = Promise.race([
        fetch('https://crowdfacture.net/api/v0/php/transactions.php', Options).then(res => res.json())
    ])


    getUserProjectPromise.then((res) => {
        if (res.status === '200') {
           dispatch({
                type: SET_USER_PROJECTS,
                payload: res.investments
            })
           // console.log(res.investments)
        } else {
            console.log(res.message)
        }

    })
    getUserProjectPromise.catch(err => console.log(err))
}


//user gets unique account number

export const getUniqueAccountNumb = (details, phoneNumber) => (dispatch) => {
    dispatch({
        type: LOADING_DATA
    })

    const Options = {
        method: 'POST',
        body: details
    }

    const accountNumberPromise = Promise.race([
        fetch('https://crowdfacture.net/api/v0/php/getaccountnumber.php', Options)
            .then((res) => res.json())
    ])
    accountNumberPromise.then((res) => {
        if (res.status === '200') {

            dispatch({
                type: SET_MESSAGE,
                payload: res.message
            })

            setTimeout(() => {
                dispatch(getUser(res.member.Phone))
            }, 2000)

        } else {
            dispatch({
                type: SET_ERROR,
                payload: res.message
            })
        }
    })

    accountNumberPromise.catch((err) => console.log(err))
}

//user Buy projects unit

export const buyUnitAction = (details, Phone) => (dispatch) => {

    dispatch({
        type: LOADING_DATA
    })

    const options = {
        method: 'POST',
        body: details
    }

    /*  userId
      numberOfUnit
      totalAmount
      projectId
      totalPercentageReturn*/

    const unitPromise = Promise.race([
        fetch('https://crowdfacture.net/api/v0/php/buyunit.php', options)
            .then((res) => res.json())
    ])

    unitPromise.then(res => {
        if (res.status === '200') {
            dispatch({
                type: SET_MESSAGE,
                payload: res.message
            })

            dispatch(getUser(Phone))

        } else {
            dispatch({
                type: SET_ERROR,
                payload: res.message
            })

            dispatch(getUser(Phone))


        }

    })

    unitPromise.catch((err) => console.log(err))
}

export const forgotPassword = (userData) => (dispatch) => {
    dispatch({
        type: LOADING_DATA
    })

    const options = {
        body: userData,
        method: 'POST',

    }



    const resetPromise = Promise.race([fetch("https://crowdfacture.net/api/v0/php/reset-password.php",
        options)
        .then(response => response.json())
    ])

    resetPromise.then(result => {
            if (result.status === '200') {
                dispatch({
                    type: SET_MESSAGE,
                    payload: "Password changed successfully"
                })
            } else {
                dispatch({
                    type: SET_ERROR,
                    payload: result.message
                })
            }
        }
    )
        .catch(error => console.log('error', error));

}


//user logs out
export const logoutUser = (history) => (dispatch) => {

    history.push('/')
        localStorage.removeItem('CRWDFCTRBearer');
        localStorage.removeItem('persist:crowdfacture');
        delete axios.defaults.headers.common['Authorization'];
        dispatch({type: SET_UNAUTHENTICATED});
        dispatch({type: RESET_UI})


    // window.location.href = '/'

};

export const toggleSumotrustAuth = () => (dispatch) => {
    dispatch({
        type: SUMO_AUTH
    })
}


export const clearErrors = () => (dispatch) => {
    dispatch({type: CLEAR_ERRORS});
};
export const clearMessage = () => (dispatch) => {
    dispatch({type: CLEAR_MESSAGE});
};


const setAuthorizationHeader = (token, lastName) => {
    const testObject = {'Token': token, 'user': lastName, 'exp': Date.now(), 'Authorization': true};
    const IdToken = `${token}`;
    localStorage.setItem('CRWDFCTRBearer', JSON.stringify(testObject));
    axios.defaults.headers.common['Authorization'] = IdToken;
};
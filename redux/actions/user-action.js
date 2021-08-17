import {
    LOADING_DATA,
    CLEAR_ERRORS,
    SET_ERROR,
    SET_USER,
    SET_UNAUTHENTICATED,
    RESET_UI,
    BANK_DETAILS,
    CLEAR_MESSAGE,
    SET_MESSAGE,
    SUMO_AUTH,
    SET_OTP,
    PIN_LOADING,
    SET_USER_PROJECTS,
} from "../types";
import API_KEY from "../../constants/PRIVATE";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUser = (phoneNumber) => (dispatch) => {
    dispatch({
        type: LOADING_DATA,
    });

    const formdata = new FormData();
    formdata.append("phoneNumber", phoneNumber);

    const requestOptions = {
        method: "POST",
        body: formdata,
    };

    const promise = Promise.race([
        fetch(
            `https://crowdfacture.net/api/v0/php/user.php?apiKey=${API_KEY}`,
            requestOptions
        ).then((response) => response.json()),
    ]);

    promise.then((result) => {
        if (result.status === "200") {
            dispatch({
                type: SET_USER,
                payload: result,
            });
        } else {
            dispatch({
                type: SET_ERROR,
                payload: result.message,
            });
            //console.log(result)
        }
    });
    promise.catch((error) => console.log(error));
};

//sign up new user
export const signUpUser = (userData, history) => (dispatch) => {
    dispatch({
        type: LOADING_DATA,
    });

    const requestOptions = {
        method: "POST",
        body: userData,
        redirect: "follow",
    };

    const promise = Promise.race([
        fetch(
            `https://crowdfacture.net/api/v0/php/register.php?apiKey=${API_KEY}`,
            requestOptions
        ).then((response) => response.json()),
    ]);

    promise.then((result) => {
        if (result.status === "200") {
            if (result.member.Active === "0") {
                dispatch({
                    type: SET_MESSAGE,
                    payload: "Verification link sent, check spam if not found",
                });
            } else {
                setAuthorizationHeader(
                    result.member.Token,
                    result.message.LastName,
                    result.member.Phone
                );
                /* dispatch({
                                 type: SET_USER,
                                 payload: result.member
                             })*/
                dispatch(getUser(result.member.Phone));
            }
            //window.location.href = '/dashboard'
        } else {
            dispatch({
                type: SET_ERROR,
                payload: result.message,
            });
        }
    });
    promise.catch((error) => console.log(error));

    /*  dispatch({
            type: SIGNUP_USER,
            payload: resData
        })*/
};

//Login user
export const loginUser = (user) => (dispatch) => {
    dispatch({
        type: LOADING_DATA,
    });
    const Options = {
        method: "POST",
        body: user,
        redirect: "follow",
    };

    const loginPromise = Promise.race([
        fetch(
            `https://crowdfacture.net/api/v0/php/login.php?apiKey=${API_KEY}`,
            Options
        ).then((response) => response.json()),
    ]);
    loginPromise.then((result) => {
        if (result.status === "200") {
            if (result.member.Active === "0") {
                dispatch({
                    type: SET_ERROR,
                    payload: "Please verify your email",
                });
            } else {
                dispatch(getUser(result.member.Phone));

                setAuthorizationHeader(
                    result.member.Token,
                    result.member.LastName,
                    result.member.Phone
                );
                /* dispatch({
                                   type: SET_USER,
                                   payload: result.member
                               })*/
            }
        } else {
            dispatch({
                type: SET_ERROR,
                payload: result.message,
            });
        }
    });
    loginPromise.catch((error) => console.log(error));

    /*  dispatch({
            type: SIGNUP_USER,
            payload: resData
        })*/
};

//sumotrust auth
export const sumotrustLogin = (userDetails) => (dispatch) => {
    dispatch({
        type: LOADING_DATA,
    });

    const requestOptions = {
        method: "POST",
        body: userDetails,
        redirect: "follow",
    };

    const sumotrustPromise = Promise.race([
        fetch(
            `https://crowdfacture.net/api/v0/php/sumotrustlogin.php?apiKey=${API_KEY}`,
            requestOptions
        ).then((response) => response.json()),
    ]);

    sumotrustPromise.then((result) => {
        if (result.status === "200") {
            if (result.member.Active === "0") {
                dispatch({
                    type: SET_ERROR,
                    payload: "Please verify your email",
                });
            } else {
                setAuthorizationHeader(
                    result.member.Token,
                    result.message.LastName,
                    result.member.Phone
                );

                dispatch(getUser(result.member.Phone));
            }
        } else {
            dispatch({
                type: SET_ERROR,
                payload: result.message,
            });
        }
    });
    sumotrustPromise.catch((error) => console.log(error));
};

export const sumotrustAuth = (userDetails) => (dispatch) => {
    dispatch({
        type: LOADING_DATA,
    });

    const requestOptions = {
        method: "POST",
        body: userDetails,
        redirect: "follow",
    };

    const sumoPromise = Promise.race([
        fetch(
            `https://crowdfacture.net/api/v0/php/sumotrustregister.php?apiKey=${API_KEY}`,
            requestOptions
        ).then((response) => response.json()),
    ]);

    sumoPromise.then((res) => {
        if (res.status === "200") {
            setAuthorizationHeader(
                res.member.Token,
                res.message.LastName,
                res.member.Phone
            );

            dispatch(getUser(res.member.Phone));
        } else {
            dispatch({
                type: SET_ERROR,
                payload: res.message,
            });
        }
    });

    sumoPromise.catch((err) => console.log(err));
};

//user adds their bank account details
export const addBank = (bankDetails, Phone) => (dispatch) => {
    dispatch({
        type: LOADING_DATA,
    });
    const Options = {
        method: "POST",
        body: bankDetails,
        redirect: "follow",
    };

    const addBankPromise = Promise.race([
        fetch(
            `https://crowdfacture.net/api/v0/php/addbank.php?apiKey=${API_KEY}`,
            Options
        ).then((response) => response.json()),
    ]);

    addBankPromise.then((result) => {
        if (result.status === "200") {
            dispatch(getUser(Phone));
            dispatch({
                type: BANK_DETAILS,
                payload: result.banks,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: result.message,
            });
        } else {
            dispatch({
                type: SET_ERROR,
                payload: result.message,
            });
        }
    });

    addBankPromise.catch((error) => console.log(error));
};

//fund using sumotrust

export const fundUsingSumotrust = (details) => (dispatch) => {
    dispatch({
        type: LOADING_DATA,
    });

    const fundingOptions = {
        body: details,
        method: "POST",
    };
    const fundingPromise = Promise.race([
        fetch(
            `https://crowdfacture.net/api/v0/php/fundviasumotrust.php?apiKey=${API_KEY}`,
            fundingOptions
        ).then((response) => response.json()),
    ]);

    fundingPromise.then((res) => {
        if (res.status === "200") {
            dispatch({
                type: SET_MESSAGE,
                payload: res.message,
            });
            dispatch(getUser(res.member.Phone));
        } else {
            dispatch({
                type: SET_ERROR,
                payload: res.message,
            });
        }
    });

    fundingPromise.catch((err) => console.log(err));
};

//user update their password
export const updatePassword = (passwordData) => (dispatch) => {
    dispatch({
        type: LOADING_DATA,
    });
    const Options = {
        method: "POST",
        body: passwordData,
        redirect: "follow",
    };

    const updatePasswordPromise = Promise.race([
        fetch(
            `https://crowdfacture.net/api/v0/php/updatepassword.php?apiKey=${API_KEY}`,
            Options
        ).then((response) => response.json()),
    ]);

    updatePasswordPromise.then((result) => {
        if (result.status === "200") {
            dispatch({
                type: SET_MESSAGE,
                payload: result.message,
            });
        } else {
            dispatch({
                type: SET_ERROR,
                payload: result.message,
            });
        }
    });

    updatePasswordPromise.catch((err) => {
        console.log(err);
    });
};

//user updates their withdrawal pin
export const updateWithdrawalPin = (pinDetails) => (dispatch) => {
    dispatch({
        type: LOADING_DATA,
    });

    const options = {
        method: "POST",
        body: pinDetails,
    };

    const withdrawalPinPromise = Promise.race([
        fetch(
            `https://crowdfacture.net/api/v0/php/withdrawalpin.php?apiKey=${API_KEY}`,
            options
        ).then((response) => response.json()),
    ]);

    withdrawalPinPromise.then((res) => {
        if (res.status === "200") {
            dispatch(getUser(res.member.Phone));
            dispatch({
                type: SET_MESSAGE,
                payload: res.message,
            });
        } else {
            dispatch({
                type: SET_ERROR,
                payload: res.message,
            });
        }
    });

    withdrawalPinPromise.catch((err) => {
        console.log(err);
    });
};

//get user notification token

export const getPushToken = (details) => (dispatch) => {


    const pushDetails = {
        body: details,
        method: "POST",
    };

    const pushPromise = Promise.race([
        fetch(
            `https://crowdfacture.net/api/v0/php/addpushtoken.php?apiKey=${API_KEY}`,
            pushDetails
        ).then((response) => response.json()),
    ]);

    pushPromise.then((res) => {
        if (res.status === "200") {

        } else {
            dispatch({
                type: SET_ERROR,
                payload: res.message,
            });
        }
    });

    pushPromise.catch((err) => console.log(err));
};

//user confirms OTP
export const sendOtp = (otp) => (dispatch) => {
    dispatch({
        type: PIN_LOADING,
    });

    const otpOptions = {
        body: otp,
        method: "POST",
    };

    const otpPromise = Promise.race([
        fetch(
            `https://crowdfacture.net/api/v0/php/pinotp.php?apiKey=${API_KEY}`,
            otpOptions
        ).then((response) => response.json()),
    ]);

    otpPromise.then((res) => {
        if (res.status === "200") {
            dispatch({
                type: SET_OTP,
                payload: res.message,
            });
        } else {
            dispatch({
                type: SET_ERROR,
                payload: res.message,
            });
        }
    });

    otpPromise.catch((err) => {
        console.log(err);
    });
};

//user uploads their image

export const updateUserImage = (userImage) => (dispatch) => {
    dispatch({type: LOADING_DATA});

    const Options = {
        method: "POST",
        body: userImage,
    };

    const profileImagePromise = Promise.race([
        fetch(
            `https://crowdfacture.net/api/v0/php/uploadprofileimage.php?apiKey=${API_KEY}`,
            Options
        ).then((response) => response.json()),
    ]);

    profileImagePromise.then((res) => {
        if (res.status === "200") {
            dispatch(getUser(res.member.Phone));

            dispatch({
                type: SET_MESSAGE,
                payload: res.message,
            });
        } else {
            dispatch({
                type: SET_ERROR,
                payload: res.message,
            });
        }
    });
};

//user favourites a particular project
export const saveProject = (data) => (dispatch) => {
    dispatch({
        type: LOADING_DATA,
    });

    const saveProjectOptions = {
        method: "POST",
        body: data,
    };

    const saveProjectPromise = Promise.race([
        fetch(
            `https://crowdfacture.net/api/v0/php/saveproject.php?apiKey=${API_KEY}`,
            saveProjectOptions
        ).then((res) => res.json()),
    ]);

    saveProjectPromise.then((res) => {
        if (res.status === "200") {
            dispatch({
                type: SET_MESSAGE,
                payload: "Project saved",
            });
        } else {
            dispatch({
                type: SET_ERROR,
                payload: res.message,
            });
        }
    });

    saveProjectPromise.catch((err) => console.log(err));
};

//user un save a particular project
export const unSaveProject = (data) => (dispatch) => {
    dispatch({
        type: LOADING_DATA,
    });

    const Options = {
        method: "POST",
        body: data,
    };

    const unSaveProjectPromise = Promise.race([
        fetch(
            `https://crowdfacture.net/api/v0/php/removeproject.php?apiKey=${API_KEY}`,
            Options
        ).then((res) => res.json()),
    ]);

    unSaveProjectPromise.then((res) => {
        if (res.status === "200") {
            dispatch({
                type: SET_MESSAGE,
                payload: "Project unsaved",
            });
        } else {
            dispatch({
                type: SET_ERROR,
                payload: res.message,
            });
        }
    });

    unSaveProjectPromise.catch((err) => console.log(err));
};

//get user projects

export const getUserProjects = (userId) => (dispatch) => {
    dispatch({
        type: LOADING_DATA,
    });

    const Options = {
        method: "POST",
        body: userId,
    };

    /*  const getUserProjectPromise = Promise.race([
          fetch('https://crowdfacture.net/api/v0/php/getuserproject.php', Options).then(res => res.json())
      ])*/

    const getUserProjectPromise = Promise.race([
        fetch(
            `https://crowdfacture.net/api/v0/php/transactions.php?apiKey=${API_KEY}`,
            Options
        ).then((res) => res.json()),
    ]);

    getUserProjectPromise.then((res) => {
        if (res.status === "200") {
            dispatch({
                type: SET_USER_PROJECTS,
                payload: res.investments,
            });
            // console.log(res.investments)
        } else {
            // console.log(res.message)
        }
    });
    getUserProjectPromise.catch((err) => console.log(err));
};

//user gets unique account number

export const getUniqueAccountNumb = (details) => (dispatch) => {
    dispatch({
        type: LOADING_DATA,
    });

    const Options = {
        method: "POST",
        body: details,
    };

    const accountNumberPromise = Promise.race([
        fetch(
            `https://crowdfacture.net/api/v0/php/getaccountnumber.php?apiKey=${API_KEY}`,
            Options
        ).then((res) => res.json()),
    ]);
    accountNumberPromise.then((res) => {
        if (res.status === "200") {
            dispatch({
                type: SET_MESSAGE,
                payload: res.message,
            });

            setTimeout(() => {
                dispatch(getUser(res.member.Phone));
            }, 2000);
        } else {
            dispatch({
                type: SET_ERROR,
                payload: res.message,
            });
        }
    });

    accountNumberPromise.catch((err) => console.log(err));
};

//user Buy projects unit

export const buyUnitAction = (details, Phone) => (dispatch) => {
    dispatch({
        type: LOADING_DATA,
    });

    const options = {
        method: "POST",
        body: details,
    };

    const unitPromise = Promise.race([
        fetch(
            `https://crowdfacture.net/api/v0/php/buyunit.php?apiKey=${API_KEY}`,
            options
        ).then((res) => res.json()),
    ]);

    unitPromise.then((res) => {
        if (res.status === "200") {
            dispatch({
                type: SET_MESSAGE,
                payload: res.message,
            });

            // dispatch(getUser(Phone))
        } else {
            dispatch({
                type: SET_ERROR,
                payload: res.message,
            });

            dispatch(getUser(Phone));
        }
    });

    unitPromise.catch((err) => console.log(err));
};

export const withdrawToSumotrust = (details) => (dispatch) => {
    dispatch({
        type: LOADING_DATA,
    });

    const options = {
        method: "POST",
        body: details,
    };

    const kickPromise = Promise.race([
        fetch(
            `https://crowdfacture.net/api/v0/php/fundkickaccount.php?apiKey=${API_KEY}`,
            options
        ).then((res) => res.json()),
    ]);

    kickPromise.then((res) => {
        if (res.status === "200") {
            dispatch({
                type: SET_MESSAGE,
                payload: res.message,
            });
        } else {
            dispatch({
                type: SET_ERROR,
                payload: res.message,
            });
        }
    });

    kickPromise.catch((err) => console.log(err));
};
export const withdrawToBank = (details) => (dispatch) => {
    dispatch({
        type: LOADING_DATA,
    });

    const options = {
        method: "POST",
        body: details,
    };

    const bankPromise = Promise.race([
        fetch(
            `https://crowdfacture.net/api/v0/php/fundbankaccount.php?apiKey=${API_KEY}`,
            options
        ).then((res) => res.json()),
    ]);

    bankPromise.then((res) => {
        if (res.status === "200") {
            dispatch({
                type: SET_MESSAGE,
                payload: res.message,
            });
        } else {
            dispatch({
                type: SET_ERROR,
                payload: res.message,
            });
        }
    });

    bankPromise.catch((err) => console.log(err));
};

export const forgotPassword = (userData) => (dispatch) => {
    dispatch({
        type: LOADING_DATA,
    });

    const options = {
        body: userData,
        method: "POST",
    };

    const resetPromise = Promise.race([
        fetch(
            `https://crowdfacture.net/api/v0/php/reset-password.php?apiKey=${API_KEY}`,
            options
        ).then((response) => response.json()),
    ]);

    resetPromise
        .then((result) => {
            if (result.status === "200") {
                dispatch({
                    type: SET_MESSAGE,
                    payload: "Password changed successfully",
                });
            } else {
                dispatch({
                    type: SET_ERROR,
                    payload: result.message,
                });
            }
        })
        .catch((error) => console.log("error", error));
};

//user logs out
export const logoutUser = (navigation) => async (dispatch) => {
    dispatch({type: SET_UNAUTHENTICATED});
    dispatch({type: RESET_UI});
    // localStorage.removeItem('CRWDFCTRBearer');
    //localStorage.removeItem('persist:crowdfacture');
    // delete axios.defaults.headers.common['Authorization'];

    try {
        await AsyncStorage.removeItem("CRWDFCTRBearer");
        return true;
    } catch (exception) {
        return false;
    }

    // window.location.href = '/'
};

export const toggleSumotrustAuth = () => (dispatch) => {
    dispatch({
        type: SUMO_AUTH,
    });
};

export const clearErrors = () => (dispatch) => {
    dispatch({type: CLEAR_ERRORS});
};
export const clearMessage = () => (dispatch) => {
    dispatch({type: CLEAR_MESSAGE});
};

const setAuthorizationHeader = async (token, lastName, phone) => {
    const testObject = {
        Token: token,
        user: lastName,
        exp: Date.now(),
        phonenumber: phone,
        Authorization: true,
    };
    const IdToken = `${token}`;
    try {
        // await AsyncStorage.setItem('CRWDFCTRBearer', JSON.stringify(testObject));
        AsyncStorage.setItem("crowdFactureUser", phone);
    } catch (err) {
        console.log("Error @A_first_time_launch: ", err);
    }
};

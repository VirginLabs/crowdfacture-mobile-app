import React, {useCallback, useState} from 'react';
import {
    StatusBar,
    ScrollView
} from 'react-native';
import {Colors} from "../constants/Colors";

import SignUp from "../components/SignUpComponent";
import SignIn from "../components/SignInComponent";
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import {clearErrors, clearMessage, loginUser} from "../redux/actions/user-action";




const Login = (props) => {



    const [switchForm, setSwitchForm] = useState(true);




    const toggleForm = useCallback(() => {
        setSwitchForm(prevState => !prevState)
    }, [])




    return (

        <ScrollView
            keyboardShouldPersistTaps='handled'
            showsHorizontalScrollIndicator={false}
            scrollEnabled
            showsVerticalScrollIndicator={false} contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.PrimaryDarkColor,
            paddingTop: StatusBar.currentHeight
        }}>


            {
                switchForm ?



                    <SignIn toggleForm={toggleForm}/>
                    :
                <SignUp toggleForm={toggleForm}/>
            }



        </ScrollView>


    );

};

Login.propTypes = {
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    clearMessage: PropTypes.func.isRequired,
}
const mapActionToPops = {
    loginUser,
    clearErrors,
    clearMessage
}


const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user,
})


export default connect(mapStateToProps, mapActionToPops)(Login);

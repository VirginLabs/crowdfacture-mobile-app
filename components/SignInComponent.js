import React, {useEffect, useRef, useState} from 'react';

import {ActivityIndicator, Animated, Dimensions, StyleSheet, Text, View} from 'react-native';
import TextInput from "./TextInput";
import MyButton from "./MyButton";
import {Colors, DayColors} from "../constants/Colors";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {useFormik} from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import {clearErrors, clearMessage, loginUser} from "../redux/actions/user-action";
import {connect} from "react-redux";

import ToastMessage from "../components/Toast";

const phoneRegExp = /^[+]?\d*$/
const LoginSchema = Yup.object().shape({
    password: Yup.string()
        .min(2, "Password is Too short")
        .max(50, "Password is Too long")
        .required("Password is Required"),
    phone: Yup.string()
        .matches(phoneRegExp, 'Wrong input')
        .min(2, "Phone number is Too short")
        .required("Phone number is required"),
});





const SignIn = (props) => {

    const {navigation,toggleForm} = props

    const {toggleAuth, clearMessage, clearErrors, loginUser, signUpUser} = props
    const {error, message, loading} = props.user

    const [userMessage, setUserMessage] = useState(false)
    const [userError, setUserError] = useState(false)

    const {
        handleChange, handleSubmit, handleBlur,
        values,
        errors,
        touched
    } = useFormik({
        validationSchema: LoginSchema,
        initialValues: {
            phone: '', password: '',
        },
        onSubmit: (values) => {
            const {phone, password} = values;
            const user = new FormData();
            user.append("phoneNumber", phone);
            user.append("password", password);
            loginUser(user,navigation)
        }
    });


    useEffect(() => {
        if (error) {
            setUserError(false)
        }
        return () => {
            setTimeout(() => {
                clearErrors()
            }, 3500)
        }

    }, [error])

    useEffect(() => {
        if (message) {

            setUserMessage(true)
        }
        return () => {
            setTimeout(() => {
                clearMessage()
            }, 3500)
        }

    }, [message])

    return (

        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundColor: Colors.PrimaryDarkColor,
            width: '100%',
            height: hp('100%'),
        }}>


            <View style={{paddingHorizontal: 32, marginBottom: 1, width: '100%',}}>
                <TextInput
                    icon='phone'
                    placeholder='Enter your phone number'
                    autoCapitalize='none'
                    keyboardType='numeric'
                    keyboardAppearance='dark'
                    returnKeyType='next'
                    returnKeyLabel='next'
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    error={errors.phone}
                    touched={touched.phone}
                />
            </View>
            <Text style={styles.errorText} numberOfLines={1}>
                {errors.phone}
            </Text>

            <View style={{paddingHorizontal: 32, width: '100%'}}>
                <TextInput
                    required
                    icon='key'
                    placeholder='Enter your password'
                    secureTextEntry
                    autoCompleteType='password'
                    autoCapitalize='none'
                    keyboardAppearance='dark'
                    returnKeyType='go'
                    returnKeyLabel='go'
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    error={errors.password}
                    touched={touched.password}
                    onSubmitEditing={() => handleSubmit()}
                />
            </View>
            <Text style={styles.errorText} numberOfLines={1}>
                {errors.password}
            </Text>


            <MyButton action={() => handleSubmit()} title='LOGIN'
                      buttonStyle={styles.loginButton} textStyle={styles.buttonText}/>

            <View style={{
                padding: 8, width: '75%', alignItems: 'center'
            }}>

                {
                    loading && <ActivityIndicator size="large" color={Colors.Primary}/>
                }

                <Text onPress={toggleForm} style={{color: '#fff', fontFamily: 'Gordita-medium'}}>
                    Create new account
                </Text>
            </View>


                {message &&
                <ToastMessage message={message} type='message'/>
                }

                {error &&  <ToastMessage message={error} type='error'/>}






            {/* comment  */}

        </View>
    );
};


const styles = StyleSheet.create({

    loginButton: {
        height: 50,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        width: '80%',
        backgroundColor: Colors.Primary,
        borderRadius: 10,
    },
    buttonText: {
        fontFamily: 'Gordita-bold',
        fontSize: 18
    },
    errorText: {fontSize: 14, alignItems: "flex-start", width: '75%', color: '#FF5A5F', padding: 8}

})

SignIn.propTypes = {
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


export default connect(mapStateToProps, mapActionToPops)(SignIn);

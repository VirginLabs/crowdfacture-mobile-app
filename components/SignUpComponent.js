import React, {useEffect} from 'react';

import {ActivityIndicator, StatusBar, StyleSheet, Text, View} from 'react-native';
import TextInput from "./TextInput";
import MyButton from "./MyButton";
import {Colors} from "../constants/Colors";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {useFormik} from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import {clearErrors, clearMessage, loginUser, signUpUser} from "../redux/actions/user-action";
import {connect} from "react-redux";
import ToastMessage from "./Toast";

const phoneRegExp = /^[+]?\d*$/
const LoginSchema = Yup.object().shape({
    password: Yup.string()
        .min(2, "Password is Too short")
        .max(50, "Password is Too long")
        .required("Password is Required"),
    firstName: Yup.string()
        .min(2, "First Name is Too short")
        .max(50, "First Name Too long")
        .required("First Name Required"),
    lastName: Yup.string()
        .min(2, "Last Name is Too short")
        .max(50, "Last Name is Too long")
        .required("Last Name is Required"),
    phone: Yup.string()
        .matches(phoneRegExp, 'Wrong input')
        .min(2, "Phone number is Too short")
        .required("Phone number is required"),
    email: Yup.string()
        .email("Invalid email")
        .required("Email is required")
});


const SignUp = (props) => {

const {toggleForm,navigation} = props


    const {toggleAuth, clearMessage, clearErrors, signUpUser} = props
    const {error, message, loading} = props.user


    const {
        handleChange, handleSubmit, handleBlur,
        values,
        errors,
        touched
    } = useFormik({
        validationSchema: LoginSchema,
        initialValues: {
            firstName: '', lastName: '', phone: '', referral: '', email: '', password: '',
        },
        onSubmit: (values) => {
            const {firstName, lastName, phone, referral, email, password} = values;
            const userData = new FormData();
            userData.append("firstName", firstName);
            userData.append("lastName", lastName);
            userData.append("email", email);
            userData.append("phoneNumber", phone);
            userData.append("referralCode", referral);
            userData.append("password", password);
            signUpUser(userData,navigation)
        }
    });



    useEffect(() => {

        return () => {
            setTimeout(() => {
                clearErrors()
            }, 3500)
        }

    }, [error])

    useEffect(() => {

        return () => {
            setTimeout(() => {
                clearMessage()
            }, 3500)
        }

    }, [message])


    return (

        <View style={{
            flex:1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection:'column',
            backgroundColor: Colors.PrimaryDarkColor,
            width:'100%',
            height:hp('100%'),
        }}>


            <View style={{paddingHorizontal: 32, marginBottom: 1, width: '100%',}}>
                <TextInput
                    keyboardType='default'
                    icon='user'
                    placeholder='Enter your first Name'
                    autoCapitalize='none'
                    keyboardAppearance='dark'
                    returnKeyType='next'
                    returnKeyLabel='next'
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    error={errors.firstName}
                    touched={touched.firstName}
                />
            </View>
            <Text style={styles.errorText} numberOfLines={1}>
                {errors.firstName}
            </Text>

            <View style={{paddingHorizontal: 32, marginBottom: 1, width: '100%',}}>
                <TextInput
                    keyboardType='default'
                    icon='user'
                    placeholder='Enter your last Name'
                    autoCapitalize='none'
                    keyboardAppearance='dark'
                    returnKeyType='next'
                    returnKeyLabel='next'
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                    error={errors.lastName}
                    touched={touched.lastName}
                />
            </View>
            <Text style={styles.errorText} numberOfLines={1}>
                {errors.lastName}
            </Text>
            <View style={{paddingHorizontal: 32, marginBottom: 1, width: '100%',}}>
                <TextInput
                    keyboardType='phone-pad'
                    icon='phone'
                    placeholder='your Phone number'
                    autoCapitalize='none'
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
            <View style={{paddingHorizontal: 32, marginBottom: 1, width: '100%',}}>
                <TextInput
                    icon='mail'
                    placeholder='Enter your email'
                    autoCapitalize='none'
                    autoCompleteType='email'
                    keyboardType='email-address'
                    keyboardAppearance='dark'
                    returnKeyType='next'
                    returnKeyLabel='next'
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    error={errors.email}
                    touched={touched.email}
                />
            </View>
            <Text style={styles.errorText} numberOfLines={1}>
                {errors.email}
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

            <View style={{paddingHorizontal: 32, marginBottom: 16, width: '100%',}}>
                <TextInput
                    keyboardType='default'
                    icon='add-user'
                    placeholder='Referral Code'
                    autoCapitalize='none'
                    keyboardAppearance='dark'
                    returnKeyType='next'
                    returnKeyLabel='next'
                    onChangeText={handleChange('referral')}
                />
            </View>

            <MyButton action={() => handleSubmit()} title='SIGN UP'
                      buttonStyle={styles.loginButton} textStyle={styles.buttonText}/>


            {
                loading && <ActivityIndicator size="large" color={Colors.Primary}/>
            }

            <View  style={{
                padding:8, width:'75%', alignItems:'center'
            }}>
                <Text onPress={toggleForm} style={{color:'#fff', fontFamily:'Gordita-medium'}}>
                   Login to your account
                </Text>
            </View>


            {message &&
            <ToastMessage message={message} type='message'/>
            }

            {error &&  <ToastMessage message={error} type='error'/>}

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


SignUp.propTypes = {
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    signUpUser: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    clearMessage: PropTypes.func.isRequired,
}
const mapActionToPops = {
    signUpUser,
    clearErrors,
    clearMessage
}


const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user,
})

export default connect(mapStateToProps, mapActionToPops)(SignUp);

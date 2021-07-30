import React, {useEffect, useRef, useState} from 'react';

import {ActivityIndicator, Animated, Dimensions, Linking, StyleSheet, Text, View} from 'react-native';
import TextInput from "./TextInput";
import MyButton from "./MyButton";
import {Colors, DayColors} from "../constants/Colors";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {useFormik} from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import {clearErrors, clearMessage, loginUser} from "../redux/actions/user-action";
import {connect, useDispatch, useSelector} from "react-redux";

import ToastMessage from "../components/Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";


const handlePress =  (url) => {
    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
    // by some browser in the mobile
    Linking.openURL(url);

};


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
    const user = useSelector(state => state.user)

    const dispatch = useDispatch()
    const {navigation,toggleForm} = props
    const [phone, setPhone] = useState('');

    const {error, message, loading} = user

    const [userMessage, setUserMessage] = useState(false)
    const [userError, setUserError] = useState(false)

    const {
        handleChange, handleSubmit, handleBlur,
        values,
        errors,
        touched,
        setFieldValue
    } = useFormik({
        validationSchema: LoginSchema,
        initialValues: {
            phone:'', password: '',
        },
        onSubmit: (values) => {
            const {phone, password} = values;
            const user = new FormData();
            user.append("phoneNumber", phone);
            user.append("password", password);
            dispatch(loginUser(user,navigation))
        }
    });


    useEffect(() => {
        if (error) {
            setUserError(false)
        }
        return () => {
            setTimeout(() => {
                dispatch(clearErrors())
            }, 3500)
        }

    }, [error])

    useEffect(() => {
        if (message) {

            setUserMessage(true)
        }
        return () => {
            setTimeout(() => {
                dispatch(clearMessage())
            }, 3500)
        }

    }, [message])

    useEffect(() => {
        AsyncStorage.getItem('crowdFactureUser').then(value =>{
            setFieldValue('phone',value)
            //Alert.alert('Authenticated', `Welcome back ! ${value}`)
        })
    },[])

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
                    value={values.phone}
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

            <View
                style={{
                width: '70%',
                marginBottom:10,
                alignItems:'center',
            }}>

                <Text onPress={() => handlePress('https://www.crowdfacture.com/resetpassword')} style={{
                    color:'#ccc',
                    fontSize:12,
                    fontFamily:'Gordita-bold'
                }}>
                    Forgot password?
                </Text>
            </View>

            <MyButton action={() => handleSubmit()} title='LOGIN'
                      buttonStyle={styles.loginButton} textStyle={styles.buttonText}/>

            <View style={{
                padding: 8, width: '75%', alignItems: 'center'
            }}>

                {
                    loading && <ActivityIndicator size="large" color={Colors.Primary}/>
                }

                <Text onPress={toggleForm} style={{color: '#fff',
marginVertical:8,
                    fontSize:12,
                    fontFamily: 'Gordita-medium'}}>
                    Create new account
                </Text>
            </View>


                {message &&
                <ToastMessage message={message} onHide={()=> dispatch(clearMessage())} type='message'/>
                }

                {error &&  <ToastMessage message={error} onHide={() => dispatch(clearErrors())} type='error'/>}






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
        fontSize: 14,
    },
    errorText: {fontSize: 10, alignItems: "flex-start", width: '75%', color: '#FF5A5F', padding: 2}

})




export default SignIn;

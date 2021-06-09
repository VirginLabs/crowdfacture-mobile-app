import React, {useCallback, useRef, useState} from 'react';
import {useFormik} from 'formik';
import {
    StyleSheet,
    View,
    StatusBar,
    Text,
    ImageBackground,
    KeyboardAvoidingView,
    Button,
    ScrollView
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {Colors, DarkColors, DayColors} from "../constants/Colors";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import * as Yup from 'yup';
import SignUp from "../components/SignUpComponent";
import SignIn from "../components/SignInComponent";

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

const Login = (props) => {
    const [switchForm, setSwitchForm] = useState(true);
    const {
        handleChange, handleSubmit, handleBlur,
        values,
        errors,
        touched
    } = useFormik({
        validationSchema: LoginSchema,
        initialValues: {firstName: '', lastName: '', phone: '', referral: '', email: '', password: '',
        },
        onSubmit: (values) => {
            const {firstName, lastName, phone, referral, email, password} = values;
            alert(`Email: ${values.email}, Password: ${values.password}`)
        }
    });




    const toggleForm = useCallback(() =>{
        setSwitchForm(prevState => !prevState)
    },[])


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

                        <SignUp toggleForm={toggleForm} handleChange={handleChange} handleSubmit={handleSubmit}
                                errors={errors}
                                touched={touched} handleBlur={handleBlur}/>
                        :
                        <SignIn toggleForm={toggleForm} handleChange={handleChange} handleSubmit={handleSubmit} errors={errors}
                                touched={touched} handleBlur={handleBlur}/>
                }


                <Button title='DASHBOARD' onPress={ () => props.navigation.navigate('Dashboard')}/>

        </ScrollView>


    );

};



export default Login;

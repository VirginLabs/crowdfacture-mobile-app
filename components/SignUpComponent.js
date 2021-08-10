import React, {useEffect, useRef, useState} from 'react';

import {ActivityIndicator, Linking, StatusBar, StyleSheet, Text, View} from 'react-native';
import TextInput from "./TextInput";
import MyButton from "./MyButton";
import {Colors, DarkColors} from "../constants/Colors";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {useFormik} from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import PhoneInput from "react-native-phone-number-input";
import {clearErrors, clearMessage, loginUser, signUpUser} from "../redux/actions/user-action";
import {connect, useDispatch, useSelector} from "react-redux";

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


let countryPickerRef = undefined;

const handlePress = (url) => {
    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
    // by some browser in the mobile
    Linking.openURL(url);

};


const SignUp = (props) => {


    const {toggleForm, navigation} = props

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const {error, message, loading} = user


    const [value, setValue] = useState("");
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = useRef(null);

    const {
        handleChange, handleSubmit, handleBlur,
        setFieldValue,
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
            dispatch(signUpUser(userData, navigation))
        }
    });


    useEffect(() => {

        return () => {
            setTimeout(() => {
                dispatch(clearErrors())
            }, 3500)
        }

    }, [error])

    useEffect(() => {

        return () => {
            setTimeout(() => {
                dispatch(clearMessage())
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
                    keyboardType='default'
                    icon='user'
                    placeholder='Your first Name'
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
                    placeholder='Your last Name'
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
                <PhoneInput

                    textContainerStyle={{
                        backgroundColor: DarkColors.primaryDarkThree,
                        borderRadius: 20,
                    }}
                    codeTextStyle={{
                        color: '#eee',
                        fontSize:12
                    }}

                    textInputStyle={{
                        color: '#eee',
                        fontSize:12
                    }}
                    containerStyle={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: 65,
                        borderRadius: 20,
                        borderColor: '#eee',
                        borderWidth: 2,
                        width: '100%',
                        backgroundColor: DarkColors.primaryDarkThree,
                    }}
                    disableArrowIcon
                    ref={phoneInput}
                    layout="first"
                    defaultValue={values.phone}
                    defaultCode="NG"
                    onChangeFormattedText={(text) => {
                        setFieldValue('phone',text);
                        console.log(text)
                    }}
                    withDarkTheme
                    withShadow
                    //autoFocus
                />
            </View>
            <Text style={styles.errorText} numberOfLines={1}>
                {errors.phone}
            </Text>


            {/*<View style={{paddingHorizontal: 32, marginBottom: 1, width: '100%',}}>*/}
            {/*    <TextInput*/}
            {/*        keyboardType='phone-pad'*/}
            {/*        icon='phone'*/}
            {/*        placeholder='Your phone number'*/}
            {/*        autoCapitalize='none'*/}
            {/*        keyboardAppearance='dark'*/}
            {/*        returnKeyType='next'*/}
            {/*        returnKeyLabel='next'*/}
            {/*        onChangeText={handleChange('phone')}*/}
            {/*        onBlur={handleBlur('phone')}*/}
            {/*        error={errors.phone}*/}
            {/*        touched={touched.phone}*/}
            {/*    />*/}
            {/*</View>*/}
            {/*<Text style={styles.errorText} numberOfLines={1}>*/}
            {/*    {errors.phone}*/}
            {/*</Text>*/}
            <View style={{paddingHorizontal: 32, marginBottom: 1, width: '100%',}}>
                <TextInput
                    icon='mail'
                    placeholder='Your email'
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
                    placeholder='Your password'
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
                    placeholder='Referral Code (optional)'
                    autoCapitalize='none'
                    keyboardAppearance='dark'
                    returnKeyType='next'
                    returnKeyLabel='next'
                    onChangeText={handleChange('referral')}
                />
            </View>

            <View
                style={{
                    width: '80%',
                    marginBottom: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row'
                }}>

                <Text style={{
                    color: '#ccc',
                    fontSize: 10,
                    fontFamily: 'Gordita-medium',
                }}>
                    By signing up, you agree to &nbsp;
                </Text>
                <Text onPress={() => handlePress('https://www.crowdfacture.com/terms')} style={{
                    color: '#665cf1',
                    fontSize: 10,
                    fontFamily: 'Gordita-medium',
                }}>
                    our Terms &nbsp;
                </Text>
                <Text style={{
                    color: '#ccc',
                    fontSize: 10,
                    fontFamily: 'Gordita-medium',
                }}>
                    of Use &  &nbsp;
                </Text>
                <Text onPress={() => handlePress('https://www.crowdfacture.com/privacy')} style={{
                    color: '#665cf1',
                    fontSize: 10,
                    fontFamily: 'Gordita-medium',
                }}>
                    Privacy Policy
                </Text>
            </View>

            <MyButton action={() => handleSubmit()} title='SIGN UP'
                      buttonStyle={styles.loginButton} textStyle={styles.buttonText}/>


            {
                loading && <ActivityIndicator size="large" color={Colors.Primary}/>
            }

            <View style={{
                padding: 8, width: '75%', alignItems: 'center'
            }}>
                <Text onPress={() => dispatch(toggleForm)} style={{
                    color: '#fff',
                    fontSize: 12,
                    fontFamily: 'Gordita-medium'
                }}>
                    Login to your account
                </Text>
            </View>


            {message &&
            <ToastMessage message={message} type='message'/>
            }

            {error && <ToastMessage message={error} type='error'/>}

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
        fontSize: 14
    },
    errorText: {fontSize: 10, alignItems: "flex-start", width: '75%', color: '#FF5A5F', padding: 2}

})


export default SignUp;

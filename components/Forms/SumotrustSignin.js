import React, {useCallback} from 'react';

import {ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import TextInput from "../TextInput";
import MyButton from "../MyButton";
import {Colors, DayColors} from "../../constants/Colors";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {useFormik} from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import {clearErrors} from "../../redux/actions/user-action";
import {connect} from "react-redux";

import ToastMessage from "../Toast";
import {sumotrustAuth, sumotrustLogin} from "../../redux/actions/user-action";

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





const SumotrustSignIn = (props) => {

    const {setSwitchSumo, clearMessage,sumotrustLogin, clearErrors} = props
    const {error, message, loading} = props.user

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
            const {password, phone} = values
            const user = new FormData();
            user.append("phoneNumber", phone);
            user.append("password", password);
            sumotrustLogin(user)
        }
    });








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


            <MyButton action={() => handleSubmit()} title='LOGIN WITH SUMOTRSUT'
                      buttonStyle={styles.loginButton} textStyle={styles.buttonText}/>

            <View style={{
                padding: 8, width: '75%', alignItems: 'center'
            }}>

                {
                    loading && <ActivityIndicator size="large" color={Colors.Primary}/>
                }

                <Text onPress={setSwitchSumo} style={{color: '#fff', fontFamily: 'Gordita-medium'}}>
                   Signup with sumotrust
                </Text>


            </View>
            <TouchableOpacity style={{
                padding:5,
                backgroundColor: DayColors.dimGreen,
                borderRadius:10,
            }} activeOpacity = {.9} onPress={() => {
            }}>

                <Text onPress={() => props.navigation.navigate('Auth')} style={{
                    padding:10,
                    color: '#fff', fontFamily: 'Gordita-medium'}}>
                    GO BACK
                </Text>
            </TouchableOpacity>


            {message &&
            <ToastMessage message={message} onHide={() => clearMessage()} type='message'/>
            }

            {error &&  <ToastMessage message={error} onHide={() => clearErrors()} type='error'/>}






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
        backgroundColor: DayColors.strongLemon,
        borderRadius: 10,
    },
    buttonText: {
        fontFamily: 'Gordita-bold',
        fontSize: 18,
        color: "#131313"
    },
    errorText: {fontSize: 14, alignItems: "flex-start", width: '75%', color: '#FF5A5F', padding: 8}

})

SumotrustSignIn.propTypes = {
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
    sumotrustAuth: PropTypes.func.isRequired,
    sumotrustLogin: PropTypes.func.isRequired,
}
const mapActionToPops = {
    clearErrors,
    sumotrustAuth,
    sumotrustLogin,
}


const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user,
})


export default connect(mapStateToProps, mapActionToPops)(SumotrustSignIn);

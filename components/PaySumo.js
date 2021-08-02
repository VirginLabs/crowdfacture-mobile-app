import React from 'react';

import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from "../constants/Colors";
import TextInput from "./TextInput";
import MyButton from "./MyButton";
import { sumotrustLogin} from "../redux/actions/user-action";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";


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


const PaySumo = ({toggleModal}) => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const data = useSelector(state => state.data)

    const {error, message, loading} = user
    const {theme} = data

    const {
        handleChange, handleSubmit, handleBlur,
        isValid,
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
            dispatch(sumotrustLogin(user))
        }
    });

    return (


        <View style={styles.modalContent}>

            <View style={{paddingHorizontal: 32, marginBottom: 1, width: '100%',}}>
                <TextInput
                     color={theme === 'Dark' ? '#ddd' : '#333'}
                    icon='phone'
                     required
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
                    color={theme === 'Dark' ? '#ddd' : '#333'}
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

            <View style={{
                padding: 8, width: '75%', alignItems: 'center'
            }}>

                {
                    loading && <ActivityIndicator size="large" color={Colors.Primary}/>
                }

            </View>

            {
                isValid ?

                    <MyButton action={() => handleSubmit()} title='LOGIN WITH SUMOTRUST'
                              buttonStyle={styles.loginButton} textStyle={styles.buttonText}/>
                    :
                    <TouchableOpacity activeOpacity={1} style={{
                        backgroundColor: '#ddd',
                        height: 50,
                        marginHorizontal: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: 5,
                        width: '70%',
                        borderRadius: 10,
                    }}>
                        <Text style={{
                            fontSize: 12,
                            fontFamily: 'Gordita-bold'
                        }}>
                            LOGIN WITH SUMOTRUST
                        </Text>

                    </TouchableOpacity>
            }


        </View>


    );
};


const styles = StyleSheet.create({


    modalView: {
        width: wp('90%'),
        height: hp('50%'),
        margin: 20,
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    modalContent: {
        width: wp('100%'),
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    buttonClose: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        width: 40,
        height: 40,
    },
    loginButton: {
        height: 50,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        width: '70%',
        backgroundColor: '#4058f6',
        borderRadius: 10,
    },
    buttonText: {
        fontFamily: 'Gordita-bold',
        fontSize: 12,
        color: "#EEE"
    },
    errorText: {
        fontSize: 10,
        alignItems: "flex-start", width: '75%',
        color: '#FF5A5F', padding: 2
    }
})

export default PaySumo;

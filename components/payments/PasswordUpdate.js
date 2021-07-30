import React from 'react';

import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, DayColors} from "../../constants/Colors";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import TextInput from "../TextInput";
import MyButton from "../MyButton";
import * as Yup from "yup";
import {useFormik} from "formik";


const phoneRegExp = /^[+]?\d*$/
const schema = Yup.object().shape({
    oldPassword: Yup.string()
        .min(2, "Old Password is Too short")
        .max(50, "Old Password is Too long")
        .matches(phoneRegExp, 'Wrong input')
        .required("old Password is Required"),
    newPassword: Yup.string()
        .min(2, "Password is Too short")
        .max(50, "Password is Too long")
        .matches(phoneRegExp, 'Wrong input')
        .required("Password is Required"),
});

const UpdatePassword = ({theme,updatePassword, loading, userId,}) => {


    const {
        handleChange, handleSubmit, handleBlur,
        isValid,

        errors,
        touched
    } = useFormik({
        validationSchema: schema,
        initialValues: {oldPassword: '',
            newPassword: ''

        },
        onSubmit: (values) => {
            const {oldPassword,newPassword} = values;

            const PasswordData = new FormData()
            PasswordData.append("oldPassword",oldPassword)
            PasswordData.append("newPassword",newPassword)
            PasswordData.append("userId",userId)
            updatePassword(PasswordData)
        }
    });


    return (
        <View style={styles.updatePassword}>
            <View style={[
                {
                    height:50
                },
                styles.infoAlert]}>
                <View style={styles.infoHead}>
                    <Text style={[styles.infoHeadText, {
                        color: theme === 'Dark' ?
                            Colors.White : "#131313"
                    }]}>
                        SET NEW PASSWORD
                    </Text>
                </View>
            </View>

            <View style={{paddingHorizontal: 32, marginTop: 15, width: wp('100%'),}}>
                <TextInput
                    color={theme === 'Dark' ? '#eee' : '#131313'}
                    icon='key'
                    placeholder='Enter old password'
                    autoCapitalize='none'
                    keyboardAppearance='dark'
                    returnKeyType='go'
                    returnKeyLabel='go'
                    onChangeText={handleChange('oldPassword')}
                    onBlur={handleBlur('oldPassword')}
                    error={errors.oldPassword}
                    touched={touched.oldPassword}
                />
            </View>

            <Text style={styles.errorText} numberOfLines={1}>
                {errors.oldPassword}
            </Text>

            <View style={{paddingHorizontal: 32, marginTop: 15, width: wp('100%'),}}>
                <TextInput
                    color={theme === 'Dark' ? '#eee' : '#131313'}
                    icon='lock'
                    placeholder='Enter new password'
                    autoCapitalize='none'
                    keyboardAppearance='dark'
                    returnKeyType='go'
                    returnKeyLabel='go'
                    onChangeText={handleChange('newPassword')}
                    onBlur={handleBlur('newPassword')}
                    error={errors.newPassword}
                    touched={touched.newPassword}
                />
            </View>
            <Text style={styles.errorText} numberOfLines={1}>
                {errors.newPassword}
            </Text>


            {
                loading && <ActivityIndicator size="large" color={Colors.Primary}/>
            }

            {
                isValid ?

                    <MyButton action={() => handleSubmit()} title='SUBMIT'
                              buttonStyle={styles.submitBtn} textStyle={styles.buttonText}/>

                    :
                    <TouchableOpacity activeOpacity={1} style={{
                        backgroundColor: '#ddd',
                        height: 50,
                        marginHorizontal: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: 5,
                        width: 160,
                        borderRadius: 10,
                    }}>
                        <Text style={{
                            fontSize: 12,
                            fontFamily: 'Gordita-bold'
                        }}>
                            SUBMIT
                        </Text>

                    </TouchableOpacity>
            }
        </View>
    );
};


const styles = StyleSheet.create({
    updatePassword: {
        minHeight: 300,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        padding: 10
    },
    infoAlert: {
        borderRadius: 15,
        width: wp('90%'),
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8
    },
    infoHead: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    infoHeadText: {
        fontFamily: 'Gordita-Black',
    },
    submitBtn:{
        height: 50,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        width: 160,
        backgroundColor: Colors.Primary,
        borderRadius: 10,
    },
    buttonText: {
        fontFamily: 'Gordita-bold',
        fontSize: 16
    },
    errorText:{
        fontSize: 10,
        padding:1,
        color:'#ff5d57',
        fontFamily: 'Gordita-medium',
    }
});

export default UpdatePassword;

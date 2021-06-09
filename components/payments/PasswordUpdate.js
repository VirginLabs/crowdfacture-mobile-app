import React from 'react';

import {StyleSheet, Text, View} from 'react-native';
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

const UpdatePassword = ({theme}) => {


    const {
        handleChange, handleSubmit, handleBlur,
        values,
        errors,
        touched
    } = useFormik({
        validationSchema: schema,
        initialValues: {oldPassword: '',
            newPassword: ''

        },
        onSubmit: (values) => {
            const {oldPassword,newPassword} = values;
            alert(`Old Password: ${newPassword}`)
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

            <MyButton action={() => handleSubmit()} title='SUBMIT'
                      buttonStyle={styles.submitBtn} textStyle={styles.buttonText}/>
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
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: DayColors.cream,
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
        color:'#ff5d57',
        fontFamily:'Gordita-medium'
    }
});

export default UpdatePassword;

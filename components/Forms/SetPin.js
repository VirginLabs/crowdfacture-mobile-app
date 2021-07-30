import React from 'react';

import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as Yup from "yup";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import {Colors, DayColors} from "../../constants/Colors";
import TextInput from "../TextInput";
import MyButton from "../MyButton";
import {useFormik} from "formik";

import {clearErrors, clearMessage, sendOtp, updatePassword, updateWithdrawalPin} from "../../redux/actions/user-action";
import {useSelector} from "react-redux";
const phoneRegExp = /^[+]?\d*$/
const schema = Yup.object().shape({
    pin: Yup.string()
        .min(2, "PIN is Too short")
        .max(50, "PIN is Too long")
        .matches(phoneRegExp, 'Wrong input')
        .required("Amount is Required"),
});


const SetPin = () => {
    const user = useSelector(state => state.user)
    const data = useSelector(state => state.data)
    const {theme} = data
    const {loading,userData:{member: {ID}}} = user
    const {
        handleChange, handleSubmit, handleBlur,
        values,
        isValid,
        errors,
        touched
    } = useFormik({
        validationSchema: schema,
        initialValues: {pin: '',
        },
        onSubmit: (values) => {
            const {pin} = values;
            const userPinData = new FormData()
            userPinData.append('pin',pin)
            userPinData.append('userId',ID)
            updateWithdrawalPin(userPinData)
        }
    });

    return (
        <View style={styles.setPin}>
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
                    SET NEW PIN
                    </Text>
                </View>
            </View>

            <View style={{paddingHorizontal: 32, marginTop: 15, width: wp('100%'),}}>
                <TextInput
                    color={theme === 'Dark' ? '#eee' : '#131313'}
                    icon='money'
                    placeholder='Enter new pin'
                    autoCapitalize='none'
                    keyboardAppearance='dark'
                    returnKeyType='go'
                    returnKeyLabel='go'
                    onChangeText={handleChange('pin')}
                    onBlur={handleBlur('pin')}
                    error={errors.pin}
                    touched={touched.pin}
                />
            </View>
            <Text style={styles.errorText} numberOfLines={1}>
                {errors.pin}
            </Text>

            {
                loading && <ActivityIndicator size="large" color={Colors.Primary}/>
            }
            {
                isValid
                    ?
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
    setPin: {
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
        padding:3,
        color:'#ff5d57',
        fontFamily: 'Gordita-medium',
    }
});

export default SetPin;

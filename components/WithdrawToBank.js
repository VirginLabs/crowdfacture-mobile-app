import React from 'react';

import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import {Colors, DayColors} from "../constants/Colors";
import * as Yup from "yup";
import {useFormik} from "formik";
import TextInput from "./TextInput";
import {useDispatch, useSelector} from "react-redux";
import MyButton from "./MyButton";
import ToastMessage from "./Toast";
import {clearErrors, clearMessage, withdrawToBank} from "../redux/actions/user-action";



const phoneRegExp = /^[+]?\d*$/
const schema = Yup.object().shape({
    Amount: Yup.string()
        .min(2, "Amount is Too short")
        .max(50, "Amount is Too long")
        .matches(phoneRegExp, 'Wrong input')
        .required("Amount is Required"),
});


const WithdrawToBank = ({theme}) => {
const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    const {error, message,loading,userData:
        { member: {
            ID}}} = user
    const {
        handleChange, handleSubmit, handleBlur,
        values,
        errors,
        touched
    } = useFormik({
        validationSchema: schema,
        initialValues: {Amount: 0,
        },
        onSubmit: (values) => {
            const {Amount} = values;
            const details = new FormData()
            details.append('amount',Amount)
            details.append('userId',ID)
dispatch(withdrawToBank(details))
        }
    });





    return (
        <View style={styles.flutterWave}>
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
                       WITHDRAW TO YOUR LOCAL BANK ACCOUNT
                    </Text>
                </View>
            </View>

            <View style={{paddingHorizontal: 32, marginTop: 15, width: wp('100%'),}}>
                <TextInput
                    color={theme === 'Dark' ? '#eee' : '#131313'}
                    icon='money'
                    keyboardType='numeric'
                    placeholder='Enter Amount'
                    autoCapitalize='none'
                    keyboardAppearance='dark'
                    returnKeyType='go'
                    returnKeyLabel='go'
                    onChangeText={handleChange('Amount')}
                    onBlur={handleBlur('Amount')}
                    error={errors.Amount}
                    touched={touched.Amount}
                />
            </View>
            <Text style={styles.errorText} numberOfLines={1}>
                {errors.Amount}
            </Text>

            {
                loading && <ActivityIndicator size="large" color={Colors.Primary}/>
            }

              <MyButton action={() => handleSubmit()} title='WITHDRAW'
                      buttonStyle={styles.submitBtn} textStyle={styles.buttonText}/>


            {message &&
            <ToastMessage onHide={() => dispatch(clearMessage())} message={message} type='message'/>
            }

            {error &&  <ToastMessage onHide={() => dispatch(clearErrors())} message={error} type='error'/>}
        </View>
    );
};


const styles = StyleSheet.create({
    flutterWave: {
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
        fontSize: 12,
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
        fontSize: 13
    },
});

export default WithdrawToBank;

import React from 'react';

import {Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Colors, DayColors} from "../../constants/Colors";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import TextInput from "../TextInput";
import MyButton from "../MyButton";
import {useFormik} from "formik";
import * as Yup from "yup";

const phoneRegExp = /^[+]?\d*$/
const schema = Yup.object().shape({
    BVN: Yup.string()
        .min(2, "BVN is Too short")
        .max(50, "BVN is Too long")
        .matches(phoneRegExp, 'Wrong input')
        .required("BVN is Required"),
});


const BankAccount = ({theme}) => {


    const {
        handleChange, handleSubmit, handleBlur,
        values,
        errors,
        touched
    } = useFormik({
        validationSchema: schema,
        initialValues: {BVN: '',
        },
        onSubmit: (values) => {
            const {BVN} = values;
            alert(`BVN: ${values.BVN}`)
        }
    });

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.accountNumber}>
            <View style={[
                {
                    height:100
                },
                styles.infoAlert]}>
                <View style={styles.infoHead}>
                    <Text style={[styles.infoHeadText, {
                        color: theme === 'Dark' ?
                            Colors.White : "#131313"
                    }]}>
                        UNIQUE ACCOUNT NUMBER
                    </Text>
                </View>
                <View style={styles.infoHeadBody}>
                    <Text style={[{
                        fontFamily: 'Gordita-medium',
                        textAlign: 'center',
                        fontSize:12,
                        color: theme === 'Dark' ?
                            Colors.White : "#333"

                    }]}>
                        Copy your Unique Crowdfacture account number and transfer your
                        desired
                        Amount to fund you crowdfacture account
                    </Text>
                </View>


            </View>


            <View style={{paddingHorizontal: 32, marginTop: 15, width: wp('100%'),}}>
                <TextInput
                    color={theme === 'Dark' ? '#eee' : '#131313'}
                    icon='key'
                    placeholder='Enter your BVN'
                    autoCapitalize='none'
                    keyboardAppearance='dark'
                    returnKeyType='go'
                    returnKeyLabel='go'
                    onChangeText={handleChange('BVN')}
                    onBlur={handleBlur('BVN')}
                    error={errors.BVN}
                    touched={touched.BVN}
                />
            </View>
            <Text style={styles.errorText} numberOfLines={1}>
                {errors.BVN}
            </Text>

            <MyButton action={() => handleSubmit()} title='SUBMIT'
                      buttonStyle={styles.submitBtn} textStyle={styles.buttonText}/>

        </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({

    accountNumber: {
        height: 500,
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
        padding: 8
    },
    infoHead: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    infoHeadText: {
        fontFamily: 'Gordita-Black',
    },
    infoHeadBody: {
        fontFamily: 'Gordita-medium',
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
    errorText: {fontSize: 14,
        alignItems: "flex-start", width: '75%',
        color: '#FF5A5F', padding: 8}


})


export default BankAccount;

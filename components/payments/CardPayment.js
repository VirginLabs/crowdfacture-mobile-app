import React from 'react';

import {Text, View, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import {Colors} from "../../constants/Colors";
import * as Yup from "yup";
import {useFormik} from "formik";
import TextInput from "../TextInput";


import {PayWithFlutterwave} from 'flutterwave-react-native';
import {useDispatch} from "react-redux";
import {flutterWavePay} from "../../redux/actions/user-action";



const phoneRegExp = /^[+]?\d*$/
const schema = Yup.object().shape({
    Amount: Yup.string()
        .min(2, "Amount is Too short")
        .max(50, "Amount is Too long")
        .matches(phoneRegExp, 'Wrong input')
        .required("Amount is Required"),
});


const FlutterWave = ({theme, userEmail,phoneNumber}) => {


    const date_stamp = new Date();
    const txref=  "R"+date_stamp.getTime()+"X"+Math.floor(Math.random() * 1000000)+"";

const dispatch = useDispatch()
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



        }
    });

    const handleOnRedirect = (params) =>{
        const {status, tx_ref, transaction_id} = params
if(status === "successful"){
    const formData = new FormData()
    formData.append("reference", txref)

    dispatch(flutterWavePay(formData))
}
if(status === "cancelled"){
    const formData = new FormData()
    formData.append("reference", txref)
console.log(txref)
    console.log(status)
}
console.log("payment canceled")

console.log(params)

    }


   const onSuccess = (data) => {
        console.log('success', data)
        // You can get the transaction reference from successful transaction charge response returned and handle your transaction verification here
    }

    const onCancel = () => {
        console.log('error', 'Transaction was Cancelled!')
    }

    const onError = () => {
        // an error occoured
    }

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
                     FUND WITH CARD
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




            <PayWithFlutterwave
            onRedirect={(params)=>handleOnRedirect(params)}
            options={{
                authorization:'FLWPUBK-9abc4f038a6908015c127b8b99cb4096-X',
                tx_ref:txref,
                customer: {
                   email: userEmail,
                    phonenumber:phoneNumber,
                },

                amount: parseFloat(values.Amount),
                currency: 'NGN',
                payment_options: 'card'
            }}
        />
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
});

export default FlutterWave;

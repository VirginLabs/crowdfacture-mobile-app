import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Switch} from 'react-native';
import {useFormik} from "formik";
import * as Yup from "yup";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import {Colors, DarkColors, DayColors} from "../constants/Colors";
import TextInput from "./TextInput";
import MyButton from "./MyButton";
import {Picker} from '@react-native-picker/picker';
import AllBanks from "../constants/AllBanks";
import {useDispatch, useSelector} from "react-redux";
import {addBank} from "../redux/actions/user-action";
import Animated from "react-native-reanimated";


const SWITCH_TRACK_COLOR = {
    true: 'rgb(246,179,108)',
    false: 'rgba(176,176,176,0.8)',
};

const schema = Yup.object().shape({
    accountNum: Yup.string()
        .min(2, "Account Number is Too short")
        .max(50, "Account Number is Too long")
        .required("Account Number is Required"),
    accountName: Yup.string()
        .min(2, "Account Name is Too short")
        .max(50, "Account Name is Too long")
        .required("Account Name is Required"),
    bankName: Yup.string()
        .min(2, "Bank Name is Too short")
        .max(50, "Bank Name is Too long")
        .required("Bank Name is Required"),
});


const AddBankForm = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const data = useSelector(state => state.data)
    const [isPrimary, setIsPrimary] = useState('0');

    const {
        loading,
        userData: {
            member: {ID, Phone}, bankDetails,
        }
    } = user

    const {theme} = data
    const [bankName, setBankName] = useState('');
    const {
        handleChange, handleSubmit, handleBlur,
        values,
        setFieldValue,
        errors,

        isValid,
        touched
    } = useFormik({
        validationSchema: schema,
        initialValues: {
            accountNum: '', bankName: '', accountName: '', primary: isPrimary
        },
        onSubmit: (values) => {
            const {accountNum, bankName, accountName, primary} = values;
            const BankDetails = new FormData()
            BankDetails.append("accountNumber", accountNum)
            BankDetails.append("accountName", accountName)
            BankDetails.append("bankName", bankName)
            BankDetails.append("userId", ID)
            BankDetails.append("IsPrimary", primary)
            dispatch(addBank(BankDetails, Phone))
        }
    });


    return (


        <View style={styles.addBankForm}>

            <View style={{paddingHorizontal: 32, marginTop: 15, width: wp('100%'),}}>
                <TextInput
                    color={theme === 'Dark' ? '#eee' : '#131313'}
                    icon='key'
                    placeholder='Enter your account number'
                    autoCapitalize='none'
                    keyboardType='numeric'
                    keyboardAppearance='dark'
                    returnKeyType='next'
                    returnKeyLabel='next'
                    onChangeText={handleChange('accountNum')}
                    onBlur={handleBlur('accountNum')}
                    error={errors.accountNum}
                    touched={touched.accountNum}
                />
            </View>
            <Text style={styles.errorText} numberOfLines={1}>
                {errors.accountNum}
            </Text>
            <View style={{paddingHorizontal: 32, marginTop: 15, width: wp('100%'),}}>
                <TextInput
                    color={theme === 'Dark' ? '#eee' : '#131313'}
                    icon='user'
                    placeholder='Your bank account name'
                    autoCapitalize='none'
                    keyboardAppearance='dark'
                    returnKeyType='next'
                    returnKeyLabel='next'
                    onChangeText={handleChange('accountName')}
                    onBlur={handleBlur('accountName')}
                    error={errors.accountName}
                    touched={touched.accountName}
                />
            </View>
            <Text style={styles.errorText} numberOfLines={1}>
                {errors.accountName}
            </Text>

            <View
                style={{
                    width: wp('85%'),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 60,
                    borderRadius: 15,
                    borderColor: "#ddd",
                    borderWidth: 2,
                    //  backgroundColor: DarkColors.primaryDark,
                    padding: 8
                }}
            >

                <Picker
                    label='Bank name'
                    onBlur={handleBlur('bankName')}
                    style={{
                        color: theme === 'Dark' ? '#eee' : '#333',
                        width: '100%',
                        height: 45,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start'
                    }}
                    mode='modal'
                    selectedValue={values.bankName}
                    onValueChange={(itemValue, itemIndex) =>
                        setFieldValue('bankName', itemValue)
                    }>
                    {
                        AllBanks.map((bank, index) => (
                            <Picker.Item label={bank.title} value={bank.value} key={index}/>
                        ))
                    }


                </Picker>

            </View>
            <Text style={styles.errorText} numberOfLines={1}>
                {errors.bankName}
            </Text>

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 8,
                width: '100%',
            }}>

                <Text style={{
                    marginHorizontal: 18,
                    fontSize: 10,
                    fontFamily: 'Gordita-medium',
                    color: theme === 'Dark' ? '#eee' : '#333',
                }}>
                    Make primary account
                </Text>
                <Switch style={{
                    width: '10%',
                    alignItems: 'center',
                    justifyContent: 'center'
                }} trackColor={SWITCH_TRACK_COLOR}
                        thumbColor={DayColors.primaryColor}
                        value={isPrimary === '1'} onValueChange={(toggled) => {
                    setIsPrimary(toggled ? '1' : '0')
                }}/>


            </View>

            {
                loading && <ActivityIndicator size="large" color={Colors.Primary}/>
            }
            {
                isValid ?

                    <MyButton title='SUBMIT'
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

    addBankForm: {
        height: 400,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        alignContent: 'center',
        flexDirection: 'column',

    },

    submitBtn: {
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
        fontSize: 12
    },
    errorText: {
        fontSize: 10,
        flexDirection: 'row',
        alignItems: "flex-start", width: '95%',
        color: '#FF5A5F', padding: 3
    }


})

export default AddBankForm;

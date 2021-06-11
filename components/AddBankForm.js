import React,{useState} from 'react';
import {ScrollView, Keyboard, TouchableWithoutFeedback, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {useFormik} from "formik";
import * as Yup from "yup";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import {Colors, DarkColors, DayColors} from "../constants/Colors";
import TextInput from "./TextInput";
import MyButton from "./MyButton";
import {Picker} from '@react-native-picker/picker';
import AllBanks from "../constants/AllBanks";


const phoneRegExp = /^[+]?\d*$/
const schema = Yup.object().shape({
    accountNum: Yup.string()
        .min(2, "Account Number is Too short")
        .max(50, "Account Number is Too long")
        .matches(phoneRegExp, 'Account name Must be numbers')
        .required("Account Number is Required"),
    accountName:Yup.string()
        .min(2, "Account Number is Too short")
        .max(50, "Account Number is Too long")
});


const AddBankForm = ({theme,Phone, action, id,loading}) => {

    const [bankName, setBankName] = useState('');
    const {
        handleChange, handleSubmit, handleBlur,
        values,
        setFieldValue,
        errors,
        initialValues,
        isValid,
        touched
    } = useFormik({
        validationSchema: schema,
        initialValues: {accountNum: '', bankName: '', accountName:'', primary:''
        },
        onSubmit: (values) => {
            const {accountNum,bankName,accountName,primary } = values;
            const BankDetails = new FormData()
            BankDetails.append("accountNumber", accountNum)
            BankDetails.append("accountName", accountName)
            BankDetails.append("bankName", bankName)
            BankDetails.append("userId", id)
            BankDetails.append("IsPrimary", '0')
            action(BankDetails,Phone)
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
                    placeholder='Enter your account name'
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
                    width:wp('85%'),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent:'space-between',
                    height: 60,
                    borderRadius: 15,
                    borderColor: "#ddd",
                    borderWidth: 2,
                    //  backgroundColor: DarkColors.primaryDark,
                    padding: 8
                }}
            >
               {/* <View style={{ padding: 10,flex:0.3, alignItems:"center" }}>
                    <FontAwesome name={'user'} color={Colors.Primary} size={16}/>

                </View>*/}
            <Picker
                label='Bank name'
                onBlur={handleBlur('bankName')}
                style={{
                    color: theme === 'Dark' ? '#eee' : '#333',
                    width:'100%',
                    height:45,
                    flexDirection: 'row',
                    alignItems:'flex-start',
                    justifyContent:'flex-start'
                }}
                mode='dropdown'
                selectedValue={values.bankName}
                onValueChange={(itemValue, itemIndex) =>
                    setFieldValue('bankName', itemValue)
                }>
                {
                    AllBanks.map((bank, index) => (
                    <Picker.Item label={bank} value={bank} key={index} />
                    ))
                }


            </Picker>
            </View>


            {
                loading && <ActivityIndicator size="large" color={Colors.Primary}/>
            }
            <MyButton action={() => handleSubmit()} title='SUBMIT'
                      buttonStyle={styles.submitBtn} textStyle={styles.buttonText}/>
        </View>

    );
};



const styles = StyleSheet.create({

    addBankForm: {
        height: 400,
        alignItems: 'center',
        justifyContent: 'flex-start',
        alignContent:'center',
        flexDirection: 'column',

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

export default AddBankForm;

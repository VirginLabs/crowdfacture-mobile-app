import React, {useState} from 'react';

import {
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import {Colors, DayColors} from "../../constants/Colors";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import TextInput from "../TextInput";
import MyButton from "../MyButton";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Ionicons} from "@expo/vector-icons";
import Clipboard from 'expo-clipboard';
import ToastMessage from "../Toast";



const phoneRegExp = /^[+]?\d*$/
const schema = Yup.object().shape({
    BVN: Yup.string()
        .min(2, "BVN is Too short")
        .max(50, "BVN is Too long")
        .matches(phoneRegExp, 'Wrong input')
        .required("BVN is Required"),
});


const BankAccount = ({theme, getUniqueAccountNumb, ID, navigation, userDetails, loading,}) => {

    const {MonnifyAccountNumber, MonnifyBankName, BVNVerified, bankDetails} = userDetails

    const [toastVisible, setToastVisible] = useState(false);

    const copyToClipboard = () => {
        setToastVisible(prevState => !prevState)
        Clipboard.setString(MonnifyAccountNumber);
    };
    const {
        handleChange, handleSubmit, handleBlur,
        values,
        isValid,
        errors,
        touched
    } = useFormik({
        validationSchema: schema,
        initialValues: {
            BVN: '',
        },
        onSubmit: (values) => {
            const {BVN} = values;
            const bvnData = new FormData()
            bvnData.append('BVN', BVN)
            bvnData.append('userId', ID)

            getUniqueAccountNumb(bvnData)
        }
    });

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

            <View style={styles.accountNumber}>
                {
                    toastVisible &&

                    <ToastMessage onHide={() => setToastVisible(false)} message='COPIED' type='message'/>
                }
                {
                    BVNVerified ? <View style={[
                            {
                                height: 100
                            },
                            styles.infoAlert]}>
                            <View style={styles.infoHead}>
                                <Text style={[styles.infoHeadText, {
                                    color: theme === 'Dark' ?
                                        Colors.White : "#131313"
                                }]}>
                                    COPY ACCOUNT NUMBER
                                </Text>
                            </View>

                            <View style={styles.infoHeadBody}>
                                <Text style={[{
                                    fontFamily: 'Gordita-medium',
                                    textAlign: 'center',
                                    fontSize: 10,
                                    color: theme === 'Dark' ?
                                        Colors.White : "#333"

                                }]}>
                                    Copy your Unique Crowdfacture account number and transfer your
                                    desired
                                    Amount to fund you Crowdfacture account
                                </Text>
                            </View>
                        </View> :

                        <View style={[
                            {
                                height: 100
                            },
                            styles.infoAlert]}>
                            <View style={styles.infoHead}>
                                <Text style={[styles.infoHeadText, {
                                    color: theme === 'Dark' ?
                                        Colors.White : "#131313"
                                }]}>
                                    GENERATE ACCOUNT NUMBER
                                </Text>
                            </View>
                            <View style={styles.infoHeadBody}>
                                <Text style={[{
                                    fontFamily: 'Gordita',
                                    textAlign: 'center',
                                    fontSize: 9,
                                    lineHeight:15,
                                    color: theme === 'Dark' ?
                                        '#eee' : "#333"

                                }]}>
                                    Provide your BVN below to generate Crowdfacture account number, make a deposit to
                                    the account to fund your crowdfacture main balance.
                                </Text>
                            </View>


                        </View>
                }

                {
                    BVNVerified && <View style={{
                    width:'100%',
                        flexDirection:'column',
                        alignItems:'center',
                        justifyContent:'center'
                    }}>

                        <Text style={{
                            padding:10,
                            fontSize:16,
                            fontFamily:'Gordita-medium',
                            color: theme === 'Dark' ? '#eee' : "#555"
                        }}>
                            {MonnifyBankName}
                        </Text>

                        <View style={{
                            borderWidth:1,
                            borderColor:theme === 'Dark' ? DayColors.lemon : DayColors.strongLemon,
                            borderStyle:'dashed',
                            borderRadius:10,
                            padding:8,
                        }}>

                            <Text style={{

                                fontSize:20,
                                fontFamily:'Gordita-bold',
                                color: theme === 'Dark' ? DayColors.green : DayColors.cream
                            }}>
                                {MonnifyAccountNumber}
                            </Text>

                        </View>


                        <TouchableOpacity style={
                            {
                                width:120,
                                height:45,
                                flexDirection:'row',
                                justifyContent:'space-evenly',
                                alignItems:'center',
                                backgroundColor: DayColors.strongLemon,
                                borderRadius:8,
                                margin:10
                            }
                        }  onPress={copyToClipboard}>
                            <Ionicons name='ios-copy' size={20} color={theme === 'Dark' ? DayColors.green : '#333'}/>
                            <Text style={{
                                fontFamily:'Gordita-bold'
                            }}>
                                COPY
                            </Text>
                        </TouchableOpacity>

                        </View> }

{ !BVNVerified &&
    Object.keys(bankDetails).length > 2 ?
                        <>
                            <View style={{paddingHorizontal: 32, marginTop: 15, width: wp('100%'),}}>
                                <TextInput
                                    color={theme === 'Dark' ? '#eee' : '#131313'}
                                    icon='key'
                                    placeholder='Enter your BVN'
                                    autoCapitalize='none'
                                    keyboardType='numeric'
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
                                </> :

   <View style={{
width:'100%',
       alignItems:'center',
       justifyContent:'center',
   }}>

       <Text onPress={()=> navigation.navigate('AddBank')} style={[styles.infoHeadText, {
        borderBottomWidth:1,
           borderBottomColor:'#acacac',
           color: theme === 'Dark' ?
               DayColors.cream : "#131313"
       }]}>
           Please click to add your bank account details
       </Text>

   </View>

                }
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

        alignItems: 'center',
        padding: 8
    },
    infoHead: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    infoHeadText: {
        textAlign:'center',
        fontFamily: 'Gordita-Black',
        fontSize:12,
    },
    infoHeadBody: {
        fontFamily: 'Gordita-medium',
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
        fontSize: 14,
        alignItems: "flex-start", width: '75%',
        color: '#FF5A5F', padding: 3
    }


})


export default BankAccount;

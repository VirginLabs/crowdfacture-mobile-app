import React from 'react';

import {ActivityIndicator, Pressable, StyleSheet, Text, View} from 'react-native';
import {Colors, DarkColors, DayColors} from "../constants/Colors";
import {FontAwesome} from "@expo/vector-icons";
import TextInput from "./TextInput";
import MyButton from "./MyButton";
import ToastMessage from "./Toast";
import {clearErrors, clearMessage, sumotrustLogin} from "../redux/actions/user-action";
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


const PaySumo = ({toggleModal, theme}) => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const {error, message, loading} = user

    const {
        handleChange, handleSubmit, handleBlur,
        values,
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
        <View style={styles.centeredBox}>
            <View style={[{
                backgroundColor: theme === 'Dark' ? DarkColors.primaryDark :
                    "#eee",
            }
                , styles.modalView]}>

                <Pressable
                    style={[{
                        backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkThree :
                            "#ddd",
                    }
                        ,
                        styles.buttonClose]}
                    onPress={() => toggleModal()}
                >
                    <FontAwesome name='close' size={20}
                                 color={theme === 'Dark'
                                     ? DayColors.primaryColor : Colors.PrimaryDarkColor}/>

                </Pressable>
                <View style={styles.modalContent}>

                    <View style={{paddingHorizontal: 32, marginBottom: 1, width: '100%',}}>
                        <TextInput
                            icon='phone'
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


                    <MyButton action={() => handleSubmit()} title='LOGIN WITH SUMOTRSUT'
                              buttonStyle={styles.loginButton} textStyle={styles.buttonText}/>

                    <View style={{
                        padding: 8, width: '75%', alignItems: 'center'
                    }}>

                        {
                            loading && <ActivityIndicator size="large" color={Colors.Primary}/>
                        }




                    </View>



                    {message &&
                    <ToastMessage message={message} onHide={() => dispatch(clearMessage())} type='message'/>
                    }

                    {error &&  <ToastMessage message={error} onHide={() => dispatch(clearErrors())} type='error'/>}




                </View>
            </View>

        </View>
    );
};



const styles = StyleSheet.create({


    centeredBox: {
        backgroundColor: 'rgba(10,10,10,0.8)',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        width: wp('90%'),
        height: hp('50%'),
        margin: 20,
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalContent: {
        width: '100%',
        height: '85%',
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
        width: '80%',
        backgroundColor: DayColors.strongLemon,
        borderRadius: 10,
    },
    buttonText: {
        fontFamily: 'Gordita-bold',
        fontSize: 14,
        color: "#131313"
    },
})

export default PaySumo;

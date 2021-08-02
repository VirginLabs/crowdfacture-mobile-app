import React from 'react';

import {Text, View, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Colors} from "../../constants/Colors";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import PaySumo from "../PaySumo";
import {useDispatch, useSelector} from "react-redux";
import * as Yup from "yup";
import {useFormik} from "formik";
import {fundUsingSumotrust} from "../../redux/actions/user-action";
import TextInput from "../TextInput";
import MyButton from "../MyButton";



const phoneRegExp = /^[+]?\d*$/
const schema = Yup.object().shape({
    Amount: Yup.string()
        .min(1, 'Please add amount')
        .matches(phoneRegExp, 'Wrong input')
        .required("Amount is Required"),
});


const Sumotrust = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const data = useSelector(state => state.data)

    const {theme} = data
    const {
        loading,userData:
            {
                member: {
                    ID,SumoTrustID
                },
            }
    } = user


    const {
        handleChange, handleSubmit, handleBlur,
        isValid,
        errors,
        touched
    } = useFormik({
        validationSchema: schema,
        initialValues: {Amount: '',
        },
        onSubmit: (values) => {

            const {Amount} = values;
            const details = new FormData()
            details.append('userId', ID)
            details.append('sumoTrustId', SumoTrustID)
            details.append('amount', Amount)

            dispatch(fundUsingSumotrust(details))

        }
    });

    return (
        <View style={styles.sumotrust}>
            <View style={[{
                height:50
            },styles.infoAlert]}>
                <View style={styles.infoHead}>
                    <Text style={[styles.infoHeadText, {
                        color: theme === 'Dark' ?
                            Colors.White : "#131313"
                    }]}>
                        FUND WITH SUMOTRUST
                    </Text>
                </View>





            </View>
            {
                SumoTrustID ? <View style={{
                        alignItems: "center",
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                    }}>
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

                        {
                            isValid ?

                                <MyButton action={() => handleSubmit()} title='LOGIN WITH SUMOTRUST'
                                          buttonStyle={styles.loginButton} textStyle={styles.buttonText}/>
                                :
                                <TouchableOpacity activeOpacity={1} style={{
                                    backgroundColor: '#ddd',
                                    height: 50,
                                    marginHorizontal: 20,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginVertical: 5,
                                    width: '70%',
                                    borderRadius: 10,
                                }}>
                                    <Text style={{
                                        fontSize: 12,
                                        fontFamily: 'Gordita-bold'
                                    }}>
                                        LOGIN WITH SUMOTRUST
                                    </Text>

                                </TouchableOpacity>
                        }

                    </View> :

                <PaySumo/>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    sumotrust:{


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
        fontFamily: 'Gordita-Black',
    },
    infoHeadBody: {
        fontFamily: 'Gordita-medium',
    },
    buttonText: {
        fontFamily: 'Gordita-bold',
        fontSize: 12,
        color: "#EEE"
    },
    loginButton: {
        height: 50,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        width: '70%',
        backgroundColor: '#4058f6',
        borderRadius: 10,
    },
    errorText: {
        fontSize: 10,
        alignItems: "flex-start", width: '75%',
        color: '#FF5A5F', padding: 2
    }

})

export default Sumotrust;

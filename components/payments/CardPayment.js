import React from 'react';

import {Text, View, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import {Colors, DayColors} from "../../constants/Colors";
import * as Yup from "yup";
import {useFormik} from "formik";
import TextInput from "../TextInput";
import MyButton from "../MyButton";


const phoneRegExp = /^[+]?\d*$/
const schema = Yup.object().shape({
    amount: Yup.string()
        .min(2, "Amount is Too short")
        .max(50, "Amount is Too long")
        .matches(phoneRegExp, 'Wrong input')
        .required("Amount is Required"),
});


const FlutterWave = ({theme}) => {

    const {
        handleChange, handleSubmit, handleBlur,
        values,
        errors,
        touched
    } = useFormik({
        validationSchema: schema,
        initialValues: {Amount: '',
        },
        onSubmit: (values) => {
            const {BVN} = values;
            alert(`Amount: ${values.Amount}`)
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
                     FUND WITH CARD
                    </Text>
                </View>
            </View>

            <View style={{paddingHorizontal: 32, marginTop: 15, width: wp('100%'),}}>
                <TextInput
                    color={theme === 'Dark' ? '#eee' : '#131313'}
                    icon='money'
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

            <MyButton action={() => handleSubmit()} title='SUBMIT'
                      buttonStyle={styles.submitBtn} textStyle={styles.buttonText}/>
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

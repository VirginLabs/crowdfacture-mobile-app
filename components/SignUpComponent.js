import React from 'react';

import {StatusBar, StyleSheet, Text, View} from 'react-native';
import TextInput from "./TextInput";
import MyButton from "./MyButton";
import {Colors} from "../constants/Colors";

const SignUp = ({handleSubmit,errors,handleChange,handleBlur,touched,toggleForm}) => {
    return (

        <>
            <View style={{paddingHorizontal: 32, marginBottom: 1, width: '100%',}}>
                <TextInput
                    keyboardType='default'
                    icon='user'
                    placeholder='Enter your first Name'
                    autoCapitalize='none'
                    keyboardAppearance='dark'
                    returnKeyType='next'
                    returnKeyLabel='next'
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    error={errors.firstName}
                    touched={touched.firstName}
                />
            </View>
            <Text style={styles.errorText} numberOfLines={1}>
                {errors.firstName}
            </Text>

            <View style={{paddingHorizontal: 32, marginBottom: 1, width: '100%',}}>
                <TextInput
                    keyboardType='default'
                    icon='user'
                    placeholder='Enter your last Name'
                    autoCapitalize='none'
                    keyboardAppearance='dark'
                    returnKeyType='next'
                    returnKeyLabel='next'
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                    error={errors.lastName}
                    touched={touched.lastName}
                />
            </View>
            <Text style={styles.errorText} numberOfLines={1}>
                {errors.lastName}
            </Text>
            <View style={{paddingHorizontal: 32, marginBottom: 1, width: '100%',}}>
                <TextInput
                    keyboardType='phone-pad'
                    icon='phone'
                    placeholder='your Phone number'
                    autoCapitalize='none'
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
            <View style={{paddingHorizontal: 32, marginBottom: 1, width: '100%',}}>
                <TextInput
                    icon='mail'
                    placeholder='Enter your email'
                    autoCapitalize='none'
                    autoCompleteType='email'
                    keyboardType='email-address'
                    keyboardAppearance='dark'
                    returnKeyType='next'
                    returnKeyLabel='next'
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    error={errors.email}
                    touched={touched.email}
                />
            </View>
            <Text style={styles.errorText} numberOfLines={1}>
                {errors.email}
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

            <View style={{paddingHorizontal: 32, marginBottom: 16, width: '100%',}}>
                <TextInput
                    keyboardType='default'
                    icon='add-user'
                    placeholder='Referral Code'
                    autoCapitalize='none'
                    keyboardAppearance='dark'
                    returnKeyType='next'
                    returnKeyLabel='next'
                    onChangeText={handleChange('referral')}
                />
            </View>

            <MyButton action={() => handleSubmit()} title='SIGN UP'
                      buttonStyle={styles.loginButton} textStyle={styles.buttonText}/>

            <View  style={{
                padding:8, width:'75%', alignItems:'center'
            }}>
                <Text onPress={toggleForm} style={{color:'#fff', fontFamily:'Gordita-medium'}}>
                   Login to your account
                </Text>
            </View>
        </>
    );
};


const styles = StyleSheet.create({

    loginButton: {
        height: 50,

        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        width: '80%',
        backgroundColor: Colors.Primary,
        borderRadius: 10,
    },
    buttonText: {
        fontFamily: 'Gordita-bold',
        fontSize: 18
    },
    errorText: {fontSize: 14, alignItems: "flex-start", width: '75%', color: '#FF5A5F', padding: 8}

})
export default SignUp;

import React from 'react';

import {StatusBar, StyleSheet, Text, View} from 'react-native';
import TextInput from "./TextInput";
import MyButton from "./MyButton";
import {Colors} from "../constants/Colors";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";

const SignIn = ({handleSubmit,errors,handleChange,handleBlur,touched,toggleForm}) => {
    return (

        <View style={{
            flex:1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection:'column',
            backgroundColor: Colors.PrimaryDarkColor,
            width:'100%',
            height:hp('100%'),
        }}>




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




            <MyButton action={() => handleSubmit()} title='SIGN UP'
                      buttonStyle={styles.loginButton} textStyle={styles.buttonText}/>

                      <View  style={{
                          padding:8, width:'75%', alignItems:'center'
                      }}>
                          <Text onPress={toggleForm} style={{color:'#fff', fontFamily:'Gordita-medium'}}>
                              Create new account
                          </Text>
                      </View>

        </View>
    );
};


const styles = StyleSheet.create({

    loginButton: {
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
        fontSize: 18
    },
    errorText: {fontSize: 14, alignItems: "flex-start", width: '75%', color: '#FF5A5F', padding: 8}

})
export default SignIn;

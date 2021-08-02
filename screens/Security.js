import React, {useCallback, useRef, useState} from 'react';

import {Animated, Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, DarkColors, DayColors} from "../constants/Colors";
import BackButton from "../components/BackBtn";
import {Ionicons} from "@expo/vector-icons";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import SetPin from "../components/Forms/SetPin";
import UpdatePassword from "../components/payments/PasswordUpdate";

import {clearErrors, clearMessage, updatePassword} from "../redux/actions/user-action";


import {connect, useDispatch, useSelector} from "react-redux";
import ToastMessage from "../components/Toast";
import {Easing, useSharedValue, withSpring, withTiming} from "react-native-reanimated";
import ModalSheet from "../components/ModalSheet";


let content;
const height = Dimensions.get('window').height

const SecurityScreen = (props) => {
    const user = useSelector(state => state.user)
    const data = useSelector(state => state.data)
    const dispatch = useDispatch()


    const sheetHeight = useSharedValue(height)
    const opacity = useSharedValue(0)
    const zIndex = useSharedValue(0)
    const offset = useSharedValue(600);


    const openSheet = useCallback(() => {
        opacity.value = withSpring(1)
        zIndex.value = 100
        sheetHeight.value = withSpring(height / 2.3)
        offset.value = withTiming(0, {
            duration: 400,
            easing: Easing.out(Easing.exp),
        })


    }, []);

    const {navigation} = props
    const {theme} = data;


    const {loading, message, error, otpMessage, userData: {member: {ID}}} = user

    //which content is shown in the bottom sheet
    const [contentKey, setContentKey] = useState('');

    if (contentKey === '1') {
        content = <SetPin/>

    }
    if (contentKey === '2') {
        content = <UpdatePassword userId={ID} loading={loading} updatePassword={updatePassword} theme={theme}/>
    }


    const handleOpen = (id) => {
        setContentKey(id)
        openSheet()

    }


    return (
        <>
            <ModalSheet zIndex={zIndex} offset={offset} opacity={opacity}>
                <View style={{
                    height: '100%',
                    borderRadius: 20,
                    width: '100%',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',

                }}>

                    {content}
                </View>
            </ModalSheet>

                <Animated.View style={[styles.container, {
            backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkThree
                : "#f5f5f5"
        }]}>
            <View style={styles.top}>
                <BackButton theme={theme} navigation={navigation}/>
            </View>
            <Text style={[
                {
                    color: theme === 'Dark' ? Colors.White : '#333',
                },
                styles.title]}>
                SECURITY
            </Text>

            <View style={styles.securityWrap}>
                <View style={styles.iconWrap}>
                    <Ionicons name='shield' size={60} color={DayColors.primaryColor}/>
                </View>

                {
                    SecButtons.map((({id, title, message, icon}) => (
                        <TouchableOpacity key={id} style={[
                            {
                                backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkTwo : '#eee'
                            },
                            styles.securityButton]} activeOpacity={0.6}
                                          onPress={() => handleOpen(id)}>
                            <Ionicons name={icon} size={18} color={theme === 'Dark' ?
                                DayColors.cream
                                : DayColors.dimGreen
                            }/>

                            <View style={{

                                width: '60%',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'flex-start'
                            }}>
                                <Text style={{
                                    fontSize: 12,
                                    color: theme === 'Dark' ? '#eee' : '#131313',
                                    fontFamily: 'Gordita-bold'
                                }}>
                                    {title}
                                </Text>
                                <Text style={{
                                    marginTop:4,
                                    color: theme === 'Dark' ? '#aeaeae' : '#333333',
                                    fontSize: 9,
                                    fontFamily: 'Gordita'
                                }}>
                                    {message}
                                </Text>
                            </View>
                        </TouchableOpacity>

                    )))
                }

            </View>




            {message &&
            <ToastMessage onHide={() => dispatch(clearMessage())} message={message} type='message'/>
            }
            {
                otpMessage &&
                <ToastMessage onHide={() => dispatch(clearMessage())} message={otpMessage} type='message'/>
            }

            {error && <ToastMessage onHide={() => dispatch(clearErrors())} message={error} type='error'/>}

        </Animated.View>
            </>
    );
};


const SecButtons = [
    {
        id: '1',
        title: 'Withdrawal pin',
        message: 'Secure your funds, Update your pin',
        icon: 'key'
    },
    {
        id: '2',
        title: 'Update password',
        message: 'Update your private password anytime',
        icon: 'ios-lock-closed'
    }
]

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1, alignItems: 'center', justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    top: {
        width: '100%',
    },
    title: {
        fontFamily: 'Gordita-Black',
        fontSize: 12,
    },
    wrap: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    iconWrap: {
        marginVertical: 16,
        width: 130,
        height: 130,
        backgroundColor: 'rgba(34,34,34,0.9)',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    securityWrap: {
        alignItems: 'center',
    },
    securityButton: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: wp('80%'),
        height: 70,
        borderRadius: 25
    }


});


export default SecurityScreen;

import React, {useContext, useRef, useState} from 'react';

import {Animated, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ThemeContext} from "../util/ThemeManager";
import {Colors, DarkColors, DayColors} from "../constants/Colors";
import BackButton from "../components/BackBtn";
import {Ionicons} from "@expo/vector-icons";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import SetPin from "../components/Forms/SetPin";
import UpdatePassword from "../components/payments/PasswordUpdate";
import {toggleModal, toggleSecurity} from "../redux/actions/data-action";
import {clearErrors, clearMessage, sendOtp, updatePassword, updateWithdrawalPin} from "../redux/actions/user-action";
import BottomSheet from "react-native-simple-bottom-sheet";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import ToastMessage from "../components/Toast";


let content;

const SecurityScreen = (props) => {

    const {navigation} = props
    const {theme} = useContext(ThemeContext);
    const sheetRef = useRef(null);
    const {clearMessage,updatePassword,clearErrors,updateWithdrawalPin,sendOtp} = props
    const {loading,message,error,otpMessage,userData:{member: {ID}}} = props.user

    //which content is shown in the bottom sheet
    const [contentKey, setContentKey] = useState('');

    if (contentKey === '1') {
        content = <SetPin userId={ID} updateWithdrawalPin={updateWithdrawalPin} loading={loading} theme={theme}/>

    }
    if (contentKey === '2') {
        content = <UpdatePassword userId={ID} loading={loading}  updatePassword={updatePassword} theme={theme}/>
    }


    const handleOpen = (id) => {
        setContentKey(id)
        sheetRef.current.togglePanel()

    }





    return (
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
                            <Ionicons name={icon} size={22} color={theme === 'Dark' ?
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
                                    fontSize: 16,
                                    color: theme === 'Dark' ? '#eee' : '#131313',
                                    fontFamily: 'Gordita-bold'
                                }}>
                                    {title}
                                </Text>
                                <Text style={{
                                    color: theme === 'Dark' ? '#ddd' : '#333',
                                    fontSize: 10,
                                    fontFamily: 'Gordita-medium'
                                }}>
                                    {message}
                                </Text>
                            </View>
                        </TouchableOpacity>

                    )))
                }

            </View>

            <BottomSheet wrapperStyle={{
                width: wp('100%'),
                backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkTwo : '#fff',
            }}
                         sliderMinHeight={0}

                         ref={ref => sheetRef.current = ref}>

                {content}

            </BottomSheet>



            {message &&
            <ToastMessage onHide={() => clearMessage()} message={message} type='message'/>
            }
            {
                otpMessage &&
                <ToastMessage onHide={() => clearMessage()} message={otpMessage} type='message'/>
            }

            {error &&  <ToastMessage onHide={() => clearErrors()} message={error} type='error'/>}

        </Animated.View>
    );
};


const SecButtons = [
    {
        id: '1',
        title: 'Withdrawal pin',
        message: 'Secure your funds anytime',
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
        fontSize: 16,
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

SecurityScreen.propTypes = {
    data: PropTypes.object.isRequired,
    updatePassword: PropTypes.func.isRequired,
    updateWithdrawalPin: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    clearMessage: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired,
    sendOtp: PropTypes.func.isRequired,
};


const mapActionToPops = {
    toggleSecurity,
    updatePassword,
    clearErrors,
    clearMessage,
    updateWithdrawalPin,
    toggleModal,
    sendOtp
}


const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user,
})

export default connect(mapStateToProps, mapActionToPops) (SecurityScreen);

import React, {useContext, useRef, useCallback, useState} from 'react';
import {Animated, Button, View, StyleSheet, FlatList, Text, TouchableOpacity, StatusBar, Keyboard} from 'react-native';
import {Colors, DarkColors, DayColors} from "../constants/Colors";
import {ThemeContext} from "../util/ThemeManager";
import {FontAwesome, FontAwesome5} from "@expo/vector-icons";

import BackButton from "../components/BackBtn";
import MyBottomSheet from "../components/BottomSheet";


import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import BankAccount from "../components/payments/BankAccount";
import Sumotrust from "../components/payments/Sumotrust";
import FlutterWave from "../components/payments/CardPayment";


const Item = ({name, iconName, moreInfo, id, theme, action}) => (
    <TouchableOpacity activeOpacity={0.7} style={[
        {
            backgroundColor: theme === 'Dark'
                ? DarkColors.primaryDarkTwo : Colors.White
        },
        styles.paymentList]} onPress={action}>
        <View style={[
            {
                backgroundColor: theme === 'Dark'
                    ? DarkColors.primaryDarkThree : DayColors.cream,
            },
            styles.icon]}>
            <FontAwesome5 name={iconName} size={20} color={theme === 'Dark'
                ? DayColors.primaryColor : Colors.PrimaryDarkColor}/>
        </View>
        <View style={
            styles.body}>
            <Text style={[
                {
                    color: theme === 'Dark'
                        ? '#fff' : '#111'
                },
                styles.cardTitle]}>
                {name}
            </Text>
            <Text style={[


                {
                    color: theme === 'Dark'
                        ? '#ccc' : '#333'
                },
                styles.moreInfo]}>
                {
                    moreInfo
                }

            </Text>
        </View>
    </TouchableOpacity>
)







let content;

const AddCashScreen = ({navigation}) => {

    const {theme, transitionValue} = useContext(ThemeContext);
    const animation = useRef(new Animated.Value(0)).current

    //which content is shown in the bottom sheet
    const [contentId, setContentId] = useState('');


    if (contentId === '1') {
        content = <BankAccount theme={theme}/>
    }
    if (contentId === '2') {
        content = <Sumotrust user='JOSEPH ASI' theme={theme}/>
    }
    if (contentId === '3') {
        content = <FlutterWave theme={theme}/>
    }



    const handleOpen = (id) => {
        setContentId(id)
        Animated.timing(animation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start();

    }


    const handleClose = () => {
        Keyboard.dismiss()
        Animated.timing(animation, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
        }).start()
    }


    const PaymentList = ({item}) => (
        <Item name={item.name} theme={theme} id={item.id} action={() => handleOpen(item.id)} sheetName={item.sheetName}
              iconName={item.iconName}
              moreInfo={item.moreInfo}/>
    )

    return (

        <Animated.View style={[styles.container, {
                backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkThree
                    : "#f5f5f5"
            }]}>
            <View style={styles.top}>
                <BackButton theme={theme} navigation={navigation}/>
            </View>


            <FlatList
                contentContainerStyle={styles.wrap}
                data={PaymentChannels} renderItem={PaymentList} keyExtractor={item => item.id}/>


            <MyBottomSheet theme={theme} animation={animation} handleClose={handleClose}>

                {content}

            </MyBottomSheet>

        </Animated.View>
    );
};

const PaymentChannels = [
    {
        id: '1',
        name: 'ACCOUNT NUMBER',
        iconName: 'key',
        moreInfo: 'Pay using your unique account number',
        sheetName: 'ACCOUNT'

    },
    {
        id: '2',
        name: 'SUMOTRUST',
        iconName: 'piggy-bank',
        moreInfo: 'Pay from your Sumotrust kick account',
        sheetName: 'SUMOTRUST'

    },
    {
        id: '3',
        name: 'DEBIT CARD',
        iconName: 'credit-card',
        moreInfo: 'Secure payment using your debit card',
        sheetName: 'CARD'

    },
   /* {
        id: '4',
        name: 'PAYPAL',
        iconName: 'paypal',
        moreInfo: 'Payment made easy with secured PayPal integration',
        sheetName: 'PAYPAL'

    },*/


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
    wrap: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    paymentList: {

        marginVertical: 5,
        borderRadius: 20,
        height: 120,
        width: wp('90%'),
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    },
    icon: {
        width: 60,
        height: 60,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'

    },
    cardTitle: {
        fontFamily: 'Gordita-Black'
    },
    moreInfo: {
        fontFamily: 'Gordita-medium',
        lineHeight: 20,
        fontSize: 14,
    },
    body: {
        width: '60%'
    },



})

export default AddCashScreen;

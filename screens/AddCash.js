import React, {useCallback, useState} from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Text, Dimensions, Image,
} from 'react-native';
import {Colors, DarkColors, DayColors} from "../constants/Colors";
import { FontAwesome5} from "@expo/vector-icons";

import BackButton from "../components/BackBtn";
import { widthPercentageToDP as wp} from "react-native-responsive-screen";
import BankAccount from "../components/payments/BankAccount";
import Sumotrust from "../components/payments/Sumotrust";
import FlutterWave from "../components/payments/CardPayment";

import { useSelector} from "react-redux";

import Animated, {Easing, useSharedValue, withSpring, withTiming} from "react-native-reanimated";
import {TapGestureHandler} from "react-native-gesture-handler";
import ModalSheet from "../components/ModalSheet";
import {SafeAreaView} from "react-native-safe-area-context";



const Item = ({name, iconName, sheetName, moreInfo, theme, action}) => (
    <TapGestureHandler onActivated={sheetName === 'CFR' ? '' : action}>
    <Animated.View activeOpacity={0.7} style={[
        {
            backgroundColor: theme === 'Dark'
                ? DarkColors.primaryDarkTwo : Colors.White
        },
        styles.paymentList]}>
        <View style={[
            name === 'ACCOUNT NUMBER' && {

                backgroundColor: theme === 'Dark'
                    ? DarkColors.primaryDarkFour : DayColors.green,
            },

            name === 'USE SUMOTRUST' && {
                backgroundColor:'#EEE'
            },
            name === 'USE DEBIT CARD' && {
                backgroundColor: theme === 'Dark'
                    ? DarkColors.primaryDarkThree : DayColors.lemon,
            },
            styles.icon]}>
            {name === 'USE SUMOTRUST' ?

<Image    style={{width: 50, height: 50}}    resizeMode={'contain'}
          source={require('../assets/sumotrust-logo.png')}/>

                :
                <FontAwesome5 name={iconName} size={18} color={theme === 'Dark'
                    ? DayColors.primaryColor : Colors.PrimaryDarkColor}/>
            }
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
    </Animated.View>
    </TapGestureHandler>
)



const height = Dimensions.get('window').height
let content;

const AddCashScreen = (props) => {

    const user = useSelector(state => state.user)
    const data = useSelector(state => state.data)
    const {navigation} = props


    const sheetHeight = useSharedValue(500)
    const opacity = useSharedValue(0)
    const zIndex = useSharedValue(0)
    const offset = useSharedValue(600);

    const {
        loading, userData:
            {
                member: {EmailAddress,
                     Phone,
                    LastName,

                },

            }
    } = user


const {theme} = data
    //which content is shown in the bottom sheet
    const [contentId, setContentId] = useState('');


    if (contentId === '1') {
        content = <BankAccount navigation={navigation} loading={loading}/>
    }
    if (contentId === '2') {
        content = <Sumotrust/>
    }
    if (contentId === '3') {
        content = <FlutterWave
            userEmail={EmailAddress}
            phonenumber={Phone}
            customerName={LastName}
         theme={theme} />
    }



    const openSheet = useCallback(() => {
        opacity.value = withSpring(1)
        zIndex.value = 100
        sheetHeight.value = withSpring(height / 2.3)
        offset.value = withTiming(0, {
            duration: 400,
            easing: Easing.out(Easing.exp),
        })


    }, []);

    const handleOpen = (id) => {
        setContentId(id)
        openSheet()

    }

    const PaymentList = ({item}) => (
        <Item name={item.name} theme={theme} id={item.id} action={() => handleOpen(item.id)} sheetName={item.sheetName}
              iconName={item.iconName}
              moreInfo={item.moreInfo}/>
    )

    return (
        <SafeAreaView style={{flex:1}}>
            <ModalSheet height={400} zIndex={zIndex} offset={offset} opacity={opacity}>
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



            <View style={[styles.container, {
            backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkThree
                : "#f5f5f5"
        }]}>
            <View style={styles.top}>
                <BackButton theme={theme} navigation={navigation}/>
            </View>


            <FlatList
                contentContainerStyle={styles.wrap}
                data={PaymentChannels} renderItem={PaymentList} keyExtractor={item => item.id}/>




        </View>
            </SafeAreaView>
    );
};

const PaymentChannels = [
    {
        id: '1',
        name: 'ACCOUNT NUMBER',
        iconName: 'key',
        moreInfo: 'Deposit using your Crowdfacture virtual account number',
        sheetName: 'ACCOUNT',
        disable:false

    },
    {
        id: '2',
        name: 'USE SUMOTRUST',
        iconName: 'piggy-bank',
        moreInfo: 'Deposit from your Sumotrust kick account',
        sheetName: 'SUMOTRUST',
        disable:false

    },
    {
        id: '3',
        name: 'USE DEBIT CARD',
        iconName: 'credit-card',
        moreInfo: 'Secure deposit using your debit card',
        sheetName: 'CARD',
        disable:false

    },
 {
        id: '4',
        name: 'DEPOSIT CFR',
        iconName: 'coins',
        moreInfo: 'Deposit Crowdfacture token',
        sheetName: 'CFR',
        disable:true

    },


]

const styles = StyleSheet.create({
    container: {
       
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1, alignItems: 'center', justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    top: {
        marginTop:10,
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
        width: 50,
        height: 50,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'

    },
    cardTitle: {
        fontSize: 12,
        fontFamily: 'Gordita-Black'
    },
    moreInfo: {
        fontFamily: 'Gordita-medium',
        lineHeight: 15,
        fontSize: 10,
    },
    body: {
        width: '60%'
    },


})



export default AddCashScreen;

import React, {useContext, useRef, useCallback, useState} from 'react';
import {
    Animated,
    Button,
    View,
    StyleSheet,
    FlatList,
    Text,
    TouchableOpacity,
    StatusBar,
    Keyboard,
    ScrollView
} from 'react-native';
import {Colors, DarkColors, DayColors} from "../constants/Colors";
import {ThemeContext} from "../util/ThemeManager";
import {FontAwesome, FontAwesome5} from "@expo/vector-icons";

import BackButton from "../components/BackBtn";
import MyBottomSheet from "../components/BottomSheet";


import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import BankAccount from "../components/payments/BankAccount";
import Sumotrust from "../components/payments/Sumotrust";
import FlutterWave from "../components/payments/CardPayment";
import BottomSheet from "react-native-simple-bottom-sheet";


const Item = ({name, iconName, moreInfo, theme, action}) => (
    <TouchableOpacity activeOpacity={0.7} style={[
        {
            backgroundColor: theme === 'Dark'
                ? DarkColors.primaryDarkTwo : Colors.White
        },
        styles.paymentList]} onPress={action}>
        <View style={[
            name === 'ACCOUNT NUMBER' && {

                backgroundColor: theme === 'Dark'
                    ? DarkColors.primaryDarkFour : DayColors.green,
            },

            name === 'USE SUMOTRUST' && {
                backgroundColor: theme === 'Dark'
                    ? DayColors.strongLemon : DayColors.cream,
            },
            name === 'USE DEBIT CARD' && {
                backgroundColor: theme === 'Dark'
                    ? DarkColors.primaryDarkThree : DayColors.lemon,
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

    const {theme} = useContext(ThemeContext);
    const animation = useRef(new Animated.Value(0)).current
    const [panelOpen, setPanelOpen] = useState(false);
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
    const sheetRef = useRef(null);

    const handleOpen = (id) => {
        setContentId(id)
        sheetRef.current.togglePanel()

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

            <BottomSheet wrapperStyle={{
                width: wp('100%'),
                backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkTwo : '#fff',
            }}
                         sliderMinHeight={0}

                         ref={ref => sheetRef.current = ref}>
<Text style={{
    width:'100%',
    textAlign:'center',
    fontSize:11,
    fontFamily:'Gordita-medium',
    color: theme === 'Dark' ? '#eee' : '#333'
}}>
    Tap head to close
</Text>
                {content}

            </BottomSheet>

        </View>
    );
};

const PaymentChannels = [
    {
        id: '1',
        name: 'ACCOUNT NUMBER',
        iconName: 'key',
        moreInfo: 'Deposit using your Crowdfacture virtual account number',
        sheetName: 'ACCOUNT'

    },
    {
        id: '2',
        name: 'USE SUMOTRUST',
        iconName: 'piggy-bank',
        moreInfo: 'Deposit from your Sumotrust kick account',
        sheetName: 'SUMOTRUST'

    },
    {
        id: '3',
        name: 'USE DEBIT CARD',
        iconName: 'credit-card',
        moreInfo: 'Secure deposit using your debit card',
        sheetName: 'CARD'

    },



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

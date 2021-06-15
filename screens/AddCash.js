import React, {useContext, useRef, useState} from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import {Colors, DarkColors, DayColors} from "../constants/Colors";
import {ThemeContext} from "../util/ThemeManager";
import { FontAwesome5} from "@expo/vector-icons";

import BackButton from "../components/BackBtn";


import { widthPercentageToDP as wp} from "react-native-responsive-screen";
import BankAccount from "../components/payments/BankAccount";
import Sumotrust from "../components/payments/Sumotrust";
import FlutterWave from "../components/payments/CardPayment";
import BottomSheet from "react-native-simple-bottom-sheet";
import PropTypes from "prop-types";
import {
    clearErrors,
    clearMessage,
    fundUsingSumotrust,
    getUniqueAccountNumb,
    getUser
} from "../redux/actions/user-action";
import {connect} from "react-redux";
import ToastMessage from "../components/Toast";


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

const AddCashScreen = (props) => {


    const {navigation, getUniqueAccountNumb, clearErrors, clearMessage, fundUsingSumotrust} = props


    const {
        loading, message, error, userData:
            {
                member: {EmailAddress,
                    ID, Phone, MonnifyAccountNumber,
                    MonnifyBankName,
                    BVNVerified,
                    LastName,
                    SumoTrustID
                },
                bankDetails
            }
    } = props.user


    const {theme} = useContext(ThemeContext);
    //which content is shown in the bottom sheet
    const [contentId, setContentId] = useState('');


    if (contentId === '1') {
        content = <BankAccount loading={loading} getUniqueAccountNumb={getUniqueAccountNumb} userDetails={{
            bankDetails,
            MonnifyAccountNumber,
            MonnifyBankName,
            BVNVerified
        }} ID={ID} Phone={Phone} theme={theme}/>
    }
    if (contentId === '2') {
        content = <Sumotrust SumoTrustID={SumoTrustID} user='JOSEPH ASI' theme={theme}/>
    }
    if (contentId === '3') {
        content = <FlutterWave
            userEmail={EmailAddress}
            phonenumber={Phone}
            customerName={LastName}
         theme={theme} />
    }
    const sheetRef = useRef(null);

    const handleOpen = (id) => {
        setContentId(id)
        sheetRef.current.togglePanel()

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
                    width: '100%',
                    textAlign: 'center',
                    fontSize: 11,
                    fontFamily: 'Gordita-medium',
                    color: theme === 'Dark' ? '#eee' : '#333'
                }}>
                    Tap head to close
                </Text>
                {content}

            </BottomSheet>

            {message &&
            <ToastMessage onHide={() => clearMessage()} message={message} type='message'/>
            }

            {error &&  <ToastMessage onHide={() => clearErrors()} message={error} type='error'/>}


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
        lineHeight: 18,
        fontSize: 12,
    },
    body: {
        width: '60%'
    },


})

AddCashScreen.propTypes = {
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    getUniqueAccountNumb: PropTypes.func.isRequired,
    fundUsingSumotrust: PropTypes.func.isRequired,
};


const mapActionToPops = {
    getUser,
    getUniqueAccountNumb,
    fundUsingSumotrust,
    clearErrors,
    clearMessage,


}


const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user,
})

export default connect(mapStateToProps, mapActionToPops)(AddCashScreen);

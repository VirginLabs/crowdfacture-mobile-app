import React, {useCallback, useContext, useState} from 'react';
import {FontAwesome} from "@expo/vector-icons";
import {
    Dimensions,
    FlatList,
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {Colors, DarkColors, DayColors} from "../constants/Colors";
import BackButton from "../components/BackBtn";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";

import {addBank, clearErrors, clearMessage} from "../redux/actions/user-action";
import {connect, useSelector} from "react-redux";
import PropTypes from 'prop-types';
import ToastMessage from "../components/Toast";
import ModalSheet from "../components/ModalSheet";
import Animated, {Easing, useSharedValue, withSpring, withTiming} from "react-native-reanimated";
import {TapGestureHandler} from "react-native-gesture-handler";
import AddBankForm from "../components/AddBankForm";
import {SafeAreaView} from "react-native-safe-area-context";


const AccountList = ({bankName, bankAccount, theme}) => (
    <View style={[
        {
            backgroundColor: theme === 'Dark'
                ? DarkColors.primaryDarkTwo : Colors.White
        },
        styles.accountList]}>

        <View>
            <Text style={[

                {
                    color: theme === 'Dark'
                        ? '#FFFFFF' : "#333"
                },
                styles.bankAccount]}>
                <FontAwesome name='key' size={10}/> {bankAccount}
            </Text>
        </View>
        <View>
            <Text style={[
                {
                    color: theme === 'Dark'
                        ? DayColors.strongLemon : Colors.PrimaryDarkColor
                },
                styles.bankName]}>
                <FontAwesome name='circle' size={8}/> {bankName}
            </Text>
        </View>

    </View>
)

const height = Dimensions.get('window').height
const AddBank = (props) => {
    const user = useSelector(state => state.user)
    const data = useSelector(state => state.data)

    const {navigation,addBank,clearErrors,
        clearMessage } = props

    const sheetHeight = useSharedValue(height)
    const opacity = useSharedValue(0)
    const zIndex = useSharedValue(0)
    const offset = useSharedValue(600);
    const {loading,
        error, message, userData: {
             bankDetails,
        }
    } = user

    const {theme} = data;



    const BankDetail = ({item}) => (
        <AccountList theme={theme} bankName={item.BankName} bankAccount={item.AccountNumber}/>
    )
    const openSheet = useCallback(() => {
        opacity.value = withSpring(1)
        zIndex.value = 100
        sheetHeight.value = withSpring(height / 2.3)
        offset.value = withTiming(0, {
            duration: 400,
            easing: Easing.out(Easing.exp),
        })


    }, []);



    return (
        <SafeAreaView style={{
            flex:1
        }}>
        
            <ModalSheet zIndex={zIndex} offset={offset} opacity={opacity}>
                <View style={{
                    height: '100%',
                    borderRadius: 20,
                    width: '100%',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',

                }}>


                    <AddBankForm/>

                </View>
            </ModalSheet>


            <View style={[styles.container, {
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
                YOUR LOCAL BANK DETAIL
            </Text>




            {
                Object.keys(bankDetails).length > 0 &&

                <FlatList contentContainerStyle={styles.wrap}
                          data={bankDetails} renderItem={BankDetail} keyExtractor={item => item.ID}/>
            }


                {
                    Object.keys(bankDetails).length < 3 &&
                    <TapGestureHandler onActivated={openSheet}>
                        <Animated.View style={{
                            width: '100%',
                            height: 100,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 90,
                            borderRadius:10,
                        }}>
                    <Text style={{
                        backgroundColor:DayColors.cream,
                        padding:10,
                    
                        fontSize:12,
                        fontFamily: 'Gordita-bold',
                        color: "#131313"
                    }}>
                       ADD BANK DETAILS
                    </Text>
                        </Animated.View>
                    </TapGestureHandler>
                }






            {message &&
            <ToastMessage onHide={() => clearMessage()} message={message} type='message'/>
            }

            {error &&
            <ToastMessage onHide={() => clearErrors()} message={error} type='error'/>}



        </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1, alignItems: 'center', justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    top: {
        marginTop: 10,
        width: '100%',
    },
    title: {
        fontFamily: 'Gordita-Black',
        fontSize: 12,
    },
    wrap: {
        padding: 10,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    textStyle: {
        color: '#fff',
        fontFamily: 'Gordita-bold',
        fontSize: 12,
    },
    btnStyle: {
        marginVertical: 10,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '30%',
        flexDirection: 'row',
        borderRadius: 15,
        height: 50,
        backgroundColor: DarkColors.primaryDarkTwo
    },
    accountList: {
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: DayColors.cream,
        marginVertical: 5,
        borderRadius: 20,
        padding: 15,
        height: 70,
        width: wp('85%'),
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        flexDirection: 'column'
    },
    bankAccount: {
        fontFamily: 'Gordita-medium',
        fontSize: 10,
    },
    bankName: {
        fontFamily: 'Gordita-bold',
        fontSize: 12,
    }


})

AddBank.propTypes = {
    data: PropTypes.object.isRequired,
    addBank: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    clearMessage: PropTypes.func.isRequired,

};


const mapActionToPops = {
    addBank,
    clearErrors,
    clearMessage
}


const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user,
})


export default connect(mapStateToProps,mapActionToPops)(AddBank);

import React, {useContext, useEffect, useRef, useState} from 'react';
import {FontAwesome} from "@expo/vector-icons";
import {
    Animated, Easing,
    FlatList,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {Colors, DarkColors, DayColors} from "../constants/Colors";
import BackButton from "../components/BackBtn";
import {ThemeContext} from "../util/ThemeManager";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import AddBankForm from "../components/AddBankForm";
import BottomSheet from "react-native-simple-bottom-sheet";
import {addBank, clearErrors, clearMessage} from "../redux/actions/user-action";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import ToastMessage from "../components/Toast";

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
                <FontAwesome name='key' size={16}/> {bankAccount}
            </Text>
        </View>
        <View>
            <Text style={[
                {
                    color: theme === 'Dark'
                        ? DayColors.strongLemon : Colors.PrimaryDarkColor
                },
                styles.bankName]}>
                <FontAwesome name='circle' size={13}/> {bankName}
            </Text>
        </View>

    </View>
)


const AddBank = (props) => {


    const {navigation,addBank,clearErrors,
        clearMessage } = props


    const {loading,
        error, message, userData: {
            member: { ID, Phone, LastName}, bankDetails,
        }
    } = props.user

    const {theme} = useContext(ThemeContext);
    const [sheetOpen, setSheetOpen] = useState(false);


    const BankDetail = ({item}) => (
        <AccountList theme={theme} bankName={item.BankName} bankAccount={item.AccountNumber}/>
    )


    /*useEffect(() =>{

        return () => {
            setTimeout(() => {
                clearErrors()
            }, 3500)
        }

    },[error])

    useEffect(() =>{
        return () => {
            setTimeout(() => {
                clearMessage()
            }, 3500)
        }

    },[message])*/

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
                YOUR LOCAL BANK DETAIL
            </Text>




            {
                Object.keys(bankDetails).length > 0 &&

                <FlatList contentContainerStyle={styles.wrap}
                          data={bankDetails} renderItem={BankDetail} keyExtractor={item => item.ID}/>
            }
            <View style={{
                width: '100%',
                height: 100,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 90
            }}>

                {
                    Object.keys(bankDetails).length < 3 &&
                    <Text style={{
                        fontFamily: 'Gordita-bold',
                        color: theme === 'Dark' ? DayColors.cream : "#131313"
                    }}>
                        DRAG TO ADD BANK DETAILS
                    </Text>
                }
            </View>

            {message &&
            <ToastMessage onHide={() => clearMessage()} message={message} type='message'/>
            }

            {error &&  <ToastMessage onHide={() => clearErrors()} message={error} type='error'/>}

            <BottomSheet wrapperStyle={{
                flex: 1,
                backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkTwo : '#eee',
            }} isOpen={sheetOpen} sliderMaxHeight={600} sliderMinHeight={50}
                         animation={Easing.ease}
                         onOpen={() => setSheetOpen(true)}
            >
                {(onScrollEndDrag) => (
                    <ScrollView onScrollEndDrag={onScrollEndDrag}>

                        <AddBankForm Phone={Phone} loading={loading} action={addBank} id={ID} theme={theme}/>
                    </ScrollView>
                )}
            </BottomSheet>

        </Animated.View>
    );
};


const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
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
        fontSize: 16,
    },
    wrap: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    textStyle: {
        color: '#fff',
        fontFamily: 'Gordita-bold',
        fontSize: 16,
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
        height: 90,
        width: wp('85%'),
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        flexDirection: 'column'
    },
    bankAccount: {
        fontFamily: 'Gordita-Black',
        fontSize: 16,
    },
    bankName: {
        fontFamily: 'Gordita-bold',
        fontSize: 15,
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

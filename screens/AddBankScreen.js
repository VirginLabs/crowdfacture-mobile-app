import React, {useContext, useRef} from 'react';
import {FontAwesome} from "@expo/vector-icons";
import {Animated, FlatList, Keyboard, Pressable, StatusBar, StyleSheet, Text, View} from 'react-native';
import {Colors, DarkColors, DayColors} from "../constants/Colors";
import BackButton from "../components/BackBtn";
import {ThemeContext} from "../util/ThemeManager";
import MyButton from "../components/MyButton";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import MyBottomSheet from "../components/BottomSheet";
import AddBankForm from "../components/AddBankForm";


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
                     color:  theme === 'Dark'
                         ? '#FFFFFF' : "#333"
                 },
                 styles.bankAccount]}>
                 <FontAwesome name='key' size={16}/>  {bankAccount}
             </Text>
         </View>
         <View>
             <Text style={[
                 {
                     color:  theme === 'Dark'
                         ? DayColors.strongLemon : Colors.PrimaryDarkColor
                 },
                 styles.bankName]}>
                 <FontAwesome name='circle' size={13}/>  {bankName}
             </Text>
         </View>

     </View>
)




const AddBank = ({navigation}) => {


    const {theme} = useContext(ThemeContext);

    const animation = useRef(new Animated.Value(0)).current

    const handleOpen = () => {
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

    const BankDetail = ({item}) => (
        <AccountList theme={theme} bankName={item.BankName} bankAccount={item.AccountNumber}/>
    )

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
                    color:theme === 'Dark' ?  Colors.White : '#333',
                },
                styles.title]}>
                YOUR LOCAL BANK DETAIL
            </Text>

            {
                Object.keys(BankAccounts).length < 3 &&
                <MyButton action={handleOpen}  title='Add' textStyle={styles.textStyle} buttonStyle={styles.btnStyle}>
                    <FontAwesome name='plus' size={20}
                                 color={DayColors.primaryColor}/>
                </MyButton>
            }


       <FlatList contentContainerStyle={styles.wrap}
                 data={BankAccounts} renderItem={BankDetail} keyExtractor={item => item.id}/>


            <MyBottomSheet theme={theme} animation={animation} handleClose={handleClose}>

         <AddBankForm theme={theme}/>

            </MyBottomSheet>
        </Animated.View>
    );
};

const BankAccounts = [
    {
        id:"1",
        BankName:"Access bank",
        AccountNumber: "724222942424"
    },
    {
        id:"2",
        BankName:"Access bank",
        AccountNumber: "724222942424"
    },
   /* {
        id:"3",
        BankName:"Access bank",
        AccountNumber: "724222942424"
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
    title:{
        fontFamily:'Gordita-Black',
        fontSize:16,
    },
    wrap: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    textStyle:{
        color:'#fff',
        fontFamily:'Gordita-bold',
        fontSize:16,
    },
    btnStyle: {
        marginVertical:10,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '30%',
        flexDirection: 'row',
        borderRadius: 15,
        height: 50,
        backgroundColor: DarkColors.primaryDarkTwo
    },
    accountList:{
        borderWidth:1,
        borderStyle:'dashed',
        borderColor:DayColors.cream,
        marginVertical: 5,
        borderRadius: 20,
        padding: 15,
        height: 90,
        width: wp('85%'),
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        flexDirection: 'column'
    },
    bankAccount:{
        fontFamily:'Gordita-Black',
        fontSize:16,
    },
    bankName:{
        fontFamily:'Gordita-bold',
        fontSize:15,
    }


})

export default AddBank;

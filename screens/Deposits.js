import React, {useContext, useEffect} from 'react';

import {Text, View, StyleSheet, StatusBar, ScrollView, ActivityIndicator, FlatList} from 'react-native';
import {Colors, DarkColors, DayColors} from "../constants/Colors";
import BackButton from "../components/BackBtn";
import {ThemeContext} from "../util/ThemeManager";
import {clearErrors, clearMessage} from "../redux/actions/user-action";
import {getDeposits, getInvestments, getWithdrawals} from "../redux/actions/data-action";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {Ionicons} from "@expo/vector-icons";


const DepositItem = ({ TransactionReference,
                         Amount,
                         DateCreated, Source, theme}) =>
    (
        <View style={{
            backgroundColor:theme === 'Dark' ? DarkColors.primaryDarkTwo : '#eee',
            height:130,
            margin:5,
            padding:10,
            borderRadius:20,
            width:'95%',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexDirection: 'row'
        }}>
            <View style={{
                width:50,
                borderRadius:100,
                height:50,
                backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkOne :'#dde',
                alignItems:'center',
                justifyContent:'center'
            }}>
                <Ionicons name='arrow-down-sharp' size={20} color={DayColors.primaryColor} />
            </View>

            <View style={{
                height:'100%',
                width:'50%',
                alignItems:'center',
                justifyContent:'space-evenly',
                alignContent:'center',
                flexDirection:'column'
            }}>
                <Text style={{
                    fontFamily:'Gordita-Black',
                    color: theme === 'Dark' ? '#fff' : '#131313'
                }}>
                    DEPOSITED
                </Text>
                <Text style={{
                    fontFamily:'Gordita-medium',
                    fontSize:10,
                    color: '#555'
                }}>
                    {DateCreated}
                </Text>
                <Text style={{
                    fontFamily:'Gordita-medium',
                    fontSize:9,
                    color: theme === 'Dark' ? '#555' : '#797979'
                }}>
                    {Source}
                </Text>
                <Text style={{
                    fontFamily:'Gordita-medium',
                    color: theme === 'Dark' ? '#ddd' : '#c3c2c2',
                    fontSize:8
                }}>
                    {TransactionReference}
                </Text>
            </View>

            <View style={{
                width:'30%',
                height:'100%',
                alignItems:'center',
                justifyContent:'center',
                flexDirection:'column'
            }}>
                <Text style={{
                    fontFamily:'Gordita-bold',
                    color:DayColors.primaryColor,
                    fontSize:13
                }}>
                    +₦{Amount}
                </Text>

            </View>

        </View>
    )

const Deposits = (props) => {

    const {getWithdrawals, getDeposits, getInvestments,route,navigation} = props

    const {
        loading,
        investments,
        deposits,
        returns
    } = props.data
    const {
        userData: {
            member: {ID, LastName},
        }
    } = props.user

    const {theme} = useContext(ThemeContext);

    useEffect(() => {
        const formdata = new FormData();
        formdata.append("userId", ID);

            getDeposits(formdata)

    }, []);


    const Investment = ({item}) => (
        <DepositItem theme={theme} Source={item.Source} DateCreated={item.DateCreated}
                     Amount={item.Amount} TransactionReference={item.TransactionReference}
        />
    )

    return (
        <View
            style={[styles.container, {
                backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkThree
                    : "#f5f5f5"
            }]}>
            <View style={styles.top}>
                <BackButton theme={theme} navigation={navigation}/>
            </View>

            {
                loading ?     <ActivityIndicator  size="large" color={Colors.Primary}/>:
                    <FlatList data={deposits}
                              contentContainerStyle={{
                                  width:wp('90%'),
                                  alignItems: 'center',
                                  alignContent:'center',
                                  justifyContent: 'flex-start',
                                  flexDirection: 'column'
                              }}
                              renderItem={Investment} keyExtractor={item => item.ID}/>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        paddingLeft: 10,
        width: wp('100%'),
        paddingRight: 10,
        flex: 1, alignItems: 'center', justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    top:{
        width:'100%'
    },
})

Deposits.propTypes = {
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
    clearMessage: PropTypes.func.isRequired,
    getInvestments: PropTypes.func.isRequired,
    getDeposits: PropTypes.func.isRequired,
    getWithdrawals: PropTypes.func.isRequired,

};


const mapActionToPops = {
    getDeposits,
    getInvestments,
    getWithdrawals,
    clearErrors,
    clearMessage
}


const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user,
})



export default connect(mapStateToProps, mapActionToPops) (React.memo(Deposits));

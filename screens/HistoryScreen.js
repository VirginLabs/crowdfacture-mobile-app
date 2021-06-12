import React from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AnimatedScrollView from "../components/AnimatedScrollView";
import {DarkColors, DayColors} from "../constants/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";

const HistoryScreen = ({navigation}) => {

    let today;
    const month = new Date().getMonth().toString()
    const day = new Date().getDay().toString()
    const year = new Date().getFullYear().toString()

    today = day + ' / ' + month + ' / ' + year
    return (
        <AnimatedScrollView navigation={navigation} routeMessage='Here you see all your investment history'
                            routeName='History'>
            <View style={styles.container}>

                <View activeOpacity={0.7} style={[{
                    backgroundColor: DayColors.cream
                }, styles.card]}>

                    <View style={styles.cardTop}>
                        <Text style={{
                            color: '#131313',
                            fontFamily:'Gordita-bold',
                            fontSize:25
                        }}>
                            Investment
                        </Text>
                        <Text  style={{
                            color: '#333',
                            fontFamily:'Gordita-bold',
                            fontSize:13
                        }}>
                            {today}
                        </Text>
                    </View>


                    <View style={styles.description}>
                        <Text style={{
                            fontSize:13,
                            color:'#131313',
                            fontFamily:'Gordita-medium',
                            lineHeight:20
                        }}>
                            Proper documentation of the total projects invested
                        </Text>
                    </View>


<View style={styles.cardBottom}>
    <TouchableOpacity style={[{
        backgroundColor: DarkColors.primaryDarkTwo
    },styles.goBtn]}  activeOpacity={0.8}>
        <Text style={{
            color: '#fff',
            fontFamily:'Gordita-bold',
            fontSize:15
        }}>
            Go
        </Text>
        <Ionicons name='ios-arrow-forward' size={18} color='#fff'/>
    </TouchableOpacity>
</View>
                </View>


                <View style={[
                    {
                        backgroundColor: DarkColors.primaryDarkTwo
                    },
                    styles.card]}>
                    <View style={styles.cardTop}>
                        <Text style={{
                            color: '#fff',
                            fontFamily:'Gordita-bold',
                            fontSize:25
                        }}>
                            Returns
                        </Text>
                        <Text  style={{
                            color: '#eee',
                            fontFamily:'Gordita-bold',
                            fontSize:13
                        }}>
                            {today}
                        </Text>
                    </View>


                    <View style={styles.description}>
                        <Text style={{
                            fontSize:13,
                            color:'#eee',
                            fontFamily:'Gordita-medium',
                            lineHeight:20
                        }}>
                            Always know how much profit you have generated from your investment
                        </Text>
                    </View>


                    <View style={styles.cardBottom}>
                        <TouchableOpacity style={[{
                            backgroundColor: DarkColors.primaryDarkThree
                        },styles.goBtn]}  activeOpacity={0.8}>
                            <Text style={{
                                color: '#fff',
                                fontFamily:'Gordita-bold',
                                fontSize:15
                            }}>
                                Go
                            </Text>
                            <Ionicons name='ios-arrow-forward' size={18} color='#fff'/>
                        </TouchableOpacity>
                    </View>
                </View>




                <View activeOpacity={0.7} style={[
                    {
                        backgroundColor: DarkColors.primaryDarkOne
                    },
                    styles.card]}>

                    <View style={styles.cardTop}>
                        <Text style={{
                            color: '#fff',
                            fontFamily:'Gordita-bold',
                            fontSize:25
                        }}>
                            Deposits
                        </Text>
                        <Text  style={{
                            color: '#eee',
                            fontFamily:'Gordita-bold',
                            fontSize:13
                        }}>
                            {today}
                        </Text>
                    </View>


                    <View style={styles.description}>
                        <Text style={{
                            fontSize:13,
                            color:'#eee',
                            fontFamily:'Gordita-medium',
                            lineHeight:20
                        }}>
                            Keep track of the money you have deposited on crowdfacture
                        </Text>
                    </View>


                    <View style={styles.cardBottom}>
                        <TouchableOpacity style={[{
                            backgroundColor: DarkColors.primaryDarkThree
                        },styles.goBtn]}  activeOpacity={0.8}>
                            <Text style={{
                                color: '#fff',
                                fontFamily:'Gordita-bold',
                                fontSize:15
                            }}>
                                Go
                            </Text>
                            <Ionicons name='ios-arrow-forward' size={18} color='#fff'/>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </AnimatedScrollView>
    );
};




const Transactions = [
    {
        Date: "10 Oct, 2021",
        Type: "Investment",
        body: "Proper documentation of the total projects invested",

    }, {
        Date: "22 April, 2021",
        Type: "Returns",
        body: "Always know how much profit you have generated from your investment",
        link: true
    },
    {
        Date: "12 June, 2021",
        Type: "Deposits",
        body: "Keep track of the money you have deposited on crowdfacture"
    },
]



const styles = StyleSheet.create({
    container: {

        flexDirection: 'column',
        alignItems: 'center',
        flexWrap: 'wrap',
        alignContent:'center',
        justifyContent: 'space-evenly',
        paddingTop: 15
    },
    card: {
        marginTop: 20,
        width: '90%',
        padding:15,
        height: 190,
        borderRadius: 30,
        flexDirection: 'column',
        alignItems: 'center',
    },
    cardTop:{
        height: '30%',
        width: '80%',
        flexDirection:'row',
        alignItems:'center',
        alignContent:'center',
        justifyContent: 'space-between'
    },
    description:{
        height: '50%',
        width: '80%',
        alignItems:'center',
        justifyContent:'center',


    },
    cardBottom:{
        height: '20%',
        width: '80%',
        alignItems:'flex-end',
        justifyContent:'center'
    },
    goBtn:{
        borderRadius: 20,
        width:80,
        height:40,
        flexDirection:'row',
        alignItems:'center',
        alignContent:'center',
        justifyContent: 'space-evenly'
    }


})

export default HistoryScreen;

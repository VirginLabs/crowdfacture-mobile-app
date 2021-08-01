import React from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AnimatedScrollView from "../components/AnimatedScrollView";
import {DarkColors, DayColors} from "../constants/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";

const HistoryScreen = (props) => {

    const {navigation} = props
    let today;
    const month = new Date().getMonth().toString()
    const day = new Date().getDay().toString()
    const year = new Date().getFullYear().toString()

    today = day + ' / ' + month + ' / ' + year
    return (
        <AnimatedScrollView navigation={navigation} routeMessage='Here you see all your investment history'
                            routeName='History'>


            <View style={styles.container}>

                 <TouchableOpacity onPress={() => navigation.navigate('Transactions')} activeOpacity={0.5} style={[{
                    backgroundColor: DayColors.cream
                }, styles.card]}>

                    <View style={styles.cardTop}>
                        <Text style={{
                            color: '#131313',
                            fontFamily:'Gordita-bold',
                            fontSize:14
                        }}>
                            Investment
                        </Text>
                        <Text  style={{
                            color: '#333',
                            fontFamily:'Gordita-bold',
                            fontSize:9
                        }}>
                            {today}
                        </Text>
                    </View>


                    <View style={styles.description}>
                        <Text style={{
                            fontSize:10,
                            color:'#131313',
                            fontFamily:'Gordita-medium',
                            lineHeight:14
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
            fontSize:10
        }}>
            Go
        </Text>
        <Ionicons name='ios-arrow-forward' size={14} color='#fff'/>
    </TouchableOpacity>

</View>

                </TouchableOpacity>



                <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Dividends')} style={[
                    {
                        backgroundColor: DayColors.primaryColor
                    },
                    styles.card]}>
                    <View style={styles.cardTop}>
                        <Text style={{
                            color: '#131313',
                            fontFamily:'Gordita-bold',
                            fontSize:14
                        }}>
                            Returns
                        </Text>
                        <Text  style={{
                            color: '#333',
                            fontFamily:'Gordita-bold',
                            fontSize:9
                        }}>
                            {today}
                        </Text>
                    </View>


                    <View style={styles.description}>
                        <Text style={{
                            fontSize:10,
                            color:'#131313',
                            fontFamily:'Gordita-medium',
                            lineHeight:13
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
                                fontSize:10
                            }}>
                                Go
                            </Text>
                            <Ionicons name='ios-arrow-forward' size={14} color='#fff'/>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>




                <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Deposits')} style={[
                    {
                        backgroundColor: DayColors.green
                    },
                    styles.card]}>

                    <View style={styles.cardTop}>
                        <Text style={{
                            color: '#131313',
                            fontFamily:'Gordita-bold',
                            fontSize:14
                        }}>
                            Deposits
                        </Text>
                        <Text  style={{
                            color: '#333',
                            fontFamily:'Gordita-bold',
                            fontSize:10
                        }}>
                            {today}
                        </Text>
                    </View>


                    <View style={styles.description}>
                        <Text style={{
                            fontSize:10,
                            color:'#333',
                            fontFamily:'Gordita-medium',
                            lineHeight:13
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
                                fontSize:10
                            }}>
                                Go
                            </Text>
                            <Ionicons name='ios-arrow-forward' size={14} color='#fff'/>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>

            </View>
        </AnimatedScrollView>
    );
};







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
        padding:5,
        height: 140,
        borderRadius: 20,
        flexDirection: 'column',
        alignItems: 'center',
    },
    cardTop:{
        height: '25%',
        width: '80%',
        flexDirection:'row',
        alignItems:'center',
        alignContent:'center',
        justifyContent: 'space-between'
    },
    description:{
        height: '40%',
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
        borderRadius: 10,
        width:80,
        height:35,
        flexDirection:'row',
        alignItems:'center',
        alignContent:'center',
        justifyContent: 'space-evenly'
    }


})

export default HistoryScreen;

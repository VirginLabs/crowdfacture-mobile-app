import React, {useContext} from "react";
import {StyleSheet, Text, Animated, Button, View, StatusBar, TouchableOpacity} from "react-native";
import {ThemeContext} from "../util/ThemeManager";
import {DarkColors, DayColors} from "../constants/Colors";
import BackButton from "../components/BackBtn";

import {FontAwesome5} from "@expo/vector-icons";

const ReferralScreen = ({navigation}) => {
    const {theme} = useContext(ThemeContext);

    return (
        <Animated.View style={[styles.container, {
            backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkThree
                : "#f5f5f5"
        }]}>
            <View style={styles.top}>
                <BackButton theme={theme} navigation={navigation}/>
            </View>

            <View style={styles.wrap}>
                <Text style={[{
                    color: theme === 'Dark' ? '#eee' : '#131313'
                }, styles.title]}>
                    Referral Earnings
                </Text>
                <Text style={{
                    padding: 10,
                    color: theme === 'Dark' ? DayColors.cream : '#131313',
                    fontSize: 22,
                    fontFamily: 'Gordita-Black'
                }}>
                    ₦0
                </Text>

                <View style={{
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    flexDirection: 'row',
                }}>

                    <FontAwesome5 name='user-astronaut' size={25} color={
                        theme === 'Dark' ? DayColors.cream : '#131313'}/>

                    <View style={{

                        padding: 10,
                        width: '70%',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        flexDirection: 'column'
                    }}>
                        <Text style={{
                            fontFamily: 'Gordita-medium',
                            fontSize: 16,
                            color: theme === 'Dark' ? '#fff' : '#131313',
                        }}>
                            You've invited 0 People
                        </Text>
                        <Text style={{
                            fontSize: 11,
                            color: theme === 'Dark' ? '#eee' : '#131313',
                            lineHeight: 20
                        }}>
                            Invite your friends and earn when your friend invests in any project and also
                            earn more when your friend invites user to crowdfacture who also invests
                        </Text>
                    </View>


                </View>

                <View style={styles.buttonWrap}>
                    <TouchableOpacity style={{
                        backgroundColor:'#1DA1F2',
                        width:200,
                        height:45,
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        flexDirection: 'row',
                        borderRadius:10
                    }}>
                        <FontAwesome5 name='twitter' size={20} color={'#131313'}/>
                            <Text style={{
                                color: '#131313'
                            }}>
                                Share on twitter
                            </Text>


                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        backgroundColor: DayColors.green,
                        width:200,
                        height:45,
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        flexDirection: 'row',
                        borderRadius:10
                    }}>
                        <FontAwesome5 name='whatsapp' size={20} color='#131313'/>
                        <Text style={{
                            color: '#131313',
                            fontFamily:'Gordita-medium'
                        }}>
                            Share on whatsapp
                        </Text>


                    </TouchableOpacity>
                </View>

            </View>

        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1,
        alignItems: 'center', justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    top: {
        width: '100%',
    },
    wrap: {
        width: '100%',
        alignItems: 'center', justifyContent: 'flex-start',
        flexDirection: 'column'

    },
    title: {
        fontFamily: 'Gordita-bold',
        fontSize: 18,
        padding: 10,
    },
    buttonWrap:{
        width:'100%',
        height:120,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'column'
    }
})

export default ReferralScreen
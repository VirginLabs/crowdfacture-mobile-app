import React, {useCallback, useContext, useState} from 'react';

import { Dimensions, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, DarkColors, DayColors} from "../constants/Colors";
import BackButton from "../components/BackBtn";
import {ThemeContext} from "../util/ThemeManager";
import {useSelector} from "react-redux";
import {MaterialCommunityIcons} from '@expo/vector-icons'
import Animated, {Easing, useSharedValue, withSpring, withTiming} from "react-native-reanimated";
import ModalSheet from "../components/ModalSheet";
import AddBankForm from "../components/AddBankForm";
import WithdrawToBank from "../components/WithdrawToBank";
import WithdrawToSumotrust from "../components/WithdrawToSumotrust";
import {TapGestureHandler} from "react-native-gesture-handler";


const height = Dimensions.get('window').height
const LiquidateScreen = ({navigation}) => {
    const user = useSelector(state => state.user)
    let content;

   const [contentId, setContentId] = useState('1');
    const sheetHeight = useSharedValue(height)
    const opacity = useSharedValue(0)
    const zIndex = useSharedValue(0)
    const offset = useSharedValue(600);


    const data = useSelector(state => state.data)
    const {theme} = data;

    if(contentId === '1'){
        content = <WithdrawToBank/>
    }else if(contentId === '2'){
        content = <WithdrawToSumotrust/>
    }

    const toggleContent = (id) =>{
      setContentId(id)
        openSheet()
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
    return (

        <>
            <ModalSheet height={300} zIndex={zIndex} offset={offset} opacity={opacity}>
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
                LIQUIDATE
            </Text>
            <View style={{
                width: '90%',
                alignItems: 'center',
                padding: 5,
marginTop:10,
                borderRadius: 10,

            }}>

                <TapGestureHandler onActivated={() => toggleContent('1')}>
                <Animated.View activeOpacity={0.6}  style={{
                    width:'100%',
                    height:90,
                    borderRadius:20,
                    marginVertical:12,
                    backgroundColor: DarkColors.primaryDarkTwo,
                    flexDirection:'row',
                    alignItems:'center',
justifyContent:'space-evenly'
                }}>
                    <View style={styles.iconView}>
                        <MaterialCommunityIcons name="bank-transfer-in" size={24} color={DayColors.primaryColor} />
                    </View>

                    <View style={styles.body}>
                        <Text style={{
                            padding:2,
                            fontFamily:'Gordita-bold',
                            fontSize:14,
                            color:"#eee",
                        }}>
                            Withdraw to bank
                        </Text>
                        <Text style={{
                            color:"#bcbcbc",
                            padding:2,
                            fontSize:9,
                            fontFamily:'Gordita-medium'
                        }}>
                     Receive your earning in your local bank account
                        </Text>
                    </View>

                </Animated.View>
                </TapGestureHandler>


                <TapGestureHandler onActivated={() => toggleContent('2')}>
                <Animated.View style={{
                    width:'100%',
                    height:90,
                    borderRadius:20,
                    backgroundColor: DarkColors.primaryDarkTwo,
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-evenly'
                }}>
                    <View style={styles.iconView}>
<Image source={require('../assets/sumotrust-logo.png')}
       style={{
           width:40,
           height:40,
           resizeMode:'cover'
       }}

/>
                    </View>

                    <View style={styles.body}>
                        <Text style={{
                            padding:2,
                            fontFamily:'Gordita-bold',
                            fontSize:14,
                            color:"#eee",
                        }}>
                            Withdraw to Sumotrust
                        </Text>
                        <Text style={{
                            color:"#bcbcbc",
                            padding:2,
                            fontSize:9,
                            fontFamily:'Gordita-medium'
                        }}>
                           Withdraw to your Sumotrust Kick account
                        </Text>
                    </View>

                </Animated.View>
                </TapGestureHandler>
            </View>
        </Animated.View>
            </>
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
        width: '100%',
    },
    title: {
        fontFamily: 'Gordita-Black',
        fontSize: 14,
    },
    wrap: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    iconView:{
        width:45,
        height:45,
        backgroundColor:DayColors.lemon,
        borderRadius:100,
        alignItems:'center',
        justifyContent:'center'
    },
    body:{
        width:'75%',
        height:'95%',
        alignItems:'center',
        justifyContent:'center'
    }

});

export default LiquidateScreen;

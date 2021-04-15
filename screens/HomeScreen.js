import React, {useContext, useEffect, useRef} from 'react';

import { ThemeContext, ThemeProvider } from "../util/ThemeManager";
import {Button, Text, Dimensions, View, StyleSheet, TouchableOpacity, Animated, Easing} from 'react-native';
import AnimatedScrollView from "../components/AnimatedScrollView";
import MyText from "../components/helpers/MyText";
import {Colors} from "../constants/Colors";

const {width, height} = Dimensions.get('screen');


const HomeScreen = (props) => {

    const animationValue = useRef(new Animated.Value(20)).current;

useEffect(() =>{
    Animated.timing(animationValue, {
        toValue: 0,
        easing: Easing.ease,
        duration: 500,
        useNativeDriver: true,
    }).start();


})

// <Button
//     onPress={toggleTheme}
//     title="Toggle"
//     color={theme === "dark" ? "#fff" : "#212121"}
//     />

    return (
        <AnimatedScrollView routeMessage='Welcome Home' routeName='Dashboard'>
            <Animated.View style={styles.container}>


                <View style={styles.balanceCard}>

                </View>
                <View style={styles.buttonWrap}>
                    <TouchableOpacity style={styles.addBalanceBtn}>

                    </TouchableOpacity>
                    <TouchableOpacity style={styles.investBtn}>

                    </TouchableOpacity>
                </View>


                <View style={styles.referBox}>

                </View>


                <View style={styles.buttonDeck}>

                </View>


            </Animated.View>
        </AnimatedScrollView>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Gordita',
        alignItems: 'center',
        lineHeight: 20,
        color: "#212121"
    },

    balanceCard: {
        width: Dimensions.get('screen').width - 70,
        backgroundColor: '#f8f8f8',
        borderRadius: 20,
        height: 220,
        borderWidth: 2,
        borderColor:Colors.Primary,
        borderStyle: 'dashed',
    },
    buttonWrap: {
        marginVertical: 15,
        width: Dimensions.get('screen').width - 70,
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    addBalanceBtn: {
        backgroundColor: '#5454fc',
        width: '50%',
        height: 65,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    investBtn: {

        backgroundColor: '#110f1c',
        width: '40%',
        height: 65,
        borderRadius: 15,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    referBox:{
        marginVertical: 12,
        width: Dimensions.get('screen').width - 70,
        backgroundColor: '#d6d6d6',
        borderRadius: 20,
        height: 120
    },
    buttonDeck:{
        marginVertical: 12,
        width: Dimensions.get('screen').width - 70,
        backgroundColor: '#9b9898',
        borderRadius: 20,
        height: 250
    }



})

export default HomeScreen;

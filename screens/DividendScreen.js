import React from 'react';

import {Animated, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, DarkColors, DayColors} from "../constants/Colors";
import BackButton from "../components/BackBtn";
import {useSelector} from "react-redux";
import {FontAwesome5} from '@expo/vector-icons';
import {SafeAreaView} from "react-native-safe-area-context";


const DividendScreen = ({navigation}) => {
    const data = useSelector(state => state.data)
    const {theme} = data;
    return (
        <SafeAreaView style={{
            flex:1
        }}>

      
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
                YOUR DIVIDENDS

            </Text>

            <View style={{
                alignItems: 'center',
                justifyContent: 'flex-end',

                height: 400,
            }}>


                <FontAwesome5 name="money-bill-alt" size={54} color={
                    theme === 'Dark' ? '#282828'
                        : '#333'
                }/>

                <Text style={{
                    fontSize: 12,
                    marginVertical: 12,
                    fontFamily: 'Gordita-medium',
                    color: theme === 'Dark' ? '#eee' : '#333'
                }}>
                    Sorry you haven't earned any dividend yet.
                </Text>

                <TouchableOpacity style={{
                    width: 140,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 45,
                    backgroundColor: DayColors.lemon,
                    borderRadius: 10,
                    marginTop: 20,
                }}>

                    <Text style={{
                        fontFamily: 'Gordita-bold',
                        color: '#131313'
                    }}>
                        Start investing
                    </Text>
                </TouchableOpacity>
            </View>

        </Animated.View>
        </SafeAreaView>
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

});


export default DividendScreen;

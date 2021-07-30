import React, {useContext} from 'react';

import {Animated, StatusBar, StyleSheet, Text, View} from 'react-native';
import {ThemeContext} from "../util/ThemeManager";
import {Colors, DarkColors, DayColors} from "../constants/Colors";
import BackButton from "../components/BackBtn";
import {useSelector} from "react-redux";

const ReportsScreen = ({navigation}) => {
    const user = useSelector(state => state.user)
    const data = useSelector(state => state.data)
    const {theme} = data;
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
                REPORTS SCREEN
            </Text>
            <View style={{
                width:'90%',
                alignItems:'center',  padding:8,
                backgroundColor: DayColors.lemon,
                borderRadius:10,
                margin:10,
            }}>
                <Text style={{
                    fontFamily:'Gordita-medium',
                    color :'#131313'
                }}>
                    Comming soon
                </Text>
            </View>
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

});

export default ReportsScreen;

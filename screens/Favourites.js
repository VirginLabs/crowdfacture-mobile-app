import React, {useContext} from 'react';

import {Animated, StatusBar, StyleSheet, Text, View} from 'react-native';
import {Colors, DarkColors} from "../constants/Colors";
import BackButton from "../components/BackBtn";
import {ThemeContext} from "../util/ThemeManager";
import {useSelector} from "react-redux";

const FavouriteScreen = ({navigation}) => {
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
                YOUR SAVED PROJECTS
            </Text>

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


export default FavouriteScreen;

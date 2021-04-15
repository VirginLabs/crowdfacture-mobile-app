import React from 'react';

import {Animated, StyleSheet, Text, View} from 'react-native';
import AnimatedScrollView from "../components/AnimatedScrollView";
import MyText from "../components/helpers/MyText";


const DividendScreen = () => {
    return (
        <AnimatedScrollView routeMessage='See your account statement' routeName='History'>

            <Animated.View style={styles.container}>

            </Animated.View>
        </AnimatedScrollView>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },


})


export default DividendScreen;

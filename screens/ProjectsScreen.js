import React from 'react';

import {Animated, StyleSheet, Text, View} from 'react-native';
import AnimatedScrollView from "../components/AnimatedScrollView";
import MyText from "../components/helpers/MyText";
import { NavigationContainer } from '@react-navigation/native';


function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home!</Text>
        </View>
    );
}

const  SettingsScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}




const Projects = () => {
    return (
        <AnimatedScrollView  routeMessage='Decide where your money goes!' routeName='All projects'>

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


export default Projects;

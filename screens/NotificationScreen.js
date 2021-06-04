import React, {useContext} from "react";
import {View, Text, Animated, Button, StyleSheet} from "react-native";
import {ThemeContext} from "../util/ThemeManager";
import {DarkColors} from "../constants/Colors";

const NotificationScreen = ({ navigation }) => {
    const {theme, transitionValue} = useContext(ThemeContext);
    return (
        <Animated.View style={[styles.container,  { backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkThree
                : "#f5f5f5"
        }]}>
            <Text style={{ fontSize: 30 }}>This is a modal!</Text>
            <Button onPress={() => navigation.goBack()} title="Go back" />
        </Animated.View>
    );
}


const styles = StyleSheet.create({
    container:{
        flex: 1, alignItems: 'center', justifyContent: 'center'
    }
})


export default NotificationScreen
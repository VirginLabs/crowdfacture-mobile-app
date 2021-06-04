import React, {useContext} from "react";
import {StyleSheet, Text,Animated, Button} from "react-native";
import {ThemeContext} from "../util/ThemeManager";
import {DarkColors} from "../constants/Colors";

const ReferralScreen = ({ navigation }) => {
    const {theme, transitionValue} = useContext(ThemeContext);

    return (
        <Animated.View style={[styles.container,  { backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkThree
                : "#f5f5f5"
        }]}>
            <Text style={{ fontSize: 30 }}>Referral Screen!</Text>
            <Button onPress={() => navigation.goBack()} title="Dismiss" />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container:{
 flex: 1, alignItems: 'center', justifyContent: 'center'
    }
})

export default ReferralScreen
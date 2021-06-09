import React, {useContext} from "react";
import {View, Text, Animated, StatusBar, StyleSheet, ScrollView} from "react-native";
import {ThemeContext} from "../util/ThemeManager";
import {Colors, DarkColors} from "../constants/Colors";
import BackButton from "../components/BackBtn";

const NotificationScreen = ({navigation}) => {
    const {theme, transitionValue} = useContext(ThemeContext);
    return (
        <ScrollView
            keyboardShouldPersistTaps='handled'
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            scrollEnabled
            contentContainerStyle={[styles.container, {
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
                Your Notification
            </Text>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center', justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    top: {
        width: '100%',
    },
})


export default NotificationScreen
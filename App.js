import React, {useState, useEffect} from 'react';
import {StyleSheet, StatusBar, View, Image, ImageBackground} from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import {enableScreens} from 'react-native-screens';
import {Colors} from "./constants/Colors";
import {AppearanceProvider, useColorScheme} from "react-native-appearance";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer, DarkTheme, DefaultTheme} from "@react-navigation/native";
import {MyNavigation, MyStartNavigation} from "./Naviagtions/MyNavigation";
import TabBarProvider from "./context/TabBarProvider";
import {ThemeProvider} from "./util/ThemeManager";



enableScreens()

const fetchFonts = () => {
    return Font.loadAsync({
        'Gordita-Black': require('./assets/fonts/Gordita-Black.otf'),
        'Poppins': require('./assets/fonts/Poppins-Regular.ttf'),
        'Poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
        'Poppins-medium': require('./assets/fonts/Poppins-Medium.ttf'),
        'Gordita-bold': require('./assets/fonts/Gordita-Bold.otf'),
        'Gordita': require('./assets/fonts/Gordita-Regular.otf'),
        'Gordita-medium': require('./assets/fonts/Gordita-Medium.otf'),
        'Gordita-ultra': require('./assets/fonts/Gordita-Ultra.otf'),
    });
};




export default function App(props) {
<StatusBar hidden/>
    const scheme = useColorScheme()

    const [fontLoaded, setFontLoaded] = useState(false);
    const [showRealApp, setShowRealApp] = useState(false);
    const [firstLaunch, setFirstLaunch] = useState(null);


    useEffect(() => {
        AsyncStorage.getItem('A_first_time_launch').then((value) => {

            if (value === null) {
                setFirstLaunch(true);
                console.log(value)
            } else if (value === false) {
                console.log(value)
                setFirstLaunch(false);
            }
        }).catch((err) => {
            console.log('Error @A_first_time_launch: ', err);
        })
    }, []);


    if (!fontLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onError={console.warn}
                onFinish={() => {
                    setFontLoaded(true);
                }}
            />
        );
    }


    return (


firstLaunch ?

                <NavigationContainer>
                <MyStartNavigation/>
            </NavigationContainer>
:
    <ThemeProvider>


               <TabBarProvider>
                <NavigationContainer>
                    <MyNavigation/>

                </NavigationContainer>

            </TabBarProvider>
    </ThemeProvider>

    );
}

const Styles = StyleSheet.create({
    containerView: {
        flex: 1,
        backgroundColor: "#efefef",
        alignItems: 'center',
        justifyContent: 'center',
    },

});

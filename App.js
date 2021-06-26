import React, {useState, useEffect, useContext} from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import {enableScreens} from 'react-native-screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MyNavigation, MyStartNavigation} from "./Naviagtions/MyNavigation";
import TabBarProvider from "./context/TabBarProvider";
import {ThemeContext, ThemeProvider} from "./util/ThemeManager";
import { NavigationContainer,DefaultTheme} from '@react-navigation/native';
// In theory you don't have to install `react-native-root-siblings` because it's a dep of root-toast
// But you can install it explicitly if your editor complains about it.
import { RootSiblingParent } from 'react-native-root-siblings';
import {connect, Provider} from 'react-redux';
// Add
import { PersistGate } from 'redux-persist/integration/react';

import {persistor, store} from "./redux/store";
import {Colors, DarkColors} from "./constants/Colors";
import PropTypes from "prop-types";
import mapStateToProps from "react-redux/lib/connect/mapStateToProps";
import NavManager from "./Naviagtions/NavManager";
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




const App = (props)  =>{

    const {theme} = useContext(ThemeContext);

    const [fontLoaded, setFontLoaded] = useState(false);
    const [showRealApp, setShowRealApp] = useState(false);
    const [firstLaunch, setFirstLaunch] = useState(null);



    useEffect(() => {

        AsyncStorage.getItem('A_first_time_open').then((value) => {

            if (value === null) {
                setFirstLaunch(true);
                console.log(value)
            } else if (value === false) {
                console.log(value)
                setFirstLaunch(false);
            }
        }).catch((err) => {
            console.log('Error @A_first_time_open: ', err);
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



const navTheme = DefaultTheme;
    navTheme.colors.background = theme === 'Dark' ?
        Colors.PrimaryDarkColor : '#eee'

    return (

<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer theme={navTheme}>
            {
                firstLaunch ?

                    <MyStartNavigation/>

                    :
                    <ThemeProvider>
                            <TabBarProvider>
                                <RootSiblingParent>
                                    <MyNavigation/>
                                </RootSiblingParent>


                            </TabBarProvider>



                    </ThemeProvider>
            }
        </NavigationContainer>
    </PersistGate>
</Provider>
    );
}



export default (App)


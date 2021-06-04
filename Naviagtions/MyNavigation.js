import React from "react";

import {createStackNavigator, TransitionSpecs, CardStyleInterpolators} from '@react-navigation/stack';
// You can import Ionicons from @expo/vector-icons/Ionicons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.



import Auth from "../screens/Auth";
import HomeScreen from "../screens/HomeScreen";
import StartScreen from "../screens/StartScreen";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Projects from "../screens/ProjectsScreen";
import DividendScreen from "../screens/DividendScreen";
import TabBar from "./TabBar";
import UserProfile from "../screens/ProfileScreen";
import AddBankScreen from "../screens/AddBankScreen";
import NotificationScreen from "../screens/NotificationScreen";
// Javascript

import Login from "../screens/Login";
import {Easing} from "react-native";
import ReferralScreen from "../screens/ReferalScreen";
import AddCashScreen from "../screens/AddCash";
import FavouriteScreen from "../screens/Favourites";
import LiquidateScreen from "../screens/Liquidate";
import ExchangeScreen from "../screens/Exchange";
import SupportScreen from "../screens/SupportScreen";
import CalculatorScreen from "../screens/Calculator";
import SecurityScreen from "../screens/Security";
import ReportsScreen from "../screens/Reports";



const CFStackNavigator = createStackNavigator();
const StartStackNavigator = createStackNavigator();
const ProfileStackNavigation = createStackNavigator()

const Tab = createBottomTabNavigator();
const PopupStack = createStackNavigator();




const config = {
    animation: 'spring',
    config: {
        stiffness: 1000,
        mass: 3,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    },
};
const closeConfig = {
    animation: 'timing',
    config: {
       duration: 500,
    easing: Easing.linear
    },
};


const TabNavigator = () => {
    return (
        <Tab.Navigator
            backBehavior='history'
            screenOptions={{
                gestureEnabled: true,
                gestureDirection:'horizontal',

            }}

            tabBar={props => <TabBar {...props} />}>
            <Tab.Screen

                name='Dashboard'
                component={HomeScreen}
                initialParams={{icon: 'dashboard'}}
            />


            <Tab.Screen
                name='Projects'
                component={Projects}
                initialParams={{icon: 'briefcase'}}

            />

            <Tab.Screen
                name='Dividend'
                component={DividendScreen}
                initialParams={{icon: 'tags'}}

            />
            <Tab.Screen
                name='Profile'
                component={ProfileStackNav}
                initialParams={{icon: 'user'}}


            />
        </Tab.Navigator>
    );
};




export const ProfileStackNav = () => {
    return (
        <ProfileStackNavigation.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <ProfileStackNavigation.Screen name='Profile' component={UserProfile}/>

        </ProfileStackNavigation.Navigator>
    )
}

export const MyNavigation = () => {
    return (
        <CFStackNavigator.Navigator
            keyboardHandlingEnabled={true}
            detachInactiveScreens={true}

            screenOptions={{
                cardStyle:{
                    backgroundColor: 'transparent',
                },
                headerShown: false,
                gestureEnabled: true,
animationEnabled: false,
                gestureDirection:'horizontal',
            }}
        >
            <CFStackNavigator.Screen name='Auth' component={Auth}/>
            <CFStackNavigator.Screen name='Login' component={Login}/>
            <CFStackNavigator.Screen name='Dashboard' component={TabNavigator}/>
            <CFStackNavigator.Screen name='Notification' component={PopupNavigation}/>
            <StartStackNavigator.Screen name='Referral' component={ReferralScreen}/>
            <StartStackNavigator.Screen name='AddCash' component={AddCashScreen}/>
            <StartStackNavigator.Screen name='AddBank' component={AddBankScreen}/>
            <StartStackNavigator.Screen name='Favourites' component={FavouriteScreen}/>
            <StartStackNavigator.Screen name='Liquidate' component={LiquidateScreen}/>
            <StartStackNavigator.Screen name='Exchange' component={ExchangeScreen}/>
            <StartStackNavigator.Screen name='Support' component={SupportScreen}/>
            <StartStackNavigator.Screen name='Calculator' component={CalculatorScreen}/>
            <StartStackNavigator.Screen name='Dividends' component={DividendScreen}/>
            <StartStackNavigator.Screen name='Security' component={SecurityScreen}/>
            <StartStackNavigator.Screen name='Reports' component={ReportsScreen}/>

        </CFStackNavigator.Navigator>
    )

}

function PopupNavigation() {
    return (
        <PopupStack.Navigator mode="modal"
        screenOptions={{
            headerShown: false,

        }}
        >
            <PopupStack.Screen name="Notification" component={NotificationScreen}/>

        </PopupStack.Navigator>
    );
}


export const MyStartNavigation = () => {
    return (
        <StartStackNavigator.Navigator

            keyboardHandlingEnabled={true}
            detachInactiveScreens={true} screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection:'horizontal',
            animationEnabled:false,
            cardStyle:{
                backgroundColor: 'transparent',
            },
        }}>
            <StartStackNavigator.Screen name='Start' component={StartScreen}/>

            <StartStackNavigator.Screen name='Dashboard' component={MyNavigation}/>

        </StartStackNavigator.Navigator>
    )

}


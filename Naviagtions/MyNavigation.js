import React from "react";

import {createStackNavigator} from '@react-navigation/stack';
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

import ReferralScreen from "../screens/ReferalScreen";
import AddCashScreen from "../screens/AddCash";
import FavouriteScreen from "../screens/Favourites";
import LiquidateScreen from "../screens/Liquidate";
import ExchangeScreen from "../screens/Exchange";
import SupportScreen from "../screens/SupportScreen";
import CalculatorScreen from "../screens/Calculator";
import SecurityScreen from "../screens/Security";
import ReportsScreen from "../screens/Reports";
import ProjectScreen from "../screens/ProjectScreen";
import HistoryScreen from "../screens/HistoryScreen";
import SumotrustLogin from "../screens/SumotrustLogin";
import Transactions from "../screens/Transactions";
import Deposits from "../screens/Deposits";




const CFStackNavigator = createStackNavigator();
const StartStackNavigator = createStackNavigator();
const ProfileStackNavigation = createStackNavigator()

const Tab = createBottomTabNavigator();
const PopupStack = createStackNavigator();







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
                initialParams={{icon: 'people-carry'}}

            />

            <Tab.Screen
                name='History'
                component={HistoryScreen}
                initialParams={{icon: 'history'}}

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

export const MyNavigation = ({authenticated}) => {
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


            { authenticated ?
                <>
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
                    <StartStackNavigator.Screen name='Project' component={ProjectScreen}/>
                    <StartStackNavigator.Screen name='Transactions' component={Transactions}/>
                    <StartStackNavigator.Screen name='Deposits' component={Deposits}/>

                </>
                :
                <>

                    <CFStackNavigator.Screen name='Auth' component={Auth}/>
                    <CFStackNavigator.Screen name='Login' component={Login}/>
                    <CFStackNavigator.Screen name='Sumotrust' component={SumotrustLogin}/>

                </>
            }
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


export const MyStartNavigation = ({authentication}) => {
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



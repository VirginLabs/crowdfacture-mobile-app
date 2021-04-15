import React from "react";
import {createStackNavigator} from '@react-navigation/stack';
// You can import Ionicons from @expo/vector-icons/Ionicons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import Icons from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import Auth from "../screens/Auth";
import HomeScreen from "../screens/HomeScreen";
import StartScreen from "../screens/StartScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SettingsScreen from "../screens/SettingsScreen";
import {TouchableOpacity, Text, View, Dimensions} from "react-native";
import Projects from "../screens/ProjectsScreen";
import DividendScreen from "../screens/DividendScreen";
import TabBar from "./TabBar";
import UserProfile from "../screens/ProfileScreen";
import AddBankScreen from "../screens/AddBankScreen";
const {width, height} = Dimensions.get('screen');
const CFStackNavigator = createStackNavigator();
const StartStackNavigator = createStackNavigator();
const ProfileStackNavigation = createStackNavigator()

const Tab = createBottomTabNavigator();


/*
export const MyTabs = ()  =>{
    return (
        <Tab.Navigator

            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Dashboard') {
                        iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'ios-list-box' : 'ios-list';
                    }

                    // You can return any component that you like here!
                    return <Icons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}
            tabBar={props => <MyTabBar {...props} />}>
            <Tab.Screen options={
                {
                    tabBarLabel:'Dashboard',

                    tabBarIcon:({color, focused}) => (
                        <Ionicons name={'Home'} size={14} color={color}/>
                    )
                }
            } name="Dashboard" component={HomeScreen} />
            <Tab.Screen name="Projects" component={Projects} />
            <Tab.Screen name="Dividends" component={DividendScreen}/>
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
}*/
const TabNavigator = () => {
    return (
        <Tab.Navigator tabBar={props => <TabBar {...props} />}>
            <Tab.Screen
                name='Dashboard'
                component={HomeScreen}
                initialParams={{ icon: 'dashboard' }}
            />


            <Tab.Screen
                name='Projects'
                component={Projects}
                initialParams={{ icon: 'briefcase' }}
            />

            <Tab.Screen
                name='Dividend'
                component={DividendScreen}
                initialParams={{ icon: 'tags' }}
            />
            <Tab.Screen
                name='Profile'
                component={ProfileStackNav}
                initialParams={{ icon: 'user-o' }}
            />
        </Tab.Navigator>
    );
};

export const ProfileStackNav = () =>{
    return(
        <ProfileStackNavigation.Navigator screenOptions={{
            headerShown: false
        }}>
            <ProfileStackNavigation.Screen name='Profile' component={UserProfile}/>
            <ProfileStackNavigation.Screen name='AddBank' component={AddBankScreen}/>
        </ProfileStackNavigation.Navigator>
    )
}

export const MyNavigation = () => {
    return (
        <CFStackNavigator.Navigator screenOptions={{
            headerShown: false
        }}>
            <CFStackNavigator.Screen name='Auth' component={Auth}/>
            <CFStackNavigator.Screen name='Dashboard' component={TabNavigator}/>

        </CFStackNavigator.Navigator>
    )

}

export const MyStartNavigation = () => {
    return (
        <StartStackNavigator.Navigator screenOptions={{
            headerShown: false
        }}>
            <StartStackNavigator.Screen name='Start' component={StartScreen}/>
            <StartStackNavigator.Screen name='MyNavigation' component={MyNavigation}/>
        </StartStackNavigator.Navigator>
    )

}



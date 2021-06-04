import React from 'react'
import { Text, TouchableOpacity, Image } from 'react-native'
import HomeScreen from "../screens/HomeScreen";
import UserProfile from "../screens/ProfileScreen";
import DividendScreen from "../screens/DividendScreen";
import Projects from "../screens/ProjectsScreen";
import { AnimatedTabBarNavigator } from 'react-native-animated-nav-tab-bar'
import {NavigationContainer} from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Feather'



const Tabs = AnimatedTabBarNavigator()


const TabBarIcon = props => {
    return (
        <Icon
            name={props.name}
            size={props.size ? props.size : 24}
            color={props.tintColor}
        />
    )
}
const TabNav = () => (
    <NavigationContainer>
    <Tabs.Navigator>
        <Tabs.Screen
            name="Dashboard"
            component={HomeScreen}
            options={{
                tabBarIcon: ({ focused, color }) => (
                    <TabBarIcon
                        focused={focused}
                        tintColor={color}
                        name="home"
                    />
                ),
            }}
        />
        <Tabs.Screen
            name="Projects"
            component={Projects}
            options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <TabBarIcon
                        focused={focused}
                        tintColor={color}
                        name="search"
                    />
                ),
            }}
        />
        <Tabs.Screen
            name="Dividend"
            component={DividendScreen}
            options={{
                tabBarIcon: ({ focused, color }) => (
                    <TabBarIcon
                        focused={focused}
                        tintColor={color}
                        name="image"
                    />
                ),
            }}
        />
        <Tabs.Screen
            name="Profile"
            component={UserProfile}
            options={{
                tabBarIcon: ({ focused, color }) => (
                    <TabBarIcon
                        focused={focused}
                        tintColor={color}
                        name="user"
                    />
                ),
            }}
        />
    </Tabs.Navigator>
    </NavigationContainer>
)

export default TabNav;
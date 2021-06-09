import React, {useContext} from 'react';

import {StyleSheet, TouchableOpacity, View} from 'react-native';
import AnimatedScrollView from "../components/AnimatedScrollView";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MyProjects from "../components/Tabs/MyProjects";
import AllProjects from "../components/Tabs/AllProjects";
import {ThemeContext} from "../util/ThemeManager";
import {Colors, DarkColors} from "../constants/Colors";


const Tab = createMaterialTopTabNavigator();


const Projects = ({navigation}) => {
    const {theme} = useContext(ThemeContext);


    return (
        <AnimatedScrollView navigation={navigation} routeMessage='Decide where your money goes!'
                            routeName='All projects'>
            <View style={styles.container}>


            <Tab.Navigator tabBarPosition='top' tabBarOptions={{
                activeTintColor: 'yellow',
                indicatorStyle: {
                    backgroundColor: Colors.Primary
                },
                labelStyle: {fontSize: 12, fontFamily: 'Gordita-medium', color: theme === 'Dark' ? '#fff' : '#131313'},

                style: {
                    backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkTwo : '#f5f5f5',
                    color: 'red',

                },
            }}>
                <Tab.Screen options={{

                }} name="All Project" component={AllProjects}/>

                <Tab.Screen name="My projects" component={MyProjects}/>

            </Tab.Navigator>
            </View>
        </AnimatedScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,

    },


})


export default Projects;

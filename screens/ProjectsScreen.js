import React, {useContext} from 'react';

import {StyleSheet, TouchableOpacity, View} from 'react-native';
import AnimatedScrollView from "../components/AnimatedScrollView";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MyProjects from "../components/Tabs/MyProjects";
import AllProjects from "../components/Tabs/AllProjects";
import {ThemeContext} from "../util/ThemeManager";
import {Colors, DarkColors} from "../constants/Colors";
import {getAllProject} from "../redux/actions/data-action";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getUser, getUserProjects} from "../redux/actions/user-action";

const Tab = createMaterialTopTabNavigator();



const wait = timeout => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
};


const Projects = (props) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const {
        navigation
    } = props

    const {loading,userData: {member: {Amount,Phone}}} = props.user
    const {theme} = useContext(ThemeContext);


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getUser(Phone)
        wait(2000).then(() => setRefreshing(false));
    }, []);
    return (
        <AnimatedScrollView onRefresh={onRefresh} refreshing={refreshing} navigation={navigation} routeMessage='Decide where your money goes!'
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
                <Tab.Screen name="All Project" component={AllProjects}/>

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

Projects.propTypes = {
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
};


const mapActionToPops = {
    getUser,

}


const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user,
})



export default connect(mapStateToProps,mapActionToPops)(Projects);

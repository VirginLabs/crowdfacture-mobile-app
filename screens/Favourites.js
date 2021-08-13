import React from 'react';

import {ActivityIndicator, Animated, StatusBar, StyleSheet, Text, View} from 'react-native';
import {Colors, DarkColors} from "../constants/Colors";
import BackButton from "../components/BackBtn";
import {useSelector} from "react-redux";
import ProjectCard from "../components/ProjectCard";

const FavouriteScreen = ({navigation}) => {
    const user = useSelector(state => state.user)
    const data = useSelector(state => state.data)
    const {theme} = data;



    const {loading,
        userData: {member: {ID},
            savedProjects} } = user

    return (
        <Animated.View style={[styles.container, {
            backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkThree
                : "#f5f5f5"
        }]}>
            <View style={styles.top}>
                <BackButton theme={theme} navigation={navigation}/>
            </View>
            <Text style={[
                {
                    color:theme === 'Dark' ?  Colors.White : '#333',
                },
                styles.title]}>
                YOUR SAVED PROJECTS
            </Text>

            <View style={styles.projectContainer}>


                {

                    loading ? <ActivityIndicator size="large" color={Colors.Primary}/> :
                        Object.keys(savedProjects).length > 0 && savedProjects.map((({ProjectID,Project}) => (

                            <ProjectCard action={() => props.navigation.navigate('Project', {
                                projectId: ID,
                            })} key={ProjectID} theme={theme} image={Project.ProjectImage} projectTitle={Project.ProjectTitle}
                                         Active={Project.Active} SoldOut={Project.SoldOut}
                                         UpComing={Project.UpComing} target={Project.Target}
                                         pricePerUnit={Project.PricePerUnit}/>

                        )))
                }
            </View>

        </Animated.View>


    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1, alignItems: 'center', justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    top: {
        width: '100%',
    },
    title: {
        fontFamily: 'Gordita-Black',
        fontSize: 16,
    },
    wrap: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    projectContainer: {
        marginTop:20,
        width: "100%",
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },

});


export default FavouriteScreen;

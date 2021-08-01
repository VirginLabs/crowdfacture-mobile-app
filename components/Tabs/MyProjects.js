import React, {useContext, useEffect} from 'react';

import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {ThemeContext} from "../../util/ThemeManager";
import PropTypes from "prop-types";
import {getUserProjects} from "../../redux/actions/user-action";
import {connect, useDispatch, useSelector} from "react-redux";
import {Colors, DarkColors, DayColors} from "../../constants/Colors";
import ProjectCard from "../ProjectCard";
import {getInvestments} from "../../redux/actions/data-action";
import UserProjectCard from "../UserProjectCard";

const MyProjects = (props) => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.data)
    const user = useSelector(state => state.user)

    const {navigation} = props
    const {userProjects, userData: {member: {ID}}} = user


    const {
        theme,
        loadingProject,
    } = data

    useEffect(() => {
        const formData = new FormData()
        formData.append('userId', ID)
        dispatch(getUserProjects(formData))

    }, []);



    return (
        <View style={[styles.container, {
            backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkThree :
                "#f5f5f5"
        }
        ]}>
            {
                loadingProject ?
                    <ActivityIndicator size="large" color={Colors.Primary}/>
                    :
Object.keys(userProjects).length > 0 ?
    userProjects.map((({AddNoUnit, AddAmount,ID,Project}) => (
                        <UserProjectCard action={() =>  navigation.navigate('Project', {
                            projectId: Project.ID,
                        })

                        } key={ID} theme={theme} imageName={Project.ProjectImage} projectName={Project.ProjectTitle}
                                         totalAmount={AddAmount}
                 target={Project.Target}
                                         totalUnits={AddNoUnit}/>
                    ))) :


    <View style={{
    width:'80%',
        borderRadius:10,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        marginTop:10,
        backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkTwo : "#f6e5da"
    }}>

    <Text style={{
        fontSize:10,
        fontFamily:'Gordita-medium',
    color: theme === 'Dark' ? '#ddd': '#131313'
    }}>
      Opps! You don't have any projects, start investing
    </Text>
    </View>
            }
        </View>
    );
};


const styles = StyleSheet.create({
    container:{
flex:1,
        flexDirection: 'row',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',

        paddingTop:15
    }

})





export default MyProjects

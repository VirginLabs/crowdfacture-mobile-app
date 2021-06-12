import React, {useContext, useEffect} from 'react';

import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {ThemeContext} from "../../util/ThemeManager";
import PropTypes from "prop-types";
import {getUserProjects} from "../../redux/actions/user-action";
import {connect} from "react-redux";
import {Colors, DarkColors} from "../../constants/Colors";
import ProjectCard from "../ProjectCard";
import {getInvestments} from "../../redux/actions/data-action";
import UserProjectCard from "../UserProjectCard";

const MyProjects = (props) => {


    const {theme} = useContext(ThemeContext);
    const {navigation, getUserProjects} = props
    const {userProjects, userData: {member: {ID}}} = props.user


    const {
        loadingProject,
    } = props.data

    useEffect(() => {
        const formData = new FormData()
        formData.append('userId', ID)
        getUserProjects(formData)

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


    <Text style={{
    color: theme === 'Dark' ? '#eee' : '#131313'
    }}>
        NO PROJECT START INVESTING
    </Text>
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


MyProjects.propTypes = {
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    getUserProjects: PropTypes.func.isRequired,
    getInvestments: PropTypes.func.isRequired,
};


const mapActionToPops = {
    getUserProjects,
    getInvestments
}


const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user,
})


export default connect(mapStateToProps,mapActionToPops) (MyProjects);

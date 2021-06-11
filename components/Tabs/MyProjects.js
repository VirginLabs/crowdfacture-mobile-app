import React, {useContext, useEffect} from 'react';

import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {ThemeContext} from "../../util/ThemeManager";
import PropTypes from "prop-types";
import {getUserProjects} from "../../redux/actions/user-action";
import {connect} from "react-redux";
import {Colors, DarkColors} from "../../constants/Colors";
import ProjectCard from "../ProjectCard";

const MyProjects = (props) => {


    const {theme} = useContext(ThemeContext);
    const {getAllProject,navigation, getUserProjects} = props
    const {userProjects, userData: {member: {ID}}} = props.user

    const {
        allProjects,
        loadingProject
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

                    userProjects.map((({ID, ProjectImage, ProjectTitle, Active, SoldOut, UpComing, Target, PricePerUnit}) => (
                        <ProjectCard action={() =>  navigation.navigate('Project', {
                            projectId: ID,
                        })

                        } key={ID} theme={theme} image={ProjectImage} projectTitle={ProjectTitle} Active={Active} SoldOut={SoldOut}
                                     UpComing={UpComing} target={Target}
                                     pricePerUnit={PricePerUnit}/>
                    )))
            }
        </View>
    );
};


const styles = StyleSheet.create({
    container:{

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
};


const mapActionToPops = {
    getUserProjects
}


const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user,
})


export default connect(mapStateToProps,mapActionToPops) (MyProjects);

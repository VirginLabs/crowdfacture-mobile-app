import React, {useContext, useEffect, useMemo} from 'react';

import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import {ThemeContext} from "../../util/ThemeManager";
import {Colors, DarkColors} from "../../constants/Colors";
import ProjectCard from "../ProjectCard";
import PropTypes from "prop-types";
import {getAllProject} from "../../redux/actions/data-action";
import {getUserProjects} from "../../redux/actions/user-action";
import {connect} from "react-redux";

const AllProjects = (props) => {


    const {getAllProject,navigation, getUserProjects} = props
    const {userProjects, userData: {member: {ID}}} = props.user

    const {
        allProjects,
        loadingProject
    } = props.data

  useEffect(() => {
        getAllProject()
    }, []);


    const {theme} = useContext(ThemeContext);
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
                    Object.keys(allProjects).length > 0 &&
                allProjects.map((({ID, ProjectImage, ProjectTitle, Active, SoldOut, UpComing, Target, PricePerUnit}) => (
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

AllProjects.propTypes = {
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    getAllProject: PropTypes.func.isRequired,
};


const mapActionToPops = {
    getAllProject,
}


const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user,
})


export default connect(mapStateToProps,mapActionToPops)(AllProjects);

import React, {useContext, useEffect, useMemo} from 'react';

import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';

import {Colors, DarkColors} from "../../constants/Colors";
import ProjectCard from "../ProjectCard";

import { useDispatch, useSelector} from "react-redux";
import {getAllProject} from "../../redux/actions/data-action";

const AllProjects = (props) => {

    const dispatch = useDispatch()
    const data = useSelector(state => state.data)
    const {navigation} = props




  useEffect(() => {
      dispatch(getAllProject())
    }, []);
    const {
        allProjects,
        loadingProject,
        theme
    } = data

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



export default AllProjects;

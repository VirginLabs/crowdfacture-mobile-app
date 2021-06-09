import React, {useContext} from 'react';

import {Text, View, StyleSheet} from 'react-native';
import {ThemeContext} from "../../util/ThemeManager";
import {DarkColors} from "../../constants/Colors";
import ProjectCard from "../ProjectCard";

const AllProjects = ({navigation}) => {

    const {theme} = useContext(ThemeContext);
    return (
        <View style={[styles.container, {
            backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkThree :
           "#f5f5f5"}
           ]}>
            {
                Projects.map((({id, projectName, Active, SoldOut, UpComing, target, valuePerUnit}) => (
                    <ProjectCard action={() =>  navigation.navigate('Project', {
                        projectId: id,
                    })

                    } key={id} theme={theme} projectTitle={projectName} Active={Active} SoldOut={SoldOut}
                                 UpComing={UpComing} target={target}
                                 pricePerUnit={valuePerUnit}/>
                )))
            }
        </View>
    );
};

const Projects = [
    {
        projectName: "gas plant",
        projectImage: "3855962/pexels-photo-3855962.jpeg",
        availableUnit: "",
        soldUnits: "",
        target: "₦495,000,000",
        investmentSummary: "",
        id: "1",
        projectReturn: "30% in equity",
        investmentType: "Equity",
        payoutType: "Based on profit/loss",
        valuePerUnit: "10000",
        unitType: "Units can be liquidated",
        limit: "90k/user",
        Active: '1',
        UpComing: '0',
        SoldOut: '0'

    },
    {
        projectName: "power plant",
        projectImage: "1058141/pexels-photo-1058141.jpeg",
        availableUnit: "8000",
        soldUnits: "",
        target: "500,000,000",
        investmentSummary: "",
        id: "2",
        projectReturn: "30% in equity",
        investmentType: "Equity",
        payoutType: "Based on profit/loss",
        valuePerUnit: "10000",
        unitType: "Units can be liquidated",
        limit: "100k/user",
        Active: '0',
        UpComing: '1',
        SoldOut: '0'
    },
    {
        projectName: "fertilizer plant",
        projectImage: "5458354/pexels-photo-5458354.jpeg",
        availableUnit: "50,000",
        soldUnits: "",
        target: "89,000,000",
        investmentSummary: "",
        id: "3",
        projectReturn: "30% in equity",
        investmentType: "Equity",
        payoutType: "Based on profit/loss",
        valuePerUnit: "10000",
        unitType: "Units can be liquidated",
        limit: "60k/user",
        Active: '0',
        UpComing: '0',
        SoldOut: '1'

    },
]

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

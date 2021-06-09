import React, {useContext} from 'react';

import {Text, View} from 'react-native';
import {ThemeContext} from "../../util/ThemeManager";

const MyProjects = () => {

        const {theme} = useContext(ThemeContext);
    return (
        <View>

            <Text>
                MY PROJECTS
            </Text>
        </View>
    );
};

export default MyProjects;

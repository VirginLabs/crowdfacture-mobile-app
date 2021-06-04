import React, {useContext} from 'react';

import {Text, View, StyleSheet} from 'react-native';
import {ThemeContext} from "../../util/ThemeManager";

const MyText = ({children, myStyles}) => {
    const { toggleTheme, theme } = useContext(ThemeContext);
    return (
        <Text style={[myStyles, styles[`text${theme}`]]}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    textLight: {
        fontFamily: 'Gordita',
        alignItems: 'center',

        color: "#212121"
    },
    textDark: {
        fontFamily: 'Gordita',
        alignItems: 'center',

        color: "#FFF"
    },
})

export default MyText;

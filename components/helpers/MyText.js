import React, {useContext} from 'react';

import {Text, View, StyleSheet} from 'react-native';
import {ThemeContext} from "../../util/ThemeManager";
import {useSelector} from "react-redux";

const MyText = ({children, myStyles}) => {
    const data = useSelector(state => state.data)
    const {theme} = data;
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

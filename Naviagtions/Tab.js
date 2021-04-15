import React, {useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Animated, Text} from 'react-native';
import {MaterialIcons, FontAwesome} from '@expo/vector-icons';

const Tab = ({color, tab, onPress, icon, size, textSize, textColor}) => {


    return (

        <TouchableOpacity activeOpacity={0.5} onPress={onPress} style={styles.container}>

            {icon && <FontAwesome name={icon} size={size} color={color}/>}
            <Text
                style={{color: textColor, fontFamily: 'Poppins-bold', fontSize: textSize}}

            >{tab.name}</Text>

        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    text: {}
});

export default Tab;
import React from 'react';

import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {FontAwesome} from "@expo/vector-icons";
import {Colors, DayColors} from "../constants/Colors";
const BackButton = ({navigation,theme}) => {
    return (
        <TouchableOpacity style={[
            {
             backgroundColor: theme === 'Dark'
                 ? Colors.PrimaryDarkColor : DayColors.primaryColor
            },
            styles.backBtn]} activeOpacity={0.8} onPress={() => navigation.goBack()}>
            <FontAwesome name='chevron-left' size={20} color={theme === 'Dark'
                ? DayColors.primaryColor : Colors.PrimaryDarkColor}/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
        backBtn:{
            width:45,
            height:45,
            justifyContent:'center',
            alignItems:'center',
borderRadius:100
        }

}
)

export default BackButton;

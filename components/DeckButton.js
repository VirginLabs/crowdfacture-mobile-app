import React from 'react';
import {FontAwesome, FontAwesome5} from "@expo/vector-icons";
import {Text, TouchableOpacity, View} from 'react-native';
import {Colors, DayColors} from "../constants/Colors";

const DeckButton = ({btnStyle, btnTitle, btnAction, icon, theme}) => {
    return (
        <TouchableOpacity style={btnStyle} onPress={btnAction} activeOpacity={0.9}>
            <View>
                <FontAwesome5 name={icon} size={20} color={theme === 'Dark'
                    ? DayColors.cream : Colors.PrimaryDarkColor}/>
            </View>
            <Text style={{
                fontSize: 11,
                fontFamily: "Gordita-medium",
                color: theme === 'Dark' ? "#eee" : Colors.PrimaryDarkColor
            }}>
                {
                    btnTitle
                }
            </Text>
        </TouchableOpacity>
    );
};

export default DeckButton;

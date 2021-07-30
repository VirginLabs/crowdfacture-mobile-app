import React from 'react';
import {Ionicons, FontAwesome5} from "@expo/vector-icons";
import {Text, TouchableOpacity, View} from 'react-native';
import {Colors, DayColors} from "../constants/Colors";

const DeckButton = ({btnStyle, btnTitle, btnAction, icon, theme}) => {
    return (
        <TouchableOpacity style={btnStyle} onPress={btnAction} activeOpacity={0.9}>
            <View>
                {
                    btnTitle === 'Exchange' ? <FontAwesome5 name="exchange-alt" size={14}  color={theme === 'Dark'
                        ? DayColors.cream : Colors.PrimaryDarkColor}/> :


                        <Ionicons name={icon} size={14} color={theme === 'Dark'
                            ? DayColors.cream : Colors.PrimaryDarkColor}/>
                }
            </View>
            <Text style={{
                fontSize: 9,
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

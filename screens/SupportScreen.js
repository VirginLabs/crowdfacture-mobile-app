import React, {useContext} from 'react';

import {Animated, StatusBar, StyleSheet, Text, View} from 'react-native';
import {ThemeContext} from "../util/ThemeManager";
import {Colors, DarkColors, DayColors} from "../constants/Colors";
import BackButton from "../components/BackBtn";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {FontAwesome5} from "@expo/vector-icons";


const SupportScreen = ({navigation}) => {
    const {theme} = useContext(ThemeContext);
    return (
        <Animated.View style={[styles.container, {
            backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkThree
                : "#f5f5f5"
        }]}>
            <View style={styles.top}>
                <BackButton theme={theme} navigation={navigation}/>
            </View>
            <Text style={[
                {
                    color: theme === 'Dark' ? Colors.White : '#333',
                },
                styles.title]}>
                SUPPORT
            </Text>

            <View style={styles.dialsWrap}>
                <View style={styles.iconWrap}>
                    <FontAwesome5 name='headset' size={60}/>
                </View>

                <View style={styles.contactButtons}>

                </View>


            </View>

        </Animated.View>
    );
};
const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1, alignItems: 'center', justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    top: {
        width: '100%',
    },
    title: {
        fontFamily: 'Gordita-Black',
        fontSize: 16,
    },
    wrap: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    dialsWrap: {
        width: wp('90%'),
        flexDirection: 'column',
        alignItems: 'center'
    },
    contactButtons:{

    },
    iconWrap: {
        marginVertical: 16,
        width: 130,
        height: 130,
        backgroundColor: DayColors.cream,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'

    },

});

export default SupportScreen;

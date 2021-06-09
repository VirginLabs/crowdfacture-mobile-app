import React, {useCallback, useMemo, useRef} from 'react';
import {View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions, Pressable} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {Colors, DarkColors, DayColors} from "../constants/Colors";
import {FontAwesome} from "@expo/vector-icons";

const MyBottomSheet = ({animation, handleClose, theme, children}) => {

    const screenHeight = Dimensions.get("window").height;


    const backdrop = {
        transform: [
            {
                translateY: animation.interpolate({
                    inputRange: [0, 0.01],
                    outputRange: [screenHeight, 0],
                    extrapolate: "clamp",
                })
            }
        ],
        opacity: animation.interpolate({
            inputRange: [0.01, 0.5],
            outputRange: [0, 1],
            extrapolate: "clamp"
        })
    }

    const slideUp = {
        transform: [
            {
                translateY: animation.interpolate({
                    inputRange: [0.01, 1],
                    outputRange: [0, -1 * screenHeight],
                    extrapolate: "clamp"
                })
            }
        ]
    }


    return (
        <View style={styles.container}>

            <Animated.View style={[StyleSheet.absoluteFill, styles.cover, backdrop]}/>

            <View style={styles.sheet}>
                <Animated.View style={[styles.popup, {
                    backgroundColor: theme === 'Dark' ?
                        DayColors.cardDark : '#f5f5f5'

                }, slideUp]}>
                    <TouchableOpacity     style={[{
                        backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkThree :
                            "#ddd",
                    },
                        styles.buttonClose]} onPress={handleClose}>
                        <FontAwesome name='close' size={20}
                                     color={theme === 'Dark'
                                         ? DayColors.primaryColor : Colors.PrimaryDarkColor}/>
                    </TouchableOpacity>

                    {
                        children
                    }
                </Animated.View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: wp('100%'),
        height: hp('100%'),
        position: 'absolute',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cover: {
        backgroundColor: "rgba(0,0,0,.5)",
        alignItems: 'center',
    },
    sheet: {
        position: 'absolute',
        top: Dimensions.get("window").height,
        left: 0,
        right: 0,
        bottom:0,
        height: '100%',
        justifyContent: 'flex-end'
    },
    popup: {
        padding:15,
        width:wp('100%'),
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        minHeight: 180,
        alignItems: "center",
    },
    buttonClose: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        width: 40,
        height: 40,

    },


});

export default MyBottomSheet;

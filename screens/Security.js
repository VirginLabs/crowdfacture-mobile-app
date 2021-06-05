import React, {useContext, useRef, useState} from 'react';

import {Animated, Keyboard, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ThemeContext} from "../util/ThemeManager";
import {Colors, DarkColors, DayColors} from "../constants/Colors";
import BackButton from "../components/BackBtn";
import {Ionicons} from "@expo/vector-icons";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import MyBottomSheet from "../components/BottomSheet";





const SetPin = () => {
    return (
        <View>
<Text>
    PIN
</Text>
        </View>

    )
}

let content;

const SecurityScreen = ({navigation}) => {
    const {theme} = useContext(ThemeContext);
    const animation = useRef(new Animated.Value(0)).current

    //which content is shown in the bottom sheet
    const [contentId, setContentId] = useState('');
    if (contentId === '1') {
        content = <SetPin theme={theme}/>

    }


    const handleOpen = (id) => {
        setContentId(id)
        Animated.timing(animation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start();

    }


    const handleClose = () => {
        Keyboard.dismiss()
        Animated.timing(animation, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
        }).start()
    }


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
                SECURITY
            </Text>

            <View style={styles.securityWrap}>
                <View style={styles.iconWrap}>
                    <Ionicons name='shield' size={60} color={DayColors.primaryColor}/>
                </View>


                {
                    SecButtons.map((({key, title, message, icon}) => (
                        <TouchableOpacity key={key} style={[
                            {
                                backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkTwo : '#eee'
                            },
                            styles.securityButton]} activeOpacity={.9}
                                          onPress={() => handleOpen(key)}>
                            <Ionicons name={icon} size={22} color={theme === 'Dark' ?
                                DayColors.cream
                                : DayColors.dimGreen
                            }/>

                            <View style={{

                                width: '60%',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'flex-start'
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    color: theme === 'Dark' ? '#eee' : '#131313',
                                    fontFamily: 'Gordita-bold'
                                }}>
                                    {title}
                                </Text>
                                <Text style={{
                                    color: theme === 'Dark' ? '#ddd' : '#333',
                                    fontSize: 10,
                                    fontFamily: 'Gordita-medium'
                                }}>
                                    {message}
                                </Text>
                            </View>
                        </TouchableOpacity>

                    )))
                }

            </View>

            <MyBottomSheet theme={theme} animation={animation} handleClose={handleClose}>

                {content}

            </MyBottomSheet>


        </Animated.View>
    );
};


const SecButtons = [
    {
        key: '1',
        title: 'Withdrawal pin',
        message: 'Secure your funds anytime',
        icon: 'key'
    },
    {
        key: '2',
        title: 'Update password',
        message: 'Update your private password anytime',
        icon: 'ios-lock-closed'
    }
]

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
    iconWrap: {
        marginVertical: 16,
        width: 130,
        height: 130,
        backgroundColor: 'rgba(34,34,34,0.9)',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    securityWrap: {
        alignItems: 'center',
    },
    securityButton: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: wp('80%'),
        height: 70,
        borderRadius: 25
    }


});

export default SecurityScreen;

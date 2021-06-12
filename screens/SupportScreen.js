import React, {useContext} from 'react';

import {Animated, StatusBar, TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import {ThemeContext} from "../util/ThemeManager";
import {Colors, DarkColors, DayColors} from "../constants/Colors";
import BackButton from "../components/BackBtn";
import { widthPercentageToDP as wp} from "react-native-responsive-screen";
import {FontAwesome5, Ionicons} from "@expo/vector-icons";


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
                    <FontAwesome5 name='headset' size={60} color={DayColors.cream}/>
                </View>


                <View>
                    {
                        SupportButtons.map((({key, icon, title}) => (
                            <TouchableOpacity key={key} style={[
                                {
                                    backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkTwo : '#eee'
                                },
                                styles.contactButton]} activeOpacity={.9}
                                              onPress={() => console.log('copied')}>
                                <Ionicons name={icon} size={20} color={theme === 'Dark' ?
                                    DayColors.lemon : DayColors.green}/>

                                <View style={{
                                    width: '60%',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        color: theme === 'Dark' ? '#eee' : '#131313',
                                        fontSize: 16,
                                        fontFamily: 'Gordita-bold'
                                    }}>
                                        {title}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )))
                    }
                </View>


            </View>

        </Animated.View>
    );
};


const SupportButtons = [
    {
        key: '1',
        icon: 'chatbubble-sharp',
        title: 'Connect to live chat'
    },
    {
        key: '2',
        icon: 'ios-mail',
        title: '  Send us a mail'
    },
    {
        key: '3',
        icon: 'ios-call',
        title: '  Call us'
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
    dialsWrap: {
        width: wp('90%'),
        flexDirection: 'column',
        alignItems: 'center'
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
    contactButton: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: wp('80%'),
        height: 60,
        borderRadius: 20
    }

});

export default SupportScreen;

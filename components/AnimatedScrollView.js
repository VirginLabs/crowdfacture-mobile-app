import React, {useContext, useRef, useEffect} from 'react';
import {
    View,
    StatusBar,
    StyleSheet,
    ScrollView,
    Dimensions,
    Text,
    TouchableOpacity,
    Animated, Easing
} from 'react-native';
import {useTabBar} from '../context/TabBarProvider';
import {MaterialIcons, FontAwesome} from '@expo/vector-icons';
import {ThemeContext} from "../util/ThemeManager";
import MyText from "./helpers/MyText";
import {Colors, DarkColors} from "../constants/Colors";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

const {width, height} = Dimensions.get('screen');

let offsetY = 0;


const AnimatedScrollView = ({children, routeName, routeMessage, style, navigation, ...restProps}) => {

    const {theme, transitionValue} = useContext(ThemeContext);

    const Anim = useRef(new Animated.Value(0)).current




    /*   styles[`container${theme}`]*/
    return (
        <View style={[styles.container,  {backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkThree :
            "#f5f5f5"},
        ]
        }>
            <ScrollView
                        keyboardShouldPersistTaps='handled'
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                scrollEnabled
                contentContainerStyle={styles.scrollView}
                {...restProps}
            >
                <View style={styles.top}>
                    <View style={styles.titleWrap}>
                        <MyText myStyles={styles.routeName}>
                            {routeName}
                        </MyText>
                        <MyText myStyles={styles.message}>
                        {routeMessage}
                    </MyText>
                    </View>
                    <View style={styles.notificationIconWrap}>
                        <TouchableOpacity onPress={() => navigation.navigate('Notification')} activeOpacity={0.8} style={styles.notificationIcon}>
                            <FontAwesome name={'bell'} size={20} color='#131313'/>
                        </TouchableOpacity>
                    </View>
                </View>

                    {children}

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
flex:1

    },
    containerLight: {
        backgroundColor: "#fafafa",
    },
    containerDark: {
        backgroundColor: "#00040F"
    },
    scrollView: {
        marginHorizontal:wp('5%'),
        paddingBottom:100
    },
    top: {
        flex: 0.4,
        height: 100,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titleWrap: {
        width: '40%',
        height: 90,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'

    },
    routeName: {
        padding: 3,
        fontFamily: 'Gordita-bold',
        color: "#1c1c1c",
        fontWeight: 'bold',
        fontSize: 18,
    },

    message: {
        padding: 3,
        fontSize: 10,
        fontFamily: 'Gordita',
    },

    notificationIconWrap: {
        width: '40%',
        height: 90,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    notificationIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: '#ee9344',
    }
});

export default AnimatedScrollView;
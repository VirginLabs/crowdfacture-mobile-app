import React, {useContext, useRef, useEffect} from 'react';
import {
    View,
    StatusBar,
    SafeAreaView,
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

const {width, height} = Dimensions.get('screen');

let offsetY = 0;


const AnimatedScrollView = ({children, routeName, routeMessage, style, ...restProps}) => {
    const {setShowTabBar} = useTabBar();
    const {theme, transitionValue} = useContext(ThemeContext);


    /*   styles[`container${theme}`]*/
    return (
        <Animated.View style={[styles.container, theme === 'Dark' ?
            {
                backgroundColor: '#131313', opacity: transitionValue

            } : {
                backgroundColor: "#fafafa",


            }, style]}>
            <ScrollView
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
                        </MyText><Text style={styles.message}>
                        {routeMessage}
                    </Text>
                    </View>
                    <View style={styles.notificationIconWrap}>
                        <TouchableOpacity activeOpacity={0.8} style={styles.notificationIcon}>
                            <FontAwesome name={'bell'} size={20} color='#131313'/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={style}>
                    {children}
                </View>
            </ScrollView>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        flex: 1,
    },
    containerLight: {
        backgroundColor: "#fafafa",

    },
    containerDark: {
        backgroundColor: "#00040F"
    },
    scrollView: {
        marginHorizontal: 20,
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
        fontSize: 13,
        fontFamily: 'Gordita',
        color: "#454545"
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
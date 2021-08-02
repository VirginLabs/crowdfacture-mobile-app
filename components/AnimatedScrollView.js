import React, {useEffect, useRef, useState} from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    RefreshControl,
    TouchableOpacity,
     AppState
} from 'react-native';
import {MaterialIcons, FontAwesome} from '@expo/vector-icons';
import MyText from "./helpers/MyText";
import {Colors, DarkColors} from "../constants/Colors";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {useSelector} from "react-redux";

import {SafeAreaView} from "react-native-safe-area-context";




const AnimatedScrollView = ({children,refreshing, onRefresh, routeName, routeMessage, style, navigation, ...restProps}) => {

    const data = useSelector(state => state.data)
    const {theme} = data;
    const appState = useRef(AppState.currentState)

    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    useEffect(() =>{
        AppState.addEventListener("change", _handleAppStateChange)
        return () =>{
            AppState.removeEventListener("change", _handleAppStateChange)
        }

    },[])


    const _handleAppStateChange = (nextAppState) =>{
if(appState.current.match(/inactive|background/) &&
    nextAppState === "active"){
    console.log("APP IS NOW ON THE FOREGROUND")
}

appState.current = nextAppState
        setAppStateVisible(appState.current)
        console.log("Appstate:", appState.current)
    }




    return (
        <SafeAreaView style={[styles.container,  {backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkThree :
                "#f5f5f5"},
        ]
        }>



            <ScrollView
                        keyboardShouldPersistTaps='handled'
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                scrollEnabled
                contentContainerStyle={styles.scrollView}

                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
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

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {

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
        fontSize: 16,
    },

    message: {
        padding: 3,
        fontSize: 8,
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

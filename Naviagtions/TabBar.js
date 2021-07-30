import React, {useContext, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Dimensions, Animated, Easing} from 'react-native';
import Tab from './Tab';

import {Colors, DarkColors, DayColors} from "../constants/Colors";
import { widthPercentageToDP as wp} from "react-native-responsive-screen";
import {useSelector} from "react-redux";

const {width} = Dimensions.get('screen');

let textColor;
const TabBar = ({state, navigation}) => {
    const data = useSelector(state => state.data)
    const {theme} = data;

    const [selected, setSelected] = useState('Home');
    const {routes} = state;
   const renderColor = currentTab => (currentTab === selected ? Colors.Primary  : '#ccc')


    const renderSize = currentTab => (currentTab === selected ? 22 : 18);
    const textSize = currentTab => (currentTab === selected ? 10 : 8);


    const animation = useRef(new Animated.Value(0)).current;

    if(theme === 'Dark') {
        textColor = currentTab => (currentTab === selected ? Colors.Primary : '#eee');
    }else{
        textColor = currentTab => (currentTab === selected ? Colors.Primary : '#131313');
    }


    const handlePress = (activeTab, index) => {
        if (state.index !== index) {
            setSelected(activeTab);
            navigation.navigate(activeTab);
        }

    };

 /*   useEffect(() => {
        toggleTabBarAnimation();

    }, [showTabBar]);*/

    useEffect(() => {
        handlePress('Dashboard', 1)
    }, [])
    return (
        <View style={styles.wrapper}>
            <Animated.View style={[theme === 'Dark' ? styles.containerD : styles.containerW,
                {transform: [{translateY: animation}]}]}>{routes.map((route, index) => (


                <Tab
                    tab={route}
                    icon={route.params.icon}
                    onPress={() => handlePress(route.name, index)}
                    color={renderColor(route.name)}
                    textSize={textSize(route.name)}
                    size={renderSize(route.name)}
                    textColor={textColor(route.name)}
                    key={index}
                />

            ))}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width:wp('100%'),
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0,
       position:'absolute'
    },

    containerW: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        height: 75,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    containerD: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: DarkColors.primaryDark,
        height: 75,
        borderTopColor:DayColors.cardDark,
        borderWidth:1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
});

export default TabBar;

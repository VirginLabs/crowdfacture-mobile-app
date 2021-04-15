import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import { useTabBar } from '../context/TabBarProvider';
import Tab from './Tab';

const { width } = Dimensions.get('screen');

const TabBar = ({ state, navigation }) => {
    const [selected, setSelected] = useState('Home');
    const { routes } = state;
    const renderColor = currentTab => (currentTab === selected ? '#ef5f1d' : '#ccc');
    const textColor = currentTab => (currentTab === selected ? '#131313' : '#ccc');
    const renderSize = currentTab => (currentTab === selected ? 22 : 18);
    const textSize = currentTab => (currentTab === selected ? 12 : 8);

    const { showTabBar } = useTabBar();

    const animation = useRef(new Animated.Value(0)).current;


    const toggleTabBarAnimation = () => {

        if (showTabBar) {
            Animated.timing(animation, {
                toValue: 0.8,
                duration: 200,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(animation, {
                toValue: 100,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
    };

    const handlePress = (activeTab, index) => {
        if (state.index !== index) {
            setSelected(activeTab);
            navigation.navigate(activeTab);
        }

    };

    useEffect(() => {
        toggleTabBarAnimation();

    }, [showTabBar]);

    useEffect(() =>{
        handlePress('Dashboard', 1)
    },[])
    return (
        <View style={styles.wrapper}>
            <Animated.View
                style={[styles.container, { transform: [{ translateY: animation }] }]}
            >
                {routes.map((route, index) => (



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
        width,
        alignItems: 'center',
        justifyContent: 'center',
        bottom:0
    },
    tabWrap:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        height: 75,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
});

export default TabBar;
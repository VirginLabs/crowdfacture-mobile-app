import React, {useEffect, useRef} from 'react';

import {Animated, Dimensions, StatusBar, Text, View} from 'react-native';
import {DayColors} from "../constants/Colors";

const ToastMessage = ({message, type,onHide}) =>
{
    const opacity = useRef(new Animated.Value(0))
        .current;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.delay(2000),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start(() => {
           onHide && onHide();
        });
    }, []);

    return (
        <Animated.View
            style={{
                opacity,
                transform: [
                    {
                        translateY: opacity.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-20, 0],
                        }),
                    },
                ],
                position:'absolute',
                top:  150,
                margin: 10,
                marginBottom: 5,
                backgroundColor: type === 'error' ? 'red' : DayColors.green,
                padding: 10,
                borderRadius: 10,
                shadowColor: 'black',
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.15,
                shadowRadius: 5,
                elevation: 6,
            }}
        >
            <Text style={{
                fontFamily:'Gordita-medium',
                color: type === 'error' ? '#eee' : '#131313',
            }}>{message}</Text>
        </Animated.View>
    );
};

export default ToastMessage;

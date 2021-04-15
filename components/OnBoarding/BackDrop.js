import {Animated, Dimensions, StyleSheet} from "react-native";
import React from "react";
const {width, height} = Dimensions.get('screen');

const bgs = ['#ea7b02','#183A37', '#010D1C' ];

const BackDrop = ({scrollX}) => {

    const backgroundColor = scrollX.interpolate({
        inputRange: bgs.map((_, i) => i * width),
        outputRange: bgs.map((bg) => bg)
    })

    return <Animated.View
        style={
            [
                StyleSheet.absoluteFillObject,
                {
                    backgroundColor: backgroundColor
                }]}
    >




    </Animated.View>
}

export default BackDrop
import React from 'react';

import {Text, useWindowDimensions} from 'react-native';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
    useAnimatedGestureHandler
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

const BottomSheet = () => {


    const dimension = useWindowDimensions();
    const top = useSharedValue(
        dimension.height
    )

    const style = useAnimatedStyle(() =>{
return{
    top : top.value
}
    })
    const gestureHandler = useAnimatedGestureHandler({})



    return (
        <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={[{
                position: 'Absolute',
                right: 0,
                bottom: 0,
                left: 0,
                backgroundColor: 'white',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                shadowColor: '#ccc',
                shadowOffset: {
                    width: 0,
                    height: 2,

                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center',
            }, style]}>

                <Text>
                    BOTTOM SHEET
                </Text>
            </Animated.View>
        </PanGestureHandler>
    );
};

export default BottomSheet;

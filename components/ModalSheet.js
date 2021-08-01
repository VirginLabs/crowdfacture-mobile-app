import React, {useCallback} from 'react';

import {TouchableOpacity, Keyboard} from 'react-native';
import Animated, {Easing, useAnimatedStyle, withSpring, withTiming} from "react-native-reanimated";
import {TapGestureHandler} from "react-native-gesture-handler";

import {useDispatch, useSelector} from "react-redux";
import {Ionicons} from "@expo/vector-icons";
import {DarkColors} from "../constants/Colors";
import ToastMessage from "./Toast";
import {clearErrors, clearMessage} from "../redux/actions/user-action";




const ModalSheet = ({opacity,offset,zIndex,children,height}) => {
const dispatch = useDispatch()
    const data = useSelector(state => state.data)
    const user = useSelector(state => state.user)
    const {theme} = data
    const {
         message, error,

    } = user

    const sheetStyle = useAnimatedStyle(() => {

        return {
            opacity: opacity.value,
          transform:[{translateY:offset.value }]
        }
    })

    const sheetOverlayStyle = useAnimatedStyle(() => {

        return {
            opacity: opacity.value,
            zIndex:zIndex.value
        }
    })



    const closeSheet = useCallback(() => {
        opacity.value = withSpring(0)
        zIndex.value = 0
        offset.value = withTiming(600, {
            duration: 300,
            easing: Easing.out(Easing.exp),
        })
Keyboard.dismiss()
        //dispatch(toggleBottomTab())
    }, []);





    return (

        <Animated.View style={[sheetOverlayStyle,{
                backgroundColor:'rgba(29,29,29,0.8)',
            width: '100%',
            height:'100%',
            flex:1,
            position: "absolute",
            alignItems:'center',
            justifyContent:'flex-end',

            }]}>
            {message &&
            <ToastMessage onHide={() => dispatch(clearMessage())} message={message} type='message'/>
            }

            {error &&  <ToastMessage onHide={() => dispatch(clearErrors())} message={error} type='error'/>}



            <TapGestureHandler onActivated={closeSheet}>
                <Animated.View>
                    <TouchableOpacity activeOpacity={0.5} style={{
                        borderRadius: 100,
                        backgroundColor: '#cbcbcb',
                        width: 50,
                        marginVertical:15,
                        height: 50,
                        alignItems: "center",
                        justifyContent: 'center'
                    }}>
                        <Ionicons name='ios-close' size={25}/>
                    </TouchableOpacity>
                </Animated.View>
            </TapGestureHandler>

            <Animated.View style={[sheetStyle, {
                    width: '100%',
                    height: height? height : 500,
                paddingTop:20,
                    backgroundColor:theme === 'Dark'? DarkColors.primaryDarkThree :  '#fff',
                    justifyContent:'center',
                    alignItems:'center',
                    borderRadius:20,
                }]}>

                {
                    children
                }


                </Animated.View>

            </Animated.View>
    );
};

export default ModalSheet;

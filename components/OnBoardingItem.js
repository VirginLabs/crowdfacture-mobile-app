import React from 'react';

import {Text, View, StyleSheet, useWindowDimensions, Image} from 'react-native';
import Paginator from "./Paginator";
import {Colors} from "../constants/Colors";

const OnBoardingItem = ({item}) => {
    const {width} = useWindowDimensions()
    return (
        <View style={[MyStyles.container, {width}]}>
            {/*<Image source={{uri:item.image}} style={[MyStyles.image, {width, resizeMode: 'cover'}]}/>*/}
            <Image source={{uri:item.image}} style={MyStyles.image}/>
            <View style={{flex: 0.3}}>
                <Text style={MyStyles.title}>
                    {item.title}
                </Text>
                <Text style={MyStyles.description}>
                    {item.description}
                </Text>
            </View>

        </View>
    );
};

const MyStyles = StyleSheet.create({
    image: {
       /* flex: 0.7,
        justifyContent: 'center'*/
    width:250,
    height:250,
        resizeMode: 'cover',
        borderRadius:200
    },
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    title: {
        padding:18,
        textAlign: 'center',
        fontFamily: 'poppins-bold',
        fontSize: 28,
        color:Colors.PrimaryDarkColor
    },
    description: {
        textAlign: 'center',
        fontFamily: 'poppins-medium',
        paddingHorizontal:64,
        color: '#212121'

    }
})

export default OnBoardingItem;

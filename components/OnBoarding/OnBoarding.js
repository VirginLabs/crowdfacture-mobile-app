import React, {useState, useRef} from 'react';
import {StatusBar, Animated, Text, Image, FlatList, ImageBackground, View, StyleSheet, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BackDrop from "./BackDrop";
import AsyncStorage from "@react-native-async-storage/async-storage";

const {width, height} = Dimensions.get('screen');


const DATA = [
    {
        "textColor": "#131313",
        "key": "3571572",
        "title": "Pretty ambitious",
        "description": "For decades africa have suffered poverty and unemployment, together, we can end it by producing locally, manufacturing and at affordable distributing",
        "image": "https://images.unsplash.com/photo-1566221857770-508d35ee6220?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
    },
    {
        "key": "3571747",
        "textColor": "#ffffff",
        "title": "Capable hands",
        "description": "Led by a team of people with vast experience in Agriculture, Finance, Blockchain, Logistics and Local empowerment, Crowdfacture is here to stay.",
        "image": "https://images.unsplash.com/photo-1546547627-8d2714230980?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
    },
    {
        "key": "3571680",
        "textColor": "#ffffff",
        "title": "Dedicated community",
        "description": "A strong community backed by investors who believe in the african future through manufacturing and local production",
        "image": "https://images.unsplash.com/photo-1583601215349-bc12c255d077?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80"
    },

]


const Indicator = ({scrollX}) => {


    return <View style={{
        flex: 0.1, flexDirection: 'row',
    }}>
        {
            DATA.map((_, i) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1)
                * width];

                const scale = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.8, 1.4, 0.8],
                    extrapolate: 'clamp'
                })
                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.6, 0.9, 0.4],
                    extrapolate: 'clamp'
                })
                return <Animated.View key={`indicator=${i}`}
                                      style={{
                                          height: 10,
                                          width: 10,
                                          borderRadius: 5,
                                          margin: 10,
                                          opacity,
                                          backgroundColor: "#fff",
                                          transform: [
                                              {
                                                  scale
                                              }
                                          ]
                                      }}
                >


                </Animated.View>
            })
        }
    </View>
}

const SquareImage = ({scrollX, imageUri}) => {
    const YOLO = Animated.modulo(
        Animated.divide(
            Animated.modulo(scrollX, width),
            new Animated.Value(width)
        ), 1)

    const rotate = YOLO.interpolate({
        inputRange: [0, .5, 1],
        outputRange: ['35deg', '0deg', '35deg']
    })
    const translateX = YOLO.interpolate({
        inputRange: [0, .5, 1],
        outputRange: [0, -height, 0]
    })


    return <Animated.View
        style={{
            width: height,
            height: height,

            borderRadius: 86,
            position: 'absolute',
            top: -height * 0.63,
            left: -height * 0.3,

            transform: [
                {
                    rotate
                },
                {
                    translateX
                }
            ]

        }}>

        <Image source={{uri: imageUri}}
               style={{

                   flex: 1,
                   backgroundColor: "#ccc",
                   borderRadius: 86,
                   resizeMode: 'cover'
               }}
        />


    </Animated.View>
}


const OnBoarding = ({navigation}) => {
    const scrollX = useRef(new Animated.Value(0)).current

    const skip = async () => {
        console.log('e dey work na')
        //navigation.navigate('MyNavigation')

        try {
            await AsyncStorage.setItem('A_first_time_open', 'true');
            AsyncStorage.getItem('A_first_time_open').then((value) => {
                // console.log(value)

                navigation.navigate('Dashboard', {screen: 'Auth'});


            })

        } catch (err) {
            console.log('Error @A_first_time_launch: ', err);
        }
        console.log(navigation)
    }
    return (

        <View style={styles.container}>
            <StatusBar hidden/>

            <BackDrop scrollX={scrollX}/>
            {/* <Square scrollX={scrollX}/>*/}
            <Animated.FlatList
                data={DATA}
                horizontal
                scrollEventThrottle={32}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}],
                    {useNativeDriver: false}
                )}
                pagingEnabled
                contentContainerStyle={{paddingBottom: 100}}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.key}
                renderItem={({item}) => {
                    return (
                        <View style={{
                            width, alignItems: 'center',
                            padding: 20
                        }}>

                            <View style={{
                                flex: 0.9,
                                justifyContent: 'center',
                                backgroundColor: '#fff'
                            }}>

                            </View>
                            <SquareImage scrollX={scrollX} imageUri={item.image}/>


                            <View style={{flex: .3}}>
                                <Text style={{
                                    lineHeight: 55,
                                    fontFamily: 'Gordita-Black',
                                    fontWeight: '800', fontSize: 44,
                                    marginBottom: 10, color: item.textColor
                                }}>{item.title}
                                </Text>
                                <Text style={{
                                    fontFamily: 'Gordita-medium',
                                    fontWeight: '300',
                                    fontSize: 16,
                                    lineHeight: 26, color: item.textColor
                                }}>
                                    {item.description}
                                </Text>
                            </View>

                        </View>
                    )
                }}
            />
            <Indicator scrollX={scrollX}/>

            <View style={{
                position: 'absolute',
                bottom: 10,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                padding: 5,
                width: '100%',

            }}>


                <TouchableOpacity title='start' style={styles.bottomBtn} onPress={skip}>
                    <Text style={styles.btnTxt}>
                        Start here
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e0e0e0',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    bottomBtn: {
        margin: 10,
        width: 100,
        backgroundColor: 'rgba(52, 52, 52, 0.4)',
        height: 40,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center'

    },
    btnTxt: {
        fontFamily: 'Gordita-medium',
        fontWeight: '300',
        fontSize: 16,
        color: '#fff'
    },
    image: {
        borderRadius: 86,
        flex: 1,
        resizeMode: "contain",

    },
});

export default OnBoarding
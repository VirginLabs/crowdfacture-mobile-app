import React, {useState} from 'react'
import {View, StyleSheet, Image, Text, ImageBackground, StatusBar} from "react-native";
import {RFPercentage, RFValue} from "react-native-responsive-fontsize";
import {Asset} from 'expo-asset';
import AppLoading from "expo-app-loading";
import {Colors} from "../constants/Colors";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import MyButton from "../components/MyButton";

function cacheImages(images) {
    return images.map(image => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
}


const Auth = (props) => {
    const [loadAssets, setLoadAssets] = useState(false);

    const _loadAssetsAsync = async () => {
        const imageAssets = cacheImages([
            require('../assets/images/bg.jpg'),
        ]);


        await Promise.all([...imageAssets]);
    }

    if (!loadAssets) {
        return (
            <AppLoading
                startAsync={_loadAssetsAsync}
                onFinish={() => setLoadAssets(true)}
                onError={console.warn}
            />
        );
    }

    return (

        <View style={styles.container}>

            <ImageBackground style={{
                width: wp('100%'),
                height: hp("100%"),
                resizeMode: 'cover',
                justifyContent: 'space-between',
                alignItems: 'center',
            }} source={require('../assets/topology.png')}>


                <View style={styles.wrap}>


                    <View style={styles.logoContainer}>
                        <Image
                            style={styles.tinyLogo}
                            source={require('../assets/logo/CrowdfactureIcon.png')}
                        />

                    </View>
                    <View style={styles.textWrap}>
                        <Text style={styles.welcomeText}>
                            WELCOME TO
                            CROWDFACTURE
                        </Text>
                    </View>

                    <View style={styles.buttonsWrap}>
                        <MyButton action={() => props.navigation.navigate('Login')} title='SIGN UP'
                                  buttonStyle={styles.buttonStyle} textStyle={styles.buttonText}/>
                        <MyButton buttonStyle={styles.smBtn}>

                            <Image source={require('../assets/fingerprint.png')} style={styles.btnImage}/>
                        </MyButton>

                    </View>

                    <View style={styles.smallTextClick}>
                        <Text style={styles.clickText} onPress={() => {
                            console.log('WHERE UNA DEY SEE THIS MONEY')
                        }}>
                             Have account? Signin
                        </Text>
                    </View>
                </View>

                <View style={styles.bottomText}>
                    <Text style={styles.clickText} onPress={() => {
                        console.log('WHERE UNA DEY SEE THIS MONEY')
                    }}>
                        Use sumotrust
                    </Text>
                </View>
            </ImageBackground>

        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.PrimaryDarkColor,
        paddingTop: StatusBar.currentHeight
        //backgroundColor: 'rgba(52, 52, 52, 0.4)',
    },
    wrap: {
        flex: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        width: wp('90%'),
        height: hp('10%'),
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    tinyLogo: {
        width: 100,
        height: 50,
        resizeMode: 'cover'
    },
    textWrap: {
        width: wp('75%'),
        height: hp('20%'),
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    welcomeText: {
        fontFamily: 'Gordita-Black',
        fontWeight: '300',
        fontSize: RFPercentage(3),
        lineHeight: RFPercentage(5),
        color: '#fff'
    },
    buttonsWrap: {
        width: wp('75%'),
        height: hp('10%'),
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    buttonStyle: {
        width: 160,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.Primary,
        borderRadius: 10,

    },
    smBtn: {
        marginLeft: 20,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 10,
        borderColor: "#ccc",
        borderWidth: 2

    },
    btnImage: {
        width: 40,
        height: 40,
    },
    buttonText: {
        fontFamily: 'Poppins-bold',
        fontSize: 20
    },
    smallTextClick: {
        width: wp('75%'),
        height: hp('5%'),
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },

    clickText: {
        padding:10,
        fontFamily: 'Gordita-medium',
        fontSize: RFPercentage(2),
        color: '#eee'
    },
    bottomText: {
        bottom: 10,
        marginBottom: 10,
        width: wp('75%'),
     flex:0.3,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        flexDirection: 'column'
    },


})

export default Auth;



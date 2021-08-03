import React, {useState,useEffect} from 'react'
import * as LocalAuthentication from 'expo-local-authentication'
import {
    View,
    StyleSheet,
    Image,
    Alert,
    Text,
    ImageBackground,
    StatusBar,
    TouchableOpacity, ActivityIndicator
} from "react-native";
import {RFPercentage} from "react-native-responsive-fontsize";
import {Asset} from 'expo-asset';
import {Colors, DayColors} from "../constants/Colors";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from '@expo/vector-icons';

import MyButton from "../components/MyButton";
import PropTypes from "prop-types";
import {getUser} from "../redux/actions/user-action";
import {connect} from "react-redux";

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
    // wherever the useState is located
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);
    // wherever the useState is located
    const {getUser, clearMessage, clearError} = props
    const {loading} = props.user


    const [isBioMetric, setIsBioMetric] = useState(true);



    useEffect(() =>{
        AsyncStorage.getItem('crowdFactureUser').then(value =>{
            if(value === null) setIsBioMetric(false)
        })
    },[])



// Check if hardware supports biometrics
    useEffect(() => {
        (async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setIsBiometricSupported(compatible);
        })();
    },[]);





    const onFaceId = async () => {
        try {
            // Checking if device is compatible
            const isCompatible = await LocalAuthentication.hasHardwareAsync();

            if (!isCompatible) {
                throw new Error('Your device isn\'t compatible.')
            }

            // Checking if device has biometrics records
            const isEnrolled = await LocalAuthentication.isEnrolledAsync();

            if (!isEnrolled) {
                throw new Error('No Faces / Fingers found.')
            }

            // Authenticate user


    const auth =  await LocalAuthentication.authenticateAsync();
            if(auth.success){

                AsyncStorage.getItem('crowdFactureUser').then(value =>{
                    getUser(value)
                    //Alert.alert('Authenticated', `Welcome back ! ${value}`)
                })
            }else{
                 Alert.alert(
                    'Biometric record not found',
                    'Please verify your identity with your password')
            }




        } catch (error) {
            Alert.alert('An error as occured', error?.message);
        }
    };




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
                        <MyButton action={() => props.navigation.navigate('Login')} title='START'
                                  buttonStyle={styles.buttonStyle} textStyle={styles.buttonText}/>
                        {
                            isBioMetric &&   <MyButton buttonStyle={styles.smBtn} action={onFaceId}>

                               {/* <Image source={require('../assets/fingerprint.png')} style={styles.btnImage}/>*/}
                                <Ionicons name="finger-print" size={28} color="#fff" />
                            </MyButton>
                        }


                    </View>

                    <TouchableOpacity onPress={() => props.navigation.navigate('Sumotrust')} style={styles.smallTextClick}>
                        <Text style={styles.clickText}>
                          Login with Sumotrust
                        </Text>
                    </TouchableOpacity>


                    {/*In our JSX we conditionally render a text to see inform users if their device supports*/}
                    {
                        loading && <ActivityIndicator size="large" color={DayColors.primaryColor}/>
                    }
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
        borderColor: "#ddd",
        borderWidth: 1

    },
    btnImage: {
        width: 40,
        height: 40,
    },
    buttonText: {
        fontFamily: 'Gordita-bold',
        fontSize: 18
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

Auth.propTypes = {
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
}
const mapActionToPops = {
    getUser,

}


const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user,
})


export default connect(mapStateToProps, mapActionToPops) (Auth);



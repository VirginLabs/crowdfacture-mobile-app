import React, {useContext} from 'react';
import {FontAwesome} from '@expo/vector-icons';
import {StyleSheet, Button, Text, View, Animated, TouchableOpacity, Dimensions} from 'react-native';
import AnimatedScrollView from "../components/AnimatedScrollView";
import {ThemeContext} from "../util/ThemeManager";
import MyText from "../components/helpers/MyText";
import {Colors} from "../constants/Colors";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const UserProfile = ({navigation}) => {


    const {toggleTheme, theme} = useContext(ThemeContext);
    return (
        <AnimatedScrollView routeMessage='Your profile' routeName='Profile'>
            <Animated.View style={styles.container}>
                <View>

                </View>


                <View style={styles.profileImageWrap}>
                    <View style={styles.profileImageContainer}>

                    </View>
                </View>


                <View style={styles.nameWrap}>

                </View>
                <View style={styles.emailWrap}>

                </View>

                <View style={styles.buttonWrap}>
                    <View style={styles.boxOne}>

                    </View>
                    <View style={styles.boxOne}>

                    </View>
                    <View style={styles.boxOne}>

                    </View>
                    <View style={styles.boxOne}>

                </View>
                    <View style={styles.boxOne}>

                </View>
                    <View style={styles.boxOne}>
                        <TouchableOpacity
                            style={[styles.themeBtn, styles[`themeBtn${theme}`]]}
                            activeOpacity={0.8}
                            onPress={toggleTheme}
                            title="Toggle">
                            {
                                theme === "Dark" ?
                                    <FontAwesome name='sun-o' size={16} color='white'/>

                                    :
                                    <FontAwesome name='moon-o' size={16} color='white'/>
                            }
                        </TouchableOpacity>
                </View>
                </View>


            </Animated.View>
        </AnimatedScrollView>

    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileImageWrap: {
        width: Dimensions.get('screen').width - 70,
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
    },
    profileImageContainer: {
        width: 120,
        height: 120,
        borderRadius: 120,
        backgroundColor: '#2e8f2e',

    },
    nameWrap: {
        padding: 10,
        height:45,
        backgroundColor: '#eee',
        marginVertical: 4,
        width: wp('80%'),
    },
    emailWrap: {
        height:45,
        padding: 10,
        backgroundColor: '#eee',
        marginVertical: 4,
        width: wp('80%'),
    },
    buttonWrap: {
        marginVertical: 10,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',

    },
    boxOne: {
        marginVertical:5,
        width: wp('80%'),
        height: 65,
        padding:10,
        backgroundColor: "#ddd",
        borderRadius: 15
    },
    themeBtn: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40
    },
    themeBtnDark: {
        backgroundColor: Colors.Primary,
    },
    themeBtnLight: {
        backgroundColor: Colors.PrimaryDarkColor,
    }


})

export default UserProfile;

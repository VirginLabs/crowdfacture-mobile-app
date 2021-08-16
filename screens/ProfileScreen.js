import React, { useEffect, useState} from 'react';
import {FontAwesome,FontAwesome5, Ionicons} from '@expo/vector-icons';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    Animated,
    TouchableOpacity,
    Platform,
    Image,
    ActivityIndicator, Linking
} from 'react-native';
import AnimatedScrollView from "../components/AnimatedScrollView";

import * as ImagePicker from "expo-image-picker";
import {Colors, DarkColors, DayColors} from "../constants/Colors";
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {clearErrors, clearMessage, getUser, logoutUser, updateUserImage} from "../redux/actions/user-action";
import {connect, useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import ToastMessage from "../components/Toast";
import {toggleTheme} from "../redux/actions/data-action";




const handlePress =  (url) => {
    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
    // by some browser in the mobile
    Linking.openURL(url);

};

const wait = timeout => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
};


const createFormData = (photo, body = {}) => {
    const data = new FormData();
    data.append('profileImage', {
        name: photo.fileName,
        type: photo.type,
        uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '')
            : photo.uri
    });
    Object.keys(body).forEach((key) => {
        data.append(key, body[key])
    })

    return data;
}


let textStyle, boxStyle, smTextStyle;

const UserProfile = (props) => {

    const dispatch = useDispatch()

const user = useSelector(state => state.user)
const data = useSelector(state => state.data)
    const [refreshing, setRefreshing] = React.useState(false);

    const [permission, setPermission] = useState(false);

    const [photo, setPhoto] = useState(null);

    const {
 navigation
    } = props
    const {error, loading, message, userData} = user
    const { theme} = data


    const {member: {LastName,ReferralBalance, Active, FirstName, Token, Phone, EmailAddress, ID, ProfilePicture}} = userData


    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const {status} = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Sorry, we need camera roll permission to make this work')
                }

            }
        })();
    }, [])




    const takeImage = async () => {
        // make sure that we have the permission

            // launch the camera with the following settings
            let image = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [3, 3],
                quality: 1,
                base64: true,
            })
            // make sure a image was taken:
            if (!image.cancelled) {


               await setPhoto(image.uri)
                 //console.log(image.base64)


                const formData = new FormData();
               formData.append('profileImage',photo);
               formData.append('userId', ID);
                 updateUserImage(formData);

                //react does not support file url so we write the code below

            }

    }


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(getUser(Phone))
        wait(2000).then(() => setRefreshing(false));
    }, []);


    textStyle = theme === 'Dark' ? '#fff' : Colors.PrimaryDarkColor
    smTextStyle = theme === 'Dark' ? '#eee' : Colors.PrimaryDarkColor
    boxStyle = theme === 'Dark' ? DarkColors.primaryDarkTwo : Colors.White

    return (
        <AnimatedScrollView refreshing={refreshing} onRefresh={onRefresh} routeMessage='Your profile' navigation={navigation} routeName='Profile'>


            <Animated.View style={styles.container}>


                <View style={styles.profileImageWrap}>
                    <TouchableOpacity activeOpacity={0.8} onPress={takeImage}
                                      style={styles.profileImageContainer}>


                        {
                            ProfilePicture === null ?
                                <Text style={{
                                    color: '#131313',
                                    fontSize:30,
                                    textTransform: 'uppercase',
                                    fontFamily:'Gordita-Black'
                                }}>

                                    {
                                        LastName.split('').slice(0, 1)
                                    }
                                    {
                                        FirstName.split('').slice(0, 1)
                                    }
                                </Text> :
                                <Image style={{
                                    width: 120,
                                    height: 120,
                                    borderRadius: 120,
                                }} resizeMode='cover' source={{uri:ProfilePicture}} alt='user'/>
                        }

                        {
                            loading && <ActivityIndicator size="large" color='#131313'/>
                        }

                            </TouchableOpacity>


                </View>




                <Text style={[{
                    color: smTextStyle
                }, styles.nameWrap]}>
                    {LastName} {FirstName}
                </Text>


                <TouchableOpacity
                    style={[styles.emailWrap, styles[`themeBtn${theme}`]]}
                    activeOpacity={0.8}
                    onPress={() => dispatch(toggleTheme())}
                    title="Toggle">
                    {
                        theme === "Dark" ?
                            <Ionicons name='md-sunny' size={18} color={Colors.Primary}/>

                            :
                            <FontAwesome name='moon-o' size={18} color='white'/>
                    }
                </TouchableOpacity>


                <TouchableOpacity onPress={() => navigation.navigate('Referral')} activeOpacity={0.7}
                                  style={[theme === 'Dark' ? {

                                      borderColor: DarkColors.primaryDarkTwo,
                                      borderWidth: 1
                                  } : {
                                      backgroundColor: '#fff'
                                  }, styles.boxOne]}>
                    <View style={styles.actionIcon}>
                        <FontAwesome name={'user-plus'} size={14} color={theme === 'Dark'
                            ? DayColors.cream : Colors.PrimaryDarkColor}/>
                    </View>
                    <View style={styles.actionName}>
                        <Text style={[{color: textStyle}, styles.actionTitle]}>
                            Referral Earnings
                        </Text>
                        <Text style={[{
                            color: smTextStyle
                        }, styles.subName]}>
                            N{ReferralBalance}
                        </Text>

                    </View>
                    <View style={styles.actionBtn}>
                        <FontAwesome name='chevron-right' size={14} color={theme === 'Dark'
                            ? DayColors.cream : Colors.PrimaryDarkColor}/>
                    </View>
                </TouchableOpacity>


                <View style={styles.buttonWrap}>

                    <View style={[
                        theme === 'Dark' ? {

                            borderColor: DarkColors.primaryDarkTwo,
                            borderWidth: 1
                        } : {
                            backgroundColor: '#fff'
                        }, styles.boxOne]}>
                        <View style={styles.actionIcon}>
                            <FontAwesome name='envelope' size={16} color={theme === 'Dark'
                                ? DayColors.cream : Colors.PrimaryDarkColor}/>
                        </View>
                        <View style={styles.actionName}>
                            <Text style={[{color: textStyle}, styles.actionTitle]}>
                                Email
                            </Text>
                            <Text style={[{
                                color: smTextStyle
                            },
                                styles.subName]}>
                                {EmailAddress}
                            </Text>

                        </View>
                        <View style={styles.actionBtn}>

                        </View>
                    </View>
                    <View style={[theme === 'Dark' ? {

                        borderColor: DarkColors.primaryDarkTwo,
                        borderWidth: 1
                    } : {
                        backgroundColor: '#fff'
                    }, styles.boxOne]}>
                        <View style={styles.actionIcon}>
                            <FontAwesome name='phone' size={14} color={theme === 'Dark'
                                ? DayColors.cream : Colors.PrimaryDarkColor}/>
                        </View>
                        <View style={styles.actionName}>
                            <Text style={[{color: textStyle}, styles.actionTitle]}>
                                Phone Number
                            </Text>
                            <Text style={[{
                                color: smTextStyle
                            }, styles.subName]}>
                                {Phone}
                            </Text>

                        </View>
                        <View style={styles.actionBtn}>

                        </View>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('AddBank')} activeOpacity={0.7} style={[theme === 'Dark' ? {

                        borderColor: DarkColors.primaryDarkTwo,
                        borderWidth: 1
                    } : {
                        backgroundColor: '#fff'
                    }, styles.boxOne]}>
                        <View style={styles.actionIcon}>
                            <FontAwesome name="bank" size={14} color={theme === 'Dark'
                                ? DayColors.cream : Colors.PrimaryDarkColor} />
                        </View>
                        <View style={styles.actionName}>
                            <Text style={[{color: textStyle}, styles.actionTitle]}>
                                Add Bank
                            </Text>
                            <Text style={[{
                                color: smTextStyle
                            }, styles.subName]}>
                                Add your bank details to instant withdrawals
                            </Text>

                        </View>
                        <View style={styles.actionBtn}>
                            <FontAwesome name='chevron-right' size={14} color={theme === 'Dark'
                                ? DayColors.cream : Colors.PrimaryDarkColor}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} style={[theme === 'Dark' ? {

                        borderColor: DarkColors.primaryDarkTwo,
                        borderWidth: 1
                    } : {
                        backgroundColor: '#fff'
                    }, styles.boxOne]}>

                        <View style={styles.actionIcon}>
                            <FontAwesome name='users' size={14} color={theme === 'Dark'
                                ? DayColors.cream : Colors.PrimaryDarkColor}/>
                        </View>
                        <View style={styles.actionName}>
                            <Text style={[{color: textStyle}, styles.actionTitle]}>
                                Join our community
                            </Text>
                            <View style={{
                                width:'100%',
                                alignItems:'center',
                                flexDirection:'row',
                                justifyContent:'flex-start',

                            }}>
                                <TouchableOpacity onPress={() => handlePress('https://twitter.com/CrowdFacture')} style={{
                                    backgroundColor:DayColors.strongLemon,
                                    width:25,
                                    marginHorizontal:4,
                                    height:25,
                                    borderRadius:100,
                                    alignItems:'center',
                                    justifyContent:'center'
                                }}>
                                    <Ionicons name="logo-twitter" size={10} color="black" />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => handlePress('https://instagram.com/crowdfacture')} style={{
                                    backgroundColor:DayColors.strongLemon,
                                    width:25,
                                    height:25,
                                    marginHorizontal:4,
                                    borderRadius:100,
                                    alignItems:'center',
                                    justifyContent:'center'
                                }}>

                                    <Ionicons name="ios-logo-instagram" size={10} color="black" />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => handlePress('https://www.facebook.com/crowdfacture/')} style={{
                                    backgroundColor:DayColors.strongLemon,
                                    width:25,
                                    height:25,
                                    marginHorizontal:4,
                                    borderRadius:100,
                                    alignItems:'center',
                                    justifyContent:'center'
                                }}>

                                    <Ionicons name="ios-logo-facebook" size={10} color="black" />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => handlePress('https://t.me/crowdfacture')} style={{
                                    backgroundColor:DayColors.strongLemon,
                                    width:25,
                                    height:25,
                                    marginHorizontal:4,
                                    borderRadius:100,
                                    alignItems:'center',
                                    justifyContent:'center'
                                }}>
                                    <FontAwesome name="telegram" size={10} color="black" />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => handlePress('https://www.linkedin.com/company/crowdfacture')} style={{
                                    backgroundColor:DayColors.strongLemon,
                                    width:25,
                                    height:25,
                                    marginHorizontal:4,
                                    borderRadius:100,
                                    alignItems:'center',
                                    justifyContent:'center'
                                }}>
                                    <Ionicons name="ios-logo-linkedin" size={10} color="black" />
                                </TouchableOpacity>
                            </View>

                        </View>
                        <View style={styles.actionBtn}>

                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=> navigation.navigate('AddListing')} activeOpacity={0.7} style={[theme === 'Dark' ? {

                        borderColor: DarkColors.primaryDarkTwo,
                        borderWidth: 1
                    } : {
                        backgroundColor: '#fff'
                    }, styles.boxOne]}>


                        <View style={styles.actionIcon}>
                            <FontAwesome5 name="folder-plus" size={18} color={theme === 'Dark'
                                ? DayColors.cream : Colors.PrimaryDarkColor} />

                        </View>
                        <View style={styles.actionName}>
                            <Text style={[{color: textStyle}, styles.actionTitle]}>
                                Add listing
                            </Text>
                            <Text style={[{
                                color: smTextStyle
                            }, styles.subName]}>
                                Submit projects for listing
                            </Text>

                        </View>
                        <View style={styles.actionBtn}>
                            <FontAwesome name='chevron-right' size={14} color={theme === 'Dark'
                                ? DayColors.cream : Colors.PrimaryDarkColor}/>
                        </View>

                    </TouchableOpacity>


                    <TouchableOpacity onPress={()=> handlePress('https://play.google.com/store/apps/details?id=com.crowdfacture.crowdfacture_mobile')} activeOpacity={0.7} style={[theme === 'Dark' ? {

                        borderColor: DarkColors.primaryDarkTwo,
                        borderWidth: 1
                    } : {
                        backgroundColor: '#fff'
                    }, styles.boxOne]}>


                        <View style={styles.actionIcon}>
                            <FontAwesome name='star' size={18} color={theme === 'Dark'
                                ? DayColors.cream : Colors.PrimaryDarkColor}/>
                        </View>
                        <View style={styles.actionName}>
                            <Text style={[{color: textStyle}, styles.actionTitle]}>
                                Rate Crowdfacture
                            </Text>
                            <Text style={[{
                                color: smTextStyle
                            }, styles.subName]}>
                                Tell us how we make you feel
                            </Text>

                        </View>
                        <View style={styles.actionBtn}>
                            <FontAwesome name='external-link' size={14} color={theme === 'Dark'
                                ? DayColors.cream : Colors.PrimaryDarkColor}/>
                        </View>

                    </TouchableOpacity>



                    <View style={styles.logoutBtnWrap}>

                        <TouchableOpacity

                            activeOpacity={0.5}
                            onPress={() => dispatch(logoutUser())}
                            style={[theme === 'Dark' ? styles.logoutBtnD : styles.logoutBtnW, styles.logoutBtn]}>
                            <Text style={{
                                color:  Colors.PrimaryDarkColor,
                                fontFamily: 'Gordita-medium'
                            }
                            }>
                                Logout
                            </Text>

                            <Ionicons name="log-out" size={14}  color={theme === 'Dark'
                                ? DayColors.cardDark : Colors.PrimaryDarkColor} />

                        </TouchableOpacity>


                        <TouchableOpacity

                            activeOpacity={0.5}
                            onPress={() => handlePress('https://www.crowdfacture.com/faq')}
                            style={styles.FAQBtn}>
                            <Text style={{
                                color: theme === 'Dark'
                                    ? '#eed' : Colors.PrimaryDarkColor,
                                fontFamily: 'Gordita-medium'
                            }
                            }>
                                FAQ
                            </Text>

                            <Ionicons name="information" size={14}  color={theme === 'Dark'
                                ? DayColors.cream : Colors.PrimaryDarkColor} />

                        </TouchableOpacity>
                    </View>


                </View>


            </Animated.View>


            {message &&
            <ToastMessage onHide={() => dispatch(clearMessage())} message={message} type='message'/>
            }

            {error &&  <ToastMessage onHide={() => dispatch(clearErrors())} message={error} type='error'/>}
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
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
        width: 150,
    },
    profileImageContainer: {
        width: 120,
        height: 120,
        borderRadius: 120,
        backgroundColor: Colors.Primary,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',

    },
    nameWrap: {
        padding: 5,
        height: 45,
textTransform:'capitalize',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 18,
        fontFamily: 'Gordita-Black',
        width: wp('80%'),
    },
    emailWrap: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        marginVertical: 20,
        textAlign: 'center',

    },
    buttonWrap: {
        width: wp('100%'),
        marginVertical: 5,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',

    },
    boxOne: {
        marginVertical: 8,
        width: wp('90%'),
        height: 75,
        padding: 10,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    actionIcon: {
        width: '15%',

        height: '90%',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionName: {
        width: '70%',
        height: '100%',
        alignItems: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'space-evenly',

    },
    actionTitle: {
        fontFamily: 'Gordita-bold',
        fontSize: 12,

    },
    subName: {
        fontSize: 8,
        fontFamily: 'Gordita',
        lineHeight: 10,
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
    actionBtn: {
        width: '10%',
        height: '90%',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    themeBtn: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40
    },
    themeBtnDark: {
        backgroundColor: '#eee',
    },
    themeBtnLight: {
        backgroundColor: Colors.PrimaryDarkColor,
    },
    logoutBtnD: {
        backgroundColor:DayColors.cream,


    },
    logoutBtnW: {
        backgroundColor: '#ccc',

    },
    logoutBtn: {
        marginVertical: 4,
        width: 140,
        height: 50,
        borderRadius: 15,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    FAQBtn: {
        borderColor: DayColors.strongLemon,
borderWidth: 1,
        marginVertical: 4,
        width: 100,
        height: 50,
        borderRadius: 15,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    logoutBtnWrap: {
        width: wp('80%'),
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
    }


})


export default UserProfile;


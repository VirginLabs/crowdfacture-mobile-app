import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
    Pressable,
    Modal,
    Alert,
    Text,
    Dimensions,
    View,
    Share,
    StyleSheet,
    TouchableOpacity,
    ImageBackground, ActivityIndicator
} from 'react-native';
import AnimatedScrollView from "../components/AnimatedScrollView";
import * as Notifications from 'expo-notifications';
import BalanceCard from "../components/BalanceCard";
import {Colors, DarkColors, DayColors} from "../constants/Colors";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import MyButton from "../components/MyButton";
import {FontAwesome} from "@expo/vector-icons";
import DeckButton from "../components/DeckButton";
import ProjectCard from "../components/ProjectCard";
import { useDispatch, useSelector} from "react-redux";
import {getAllProject, toggleUserGuide} from "../redux/actions/data-action";
import {getUser} from "../redux/actions/user-action";
import ToastMessage from "../components/Toast";

import UserGuide from "../components/UserGuide";
import KnowMoreScreen from "../components/KnowMore";
import Constants from "expo-constants";





const wait = timeout => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
};


const HomeScreen = (props) => {
    const data = useSelector(state => state.data)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const {theme,userGuide} = data;

    const [refreshing, setRefreshing] = React.useState(false);

    const [toastVisible, setToastVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);



    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();


    const toggleModal = () => {
        setIsModalVisible(prevState => !prevState);
    }


    const {route: {name}} = props;



    const {userData: {member: {Amount,Phone, InvestedAmount, ReferralID, LastName}, bankDetails}} = user
    const {
        allProjects,
        loadingProject
    } = data
    useEffect(() => {
        dispatch(getAllProject())
    },[]);



    useEffect(() =>{
       dispatch(toggleUserGuide())
    },[])

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {

                setExpoPushToken(token)
                console.log(token)
            }
        );

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);


        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {

            const {notification: {request: {content: {data: {screen}}}}} = response
//when the user taps on the notification, this line checks if they //are suppose to be taken to a particular screen
            if (screen) {
                props.navigation.navigate(screen)
            }
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);



    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(getUser(Phone))
        wait(2000).then(() => setRefreshing(false));
    }, []);



    const onShare = async () => {
        try {
            const result = await Share.share({
                message: `I just invested in Crowdfacture a manufacturing company that let's you co-own a factory at 30% equity stake for life click the link to register https://crowdfacture.com/auth?refCode=${ReferralID}`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };


    return (

        <>
            {Object.keys(bankDetails).length < 1 &&
        <Modal
                animated={true}
                animationType="slide"
                transparent={true}
                visible={userGuide}

            >


            <UserGuide navigation={props.navigation}/>


            </Modal>
}
            <KnowMoreScreen/>

                <AnimatedScrollView onRefresh={onRefresh} refreshing={refreshing} navigation={props.navigation} routeMessage={`${LastName} Welcome Home`} routeName='Dashboard'>
            <View style={styles.container}>


                <Modal
                    animated={true}
                    animationType="slide"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setIsModalVisible(!isModalVisible);
                    }}
                >



                    <View style={styles.centeredView}>
                        {
                            toastVisible &&

                            <ToastMessage onHide={() => setToastVisible(false)} message='COPIED' type='message'/>
                        }
                        <View style={[{
                            backgroundColor: theme === 'Dark' ? DarkColors.primaryDark :
                                "#eee",
                        }
                            , styles.modalView]}>

                            <Pressable
                                style={[{
                                    backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkThree :
                                        "#ddd",
                                }
                                    ,
                                    styles.buttonClose]}
                                onPress={() => setIsModalVisible(!isModalVisible)}
                            >
                                <FontAwesome name='close' size={20}
                                             color={theme === 'Dark'
                                                 ? DayColors.primaryColor : Colors.PrimaryDarkColor}/>

                            </Pressable>
                            <View style={styles.modalContent}>
                                <Text style={[
                                    {
                                        color: theme === 'Dark' ? Colors.White :
                                            DarkColors.primaryDarkThree
                                    },
                                    styles.refModalTitle
                                ]}>
                                    Refer & Earn
                                </Text>

                                <Text style={[
                                    {
                                        color: theme === 'Dark' ? Colors.White :
                                            DarkColors.primaryDarkThree
                                    },
                                    styles.refMsg]}>
                                    Get ₦1,000 when you refer a friend to invest and another N1500 when the person
                                    you
                                    referred refers another person to invest, copy and share your referral link.

                                </Text>





                                <MyButton title='SHARE LINK'
                                          action={onShare} textStyle={{
                                    color: "#131313",
                                    fontFamily: 'Gordita-bold',
                                }} buttonStyle={styles.buttonShare}>
                                    <FontAwesome name='share-alt' size={18} color={"#333"}/>
                                </MyButton>
                            </View>


                        </View>
                    </View>
                </Modal>

                <BalanceCard theme={theme} balance={Amount} investment={InvestedAmount}/>
                <View style={styles.buttonWrap}>
                    <TouchableOpacity activeOpacity={0.7} style={styles.addBalanceBtn}
                                      onPress={() => props.navigation.navigate('AddCash')}>

                        <Text style={{
                            fontSize: 12,
                            fontFamily: "Gordita-Black",
                            color: Colors.PrimaryDarkColor
                        }}
                              numberOfLines={1}>
                            Add cash
                        </Text>

                        <Text style={{
                            fontSize: 9,
                            fontFamily: "Gordita-medium",
                            color: DarkColors.primaryDarkThree
                        }}
                              numberOfLines={1}>
                            Fund your account
                        </Text>

                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => props.navigation.navigate('Projects')} activeOpacity={0.7} style={styles.investBtn}>

                        <Text style={{
                            fontSize: 12,
                            fontFamily: "Gordita-Black",
                            color: theme === 'Dark' ? Colors.White :
                                DarkColors.primaryDarkThree
                        }}
                              numberOfLines={1}>
                            Invest
                        </Text>

                        <Text style={{
                            fontSize: 9,
                            fontFamily: "Gordita-medium",
                            color: theme === 'Dark' ? Colors.White :
                                DarkColors.primaryDarkThree
                        }}
                              numberOfLines={1}>
                            Buy units now
                        </Text>

                    </TouchableOpacity>
                </View>



                <TouchableOpacity onPress={toggleModal}
                                  style={[theme === 'Dark' ? styles.referBoxB : styles.referBoxW]}>
                    <View style={styles.refTextWrap}>
                        <Text style={styles.refTitle}>
                            Refer and earn
                        </Text>
                        <Text style={styles.refMessage}>
                            Refer a friend and get up to ₦2,500 and more
                        </Text>
                    </View>
                    <View style={styles.refBtnWrap}>
                        <MyButton action={toggleModal} buttonStyle={styles.refBtn}>
                            <FontAwesome name={'user-plus'} size={18} color='#131313'/>
                        </MyButton>
                    </View>
                </TouchableOpacity>


                <View style={[theme === 'Dark' ? styles.buttonDeckD : styles.buttonDeckW]}>
                    <ImageBackground style={{
                        width: '100%',
                        height: "100%",
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        resizeMode: 'cover',
                        alignContent: 'center',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                    }} source={require('../assets/topology.png')}>


                        {
                            DeckBtnObj.map((({btnTitle, id, screen, icon}) => (
                                <DeckButton btnTitle={btnTitle} key={id} btnAction={() => props.navigation.navigate(`${screen}`)} screen={btnTitle} theme={theme}
                                            icon={icon} btnStyle={styles.deckBtn}/>
                            )))
                        }
                    </ImageBackground>
                </View>

                <View style={styles.projectWrap}>

                    <Text style={[{
                        color: theme === 'Dark' ? "#eee" : Colors.PrimaryDarkColor
                    }, styles.title]}>
                        All projects
                    </Text>
                    <View style={styles.projectContainer}>


                        {

                                loadingProject ? <ActivityIndicator size="large" color={Colors.Primary}/> :
                                    Object.keys(allProjects).length > 0 && allProjects.map((({ProjectTitle, ProjectImage, PricePerUnit, Target, ID, SoldOut, UpComing, Active}) => (
                                <ProjectCard action={() =>  props.navigation.navigate('Project', {
                                        projectId: ID,
                                    })} key={ID} theme={theme} image={ProjectImage} projectTitle={ProjectTitle} Active={Active} SoldOut={SoldOut}
                                             UpComing={UpComing} target={Target}
                                             pricePerUnit={PricePerUnit}/>
                            )))
                        }
                    </View>
                </View>

            </View>
        </AnimatedScrollView>

            </>

    );
};



async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const {status} = await Notifications.requestPermissionsAsync();
            finalStatus = status;
            console.log("existingStatus",existingStatus)
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            console.log("finalStatus",finalStatus)
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            showBadge: true,
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FE9018',
        });
    }

    return token;
}


const DeckBtnObj = [
    {
        id: '1',
        icon: 'heart-outline',
        screen:'Favourites',
        btnTitle: 'Favourites',

    },
    {
        id: '2',
        screen:'Liquidate',
        icon: 'ios-water',
        btnTitle: 'Liquidate',

    },
    {
        id: '3',
        screen: 'Exchange',
        icon: 'exchange-alt',
        btnTitle: 'Exchange',

    },
    {
        id: '4',
        icon: 'call-outline',
        screen: 'Support',
        btnTitle: 'Support',

    },
    {
        id: '5',
        icon: 'calculator',
        screen: 'Calculator',
        btnTitle: 'Calculator',

    },
    {
        id: '6',
        icon: 'cash',
        screen: 'Dividends',
        btnTitle: 'Dividends',

    },
    {
        id: '7',
        icon: 'stats-chart',
        screen: 'Reports',
        btnTitle: 'Reports',

    },
    {
        id: '8',
        icon: 'shield-outline',
        screen: 'Security',
        btnTitle: 'Security',

    },

]

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView: {
        backgroundColor: 'rgba(10,10,10,0.8)',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        width: wp('90%'),
        height: hp('50%'),
        margin: 20,
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalContent: {
        width: '100%',
        padding: 15,
        height: '85%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    refModalTitle: {
        textAlign: 'center',
        alignItems: 'center',
        fontFamily: 'Gordita-Black',
        fontSize: 18,
        lineHeight: 25,
    },
    refMsg: {
        textAlign: 'center',
        alignItems: 'center',
        fontFamily: 'Gordita-medium',
        fontSize: 10,
        lineHeight: 18,
    },
    buttonCopy: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '60%',
        flexDirection: 'row',
        borderRadius: 12,
        height: 55,
        backgroundColor: DarkColors.primaryDarkTwo
    },
    buttonShare:{
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '60%',
        flexDirection: 'row',
        borderRadius: 12,
        height: 50,
        backgroundColor: DayColors.green
    },

    buttonClose: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        width: 40,
        height: 40,
    },

    text: {
        fontFamily: 'Gordita',
        alignItems: 'center',
        lineHeight: 20,
        color: "#212121"
    },
    buttonWrap: {
        marginVertical: 15,
        width: Dimensions.get('screen').width - 70,
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    addBalanceBtn: {
        backgroundColor: Colors.Primary,
        width: '45%',
        height: 55,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    investBtn: {
        width: '45%',
        height: 55,
        borderRadius: 15,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: Colors.Primary,
    },
    referBoxW: {
        marginVertical: 12,
        width: wp('90%'),
        backgroundColor: DayColors.cardDark,
        borderRadius: 25,
        height: 100,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        padding: 10
    },
    referBoxB: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 12,
        width: wp('90%'),
        backgroundColor: DarkColors.primaryDark,
        borderRadius: 25,
        height: 90,
        padding: 10

    },
    refTextWrap: {
        flexDirection: 'column',
        width: '70%',
        height: '90%',
        alignItems: "flex-start",
        justifyContent: "center"
    },
    refTitle: {
        fontSize:12,
        fontFamily: "Gordita-bold",
        color: Colors.White
    },
    refMessage: {
        width: '90%',
        fontFamily: "Gordita-medium",
        color: "#ddd",
        fontSize: 10,
        lineHeight: 15,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    refBtnWrap: {
        width: '20%',
        height: '90%',
        alignItems: 'center',
        justifyContent: 'center',

    },
    refBtn: {
        flexDirection: 'row',
        width: 45,
        height: 45,
        borderRadius: 100,
        backgroundColor: DayColors.cream,
        alignItems: 'center',
        justifyContent: 'center',

    },
    buttonDeckW: {
        marginVertical: 12,
        width: wp('90%'),
        backgroundColor: '#fff',
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 0,
        height: 210,

    },
    buttonDeckD: {
        marginVertical: 12,
        width: wp('90%'),
        backgroundColor: DarkColors.primaryDarkFour,
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 0,
        height: 200,

    },
    deckBtn: {
        width: "20%",
        height: 80,
        margin: 5,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    projectWrap: {
        width: wp('90%'),
        marginVertical: hp('4'),
        flexDirection: 'column',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        justifyContent: 'flex-start'
    },
    title: {
        fontFamily: 'Gordita-Black',
        marginLeft: wp('5%'),
        marginBottom: 4,

    },
    projectContainer: {
        width: "100%",
        flexDirection: 'row',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        justifyContent: 'flex-start'
    },


})



export default HomeScreen

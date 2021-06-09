import React, {useContext, useState} from 'react';
import {ThemeContext} from "../util/ThemeManager";
import {
    Pressable,
    Modal,
    Alert,
    Text,
    Dimensions,
    View,
    StyleSheet,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import AnimatedScrollView from "../components/AnimatedScrollView";

import BalanceCard from "../components/BalanceCard";
import {Colors, DarkColors, DayColors} from "../constants/Colors";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import MyButton from "../components/MyButton";
import {FontAwesome} from "@expo/vector-icons";
import DeckButton from "../components/DeckButton";
import ProjectCard from "../components/ProjectCard";
import Clipboard from 'expo-clipboard';


let backPressed = 0;
const HomeScreen = (props) => {

    const [toastVisible, setToastVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const toggleModal = () => {
        setIsModalVisible(prevState => !prevState);
    }
    const {route: {name}} = props;

    const [copiedText, setCopiedText] = useState('');

    const copyToClipboard = () => {
        setToastVisible(prevState => !prevState)
        Clipboard.setString('hello world');
    };
    const {theme} = useContext(ThemeContext);

// <Button
//     onPress={toggleTheme}
//     title="Toggle"
//     color={theme === "dark" ? "#fff" : "#212121"}
//     />

    return (
        <AnimatedScrollView navigation={props.navigation}
                            routeMessage='Welcome Home' routeName='Dashboard'>
            <View style={styles.container}>


                <BalanceCard theme={theme}/>
                <View style={styles.buttonWrap}>
                    <TouchableOpacity activeOpacity={0.7} style={styles.addBalanceBtn}
                                      onPress={() => props.navigation.navigate('AddCash')}>

                        <Text style={{
                            fontSize: 14,
                            fontFamily: "Gordita-Black",
                            color: Colors.PrimaryDarkColor
                        }}
                              numberOfLines={1}>
                            Add cash
                        </Text>

                        <Text style={{
                            fontSize: 10,
                            fontFamily: "Gordita-medium",
                            color: DarkColors.primaryDarkThree
                        }}
                              numberOfLines={1}>
                            Fund account
                        </Text>

                    </TouchableOpacity>

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

                                    <MyButton title='COPY CODE'
                                              action={copyToClipboard} textStyle={{
                                        color:
                                            theme === 'Dark'
                                                ? DayColors.primaryColor : "#eee",
                                        fontFamily: 'Gordita-medium',
                                    }} buttonStyle={styles.buttonCopy}>
                                        <FontAwesome name='copy' size={18} color={theme === 'Dark'
                                            ? DayColors.primaryColor : "#eee"}/>
                                    </MyButton>
                                </View>


                            </View>
                        </View>
                    </Modal>


                    <TouchableOpacity onPress={() => props.navigation.navigate('Projects')} activeOpacity={0.7} style={styles.investBtn}>

                        <Text style={{
                            fontSize: 14,
                            fontFamily: "Gordita-Black",
                            color: theme === 'Dark' ? Colors.White :
                                DarkColors.primaryDarkThree
                        }}
                              numberOfLines={1}>
                            Invest
                        </Text>

                        <Text style={{
                            fontSize: 10,
                            fontFamily: "Gordita-medium",
                            color: theme === 'Dark' ? Colors.White :
                                DarkColors.primaryDarkThree
                        }}
                              numberOfLines={1}>
                            Fund account
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
                            <FontAwesome name={'user-plus'} size={20} color='#131313'/>
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
                            Projects.map((({id, projectName, Active, SoldOut, UpComing, target, valuePerUnit}) => (
                                <ProjectCard action={() =>  props.navigation.navigate('Project', {
                                        projectId: id,
                                    })

                                } key={id} theme={theme} projectTitle={projectName} Active={Active} SoldOut={SoldOut}
                                             UpComing={UpComing} target={target}
                                             pricePerUnit={valuePerUnit}/>
                            )))
                        }
                    </View>
                </View>

            </View>
        </AnimatedScrollView>


    );
};
const Projects = [
    {
        projectName: "gas plant",
        projectImage: "3855962/pexels-photo-3855962.jpeg",
        availableUnit: "",
        soldUnits: "",
        target: "₦495,000,000",
        investmentSummary: "",
        id: "1",
        projectReturn: "30% in equity",
        investmentType: "Equity",
        payoutType: "Based on profit/loss",
        valuePerUnit: "10000",
        unitType: "Units can be liquidated",
        limit: "90k/user",
        Active: '1',
        UpComing: '0',
        SoldOut: '0'

    },
    {
        projectName: "power plant",
        projectImage: "1058141/pexels-photo-1058141.jpeg",
        availableUnit: "8000",
        soldUnits: "",
        target: "500,000,000",
        investmentSummary: "",
        id: "2",
        projectReturn: "30% in equity",
        investmentType: "Equity",
        payoutType: "Based on profit/loss",
        valuePerUnit: "10000",
        unitType: "Units can be liquidated",
        limit: "100k/user",
        Active: '0',
        UpComing: '1',
        SoldOut: '0'
    },
    {
        projectName: "fertilizer plant",
        projectImage: "5458354/pexels-photo-5458354.jpeg",
        availableUnit: "50,000",
        soldUnits: "",
        target: "89,000,000",
        investmentSummary: "",
        id: "3",
        projectReturn: "30% in equity",
        investmentType: "Equity",
        payoutType: "Based on profit/loss",
        valuePerUnit: "10000",
        unitType: "Units can be liquidated",
        limit: "60k/user",
        Active: '0',
        UpComing: '0',
        SoldOut: '1'

    },
]

const DeckBtnObj = [
    {
        id: '1',
        icon: 'heart',
        screen:'Favourites',
        btnTitle: 'Favourites',

    },
    {
        id: '2',
        screen:'Liquidate',
        icon: 'hand-holding-water',
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
        icon: 'phone',
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
        icon: 'money-bill',
        screen: 'Dividends',
        btnTitle: 'Dividends',

    },
    {
        id: '7',
        icon: 'shield-alt',
        screen: 'Security',
        btnTitle: 'Security',

    },
    {
        id: '8',
        icon: 'chart-line',
        screen: 'Reports',
        btnTitle: 'Reports',

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
        fontSize: 20,
        lineHeight: 25,
    },
    refMsg: {
        textAlign: 'center',
        alignItems: 'center',
        fontFamily: 'Gordita-medium',
        fontSize: 12,
        lineHeight: 15,
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
        fontFamily: "Gordita-bold",
        color: Colors.White
    },
    refMessage: {
        width: '90%',
        fontFamily: "Gordita",
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
        backgroundColor: Colors.Primary,
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
        justifyContent: 'space-evenly'
    },


})

export default HomeScreen;

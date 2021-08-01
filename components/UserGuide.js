import React, {useState} from 'react';
import {Ionicons} from "@expo/vector-icons";
import {
    Image,
    ImageBackground,
    Linking,

    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {Colors, DarkColors, DayColors} from "../constants/Colors";
import {useDispatch} from "react-redux";
import {toggleKnowMore, toggleUserGuide} from "../redux/actions/data-action";
import {RFPercentage} from "react-native-responsive-fontsize";


const UserGuide = ({navigation}) => {

    const dispatch = useDispatch()

    const buttonAction = (screen) =>{
       dispatch(toggleUserGuide())
        navigation.navigate(screen)
    }

    function FAQ() {
        Linking.openURL(
            'https://crowdfacture.com/faq'
        );
    }


    return (
        <>

        <ScrollView
            scrollEnabled
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.view}>



            <TouchableOpacity style={styles.closeButton} onPress={() => dispatch(toggleUserGuide())}>
                <Ionicons name='close' size={18}/>
            </TouchableOpacity>
            <View style={styles.content}>
                <View style={styles.welcomeTextWrap}>

                    {/* <Text style={styles.userName}>{userName}
                    </Text>*/}
                    <Text style={styles.subText}>
                        We noticed you are yet to complete some account action, don't worry we are here to help.
                    </Text>
                </View>
                <View style={styles.buttonsWrap}>


                    <TouchableOpacity onPress={() => buttonAction('AddBank')} style={[styles.linkBank, styles.buttons]}>
                        <View style={styles.iconWrap}>
                            <Ionicons name="md-add-sharp" size={24} color={Colors.Primary} />
                        </View>
                        <View style={styles.wordWrap}>
                            <Text style={styles.word}>
                                ADD BANK ACCOUNT
                            </Text>
                        </View>
                        <View style={styles.actionBtn}>
                            <Ionicons name="chevron-forward" size={24} color="#555" />
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => buttonAction('AddCash')} style={[styles.fundAccount, styles.buttons]}>
                        <View style={styles.iconWrap}>
                            <Ionicons name="md-card" size={24} color={Colors.Primary} />
                        </View>
                        <View style={styles.wordWrap}>
                            <Text style={styles.word}>
                                ADD CASH
                            </Text>
                        </View>
                        <View style={styles.actionBtn}>
                            <Ionicons name="chevron-forward" size={20} color="#555" />
                        </View>

                    </TouchableOpacity>


                    <TouchableOpacity style={[styles.faq, styles.buttons]} onPress={FAQ}>
                        <View style={styles.iconWrap}>
                            <Ionicons name="md-information-sharp" size={24} color={Colors.Primary} />
                        </View>
                        <View style={styles.wordWrap}>
                            <Text style={styles.word}>
                                FAQ
                            </Text>
                        </View>
                        <View style={styles.actionBtn}>
                            <Ionicons name="chevron-forward" size={20} color="#555" />
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity style={styles.knowMore} onPress={() => dispatch(toggleKnowMore())}>
                 <ImageBackground source={require('../assets/topology.png')}
                 resizeMode='cover'
                 style={{
                     width:'100%',
                     height:'100%',
                     alignItems: 'center',
                     flexDirection: 'row',
                     justifyContent: 'space-evenly',

                 }}
                 >
                     <View style={{
                         width:90,
                         height:90,
                         borderRadius:100,
                         alignItems:'center',
                         justifyContent:'center'
                     }}>
                         <Image source={require('../assets/family4.png')} resizeMode='cover' style={{
                             width:'100%',
                             height:'100%',

                             borderRadius:100
                         }}/>
                     </View>

                     <View style={styles.knowMoreText}>
                         <Text style={styles.knowMoreTitle}>
                             Know more about us
                         </Text>
                         <Text style={{
                             color:'#ddd',
                             fontFamily:'Gordita-medium',
                             fontSize:8,
                             lineHeight:14
                         }}>
                             Why you should invest with Crowdfacture
                         </Text>
                     </View>

                 </ImageBackground>
                    </TouchableOpacity>

                </View>


            </View>
        </ScrollView>


            </>
    );
};

const styles = StyleSheet.create({
    knowMoreScreen: {
        zIndex:100,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: DarkColors.secondaryDark

    },
    view: {
        flex:1,
        width:'100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(47,47,47,0.4)'

    },
    closeButton: {
        width: 40,
        height: 40,
        backgroundColor: DayColors.primaryColor,
        borderRadius: 100,
        marginBottom: 18,
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        width: '100%',
        flex: 0.8,
        backgroundColor: '#0c1016',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        bottom: 0
    },
    welcomeTextWrap: {
        height: 80,
        padding: 15,
        margin: 10,
        justifyContent:'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    welcomeText: {
        fontFamily: 'Gordita-Black',
        paddingVertical: 8,
        fontSize: RFPercentage(2.5),
        color: '#fff'
    },
    subText: {
        fontFamily: 'Gordita-medium',
        lineHeight: 18,
        textAlign: 'center',
        fontSize: RFPercentage(1.5),
        color: '#dedede'
    },
    buttonsWrap: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        marginTop: 15,
        paddingHorizontal: 10,

    },
    buttons: {
        width: '90%',
        height: 80,
        borderRadius: 15,
        marginVertical: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#1b1c2b',
    },

    knowMore: {
        marginVertical: 8,
        width: '90%',
        height: 100,
        borderRadius: 15,
        backgroundColor: DayColors.dimGreen

    },
    knowMoreText:{
        width: '50%',
        height: '80%',
        alignItems: 'flex-start',
        justifyContent: 'center',
},
knowMoreTitle:{
        color:'#eee',
    fontFamily:'Gordita-Black',
    fontSize:11
},
    iconWrap: {
        width: 40,
        height: 40,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.AccentDarkColor
    },
    wordWrap: {
        width: '50%',
        height: '80%',
        alignItems: 'flex-start',
        justifyContent: 'center',

    },
    word: {
        fontSize:10,
        color: '#eee',
        fontFamily: 'Gordita-Black',
    },
    actionBtn: {
        width: '15%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    }

})

export default UserGuide;

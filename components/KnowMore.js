import React from 'react';
import {Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, DarkColors} from "../constants/Colors";
import {useDispatch, useSelector} from "react-redux";
import {toggleKnowMore} from "../redux/actions/data-action";
import {Ionicons} from "@expo/vector-icons";
import { widthPercentageToDP as wp} from "react-native-responsive-screen";

const KnowMoreScreen = () => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.data)
    return (
        <Modal
            animated={true}
            animationType="slide"
            transparent={true}
            visible={data.knowMore}>
            <View style={{
                flex:1,
                backgroundColor: DarkColors.secondaryDark
            }}>


            <ScrollView
                scrollEnabled
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{

                width: '100%',
                alignItems: 'center',

            }}>
                <View style={styles.backButtonWrap}>

                    <TouchableOpacity style={{
                        width: 80,
                        height: 70,
                        flexDirection: 'row',
                        alignItems: 'flex-start'
                    }} onPress={() => dispatch(toggleKnowMore())}>
                        <Ionicons name="ios-arrow-back-sharp" size={34} color={Colors.Primary}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>
                        “Why Crowdfacture”
                    </Text>
                    <Text style={styles.bodyText}>
                        We started Crowdfacture in a bid to help us fix our Africa economy and create jobs as a people.
                        Crowdfacture will be leading an industrial revolution in Africa by helping manufacturing
                        companies raise funds by crowdfunding to power different manufacturing lines across different
                        sectors.
                        What this means is that; you get to become a manufacturer by investing in any of our
                        manufacturing projects that’s actively available for funding and get to share a 30% lifetime
                        profit from that factory you invested into.

                    </Text>

                    <View style={styles.moreBoxes}>
                        <View style={styles.iconBox}>
                            <Image source={require('../assets/icons/wealth.png')}
                                   resizeMode='cover'
                                   style={{
                                       width: '100%',
                                       height: '100%'
                                   }}
                            />
                        </View>
                        <View style={styles.boxTextWrap}>
                            <Text style={styles.boxTitle}>
                                Build wealth
                            </Text>

                            <Text style={styles.boxSubText}>
                                You get to share 30% of the factory profit every quarter (3 months) for life.
                            </Text>
                        </View>
                    </View>


                    <View style={styles.moreBoxes}>
                        <View style={styles.iconBox}>
                            <Image source={require('../assets/icons/ECONOMY.png')}
                                   resizeMode='cover'
                                   style={{
                                       width: '100%',
                                       height: '100%'
                                   }}
                            />
                        </View>
                        <View style={styles.boxTextWrap}>
                            <View style={styles.boxTextWrap}>
                                <Text style={styles.boxTitle}>
                                    Fix The Economy
                                </Text>

                                <Text style={styles.boxSubText}>
                                    We believe manufacturing has to be taken seriously in order to create jobs while
                                    controlling the high rate of inflation.
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.moreBoxes}>
                        <View style={styles.iconBox}>
                            <Image source={require('../assets/icons/security.png')}
                                   resizeMode='cover'
                                   style={{
                                       width: '100%',
                                       height: '100%'
                                   }}
                            />
                        </View>

                        <View style={styles.boxTextWrap}>
                            <View style={styles.boxTextWrap}>
                                <Text style={styles.boxTitle}>
                                    Security
                                </Text>

                                <Text style={styles.boxSubText}>
                                    Every factory will be insured after setup to further help provide security to your
                                    investment.
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.moreBoxes}>
                        <View style={styles.iconBox}>
                            <Image source={require('../assets/icons/exchange.png')}
                                   resizeMode='cover'
                                   style={{
                                       width: '100%',
                                       height: '100%'
                                   }}
                            />
                        </View>

                        <View style={styles.boxTextWrap}>
                            <Text style={styles.boxTitle}>
                                Exchange
                            </Text>

                            <Text style={styles.boxSubText}>
                                Buy more or sell your investment (units) anytime after you have earned a dividend payout at least once
                            </Text>
                        </View>
                    </View>
                </View>





            </ScrollView>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    knowMoreScreen: {
        zIndex: 100,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: DarkColors.secondaryDark

    },
    view: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(47,47,47,0.4)'

    },
    backButtonWrap: {
        width: wp(100),
        padding: 15,
        height: 80,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    content: {
        width: '100%',
        flex: 0.6,
        alignItems: 'center',
        flexDirection: 'column'
    },
    title: {
        color: '#eee',
        fontFamily: 'Gordita-Black',
        fontSize: 16
    },
    bodyText: {
        fontFamily: 'Gordita-medium',
        fontSize: 10,
        color: '#ddd',
        lineHeight: 18,
        padding: 14,
        textAlign:'center'
    },
    moreBoxes: {
        width: '90%',
        height: 90,
        borderRadius: 15,
        marginVertical: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderColor: '#2b1b1b',
        borderWidth: 2,
        borderStyle: 'dashed'
    },
    boxTextWrap: {
        height: '100%',
        width: wp(65),
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column'
    },
    boxTitle: {
        fontFamily: 'Gordita-Black',
        fontSize: 14,
        color: '#fff',
        height: '30%'

    },
    boxSubText: {
        height: '60%',
        width: '100%',
        fontFamily: 'Gordita-medium',
        fontSize: 9,
        lineHeight: 14,
        color: '#ccc',
    },
    iconBox: {
        width: 75,
        height: 75,
        borderRadius: 100,
        // backgroundColor:'#1b1c2b',
        alignItems: 'center',
        justifyContent: 'center',
    }

});

export default KnowMoreScreen;

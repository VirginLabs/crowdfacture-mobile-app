import React from 'react';

import {Dimensions, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {Colors, DarkColors, DayColors} from "../constants/Colors";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

const BalanceCard = ({theme, balance, investment}) => {
    return (
        <View style={[theme === 'Dark' ?
            styles.balanceCardDark : styles.balanceCardWhite, styles.balanceCard]}>
            <ImageBackground style={{
                width: '100%',
                height: "100%",
                resizeMode: 'cover',
                alignItems: 'center',
                justifyContent: 'space-evenly',
            }} source={require('../assets/topology.png')}>
                <View style={styles.topLayer}>
                    <Text style={styles.balTitle}>
                        Available balance
                    </Text>
                </View>

                <View style={styles.middleLayer}>
                    <Text style={styles.balanceText}>
                        ₦ {balance === null ? '0' : balance}
                    </Text>
                </View>

                <View style={styles.bottomLayer}>
                    <View style={styles.bottomTitle}>
                        <Text style={styles.header}>
                            ROE
                        </Text>
                        <Text style={styles.header}>
                            INVESTED
                        </Text>

                    </View>
                    <View style={styles.bottomNumbers}>
                        <Text style={styles.numbers}>
                            ₦00
                        </Text>
                        <Text style={styles.numbers}>
                            ₦{investment === null ? '0' : investment}
                        </Text>

                    </View>
                </View>

            </ImageBackground>

        </View>
    );
};

const styles = StyleSheet.create({
    balanceCard: {
    width:wp('90%'),
        borderRadius: 25,
        height: 200,

    },
    balanceCardWhite: {
        backgroundColor: DarkColors.primaryDarkOne,

    },
    balanceCardDark: {
        backgroundColor: DarkColors.primaryDarkThree,
        borderWidth:1,
        borderColor: DayColors.cream,
        borderStyle:'dashed'
    },
    topLayer: {
        width: '90%',
        height: '15%',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    },
    balTitle: {
        color: '#eee',
        fontFamily: 'Gordita-bold',
        fontSize: 14
    },
    middleLayer: {
        width: '90%',
        height: '20%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    balanceText: {
        color: '#fff',
        fontFamily: 'Gordita-Black',
        fontSize: 22
    },
    bottomLayer: {
        width: '90%',
        height: '40%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    bottomTitle: {
        width: '100%',
        height: '45%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    header: {
        width: '35%',
        backgroundColor: DayColors.dimGreen,
        color: "#eee",
        fontFamily: 'Gordita-bold',
        padding: 2,
        fontSize: 12,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    numbers: {
        width: '35%',
        color: "#eee",
        fontFamily: 'Gordita-medium',
        padding: 3,
        fontSize: 12,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    bottomNumbers: {
        width: '100%',
        height: '45%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: "#eee"
    }
})

export default BalanceCard;

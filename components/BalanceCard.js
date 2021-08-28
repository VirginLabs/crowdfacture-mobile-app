import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {DarkColors, DayColors} from "../constants/Colors";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import NumberFormat from "react-number-format";


const BalanceCard = ({theme, balance, investment}) => {

   const getFormattedNumber = (number) => {
        const formattedNumber = Number.parseInt(number).toLocaleString('en-US');
        return formattedNumber;
    }
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
                    {balance === null &&<Text style={styles.balanceText}>
                         ₦0


                    </Text>
                    }
                    {
                        balance !== null
                        &&
                        <Text style={styles.balanceText}>
                            ₦{
                            getFormattedNumber(balance)
                        }

                        </Text>
                    }
                </View>

                <View style={styles.bottomLayer}>
                    <View style={styles.bottomTitle}>
                        <View style={styles.header}>
                            <Text style={{
                                fontSize: 10,
                                fontFamily: 'Gordita-Black',
                                color: theme === 'Dark' ? '#eee' : '#111'
                            }}>
                                ROE
                            </Text>
                        </View>

                        <View style={styles.headerInvest}>
                            <Text style={{
                                fontSize: 10,
                                fontFamily: 'Gordita-Black',
                                color: theme === 'Dark' ? '#eee' : '#111'
                            }}>
                                INVESTED
                            </Text>
                        </View>


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
        width: wp('90%'),
        borderRadius: 25,
        height: 200,

    },
    balanceCardWhite: {
        backgroundColor: DarkColors.primaryDarkOne,

    },
    balanceCardDark: {
        backgroundColor: DarkColors.primaryDarkThree,
        borderWidth: 1,
        borderColor: DayColors.cream,
        borderStyle: 'dashed'
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
        fontSize: 22,

    },
    bottomLayer: {
        width: '90%',
        height: '40%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
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
        backgroundColor: DayColors.green,
        height: 25,
        fontSize: 12,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    headerInvest: {
        width: '35%',
        backgroundColor: DayColors.dimGreen,
        height: 25,
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

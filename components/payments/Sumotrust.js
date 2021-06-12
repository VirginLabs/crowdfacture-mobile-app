import React from 'react';

import {Text, View, StyleSheet} from 'react-native';
import {Colors, DayColors} from "../../constants/Colors";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";

const Sumotrust = ({theme,SumoTrustID}) => {
    return (
        <View style={styles.sumotrust}>
            <View style={[{
                height:50
            },styles.infoAlert]}>
                <View style={styles.infoHead}>
                    <Text style={[styles.infoHeadText, {
                        color: theme === 'Dark' ?
                            Colors.White : "#131313"
                    }]}>
                        FUND WITH SUMOTRUST
                    </Text>
                </View>



            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    sumotrust:{
        height: 400,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        padding: 10
    },
    infoAlert: {
        borderRadius: 15,
        width: wp('90%'),
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: DayColors.cream,
        alignItems: 'center',
        padding: 8
    },
    infoHead: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    infoHeadText: {
        fontFamily: 'Gordita-Black',
    },
    infoHeadBody: {
        fontFamily: 'Gordita-medium',
    },
    errorText: {fontSize: 14,
        alignItems: "flex-start", width: '75%',
        color: '#FF5A5F', padding: 8}
})

export default Sumotrust;

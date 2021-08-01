import React from 'react';

import {Text, View, StyleSheet} from 'react-native';
import {Colors} from "../../constants/Colors";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import PaySumo from "../PaySumo";

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
            {
                SumoTrustID ? <View>

                    </View> :

                <PaySumo/>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    sumotrust:{


    },
    infoAlert: {
        borderRadius: 15,
        width: wp('90%'),
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

})

export default Sumotrust;

import React, {useContext, useState} from 'react';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {Animated, StatusBar, StyleSheet, Text, View} from 'react-native';
import {ThemeContext} from "../util/ThemeManager";
import {Colors, DarkColors} from "../constants/Colors";
import BackButton from "../components/BackBtn";
import TextInput from "../components/TextInput";

const CalculatorScreen = ({navigation}) => {
    const {theme} = useContext(ThemeContext);
    /*
    * Calculator algorithm
    *
    * EXAMPLE
    *
    * price per unit = 50,000
    * total available unit = 10,000
    * project target 500,000,000
    * estimated profit in a month multiplied by 3 (3 months | a quarter)
    * worth per unit = 30% of estimated profit divided by number available units
    * to distribute profit we multiply worth per unit by how many unit an investor bought
    *
    *
    *
    *
    * */

    const pricePerUnit = 50000
    const availableUnit = 10000

    const [projectTarget, setProjectTarget] = useState(500000000);
    const [unitsPurchased, setUnitsPurchased] = useState(1);
    const [units, setUnits] = useState(1);
    const [target, setTarget] = useState(500000000);
    const [estimatedProfit, setEstimatedProfit] = useState(null);
    const [error, setError] = useState('')


    function Calculator(units, quarterly_profit,target_amount, amount_per_unit){

        let roi = 0;
        if (parseFloat(quarterly_profit) < (0.3 * parseFloat(target_amount))){
            roi = -1;
        }
        else if (parseFloat(quarterly_profit) > (0.6 * parseFloat(target_amount))){
            roi = -2;
        }
        else{
            roi = ((parseFloat(quarterly_profit) * 0.3) / (parseFloat(target_amount) / parseFloat(amount_per_unit))) * parseInt(units) * 3;
        }
        return roi;

    }
    return (
        <Animated.View style={[styles.container, {
            backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkThree
                : "#f5f5f5"
        }]}>
            <View style={styles.top}>
                <BackButton theme={theme} navigation={navigation}/>
            </View>
            <Text style={[
                {
                    color: theme === 'Dark' ? Colors.White : '#333',
                },
                styles.title]}>
                CALCULATOR SCREEN
            </Text>

            <View style={styles.formWrap}>
                <View style={{paddingHorizontal: 32, padding:10,
                    marginTop: 15, width: wp('90%'),}}>

                    <TextInput
                        color={theme === 'Dark' ? '#eee' : '#131313'}
                        icon='money'
                        placeholder='How many units you want?'
                        autoCapitalize='none'
                        keyboardType='numeric'
                        keyboardAppearance='dark'
                        returnKeyType='next'
                        returnKeyLabel='next'
                        onChangeText={setUnitsPurchased}

                    />

                </View>

                <View style={{paddingHorizontal: 32, padding:10,
                    marginTop: 15, width: wp('90%'),}}>
                    <TextInput
                        color={theme === 'Dark' ? '#eee' : '#131313'}
                        icon='money'
                        placeholder='Estimated profit in a month?'
                        autoCapitalize='none'
                        keyboardType='numeric'
                        keyboardAppearance='dark'
                        returnKeyType='next'
                        returnKeyLabel='next'
                        required
                        value={estimatedProfit}
                        onChangeText={setEstimatedProfit}

                    />

                </View>
            </View>

        </Animated.View>
    );
};


const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1, alignItems: 'center', justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    formWrap: {},
    top: {
        width: '100%',
    },
    title: {
        fontFamily: 'Gordita-Black',
        fontSize: 16,
    },
    wrap: {
        padding: 10,
        width: wp('90%'),
        alignItems: 'center',
        justifyContent: 'flex-start',
        alignContent: 'center',
        flexDirection: 'column',
    },

});

export default CalculatorScreen;

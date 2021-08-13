import React, { useState} from 'react';
import { widthPercentageToDP as wp} from "react-native-responsive-screen";
import {Animated, StatusBar, StyleSheet, Text, View} from 'react-native';
import {Colors, DarkColors, DayColors} from "../constants/Colors";
import BackButton from "../components/BackBtn";
import TextInput from "../components/TextInput";
import {Picker} from "@react-native-picker/picker";
import {useSelector} from "react-redux";

const CalculatorScreen = ({navigation}) => {

    const data = useSelector(state => state.data)
    const {theme} = data;

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

    //const [projectTarget, setProjectTarget] = useState(500000000);
    const [unitsPurchased, setUnitsPurchased] = useState(1);
    const [target, setTarget] = useState(500000000);
    const [estimatedProfit, setEstimatedProfit] = useState(null);
    const [error, setError] = useState('')
    const [result, setResult] = useState(0)



    function Calculator(units, quarterly_profit, target_amount, amount_per_unit) {

        let roi;
        if (parseFloat(quarterly_profit) < (0.3 * parseFloat(target_amount))) {
            roi = -1;
        } else if (parseFloat(quarterly_profit) > (0.6 * parseFloat(target_amount))) {
            roi = -2;
        } else {
            roi = ((parseFloat(quarterly_profit) * 0.3) / (parseFloat(target_amount) / parseFloat(amount_per_unit))) * parseInt(units) * 3;
        }
        return roi;

    }

    const calculateResult = () => {
        // theResult = parseInt(result) + units
        const calcResult = Calculator(unitsPurchased, estimatedProfit, target, pricePerUnit)
        if (calcResult === -1) {
            setError('Profit provided Too small')
            setResult(0)
        } else if (calcResult === -2) {
            setError('Profit provided Too large')
            setResult(0)
        } else {
            setResult(calcResult)
            setError(null)
        }

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
                    fontFamily:'Gordita-bold',
                    color: theme === 'Dark' ? Colors.White : '#333',
                },
                styles.title]}>
                CALCULATOR
            </Text>

            <View style={styles.formWrap}>
                <View
                    style={{
                        paddingHorizontal: 32,
                        marginTop: 15,
                        width:wp('85%'),
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent:'space-between',
                        height: 65,
                        borderRadius: 20,
                        borderColor: "#ddd",
                        borderWidth: 2,
                       padding: 10,
                    }}
                >
                <Picker
                    label='Project target'
                    style={{
                        width:'100%',
                        height:45,
                        flexDirection: 'row',
                        alignItems:'flex-start',
                        justifyContent:'flex-start',
                        color:'#eee'
                    }}
                    mode='dropdown'
                    selectedValue={target}
                    onValueChange={(itemValue, itemIndex) =>
                        setTarget(itemValue)
                    }>
                    <Picker.Item label='Select project target' value={target} key={0} />
                    <Picker.Item label='500,000,000' value='500000000' key={1} />
                    <Picker.Item label='600,000,000' value='600000000' key={2} />
                    <Picker.Item label='800,000,000' value='800000000' key={3} />
                </Picker>
                </View>

                <View style={{
                    paddingHorizontal: 32, padding: 10,
                    marginTop: 15, width: wp('100%'),
                }}>

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

                <View style={styles.notice}>
                    <Text style={{
                        fontSize:14,
                        fontFamily:'Gordita-bold',
                        color: theme === 'Dark' ?
                            '#eee' : '#131313'
                    }}>
                        Price per unit:
                    </Text>
                    <Text style={{
                        fontFamily:'Gordita-bold',
                        fontSize:14,
                        color: theme === 'Dark' ?
                            '#eee' : '#131313'
                    }}>
                        N50,000
                    </Text>
                </View>

                <View style={{
                    paddingHorizontal: 32, padding: 10,
                    marginTop: 15, width: wp('100%'),
                }}>
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
                        onChange={calculateResult}
                        value={estimatedProfit}
                        onChangeText={setEstimatedProfit}

                    />

                </View>
            </View>

            <View style={{
                width:'100%',
                alignItems:'center',
flexDirection:'column'
            }}>
                <Text style={{
                    textAlign:'center',
                    fontFamily:'Gordita-medium',
                    fontSize:16,
                    color: '#f66658'
                }}>
                    {error && error}
                </Text>

                <Text style={{
                    fontFamily:'Gordita-bold',
                    fontSize:20,
                    color: theme === 'Dark' ?
                        DayColors.strongLemon : '#131313'
                }}>
                 Profit:   ₦{result * 4}
                </Text>
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
    formWrap: {
        alignItems: 'center',
        flexDirection: 'column'
    },
    notice: {
        marginVertical: 15,
        borderRadius: 15,
        width: 300,
        justifyContent:'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        height: 70,
        borderWidth: 1,
        borderColor: DayColors.cream,
        borderStyle: 'dashed'
    },
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

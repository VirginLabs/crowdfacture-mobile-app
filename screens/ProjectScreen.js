import React, {useContext, useRef, useState} from 'react';
import BottomSheet from 'react-native-simple-bottom-sheet';
import {
    Animated,
    ImageBackground,
    Keyboard,
    ScrollView,
    TouchableWithoutFeedback,
    StyleSheet,
    Text,
    TouchableOpacity,
    View, Button, StatusBar, Modal, Alert
} from 'react-native';
import {ThemeContext} from "../util/ThemeManager";
import {Colors, DarkColors, DayColors} from "../constants/Colors";
import BackButton from "../components/BackBtn";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import {Ionicons} from "@expo/vector-icons";
import {useFormik} from "formik";
import * as Yup from "yup";
import TextInput from "../components/TextInput";
import MyButton from "../components/MyButton";


const phoneRegExp = /^[+]?\d*$/
const schema = Yup.object().shape({
    number: Yup.string()
        .matches(phoneRegExp, 'Wrong input')
        .required("Amount is Required"),
});


const ProjectScreen = ({route, navigation}) => {


    const {theme} = useContext(ThemeContext);

    const animation = useRef(new Animated.Value(0)).current
    const panelRef = useRef(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const toggleModal = () => {
        setIsModalVisible(prevState => !prevState);
    }

    const textColor = theme === 'Dark' ? '#eee' : '#333'

    const {projectId} = route.params;

    const {
        handleChange, handleSubmit, handleBlur,
        values,
        errors,
        touched
    } = useFormik({
        validationSchema: schema,
        initialValues: {
            number: '',
        },
        onSubmit: (values) => {
            const {number} = values;
            alert(`number: ${values.number}`)
        }
    });
    return (
        <ScrollView
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            horizontal={false}
            contentContainerStyle={[styles.container, {
                backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkThree
                    : "#f5f5f5"
            }]}>


            <ImageBackground style={{
                width: wp('100%'),
                borderRadius: 15,
                padding: 10,
                height: 300,
                alignItems: 'flex-start'
            }} resizeMode='cover' source={require('../assets/images/bg.jpg')}>
                <View style={styles.top}>
                    <BackButton theme={theme} navigation={navigation}/>
                </View>

            </ImageBackground>


            <View style={styles.projectTitle}>
                <Text style={{
                    color: theme === 'Dark' ? '#fff' : '#131313',
                    fontSize: 20,
                    fontFamily: 'Gordita-Black'
                }}>
                    RICE PROCESSING PLANT
                </Text>
                <Text style={{
                    fontSize: 13,
                    color: textColor,
                    fontFamily: 'Gordita-medium',
                    lineHeight: 20
                }}>

                    A 150 tons per day output ultra-modern rice plant in Abakaliki, Ebonyi state to
                    harness the production of local rice with international standard for local
                    consumption and export
                    purposes.

                </Text>

                <Text style={{
                    color: theme === 'Dark' ? DayColors.cream : '#131313',
                    fontSize: 18,
                    fontFamily: 'Gordita-bold'
                }}>
                    Target: N600,000,00
                </Text>
            </View>

            <View style={{
                alignItems: 'center',
                justifyContent: 'space-evenly',
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: wp('100%')
            }}>

                <View style={[{
                    borderColor: theme === 'Dark' ? DarkColors.primaryDarkTwo : '#eee',
                },
                    styles.card]}>
                    <Text style={[
                        styles.cardTextOne,
                        {
                            color: theme === 'Dark' ? '#fff' : '#131313',

                        }]}>
                        Return
                    </Text>
                    <Text
                        style={[{
                            color: textColor,

                        },
                            styles.cardTextTwo]}>
                        30% / Quarter
                    </Text>
                </View>


                <View style={[{
                    borderColor: theme === 'Dark' ? DarkColors.primaryDarkTwo : '#eee',
                },
                    styles.card]}>
                    <Text style={[
                        styles.cardTextOne,
                        {
                            color: theme === 'Dark' ? '#fff' : '#131313',

                        }]}>
                        Investment Type
                    </Text>
                    <Text style={[{
                        color: textColor,

                    },
                        styles.cardTextTwo]}>
                        Equity
                    </Text>
                </View>


                <View style={[{
                    borderColor: theme === 'Dark' ? DarkColors.primaryDarkTwo : '#eee',
                },
                    styles.card]}>
                    <Text style={[
                        styles.cardTextOne,
                        {
                            color: theme === 'Dark' ? '#fff' : '#131313',

                        }]}>
                        Current value/unit
                    </Text>
                    <Text
                        style={[{
                            color: textColor,

                        },
                            styles.cardTextTwo]}>
                        N50,000
                    </Text>
                </View>

                <View style={[{
                    borderColor: theme === 'Dark' ? DarkColors.primaryDarkTwo : '#eee',
                },
                    styles.card]}>
                    <Text style={[
                        styles.cardTextOne,
                        {
                            color: theme === 'Dark' ? '#fff' : '#131313',

                        }]}>
                        Payout Type
                    </Text>
                    <Text
                        style={[{
                            color: textColor,

                        },
                            styles.cardTextTwo]}>
                        based on profit and lose
                    </Text>
                </View>


                <View style={[{
                    borderColor: theme === 'Dark' ? DarkColors.primaryDarkTwo : '#eee',
                },
                    styles.card]}>
                    <Text style={[
                        styles.cardTextOne,
                        {
                            color: theme === 'Dark' ? '#fff' : '#131313',

                        }]}>
                        Unit type
                    </Text>
                    <Text
                        style={[{
                            color: textColor,

                        },
                            styles.cardTextTwo]}>
                        Units can be liquidated
                    </Text>
                </View>

                <View style={[{
                    borderColor: theme === 'Dark' ? DarkColors.primaryDarkTwo : '#eee',
                },
                    styles.card]}>
                    <Text style={[
                        styles.cardTextOne,
                        {
                            color: theme === 'Dark' ? '#fff' : '#131313',

                        }]}>
                        limit
                    </Text>
                    <Text
                        style={[{
                            color: textColor,

                        },
                            styles.cardTextTwo]}>
                        1000 unit/user
                    </Text>
                </View>


                <View style={[{
                    borderColor: theme === 'Dark' ? DarkColors.primaryDarkTwo : '#eee',
                },
                    styles.card]}>
                    <Text style={[
                        styles.cardTextOne,
                        {
                            color: theme === 'Dark' ? '#fff' : '#131313',

                        }]}>
                        Available units
                    </Text>
                    <Text
                        style={[{
                            color: textColor,

                        },
                            styles.cardTextTwo]}>
                        10,000
                    </Text>
                </View>


                <View style={[{
                    borderColor: theme === 'Dark' ? DarkColors.primaryDarkTwo : '#eee',
                },
                    styles.card]}>
                    <Text style={[
                        styles.cardTextOne,
                        {
                            color: theme === 'Dark' ? '#fff' : '#131313',

                        }]}>
                        Track projects
                    </Text>
                    <Text
                        style={[{
                            color: textColor,

                        },
                            styles.cardTextTwo]}>
                        SEE PROGRESS
                    </Text>
                </View>


            </View>


            <View style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 5,
                justifyContent: 'space-evenly'
            }}>

                <TouchableOpacity onPress={() => panelRef.current.togglePanel()} style={{
                    width: '50%',
                    height: 60,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    backgroundColor: Colors.Primary,
                    borderRadius: 15
                }}>

                    <Ionicons name='cart' size={24}/>
                    <Text style={{
                        fontSize: 20,
                        fontFamily: 'Gordita-bold'
                    }}>
                        Buy Units
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity  style={{
                    height: 60,
                    width: 70,
                    borderWidth: 2,
                    borderRadius: 20,
                    borderColor: DayColors.primaryColor,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }} activeOpacity={0.8}>
                    <Ionicons name='heart' color="#eee" size={24}/>
                </TouchableOpacity>


            </View>


            <BottomSheet wrapperStyle={{
                width: wp('100%'),
                backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkTwo : '#eee',
            }} sliderMinHeight={1} isOpen={false} ref={ref => panelRef.current = ref}>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    padding: 10,
                    width: '100%'
                }}>
                    <Text style={{
                        paddingVertical: 20,
                        fontSize: 25,
                        color: theme === 'Dark' ? '#eee' : "#131313", fontFamily: 'Gordita-bold'
                    }}>
                        Buy Unit
                    </Text>
                </View>


                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    padding: 10,
                    width:'100%' ,
                }}>

                    <View style={{paddingHorizontal: 32, marginTop: 15, width:'100%' ,}}>
                        <TextInput
                            color={theme === 'Dark' ? '#eee' : '#131313'}
                            icon='money'
                            keyboardType='numeric'
                            placeholder='Enter number'
                            autoCapitalize='none'
                            keyboardAppearance='dark'
                            returnKeyType='go'
                            returnKeyLabel='go'
                            onChangeText={handleChange('number')}
                            onBlur={handleBlur('number')}
                            error={errors.number}
                            touched={touched.number}
                        />
                    </View>
                    <Text style={styles.errorText} numberOfLines={1}>
                        {errors.number}
                    </Text>

                    <MyButton action={() => handleSubmit()} title='BUY'
                              buttonStyle={styles.submitBtn} textStyle={styles.buttonText}/>
                </View>
            </BottomSheet>


        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: StatusBar.currentHeight,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        backgroundColor: 'red',
        paddingBottom:20
    },
    top: {
        width: '100%',
    },
    projectTitle: {
        width: '100%',
        padding: 10
    },
    card: {
        marginVertical: 10,
        borderWidth: 2,
        padding: 10,
        width: '40%',
        height: 70,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        borderRadius: 15
    },
    cardTextOne: {
        fontSize: 15,
        fontFamily: 'Gordita-bold'
    },
    cardTextTwo: {
        fontSize: 11,
        fontFamily: 'Gordita-medium'
    },
    bottomSheet: {},
    submitBtn:{
        height: 50,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        width: 160,
        backgroundColor: Colors.Primary,
        borderRadius: 10,
    },
    errorText: {fontSize: 14,
        alignItems: "flex-start", width: '75%',
        color: '#FF5A5F', padding: 8},
    buttonText: {
        fontFamily: 'Gordita-bold',
        fontSize: 16
    },
});

export default ProjectScreen;

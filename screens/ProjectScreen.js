import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
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
    View, Button, StatusBar, Modal, Alert, ActivityIndicator, TextInput as RNTextInput, Easing
} from 'react-native';

import {Colors, DarkColors, DayColors} from "../constants/Colors";
import BackButton from "../components/BackBtn";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import {Ionicons} from "@expo/vector-icons";
import {useFormik} from "formik";
import * as Yup from "yup";
import TextInput from "../components/TextInput";
import MyButton from "../components/MyButton";
import {getProject} from "../redux/actions/data-action";
import {buyUnitAction, clearErrors, clearMessage, saveProject, unSaveProject} from "../redux/actions/user-action";
import {connect, useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import ToastMessage from "../components/Toast";


const phoneRegExp = /^[+]?\d*$/
const schema = Yup.object().shape({
    number: Yup.string()
        .matches(phoneRegExp, 'Wrong input')
        .required("Amount is Required"),
});


const ProjectScreen = (props) => {


const {route, navigation} = props
    const [total, setTotal] = useState(0)
    const user = useSelector(state => state.user)
    const data = useSelector(state => state.data)
    const dispatch = useDispatch()
    const [sheetOpen, setSheetOpen] = useState(false);

    const {projectId} = route.params;


    const {error, loading, message, userData: {member: { ID, Phone}}} = user
    const {
        saveProject,
        unSaveProject,

    } = props
    const {
        theme,
        project,
        loadingProject
    } = data




     useEffect(() => {
        const formData = new FormData()
        formData.append('projectId', projectId)
        dispatch(getProject(formData))

    }, [projectId]);


    const panelRef = useRef(null);
    const textColor = theme === 'Dark' ? '#eee' : '#333'



    const {
        handleChange, handleSubmit, handleBlur,
        values,
        errors,
        touched
    } = useFormik({
        validationSchema: schema,
        initialValues: {
            number: 0,
        },
        onSubmit: (values) => {
            const {number} = values;

            const buyData = new FormData()
            buyData.append('userId', ID)
            buyData.append('totalAmount', total)
            buyData.append('numberOfUnit', number)
            buyData.append('projectId', projectId)
            buyData.append('totalPercentageReturn', '30')
            dispatch(buyUnitAction(buyData,Phone))
        }
    });

    useEffect(() => {
       const {number} = values;
       const {PricePerUnit} = project;

        const myTotal =  number * PricePerUnit;
        setTotal(myTotal)
    },[values.number])


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
            }} resizeMode='cover' source={{uri: project.ProjectImage}}>
                <View style={styles.top}>
                    <BackButton theme={theme} navigation={navigation}/>
                </View>

            </ImageBackground>


            {
                loadingProject ? <View style={{
                        flex: 1,
                    width:'100%',
                    height:600,
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        flexDirection: 'column',
                        backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkThree
                            : "#f5f5f5"
                    }}><ActivityIndicator size="large" color={Colors.Primary}/>
                    </View>:
                    <>
                        <View style={styles.projectTitle}>
                            <Text style={{
                                color: theme === 'Dark' ? '#fff' : '#131313',
                                fontSize: 18,
                                fontFamily: 'Gordita-Black'
                            }}>
                                {
                                    project.ProjectTitle
                                }
                            </Text>
                            <Text style={{
                                fontSize: 9,
                                color: textColor,
                                fontFamily: 'Gordita-medium',
                                lineHeight: 15
                            }}>
                                {
                                    project.ProjectDescription
                                }


                            </Text>

                            <Text style={{
                                marginTop:10,
                                color: theme === 'Dark' ? DayColors.cream : '#131313',
                                fontSize: 12,
                                fontFamily: 'Gordita-bold'
                            }}>
                                Target: ₦{project.Target}
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
                                    ₦{project.PricePerUnit}
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
                                    {project.PayoutType}
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
                                    {project.UnitType}
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
                                    {project.UnitLimit} unit/user
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
                                    {project.AvailableUnits}
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
                            justifyContent: 'space-evenly',
                        }}>


                         {/*   <TouchableOpacity onPress={() => panelRef.current.togglePanel()} style={{
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
                            </TouchableOpacity>*/}



                            <TouchableOpacity style={{
                                height: 60,
                                width: 70,
                                borderWidth: 2,
                                borderRadius: 20,
                                borderColor: DayColors.primaryColor,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }} activeOpacity={0.8}>
                                <Ionicons name='heart' color={theme === 'Dark'
                                ? '#eed' : "#333"} size={24}/>
                            </TouchableOpacity>


                        </View>
                    </>
            }

            {project.Active === '1' &&
            <View style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 5,
                justifyContent: 'center',
                marginBottom:45,
            }}>
            <Text style={{
                padding:5,
                fontFamily: 'Gordita-bold',
                color: theme === 'Dark' ? DayColors.cream : "#131313"
            }}>
                TAP BELOW TO BUY UNIT
            </Text>
            </View>
            }

            {project.Active === '1' &&
            <BottomSheet wrapperStyle={{
                width: wp('100%'),
                backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkTwo : '#eee',
            }}
                         isOpen={sheetOpen} sliderMaxHeight={600} sliderMinHeight={50}
                         animation={Easing.ease}
                         onOpen={() => setSheetOpen(true)}
            >


                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    padding: 10,
                    width: '100%'
                }}>


                    {message &&
                    <ToastMessage onHide={() => dispatch(clearMessage())} message={message} type='message'/>
                    }

                    {error && <ToastMessage onHide={() => dispatch(clearErrors())} message={error} type='error'/>}
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
                    width: '100%',
                }}>

                    <View style={{paddingHorizontal: 32, marginTop: 15, width: '100%',}}>
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

                    <Text style={{fontSize: 16, color: theme === 'Dark' ? '#eee' : '#131313', padding: 5}}
                          numberOfLines={1}>
                        ₦{total}
                    </Text>

                    {
                        loading && <ActivityIndicator size="large" color={Colors.Primary}/>
                    }

                    {
                        <MyButton action={() => handleSubmit()} title='BUY'
                                  buttonStyle={styles.submitBtn} textStyle={styles.buttonText}/>
                    }


                </View>
            </BottomSheet>
            }




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
        fontSize: 12,
        fontFamily: 'Gordita-bold'
    },
    cardTextTwo: {
        fontSize: 8,
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

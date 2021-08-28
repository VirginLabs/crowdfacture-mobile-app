import React, {useCallback, useEffect, useRef, useState} from 'react';

import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View, StatusBar, ActivityIndicator, Dimensions,
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
import {useDispatch, useSelector} from "react-redux";

import Animated, {useSharedValue, Easing, withSpring, withTiming} from "react-native-reanimated";
import ModalSheet from "../components/ModalSheet";
import {TapGestureHandler} from "react-native-gesture-handler";
import ToastMessage from "../components/Toast";
import SuccessModal from "../components/SuccessModal";

import * as Progress from 'react-native-progress';



const phoneRegExp = /^[+]?\d*$/
const schema = Yup.object().shape({
    number: Yup.string()
        .min(1, "Please enter a number")
        .matches(phoneRegExp, 'Wrong input')
        .required("Amount is Required"),
});

const height = Dimensions.get('window').height

const ProjectScreen = (props) => {


    const {route, navigation} = props
    const [total, setTotal] = useState('0.00')
    const user = useSelector(state => state.user)
    const data = useSelector(state => state.data)
    const [isSuccessful, setIsSuccessful] = useState(true)
    const [saved, setSaved] = useState(false);

    const {
        theme,
        project,
        loadingProject
    } = data

const toggleSuccessModal = () =>{
        setIsSuccessful(!isSuccessful)

}
    const textColor = theme === 'Dark' ? '#eee' : '#333'

    const dispatch = useDispatch()


    const sheetHeight = useSharedValue(height)
    const opacity = useSharedValue(0)
    const zIndex = useSharedValue(0)
    const offset = useSharedValue(600);
    const {projectId} = route.params;


    const {loading, message, error,
        userData: {member: {ID, Phone},
        savedProjects} } = user


    useEffect(() => {
        const formData = new FormData()
        formData.append('projectId', projectId)
        dispatch(getProject(formData))

    }, [projectId]);


    useEffect(() => {
        const thisProjectExist = savedProjects.filter((pro) => pro.ProjectID === projectId)
        if (thisProjectExist !== undefined) {setSaved(true)}
         //console.log(["THIS MY PROJECT",thisProjectExist])
    }, [projectId])

    const saveThisProject = () => {
        const formData = new FormData()
        formData.append('userId', ID)
        formData.append('projectId', projectId)
        dispatch(saveProject(formData))
        setSaved(true)
    }

    const unSaveThisProject =() => {
        const formData = new FormData()
        formData.append('userId', ID)
        formData.append('projectId', projectId)
        dispatch(unSaveProject(formData))
        setSaved(false)
    }



    const openSheet = useCallback(() => {
        opacity.value = withSpring(1)
        zIndex.value = 100
        sheetHeight.value = withSpring(height / 2.3)
        offset.value = withTiming(0, {
            duration: 400,
            easing: Easing.out(Easing.exp),
        })


    }, []);


    const {
        handleChange, handleSubmit, handleBlur,
        values,
        errors,
        isValid,
        touched
    } = useFormik({
        validationSchema: schema,
        initialValues: {
            number: '',
        },
        onSubmit: (values) => {
            const {number} = values;

            const buyData = new FormData()
            buyData.append('userId', ID)
            buyData.append('totalAmount', total)
            buyData.append('numberOfUnit', number)
            buyData.append('projectId', projectId)
            buyData.append('totalPercentageReturn', '30')
            dispatch(buyUnitAction(buyData, Phone))
        }
    });

    useEffect(() => {
        const {number} = values;
        const {PricePerUnit} = project;

        const myTotal = number * PricePerUnit;
        setTotal(myTotal)
    }, [values.number])




    return (

     <>

            <ModalSheet height={300} zIndex={zIndex} offset={offset} opacity={opacity}>

                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    padding: 5,
                    width: '100%'
                }}>


                    <Text style={{
                        paddingVertical: 5,
                        fontSize: 14,
                        color: theme === 'Dark' ? '#eee' : "#131313", fontFamily: 'Gordita-Black'
                    }}>
                        Buy Unit
                    </Text>
                </View>


                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    padding: 5,
                    width: '100%',
                }}>

                    <View style={{paddingHorizontal: 32, marginTop: 5, width: '100%',}}>
                        <TextInput
                            color={theme === 'Dark' ? '#eee' : '#131313'}
                            icon='money'
                            keyboardType="number-pad"
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

                    <Text style={{
                        fontSize: 14,
                        color: theme === 'Dark' ? '#eee' : '#131313',
                        padding: 5,
                        fontFamily: 'Gordita-bold'
                    }}>
                        Total: ₦{total}


                    </Text>

                    {
                        loading && <ActivityIndicator size="large" color={Colors.Primary}/>
                    }

                    {
                        isValid ?
                            <MyButton action={() => handleSubmit()} title='BUY NOW'
                                      buttonStyle={styles.submitBtn} textStyle={styles.buttonText}/>
                            :
                            <TouchableOpacity activeOpacity={1} style={{
                                backgroundColor: '#ddd',
                                height: 50,
                                marginHorizontal: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginVertical: 5,
                                width: 160,
                                borderRadius: 10,
                            }}>
                                <Text style={{
                                    fontSize: 12,
                                    fontFamily: 'Gordita-bold'
                                }}>
                                    SUBMIT
                                </Text>

                            </TouchableOpacity>
                    }


                </View>

            </ModalSheet>
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
                            width: '100%',
                            height: 600,
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            flexDirection: 'column',
                            backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkThree
                                : "#f5f5f5"
                        }}><ActivityIndicator size="large" color={Colors.Primary}/>
                        </View> :
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
                                    marginTop: 10,
                                    color: theme === 'Dark' ? DayColors.cream : '#131313',
                                    fontSize: 12,
                                    fontFamily: 'Gordita-bold'
                                }}>
                                    Target: ₦{project.Target}
                                </Text>
                            </View>
                            <View style={styles.projectTitle}>
                                <Text style={{
                                    marginBottom:3,
                                    fontSize:10,
                                    fontFamily:"Gordita-bold",
                                color: theme === 'Dark' ? '#ccc' : "#333"
                                }
                                }>
                                    5% Complete
                                </Text>
                                <Progress.Bar color={Colors.Primary} progress={0.1} width={wp(90)} />
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

                                {project.Active === '1' &&
                                <TapGestureHandler onActivated={openSheet}>

                                    <Animated.View style={{
                                        width: 150,
                                        height: 55,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-evenly',
                                        backgroundColor: Colors.Primary,
                                        borderRadius: 10
                                    }}>

                                        <Ionicons name='cart' size={18}/>
                                        <Text style={{
                                            fontSize: 14,
                                            fontFamily: 'Gordita-bold'
                                        }}>
                                            Buy Units
                                        </Text>
                                    </Animated.View>
                                </TapGestureHandler>
                                }


                                {
                                    saved ?

                                        <TouchableOpacity onPress={unSaveThisProject} style={{
                                            height: 55,
                                            width: 55,
                                            borderRadius: 15,
                                            backgroundColor: DayColors.primaryColor,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }} activeOpacity={0.8}>
                                            {
                                                loading ? <ActivityIndicator size="large" color={Colors.Primary}/>
                                            :
                                            <Ionicons name='heart' color={theme === 'Dark'
                                                ? '#eed' : "#333"} size={18}/>
                                                }
                                        </TouchableOpacity>


                                        :

                                        <TouchableOpacity onPress={saveThisProject} style={{
                                            height: 55,
                                            width: 55,
                                            borderWidth: 1,
                                            borderRadius: 15,
                                            borderColor: DayColors.primaryColor,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }} activeOpacity={0.8}>
                                            {
                                                loading ? <ActivityIndicator size="large" color={Colors.Primary}/>
                                                    :
                                                    <Ionicons name='heart' color={theme === 'Dark'
                                                        ? '#eed' : "#333"} size={18}/>
                                            }
                                        </TouchableOpacity>
                                }


                            </View>
                        </>
                }


                {message &&
                <ToastMessage onHide={() => dispatch(clearMessage())} message={message} type='message'/>
                }

                {
                    message && <SuccessModal theme={theme} isSuccessful={isSuccessful} toggle={() => toggleSuccessModal()}/>
                }





            </ScrollView>
        </>
    );
};


const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: StatusBar.currentHeight + 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        paddingBottom: 20
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
    submitBtn: {
        height: 50,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        width: 160,
        backgroundColor: Colors.Primary,
        borderRadius: 10,
    },
    errorText: {
        fontSize: 10,
        alignItems: "flex-start", width: '75%',
        color: '#FF5A5F', padding: 2
    },
    buttonText: {
        fontFamily: 'Gordita-bold',
        fontSize: 12
    },
});


export default ProjectScreen;

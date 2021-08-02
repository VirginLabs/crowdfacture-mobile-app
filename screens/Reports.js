import React, {useCallback, useEffect} from 'react';

import {
    ActivityIndicator,
    Dimensions,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {Colors, DarkColors, DayColors} from "../constants/Colors";
import BackButton from "../components/BackBtn";
import {useDispatch, useSelector} from "react-redux";
import {Ionicons,FontAwesome5} from '@expo/vector-icons';
import {getUserProjects} from "../redux/actions/user-action";

import ReportProjectCard from "../components/ReportProjectCard";
import ModalSheet from "../components/ModalSheet";
import {Easing, useSharedValue, withSpring, withTiming} from "react-native-reanimated";


const height = Dimensions.get('window').height
const ReportsScreen = (props) => {
    const user = useSelector(state => state.user)
    const data = useSelector(state => state.data)
    const dispatch = useDispatch()
    const {theme,loadingProject} = data;
    const {navigation} = props
    const {userProjects, userData: {member: {ID}}} = user

    const sheetHeight = useSharedValue(height)
    const opacity = useSharedValue(0)
    const zIndex = useSharedValue(0)
    const offset = useSharedValue(600);

    useEffect(() => {
        const formData = new FormData()
        formData.append('userId', ID)
        dispatch(getUserProjects(formData))

    }, []);


    const openSheet = useCallback(() => {
        opacity.value = withSpring(1)
        zIndex.value = 100
        sheetHeight.value = withSpring(height / 2.3)
        offset.value = withTiming(0, {
            duration: 400,
            easing: Easing.out(Easing.exp),
        })


    }, []);
    return (
        <>
            <ModalSheet zIndex={zIndex} height={650} offset={offset} opacity={opacity}>
                <View style={{
                    height: '100%',
                    borderRadius: 20,
                    width: '100%',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',

                }}>


                        <FontAwesome5 name="file-alt" size={54} color={
                            theme === 'Dark' ? '#282828'
                                : '#cdcdcd'
                        }/>
                        <Text style={{
                            fontSize: 12,
                            marginVertical: 12,
                            fontFamily: 'Gordita-medium',
                            color: theme === 'Dark' ? '#eee' : '#333'
                        }}>
                            Sorry! no report available for this project yet.
                        </Text>

                    </View>
            </ModalSheet>
        <View style={[styles.container, {
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
                PROJECT REPORTS
            </Text>



            <View style={styles.projectContainer}>
                {
                    loadingProject ?
                        <ActivityIndicator size="large" color={Colors.Primary}/>
                        :
                        Object.keys(userProjects).length > 0 &&
                            userProjects.map((({AddAmount, ID, Project}) => (

                                <ReportProjectCard action={() => openSheet()} key={ID} theme={theme} image={Project.ProjectImage}
                                                   projectTitle={Project.ProjectTitle}
                                                 totalAmount={AddAmount}
                                                   target={Project.Target}
                                                   pricePerUnit={Project.PricePerUnit}/>

                            )))
                }
            </View>

            {
                Object.keys(userProjects).length < 1 &&

                <View style={{
                    alignItems: 'center',
                    justifyContent: 'flex-end',

                    height: 500,
                }}>

                    <Ionicons name="ios-document-text-sharp" size={54} color={
                        theme === 'Dark' ? '#282828'
                            : '#333'
                    }/>
                    <Text style={{
                        fontSize: 12,
                        marginVertical: 12,
                        fontFamily: 'Gordita-medium',
                        color: theme === 'Dark' ? '#eee' : '#333'
                    }}>
                        Opps! your are yet to invest in any project.
                    </Text>


                    <TouchableOpacity style={{
                        width: 140,
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 45,
                        backgroundColor: DayColors.lemon,
                        borderRadius: 10,
                        marginTop: 20,
                    }}>

                        <Text style={{
                            fontFamily: 'Gordita-bold',
                            color: '#131313'
                        }}>
                            Start investing
                        </Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
         </>
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
    top: {
        width: '100%',
    },
    title: {
        fontFamily: 'Gordita-Black',
        fontSize: 14,
    },
    wrap: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    projectContainer: {
        marginTop:20,
        width: "100%",
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },

});

export default ReportsScreen;

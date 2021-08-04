import React, { useContext, useEffect} from "react";
import {View, Text, StatusBar, StyleSheet, ScrollView, ActivityIndicator} from "react-native";
import {Colors, DarkColors, DayColors} from "../constants/Colors";
import BackButton from "../components/BackBtn";
import {getNotifications} from "../redux/actions/data-action";
import {connect, useSelector} from "react-redux";
import PropTypes from "prop-types";
import {SafeAreaView} from "react-native-safe-area-context";


const NotificationScreen = (props) => {
    const data = useSelector(state => state.data)
    const {theme} = data

let noti = [];

    const {notificationLoading,notifications} = props.data
    const { userData: { member: { ID}}} = props.user
    const {navigation,getNotifications} = props




    useEffect(() =>{
        //called anytime the notification is toggled

        const notiData = new FormData()
        notiData.append('userId', ID)
        getNotifications(notiData)

        noti = notifications
    }, [ID])

    return (
        <SafeAreaView 
        style={[styles.container, {
            backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkThree
                : "#f5f5f5"
        }]}>

        
        <ScrollView
            keyboardShouldPersistTaps='handled'
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            scrollEnabled
        contentContainerStyle={
            {
            
                paddingLeft: 10,
                paddingRight: 10,
                alignItems: 'center', justifyContent: 'flex-start',
                flexDirection: 'column'
            }
        }
            >
            <View style={styles.top}>
                <BackButton theme={theme} navigation={navigation}/>
            </View>

            <Text style={[
                {
                    fontFamily:'Gordita-bold',
                    color: theme === 'Dark' ? Colors.White : '#333',
                },
                styles.title]}>
                Your Notification
            </Text>
            <View style={styles.notificationWrap}>
                {
                    notificationLoading ? <ActivityIndicator size="large" color={Colors.Primary}/>
                    :
                        noti.length !== 0 &&
                        <View>

                        </View>

                }
                {

                        !notificationLoading && noti.length === 0 &&

                        <View style={{
                            width: '90%',
                            alignItems: 'center',
                            padding: 8,
                            backgroundColor: DayColors.lemon,
                            borderRadius: 10,
                            margin: 10,
                        }}>
                            <Text style={{
                                fontFamily: 'Gordita-bold',
                                color: '#333',
                            }}>
                                You have no notification
                            </Text>
                        </View>


                }


                {

                }
            </View>
        </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
       
    },
    top: {
        top:30,
        width: '100%',
    },
    notificationWrap:{
        flex:1,
        width: '90%',
        flexDirection: 'column',
        alignItems: "center"
    }
})

NotificationScreen.propTypes = {
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    getNotifications: PropTypes.func.isRequired,
};


const mapActionToPops = {
    getNotifications,
}


const mapStateToProps = (state) =>({
    data: state.data,
    user: state.user,
})


export default connect(mapStateToProps, mapActionToPops) (React.memo(NotificationScreen))

import React, {useContext, useEffect} from "react";
import {StyleSheet, Text, Animated, View, StatusBar, TouchableOpacity, Share} from "react-native";
import {ThemeContext} from "../util/ThemeManager";
import {DarkColors, DayColors} from "../constants/Colors";
import BackButton from "../components/BackBtn";

import {FontAwesome5} from "@expo/vector-icons";
import {getReferredUsers} from "../redux/actions/data-action";
import {connect} from "react-redux";
import PropTypes from "prop-types";


const ReferralScreen = (props) => {
    const {theme} = useContext(ThemeContext);

    const {getReferredUsers,navigation} = props
    const {referredUser, loading} = props.data
    const {userData: {member: {ReferralBalance, ReferralID,ID}}} = props.user

    useEffect(() => {
        const formdata = new FormData();
        formdata.append("userId", ID);
        getReferredUsers(formdata)
    }, []);


    const onShare = async () => {
        try {
            const result = await Share.share({
                message: `I just invested in Crowdfacture a manufacturing company that let's you co-own a factory at 30% equity stake for life click the link to register https://crowdfacture.com/auth?refCode=${ReferralID}`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };


    return (
        <Animated.View style={[styles.container, {
            backgroundColor: theme === 'Dark' ? DarkColors.primaryDarkThree
                : "#f5f5f5"
        }]}>
            <View style={styles.top}>
                <BackButton theme={theme} navigation={navigation}/>
            </View>

            <View style={styles.wrap}>
                <Text style={[{
                    color: theme === 'Dark' ? '#eee' : '#131313'
                }, styles.title]}>
                    Referral Earnings
                </Text>
                <Text style={{
                    padding: 10,
                    color: theme === 'Dark' ? DayColors.cream : '#131313',
                    fontSize: 22,
                    fontFamily: 'Gordita-Black'
                }}>

                    {
                        ReferralBalance ? '₦0.00' :
                           '₦'+ReferralBalance
                    }

                </Text>

                <View style={{
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    flexDirection: 'row',
                }}>

                    <FontAwesome5 name='user-astronaut' size={25} color={
                        theme === 'Dark' ? DayColors.cream : '#131313'}/>

                    <View style={{

                        padding: 10,
                        width: '70%',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        flexDirection: 'column'
                    }}>
                        <Text style={{
                            fontFamily: 'Gordita-medium',
                            fontSize: 16,
                            color: theme === 'Dark' ? '#fff' : '#131313',
                        }}>
                            You've invited {
                            Object.keys(referredUser).length
                        } People
                        </Text>
                        <Text style={{
                            fontSize: 11,
                            color: theme === 'Dark' ? '#eee' : '#131313',
                            lineHeight: 20
                        }}>
                            Invite your friends and earn when your friend invests in any project and also
                            earn more when your friend invites user to crowdfacture who also invests
                        </Text>
                    </View>


                </View>

                <View style={styles.buttonWrap}>
                    <TouchableOpacity
                        onPress={onShare}
                        style={{
                        backgroundColor:DayColors.primaryColor,
                        width:200,
                        height:45,
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        flexDirection: 'row',
                        borderRadius:10
                    }}>
                        <FontAwesome5 name='share-alt' size={20} color={'#131313'}/>
                            <Text style={{
                                color: '#131313',
                                fontFamily:'Gordita-bold'
                            }}>
                                Share referral link
                            </Text>


                    </TouchableOpacity>


                </View>

            </View>

        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1,
        alignItems: 'center', justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    top: {
        width: '100%',
    },
    wrap: {
        width: '100%',
        alignItems: 'center', justifyContent: 'flex-start',
        flexDirection: 'column'

    },
    title: {
        fontFamily: 'Gordita-bold',
        fontSize: 18,
        padding: 10,
    },
    buttonWrap:{
        width:'100%',
        height:120,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'column'
    }
})

ReferralScreen.propTypes = {
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    getReferredUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user,
})

const mapActionsToProps = {
    getReferredUsers
}

export default connect(mapStateToProps, mapActionsToProps)(ReferralScreen)